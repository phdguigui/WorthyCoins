import styles from "./Task.module.css";

export function TaskSkeleton() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.iconContainer}>
        <div className={`${styles.icon} ${styles.skeleton}`} style={{ backgroundColor: "#f3f4f6" }} />
      </div>
      <div className={styles.content}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonDescription}`} />
        <div className={styles.skeletonInfoGroup}>
          <div className={`${styles.skeleton} ${styles.skeletonInfo}`} style={{ width: "90px" }} />
          <div className={`${styles.skeleton} ${styles.skeletonInfo}`} style={{ width: "70px" }} />
          <div className={`${styles.skeleton} ${styles.skeletonInfo}`} style={{ width: "80px" }} />
        </div>
      </div>
      <div className={`${styles.skeleton} ${styles.skeletonReward}`} />
      <div className={`${styles.skeleton} ${styles.skeletonMore}`} />
    </div>
  );
}
