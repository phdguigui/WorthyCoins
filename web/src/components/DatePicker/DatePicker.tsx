import { format } from "date-fns";
import type { Locale } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Calendar } from "../Calendar/Calendar";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  date?: Date | undefined;
  setDate: (date?: Date) => void;
  placeholder?: string;
  locale?: Locale;
}

export function DatePicker({
  date,
  setDate,
  placeholder = "Pick a date",
  locale,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`${styles.trigger} ${!date ? styles.placeholder : ""}`}
        >
          <CalendarIcon className={styles.icon} size={16} />
          <span>{date ? format(date, "PPP", { locale }) : placeholder}</span>
          {date && (
            <span
              className={styles.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                setDate(undefined);
              }}
              title="Limpar data"
            >
              <X size={14} />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className={styles.content}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}
