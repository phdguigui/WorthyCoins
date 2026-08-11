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
import { ptBR } from "date-fns/locale";
import { TaskIconPicker } from "./TaskIconPicker";
import { createUserTask, updateUserTask } from "../../api/TaskPageApi";
import { type UserTask, UserTaskStatusEnum } from "../../api/types";
import toast from "react-hot-toast";
import { ToastContent } from "../Toast/ToastContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "O título é obrigatório.")
    .max(150, "O título deve ter no máximo 150 caracteres."),
  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres.")
    .optional()
    .or(z.literal("")),
  rewardCoins: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "A recompensa deve ser um número não negativo.",
    }),
  selectedChild: z
    .string()
    .min(1, "A atribuição é obrigatória."),
  dueDate: z
    .date()
    .nullable()
    .optional(),
  selectedIcon: z
    .string()
    .min(1, "O ícone é obrigatório.")
    .max(100),
  selectedColor: z
    .string()
    .min(1, "A cor é obrigatória.")
    .max(100),
});

type TaskFormData = z.infer<typeof taskSchema>;

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
        toast.success(<ToastContent title="Sucesso" description="Tarefa atualizada com sucesso!" />);
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
        toast.success(<ToastContent title="Sucesso" description="Tarefa criada com sucesso!" />);
      }
      onTaskCreated?.();
      onClose();
    } catch (error) {
      toast.error(<ToastContent title="Erro" description="Ocorreu um erro ao salvar a tarefa." />);
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
      title={taskToEdit ? "Edit Quest" : "Create New Task"}
      subtitle={
        taskToEdit
          ? "Modify this quest's details and reward."
          : "Build a fun challenge and reward it with WorthyCoins."
      }
      actionLabel={
        isSubmitting
          ? taskToEdit
            ? "Saving..."
            : "Creating..."
          : taskToEdit
            ? "Save Changes"
            : "Create Task"
      }
      onAction={handleSubmit(onSubmit)}
    >
      <ModalTextField
        label="QUEST TITLE"
        placeholder="e.g. Clean room"
        {...register("title")}
        error={!!errors.title}
      />
      {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}

      <ModalTextField
        label="WHAT NEEDS TO BE DONE"
        placeholder="Tidy up toys, make the bed, vacuum the floor..."
        {...register("description")}
        error={!!errors.description}
      />
      {errors.description && <span className={styles.errorMessage}>{errors.description.message}</span>}

      <div className={styles.centralFields}>
        <div className={styles.centralFieldsFirstRow}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Tooltip
              content={
                taskToEdit?.status === UserTaskStatusEnum.Completed
                  ? "Valor já creditado e não pode ser editado."
                  : undefined
              }
            >
              <ModalCoinsField
                label="WORTHYCOINS REWARD"
                {...register("rewardCoins")}
                error={!!errors.rewardCoins}
                disabled={taskToEdit?.status === UserTaskStatusEnum.Completed}
              />
            </Tooltip>
            {errors.rewardCoins && (
              <span className={styles.errorMessage} style={{ marginTop: "4px" }}>
                {errors.rewardCoins.message}
              </span>
            )}
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <ModalSelectField
              label="ASSIGN TO"
              placeholder="Select a child"
              value={selectedChild}
              onValueChange={(val) => setValue("selectedChild", val, { shouldValidate: true })}
              options={selectOptions}
              isLoading={isLoadingChildren}
              hasMore={hasMoreChildren}
              onLoadMore={onLoadMoreChildren}
              error={!!errors.selectedChild}
            />
            {errors.selectedChild && (
              <span className={styles.errorMessage} style={{ marginTop: "4px" }}>
                {errors.selectedChild.message}
              </span>
            )}
          </div>
        </div>
        <div className={styles.centralFieldsSecondRow}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <ModalDatePickerField
              label="DUE DATE"
              date={dueDate}
              setDate={(date) => setValue("dueDate", date || null, { shouldValidate: true })}
              placeholder="Select a due date"
              locale={ptBR}
              error={!!errors.dueDate}
            />
            {errors.dueDate && (
              <span className={styles.errorMessage} style={{ marginTop: "4px" }}>
                {errors.dueDate.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <TaskIconPicker
        value={selectedIcon}
        onChange={(icon) => setValue("selectedIcon", icon, { shouldValidate: true })}
        color={selectedColor}
        onChangeColor={(color) => setValue("selectedColor", color, { shouldValidate: true })}
      />
      {errors.selectedIcon && <span className={styles.errorMessage}>{errors.selectedIcon.message}</span>}
      {errors.selectedColor && <span className={styles.errorMessage}>{errors.selectedColor.message}</span>}
    </Modal>
  );
}
