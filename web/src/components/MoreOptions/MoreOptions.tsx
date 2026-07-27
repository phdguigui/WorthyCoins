import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import styles from "./MoreOptions.module.css";

export function MoreOptions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className={styles.moreOptionsButton}>
          <EllipsisVertical size={20} strokeWidth={1.5} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className={styles.moreOptionsContent}>
        <div className={styles.moreOptionsContentItem}>
          <Pencil size={15} />
          <span className={styles.editButton}>Editar</span>
        </div>
        <div className={styles.moreOptionsContentItem}>
          <Trash size={15} color="#ef4343" />
          <span className={styles.deleteButton}>Excluir</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
