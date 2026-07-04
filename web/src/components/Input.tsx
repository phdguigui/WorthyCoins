import React, { forwardRef } from "react";
import "./Input.css";

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
    return (
      <>
        {label && (
          <label htmlFor={id}>
            {label ?? "Password"}
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
