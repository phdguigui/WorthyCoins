import { Trash2 } from "lucide-react";
import { Modal } from "../Modal/Modal";
import styles from "./DeleteConfirmModal.module.css";

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
            Cancelar
          </button>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Excluindo..." : "Confirmar Exclusão"}
          </button>
        </>
      }
    >
      <div className={styles.container}>
        <p className={styles.warningText}>
          Deseja realmente excluir{" "}
          {itemName ? <strong>"{itemName}"</strong> : "este item"}? Esta ação
          não poderá ser desfeita.
        </p>
      </div>
    </Modal>
  );
}
