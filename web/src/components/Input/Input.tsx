import React, { forwardRef } from "react";
import "./Input.css";
import { useTranslation } from "react-i18next";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: React.ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, required, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && <span className="required-asterisk">*</span>}
          </label>
        )}
        <input
          className={error ? "input-error" : ""}
          type="text"
          id={id}
          ref={ref}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </>
    );
  },
);

TextInput.displayName = "TextInput";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, required, ...props }, ref) => {
    const { t } = useTranslation();
    return (
      <>
        {label && (
          <label htmlFor={id}>
            {label ?? t("login.passwordLabel")}
            {required && <span className="required-asterisk">*</span>}
          </label>
        )}
        <input
          className={error ? "input-error" : ""}
          type="password"
          id={id}
          ref={ref}
          {...props}
        />
        {error && <span className="error-message">{error}</span>}
      </>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
