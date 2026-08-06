import React from "react";
import styles from "../Modal/ModalFields.module.css";

export interface ModalNumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export function ModalNumberField({ label, icon, onKeyDown, ...props }: ModalNumberFieldProps) {
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
            className={`${styles.input} ${styles.inputWithIcon}`}
            type="number"
            min={0}
            onKeyDown={handleKeyDown}
            {...props}
          />
          <div className={styles.inputIcon}>{icon}</div>
        </div>
      ) : (
        <input
          className={styles.input}
          type="number"
          min={0}
          onKeyDown={handleKeyDown}
          {...props}
        />
      )}
    </div>
  );
}
