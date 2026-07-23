import { useEffect, useState } from "react";
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
import { getSidebarInformation } from "../../api/GeneralInformationApi";
import { getTokenData } from "../../utils/auth";
import { createClient } from "@supabase/supabase-js";

export function Sidebar() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [avatarUrl, setAvatarUrl] = useState<string | null>("");

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const userInfo = getTokenData();

    const { data: avatarData } = supabase.storage
      .from("Profile images")
      .getPublicUrl(`${userInfo?.sub}.jpeg`);

    setAvatarUrl(avatarData.publicUrl);

    getSidebarInformation(userInfo?.sub!).then((res) => {
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setTotalBalance(res.data.totalBalance);
    });
  }, []);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topSection}>
        <div className={styles.logoIcon}>
          <img
            className={styles.logo}
            src="/logo.png"
            alt="logo-icon"
            width={35}
            height={35}
          />
          <span>WorthyCoins</span>
        </div>
        <div className={styles.savingsContainer}>
          <div className={styles.totalWorthyCoinsContainer}>
            <div className={styles.totalWorthyCoinsHeader}>
              <span className={styles.totalWorthyCoinsLabel}>Total</span>
              <div className={styles.savingsIcon}>
                <Coins size={20} strokeWidth={1.5} />
              </div>
            </div>
            <div className={styles.totalWorthyCoinsValueContainer}>
              <span className={styles.totalWorthyCoinsValue}>
                {totalBalance}
              </span>
              <span className={styles.totalWorthyCoinsCurrency}>WC</span>
            </div>
          </div>
        </div>
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
          <span className={styles.label}>Configurações</span>
        </div>
        <div className={styles.navItem}>
          <Bell size={20} strokeWidth={1.8} />
          <span className={styles.label}>Notificações</span>
        </div>
        <div className={styles.user}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              width={30}
              height={30}
              alt="avatar"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.userLetters}>
              {firstName[0]}
              {lastName[0]}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
