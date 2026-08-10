import { useState } from "react";
import { MoreOptions } from "../MoreOptions/MoreOptions";
import styles from "./Task.module.css";
import { Calendar, Coins, Check, X } from "lucide-react";
import {
  getUserTaskStatusLabel,
  getUserTaskStatusIcon,
  getUserTaskStatusColor,
  UserTaskStatusEnum,
  type UserTask,
} from "../../api/types";
import { getIconElement } from "../../utils/icons";
import { formatShortDate } from "../../utils/date";
import { getTaskIcon } from "../TaskModal/TaskIconPicker";

export function Task({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  task: UserTask;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: () => void;
}) {
  const [isRewardHovered, setIsRewardHovered] = useState(false);
  const isCompleted = task.status === UserTaskStatusEnum.Completed;
  const taskColor = isCompleted ? "#21c45d" : task.color || "#218f26";
  const taskIconName = task.icon || "Sparkles";
  const taskBgColor = isCompleted
    ? "#21c45d26"
    : taskColor.startsWith("#") && taskColor.length === 7
      ? `${taskColor}20`
      : taskColor;

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const taskDueDate = task.dueDate ? new Date(task.dueDate) : null;
  if (taskDueDate) {
    taskDueDate.setHours(0, 0, 0, 0);
  }

  const isOverdue =
    task.status === UserTaskStatusEnum.Pending &&
    taskDueDate &&
    taskDueDate.getTime() < todayDate.getTime();

  const statusLabel = isOverdue
    ? "Overdue"
    : getUserTaskStatusLabel(task.status);
  const statusIcon = isOverdue
    ? "AlertTriangle"
    : getUserTaskStatusIcon(task.status);
  const statusColor = isOverdue
    ? "#dc2626"
    : getUserTaskStatusColor(task.status);

  return (
    <div
      className={styles.mainContainer}
      style={isCompleted ? { backgroundColor: "#21c45d0d" } : undefined}
    >
      <button
        onClick={onToggleStatus}
        className={`${styles.checkbox} ${isCompleted ? styles.checkboxCompleted : ""}`}
        aria-label={isCompleted ? "Mark task as pending" : "Mark task as completed"}
      >
        {isCompleted && <Check size={14} strokeWidth={3} />}
      </button>
      <div className={styles.iconContainer}>
        <div
          className={styles.icon}
          style={{
            color: taskColor,
            backgroundColor: taskBgColor,
          }}
        >
          {getTaskIcon(taskIconName, 25)}
        </div>
      </div>
      <div className={styles.content}>
        <p
          className={styles.taskName}
          style={
            isCompleted
              ? { textDecoration: "line-through", color: "#65758b" }
              : undefined
          }
        >
          {task.title}
        </p>
        <p className={styles.taskDescription}>{task.description}</p>
        <div className={styles.furtherInformations}>
          <span>{task.assignedChild?.name}</span>
          <span className={styles.dateContainer}>
            <Calendar size={14} />
            {task.dueDate ? formatShortDate(task.dueDate) : "No due date"}
          </span>
          <span
            className={styles.statusContainer}
            style={{ color: statusColor }}
          >
            {getIconElement(statusIcon, 14)}
            {statusLabel}
          </span>
        </div>
      </div>
      <button
        className={styles.reward}
        onClick={onToggleStatus}
        onMouseEnter={() => setIsRewardHovered(true)}
        onMouseLeave={() => setIsRewardHovered(false)}
        aria-label={isCompleted ? "Mark task as pending" : "Mark task as completed"}
      >
        {isCompleted ? (
          isRewardHovered ? (
            <X size={18} strokeWidth={2.5} />
          ) : (
            <Check size={18} strokeWidth={2.5} />
          )
        ) : isRewardHovered ? (
          <Check size={18} strokeWidth={2.5} />
        ) : (
          <Coins size={18} strokeWidth={1.5} />
        )}
        <span>{task.rewardAmount.toFixed(2)}</span>
      </button>
      <div className={styles.moreOptions}>
        <MoreOptions onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
