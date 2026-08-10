import type { ReactNode } from "react";
import styles from "./Tooltip.module.css";

interface TooltipProps {
  content?: string;
  children: ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <span className={styles.tooltipText}>{content}</span>
    </div>
  );
}
