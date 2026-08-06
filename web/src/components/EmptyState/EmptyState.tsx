import { type LucideIcon, Inbox } from "lucide-react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  message: string;
  description?: string;
  icon?: LucideIcon;
}

export function EmptyState({
  message,
  description,
  icon: Icon = Inbox,
}: EmptyStateProps) {
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <Icon size={36} strokeWidth={1.5} />
      </div>
      <h3 className={styles.message}>{message}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
