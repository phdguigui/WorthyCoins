import React from "react";
import styles from "../Modal/ModalFields.module.css";

interface ModalTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function ModalTextField({ label, ...props }: ModalTextFieldProps) {
  return (
    <div className={styles.field}>
      <p className={styles.label}>{label}</p>
      <input className={styles.input} type="text" {...props} />
    </div>
  );
}
