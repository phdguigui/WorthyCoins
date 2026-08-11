import { useState } from "react";
import { format } from "date-fns";
import type { Locale } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import { Calendar } from "../Calendar/Calendar";
import styles from "./DatePicker.module.css";
import { useTranslation } from "react-i18next";

interface DatePickerProps {
  date?: Date | undefined;
  setDate: (date?: Date) => void;
  placeholder?: string;
  locale?: Locale;
  className?: string;
}

export function DatePicker({
  date,
  setDate,
  placeholder,
  locale,
  className = "",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setOpen(false);
  };

  const displayPlaceholder = placeholder || t("datepicker.placeholder");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`${styles.trigger} ${!date ? styles.placeholder : ""} ${className}`}
        >
          <CalendarIcon className={styles.icon} size={16} />
          <span>{date ? format(date, "PPP", { locale }) : displayPlaceholder}</span>
          {date && (
            <span
              className={styles.clearButton}
              onClick={(e) => {
                e.stopPropagation();
                setDate(undefined);
              }}
              title={t("datepicker.clear")}
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
          onSelect={handleSelect}
          locale={locale}
        />
      </PopoverContent>
    </Popover>
  );
}
