import { MoreOptions } from "../MoreOptions/MoreOptions";
import styles from "./Task.module.css";
import { Calendar, Coins, Star } from "lucide-react";
import { getUserTaskStatusLabel, type UserTask } from "../../api/types";

import { formatShortDate } from "../../utils/date";

export function Task({ task }: { task: UserTask }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <Star fill="#e1f7d2" size={25} />
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
          <span>{getUserTaskStatusLabel(task.status)}</span>
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
