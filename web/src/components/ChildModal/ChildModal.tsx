import styles from "./ChildModal.module.css";
import { useState, useEffect } from "react";
import { User, Pencil } from "lucide-react";
import { Modal } from "../Modal/Modal";
import { ModalTextField } from "../ModalTextField/ModalTextField";
import { ModalDatePickerField } from "../ModalDatePickerField/ModalDatePickerField";
import { ptBR, enUS } from "date-fns/locale";
import { createChild, updateChild } from "../../api/ChildApi";
import type { Child } from "../../api/types";
import { getTokenData } from "../../utils/auth";
import toast from "react-hot-toast";
import { ToastContent } from "../Toast/ToastContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";

interface ChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChildSaved?: () => void;
  childToEdit?: Child | null;
}

export function ChildModal({
  isOpen,
  onClose,
  onChildSaved,
  childToEdit = null,
}: ChildModalProps) {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const childSchema = z.object({
    name: z
      .string()
      .min(1, t("childModal.validation.nameRequired"))
      .max(100, t("childModal.validation.nameMax")),
    birthDate: z
      .date()
      .nullable()
      .refine((val) => val !== null, {
        message: t("childModal.validation.birthDateRequired"),
      }),
  });

  interface ChildFormData {
    name: string;
    birthDate: Date | null;
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ChildFormData>({
    resolver: zodResolver(childSchema),
    defaultValues: {
      name: "",
      birthDate: null,
    },
  });

  const birthDate = watch("birthDate") || undefined;

  useEffect(() => {
    if (isOpen) {
      if (childToEdit) {
        reset({
          name: childToEdit.name,
          birthDate: childToEdit.dateOfBirth ? new Date(childToEdit.dateOfBirth) : null,
        });
      } else {
        reset({
          name: "",
          birthDate: null,
        });
      }
    }
  }, [childToEdit, isOpen, reset]);

  const onSubmit = async (data: ChildFormData) => {
    const userInfo = getTokenData();
    if (!userInfo || !userInfo.parentId) {
      toast.error(
        <ToastContent
          title={t("children.errorLoading")}
          description={t("childModal.errorSaving")}
        />,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      if (childToEdit) {
        await updateChild({
          id: childToEdit.id,
          name: data.name.trim(),
          dateOfBirth: data.birthDate!,
        });
        toast.success(
          <ToastContent
            title={t("tasks.success")}
            description={t("childModal.successUpdated")}
          />,
        );
      } else {
        await createChild({
          name: data.name.trim(),
          dateOfBirth: data.birthDate!,
          parentId: userInfo.parentId,
        });
        toast.success(
          <ToastContent
            title={t("tasks.success")}
            description={t("childModal.successCreated")}
          />,
        );
      }
      onChildSaved?.();
      onClose();
    } catch (error) {
      toast.error(
        <ToastContent
          title={t("tasks.error")}
          description={t("childModal.errorSaving")}
        />,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={childToEdit ? <Pencil size={20} /> : <User size={20} />}
      title={childToEdit ? t("childModal.editTitle") : t("childModal.createTitle")}
      subtitle={
        childToEdit ? t("childModal.editSubtitle") : t("childModal.createSubtitle")
      }
      actionLabel={
        isSubmitting
          ? childToEdit
            ? t("childModal.saving")
            : t("childModal.creating")
          : childToEdit
            ? t("childModal.saveChanges")
            : t("childModal.createChild")
      }
      onAction={handleSubmit(onSubmit)}
    >
      <ModalTextField
        label={t("childModal.nameLabel")}
        placeholder={t("childModal.namePlaceholder")}
        {...register("name")}
        error={!!errors.name}
      />
      {errors.name && (
        <span className={styles.errorMessage}>{errors.name.message}</span>
      )}

      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column" }}>
        <ModalDatePickerField
          label={t("childModal.birthDateLabel")}
          date={birthDate}
          setDate={(date) =>
            setValue("birthDate", date || null, { shouldValidate: true })
          }
          placeholder={t("childModal.birthDatePlaceholder")}
          locale={i18n.language === "en" ? enUS : ptBR}
          error={!!errors.birthDate}
        />
        {errors.birthDate && (
          <span className={styles.errorMessage} style={{ marginTop: "4px" }}>
            {errors.birthDate.message}
          </span>
        )}
      </div>
    </Modal>
  );
}
