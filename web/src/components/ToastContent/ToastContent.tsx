import React from "react";

interface ToastContentProps {
  title: string;
  subtitle: string;
}

export function ToastContent({ title, subtitle }: ToastContentProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <strong style={{ fontWeight: 600, fontSize: "14px" }}>{title}</strong>
      <span style={{ fontSize: "12px", opacity: 0.9, marginTop: "2px" }}>
        {subtitle}
      </span>
    </div>
  );
}
