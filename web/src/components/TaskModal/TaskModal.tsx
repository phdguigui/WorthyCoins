import styles from "./TaskModal.module.css";
import { useState, useEffect } from "react";
import { Tooltip } from "../Tooltip/Tooltip";
import { Sparkles, Pencil } from "lucide-react";
import { Modal } from "../Modal/Modal";
import { ModalTextField } from "../ModalTextField/ModalTextField";
import { ModalDatePickerField } from "../ModalDatePickerField/ModalDatePickerField";
import { ModalCoinsField } from "../ModalCoinsField/ModalCoinsField";
import { ModalSelectField } from "../ModalSelectField/ModalSelectField";
import type { InfiniteSelectOption } from "../Select/InfiniteSelect";
import { ptBR, enUS } from "date-fns/locale";
import { TaskIconPicker } from "./TaskIconPicker";
import { createUserTask, updateUserTask } from "../../api/TaskPageApi";
import { type UserTask, UserTaskStatusEnum } from "../../api/types";
import toast from "react-hot-toast";
import { ToastContent } from "../Toast/ToastContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  childrenOptions: InfiniteSelectOption[];
  isLoadingChildren?: boolean;
  hasMoreChildren?: boolean;
  onLoadMoreChildren?: () => void;
  onTaskCreated?: () => void;
  taskToEdit?: UserTask | null;
}

