import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, required, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor={id}>
            {label}
            {required && (
              <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            )}
          </label>
        )}
        <input type="text" id={id} ref={ref} {...props} />
        {error && (
          <span
            className="error-message"
            style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
          >
            {error}
          </span>
        )}
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
            {required && (
              <span style={{ color: "red", marginLeft: "2px" }}>*</span>
            )}
          </label>
        )}
        <input type="password" id={id} ref={ref} {...props} />
        {error && (
          <span
            className="error-message"
            style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
          >
            {error}
          </span>
        )}
      </>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
