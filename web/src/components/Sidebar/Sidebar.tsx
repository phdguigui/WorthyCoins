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
        <div className={styles.navItem}>
          <Home size={20} strokeWidth={1.8} />
          <span className={styles.label}>Início</span>
        </div>
        <div className={styles.navItem}>
          <ListChecks size={20} strokeWidth={1.8} />
          <span className={styles.label}>Tarefas</span>
        </div>
        <div className={styles.navItem}>
          <Baby size={20} strokeWidth={1.8} />
          <span className={styles.label}>Crianças</span>
        </div>
        <div className={styles.navItem}>
          <Gift size={20} strokeWidth={1.8} />
          <span className={styles.label}>Prêmios</span>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.navItem}>
          <Settings size={20} strokeWidth={1.8} />
          <span className={styles.label}>Conexões</span>
        </div>
        <div className={styles.navItem}>
          <Bell size={20} strokeWidth={1.8} />
          <span className={styles.label}>Notificações</span>
        </div>
        <div className={styles.user}></div>
      </div>
    </aside>
  );
}
