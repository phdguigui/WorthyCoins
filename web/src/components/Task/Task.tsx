import styles from "./Task.module.css";
import { Coins, Star, EllipsisVertical } from "lucide-react";

export function Task() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <Star fill="#e1f7d2" size={25} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.taskName}>Clean Room</p>
        <p className={styles.taskDescription}>
          Tidy up and make the bed, put your toys in the box
        </p>
        <div className={styles.furtherInformations}>
          <span>Leo</span>
          <span>Mar 4</span>
          <span>Pending</span>
        </div>
      </div>
      <div className={styles.reward}>
        <Coins size={18} strokeWidth={1.5} />
        <span>5.00</span>
      </div>
      <div className={styles.moreOptions}>
        <EllipsisVertical size={20} strokeWidth={1.5} />
      </div>
    </div>
  );
}
