import { useState } from "react";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import styles from "./MoreOptions.module.css";

interface MoreOptionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function MoreOptions({ onEdit, onDelete }: MoreOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setIsOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete?.();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className={styles.moreOptionsButton}>
          <EllipsisVertical size={20} strokeWidth={1.5} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className={styles.moreOptionsContent}>
        <div className={styles.moreOptionsContentItem} onClick={handleEdit}>
          <Pencil size={15} />
          <span className={styles.editButton}>Editar</span>
        </div>
        <div className={styles.moreOptionsContentItem} onClick={handleDelete}>
          <Trash size={15} color="#ef4343" />
          <span className={styles.deleteButton}>Excluir</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
