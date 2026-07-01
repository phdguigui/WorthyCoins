import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function TextInput({ label, id, ...props }: InputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input type="text" id={id} {...props} />
    </>
  );
}

export function PasswordInput({ label, id, ...props }: InputProps) {
  return (
    <>
      {label && <label htmlFor={id}>{label ?? "Password"}</label>}
      <input type="password" id={id} {...props} />
    </>
  );
}
