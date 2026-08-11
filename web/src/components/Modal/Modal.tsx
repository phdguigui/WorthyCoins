import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";
import { useTranslation } from "react-i18next";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  footer?: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  icon,
  title,
  subtitle,
  children,
  actionLabel,
  onAction,
  footer,
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const { t } = useTranslation();

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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.overlay} ${isAnimatingOut ? styles.fadeOut : ""}`}
      onClick={handleOverlayClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={`${styles.modalContent} ${isAnimatingOut ? styles.scaleDown : ""}`}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t("common.closeModal")}
        >
          <X size={20} />
        </button>
        <div className={styles.header}>
          {icon && <div className={styles.headerIcon}>{icon}</div>}
          <div className={styles.headerTitle}>{title}</div>
          {subtitle && <div className={styles.headerSubtitle}>{subtitle}</div>}
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>
          {footer ? (
            footer
          ) : (
            actionLabel && onAction && (
              <button
                className={styles.actionButton}
                onClick={onAction}
                type="button"
              >
                {icon && <span className={styles.buttonIcon}>{icon}</span>}
                <span>{actionLabel}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
