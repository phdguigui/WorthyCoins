interface ToastContentProps {
  title: string;
  description: string;
}

export function ToastContent({ title, description }: ToastContentProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ fontWeight: "bold" }}>{title}</span>
      <span style={{ fontSize: "12px", opacity: 0.8 }}>{description}</span>
    </div>
  );
}
