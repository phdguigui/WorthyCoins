import { MoreOptions } from "../MoreOptions/MoreOptions";
import styles from "./Task.module.css";
import { Calendar, Coins } from "lucide-react";
import {
  getUserTaskStatusLabel,
  getUserTaskStatusIcon,
  getUserTaskStatusColor,
  type UserTask,
} from "../../api/types";
import { getIconElement } from "../../utils/icons";
import { formatShortDate } from "../../utils/date";
import { getTaskIcon } from "../TaskModal/TaskIconPicker";

export function Task({ task }: { task: UserTask }) {
  const taskColor = task.color || "#218f26";
  const taskIconName = task.icon || "Sparkles";
  const taskBgColor =
    taskColor.startsWith("#") && taskColor.length === 7
      ? `${taskColor}20`
      : taskColor;

  return (
    <div className={styles.mainContainer}>
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
        <p className={styles.taskName}>{task.title}</p>
        <p className={styles.taskDescription}>{task.description}</p>
        <div className={styles.furtherInformations}>
          <span>{task.assignedChild?.name}</span>
          <span className={styles.dateContainer}>
            <Calendar size={14} />
            {formatShortDate(task.dueDate)}
          </span>
          <span
            className={styles.statusContainer}
            style={{ color: getUserTaskStatusColor(task.status) }}
          >
            {getIconElement(getUserTaskStatusIcon(task.status), 14)}
            {getUserTaskStatusLabel(task.status)}
          </span>
        </div>
      </div>
      <div className={styles.reward}>
        <Coins size={18} strokeWidth={1.5} />
        <span>{task.rewardAmount.toFixed(2)}</span>
      </div>
      <div className={styles.moreOptions}>
        <MoreOptions />
      </div>
    </div>
  );
}
