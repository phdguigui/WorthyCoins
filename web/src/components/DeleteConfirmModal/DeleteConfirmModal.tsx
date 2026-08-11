import { Trash2 } from "lucide-react";
import { Modal } from "../Modal/Modal";
import styles from "./DeleteConfirmModal.module.css";
import { useTranslation } from "react-i18next";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName?: string;
  isSubmitting?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  itemName,
  isSubmitting = false,
}: DeleteConfirmModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Trash2 size={20} />}
      title={title}
      footer={
        <>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t("deleteModal.cancel")}
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? t("deleteModal.deleting") : t("deleteModal.confirm")}
          </button>
        </>
      }
    >
      <div className={styles.container}>
        <p className={styles.warningText}>
          {t("deleteModal.warningText")}{" "}
          {itemName ? <strong>"{itemName}"</strong> : t("deleteModal.thisItem")}
          ? {t("deleteModal.actionUndone")}
        </p>
      </div>
    </Modal>
  );
}
