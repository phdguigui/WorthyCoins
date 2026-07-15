import {
  Coins,
  Home,
  ListChecks,
  Baby,
  Gift,
  Settings,
  Bell,
} from "lucide-react";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoIcon}>
        <img
          className={styles.logo}
          src="/logo.png"
          alt="logo-icon"
          width={35}
          height={35}
        />
      </div>
      <div className={styles.savings}>
        <Coins size={20} strokeWidth={1.5} />
      </div>
      <div className={styles.navigation}>
        <Home size={20} strokeWidth={1.8} />
        <ListChecks size={20} strokeWidth={1.8} />
        <Baby size={20} strokeWidth={1.8} />
        <Gift size={20} strokeWidth={1.8} />
      </div>
      <div className={styles.footer}>
        <Settings size={20} strokeWidth={1.8} />
        <Bell size={20} strokeWidth={1.8} />
        <div className={styles.user}></div>
      </div>
    </aside>
  );
}
