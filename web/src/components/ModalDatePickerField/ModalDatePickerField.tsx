import { DatePicker } from "../DatePicker/DatePicker";
import type { Locale } from "date-fns";
import styles from "../Modal/ModalFields.module.css";

interface ModalDatePickerFieldProps {
  label: string;
  date?: Date | undefined;
  setDate: (date?: Date) => void;
  placeholder?: string;
  locale?: Locale;
}

export function ModalDatePickerField({
  label,
  date,
  setDate,
  placeholder,
  locale,
}: ModalDatePickerFieldProps) {
  return (
    <div className={styles.field}>
      <p className={styles.label}>{label}</p>
      <DatePicker
        date={date}
        setDate={setDate}
        placeholder={placeholder}
        locale={locale}
        className={styles.input}
      />
    </div>
  );
}
