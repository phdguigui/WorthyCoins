import styles from "./Child.module.css";

export function ChildSkeleton() {
  return (
    <div className={styles.mainContainer}>
      <div className={`${styles.skeleton} ${styles.skeletonMore}`} />

      <div className={styles.avatarContainer}>
        <div className={`${styles.skeleton} ${styles.skeletonAvatar}`} />
      </div>

      <div className={styles.content}>
        <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
        <div className={`${styles.skeleton} ${styles.skeletonInfo}`} />
      </div>

      <div className={`${styles.skeleton} ${styles.skeletonReward}`} />
    </div>
  );
}
