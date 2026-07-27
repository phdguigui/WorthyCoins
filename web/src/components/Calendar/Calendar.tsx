import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./Calendar.module.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className = "",
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className={`${styles.calendar} ${className}`}>
      <DayPicker showOutsideDays={showOutsideDays} {...props} />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