export function TaskModal({
  isOpen,
  onClose,
  childrenOptions,
  isLoadingChildren = false,
  hasMoreChildren = false,
  onLoadMoreChildren,
  onTaskCreated,
  taskToEdit = null,
}: TaskModalProps) {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const taskSchema = z.object({
    title: z
      .string()
      .min(1, t("taskModal.validation.titleRequired"))
      .max(150, t("taskModal.validation.titleMax")),
    description: z
      .string()
      .max(500, t("taskModal.validation.descriptionMax"))
      .optional()
      .or(z.literal("")),
    rewardCoins: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
        message: t("taskModal.validation.rewardNumber"),
      }),
    selectedChild: z.string().min(1, t("taskModal.validation.assignRequired")),
    dueDate: z.date().nullable().optional(),
    selectedIcon: z.string().min(1, t("taskModal.validation.iconRequired")).max(100),
    selectedColor: z.string().min(1, t("taskModal.validation.colorRequired")).max(100),
  });

  type TaskFormData = z.infer<typeof taskSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: null,
      rewardCoins: "0",
      selectedChild: "",
      selectedIcon: "Sparkles",
      selectedColor: "#10b981",
    },
  });

  const selectedChild = watch("selectedChild");
  const dueDate = watch("dueDate") || undefined;
  const selectedIcon = watch("selectedIcon") || "Sparkles";
  const selectedColor = watch("selectedColor") || "#10b981";

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        reset({
          title: taskToEdit.title,
          description: taskToEdit.description || "",
          dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate) : null,
          rewardCoins: String(taskToEdit.rewardAmount),
          selectedChild: String(taskToEdit.assignedChildId),
          selectedIcon: taskToEdit.icon,
          selectedColor: taskToEdit.color,
        });
      } else {
        reset({
          title: "",
          description: "",
          dueDate: null,
          rewardCoins: "0",
          selectedChild: "",
          selectedIcon: "Sparkles",
          selectedColor: "#10b981",
        });
      }
    }
  }, [taskToEdit, isOpen, reset]);

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        await updateUserTask({
          userTaskId: taskToEdit.id,
          title: data.title.trim(),
          description: data.description?.trim() || null,
          dueDate: data.dueDate || null,
          assignedChildId: Number(data.selectedChild),
          rewardAmount: Number(data.rewardCoins),
          icon: data.selectedIcon,
          color: data.selectedColor,
        });
        toast.success(
          <ToastContent
            title={t("tasks.success")}
            description={t("taskModal.successUpdated")}
          />,
        );
      } else {
        await createUserTask({
          title: data.title.trim(),
          description: data.description?.trim() || null,
          dueDate: data.dueDate || null,
          assignedChildId: Number(data.selectedChild),
          rewardAmount: Number(data.rewardCoins),
          icon: data.selectedIcon,
          color: data.selectedColor,
        });
        toast.success(
          <ToastContent
            title={t("tasks.success")}
            description={t("taskModal.successCreated")}
          />,
        );
      }
      onTaskCreated?.();
      onClose();
    } catch (error) {
      toast.error(
        <ToastContent
          title={t("tasks.error")}
          description={t("taskModal.errorSaving")}
        />,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectOptions = [...childrenOptions];
  if (taskToEdit && taskToEdit.assignedChild) {
    const childIdStr = String(taskToEdit.assignedChildId);
    const exists = selectOptions.some((opt) => opt.value === childIdStr);
    if (!exists) {
      selectOptions.unshift({
        value: childIdStr,
        label: taskToEdit.assignedChild.name,
      });
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={taskToEdit ? <Pencil size={20} /> : <Sparkles size={20} />}
      title={taskToEdit ? t("taskModal.editTitle") : t("taskModal.createTitle")}
      subtitle={
        taskToEdit
          ? t("taskModal.editSubtitle")
          : t("taskModal.createSubtitle")
      }
      actionLabel={
        isSubmitting
          ? taskToEdit
            ? t("taskModal.saving")
            : t("taskModal.creating")
          : taskToEdit
            ? t("taskModal.saveChanges")
            : t("taskModal.createTask")
      }
      onAction={handleSubmit(onSubmit)}
    >
      <ModalTextField
        label={t("taskModal.taskTitleLabel")}
        placeholder={t("taskModal.taskTitlePlaceholder")}
        {...register("title")}
        error={!!errors.title}
      />
      {errors.title && (
        <span className={styles.errorMessage}>{errors.title.message}</span>
      )}

      <ModalTextField
        label={t("taskModal.descriptionLabel")}
        placeholder={t("taskModal.descriptionPlaceholder")}
        {...register("description")}
        error={!!errors.description}
      />
      {errors.description && (
        <span className={styles.errorMessage}>
          {errors.description.message}
        </span>
      )}

      <div className={styles.centralFields}>
        <div className={styles.centralFieldsFirstRow}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Tooltip
              content={
                taskToEdit?.status === UserTaskStatusEnum.Completed
                  ? t("taskModal.rewardTooltip")
                  : undefined
              }
            >
              <ModalCoinsField
                label={t("taskModal.rewardLabel")}
                {...register("rewardCoins")}
                error={!!errors.rewardCoins}
                disabled={taskToEdit?.status === UserTaskStatusEnum.Completed}
              />
            </Tooltip>
            {errors.rewardCoins && (
              <span
                className={styles.errorMessage}
                style={{ marginTop: "4px" }}
              >
                {errors.rewardCoins.message}
              </span>
            )}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <ModalSelectField
              label={t("taskModal.assignLabel")}
              placeholder={t("taskModal.selectChildPlaceholder")}
              value={selectedChild}
              onValueChange={(val) =>
                setValue("selectedChild", val, { shouldValidate: true })
              }
              options={selectOptions}
              isLoading={isLoadingChildren}
              hasMore={hasMoreChildren}
              onLoadMore={onLoadMoreChildren}
              error={!!errors.selectedChild}
            />
            {errors.selectedChild && (
              <span
                className={styles.errorMessage}
                style={{ marginTop: "4px" }}
              >
                {errors.selectedChild.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.centralFieldsSecondRow}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <ModalDatePickerField
              label={t("taskModal.dueDateLabel")}
              date={dueDate}
              setDate={(date) =>
                setValue("dueDate", date || null, { shouldValidate: true })
              }
              placeholder={t("taskModal.selectDatePlaceholder")}
              locale={i18n.language === "en" ? enUS : ptBR}
              error={!!errors.dueDate}
            />
            {errors.dueDate && (
              <span
                className={styles.errorMessage}
                style={{ marginTop: "4px" }}
              >
                {errors.dueDate.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <TaskIconPicker
        value={selectedIcon}
        onChange={(icon) =>
          setValue("selectedIcon", icon, { shouldValidate: true })
        }
        color={selectedColor}
        onChangeColor={(color) =>
          setValue("selectedColor", color, { shouldValidate: true })
        }
      />
      {errors.selectedIcon && (
        <span className={styles.errorMessage}>
          {errors.selectedIcon.message}
        </span>
      )}
      {errors.selectedColor && (
        <span className={styles.errorMessage}>
          {errors.selectedColor.message}
        </span>
      )}
    </Modal>
  );
}
