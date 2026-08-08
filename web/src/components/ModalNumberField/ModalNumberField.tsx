import React from "react";
import styles from "../Modal/ModalFields.module.css";

export interface ModalNumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: boolean | string;
}

export const ModalNumberField = React.forwardRef<HTMLInputElement, ModalNumberFieldProps>(
  ({ label, icon, onKeyDown, error, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "-" || e.key === "e") {
        e.preventDefault();
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <div className={styles.field}>
        <p className={styles.label}>{label}</p>
        {icon ? (
          <div className={styles.inputWrapper}>
            <input
              ref={ref}
              className={`${styles.input} ${styles.inputWithIcon} ${error ? styles.inputError : ""}`}
              type="number"
              min={0}
              onKeyDown={handleKeyDown}
              {...props}
            />
            <div className={styles.inputIcon}>{icon}</div>
          </div>
        ) : (
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            type="number"
            min={0}
            onKeyDown={handleKeyDown}
            {...props}
          />
        )}
      </div>
    );
  }
);

ModalNumberField.displayName = "ModalNumberField";
