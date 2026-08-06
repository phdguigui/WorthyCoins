import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
  children,
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimatingOut(false);
    } else if (shouldRender) {
      setIsAnimatingOut(true);
    }
  }, [isOpen, shouldRender]);

  const handleAnimationEnd = () => {
    if (isAnimatingOut) {
      setShouldRender(false);
      setIsAnimatingOut(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.overlay} ${isAnimatingOut ? styles.fadeOut : ""}`}
      onClick={onClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={`${styles.modalContent} ${isAnimatingOut ? styles.scaleDown : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className={styles.header}>
          {icon && <div className={styles.headerIcon}>{icon}</div>}
          <div className={styles.headerTitle}>{title}</div>
          {subtitle && <div className={styles.headerSubtitle}>{subtitle}</div>}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
