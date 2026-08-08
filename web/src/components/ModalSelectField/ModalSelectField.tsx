import { InfiniteSelect } from "../Select/InfiniteSelect";
import type { InfiniteSelectProps } from "../Select/InfiniteSelect";
import styles from "../Modal/ModalFields.module.css";

interface ModalSelectFieldProps extends Omit<InfiniteSelectProps, "className"> {
  label: string;
}

export function ModalSelectField({ label, ...props }: ModalSelectFieldProps) {
  return (
    <div className={styles.field}>
      <p className={styles.label}>{label}</p>
      <InfiniteSelect className={styles.selectTrigger} {...props} />
    </div>
  );
}
