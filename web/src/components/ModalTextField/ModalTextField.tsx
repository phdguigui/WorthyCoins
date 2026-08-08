import React from "react";
import styles from "../Modal/ModalFields.module.css";

interface ModalTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean | string;
}

export const ModalTextField = React.forwardRef<HTMLInputElement, ModalTextFieldProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className={styles.field}>
        <p className={styles.label}>{label}</p>
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          type="text"
          {...props}
        />
      </div>
    );
  }
);

ModalTextField.displayName = "ModalTextField";
