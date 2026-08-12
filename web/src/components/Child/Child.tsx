import { MoreOptions } from "../MoreOptions/MoreOptions";
import styles from "./Child.module.css";
import { Calendar, Coins, User } from "lucide-react";
import type { Child as ChildType } from "../../api/types";
import { useTranslation } from "react-i18next";

export function Child({
  child,
  onEdit,
  onDelete,
}: {
  child: ChildType;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const { t, i18n } = useTranslation();

  const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4"];
  const childColor = colors[child.id % colors.length];
  const childBgColor = `${childColor}20`; // Pastel transparency

  const birthDate = child.dateOfBirth ? new Date(child.dateOfBirth) : null;
  const birthDateStr = birthDate
    ? birthDate.toLocaleDateString(i18n.language === "en" ? "en-US" : "pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  return (
    <div className={styles.mainContainer}>
      <div className={styles.moreOptions}>
        <MoreOptions onEdit={onEdit} onDelete={onDelete} />
      </div>

      <div className={styles.avatarContainer}>
        <div
          className={styles.avatar}
          style={{
            color: childColor,
            backgroundColor: childBgColor,
          }}
        >
          <User size={36} strokeWidth={1.75} />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.childName}>{child.name}</p>
        <span className={styles.dateContainer}>
          <Calendar size={14} />
          <span>
            {t("children.birthDateLabel")} {birthDateStr}
          </span>
        </span>
      </div>

      <div className={styles.reward}>
        <Coins size={20} strokeWidth={1.5} />
        <span>{child.totalCoins.toFixed(2)}</span>
      </div>
    </div>
  );
}
