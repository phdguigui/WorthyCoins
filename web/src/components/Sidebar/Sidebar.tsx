import { useEffect, useState } from "react";
import {
  Coins,
  Home,
  ListChecks,
  Baby,
  Gift,
  Settings,
  Bell,
  DoorOpen,
  Globe,
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { getSidebarInformation } from "../../api/GeneralInformationApi";
import { getTokenData } from "../../utils/auth";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [avatarUrl, setAvatarUrl] = useState<string | null>("");
  const [hasImageError, setHasImageError] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const userInfo = getTokenData();

    if (userInfo?.sub) {
      const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/Profile%20images/${userInfo.sub}.jpeg`;
      setAvatarUrl(publicUrl);

      getSidebarInformation(userInfo.sub).then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setTotalBalance(res.data.totalBalance);
      });
    }
  }, []);

  useEffect(() => {
    setHasImageError(false);
  }, [avatarUrl]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Cookies.remove("token");
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

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
          <span>{t("sidebar.logoTitle")}</span>
        </div>
        <div className={styles.savingsContainer}>
          <div className={styles.totalWorthyCoinsContainer}>
            <div className={styles.totalWorthyCoinsHeader}>
              <span className={styles.totalWorthyCoinsLabel}>{t("sidebar.total")}</span>
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
        <div
          className={`${styles.navItem} ${location.pathname === "/" ? styles.active : ""}`}
          onClick={() => navigate("/")}
        >
          <Home size={20} strokeWidth={1.8} />
          <span className={styles.label}>{t("sidebar.home")}</span>
        </div>
        <div
          className={`${styles.navItem} ${location.pathname === "/tasks" ? styles.active : ""}`}
          onClick={() => navigate("/tasks")}
        >
          <ListChecks size={20} strokeWidth={1.8} />
          <span className={styles.label}>{t("sidebar.tasks")}</span>
        </div>
        <div className={styles.navItem}>
          <Baby size={20} strokeWidth={1.8} />
          <span className={styles.label}>{t("sidebar.children")}</span>
        </div>
        <div className={styles.navItem}>
          <Gift size={20} strokeWidth={1.8} />
          <span className={styles.label}>{t("sidebar.rewards")}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.navItem} onClick={toggleLanguage}>
          <Globe size={20} strokeWidth={1.8} />
          <span className={styles.label}>
            {i18n.language === "en" ? "Português" : "English"}
          </span>
        </div>
        <div className={styles.navItem}>
          <Settings size={20} strokeWidth={1.8} />
          <span className={styles.label}>{t("sidebar.settings")}</span>
        </div>
        <div className={styles.navItem}>
          <Bell size={20} strokeWidth={1.8} />
          <span className={styles.label}>{t("sidebar.notifications")}</span>
        </div>
        <div
          className={styles.userSection}
          onClick={() => navigate("/profile")}
        >
          <div className={styles.userContainer}>
            <div className={styles.user}>
              {avatarUrl && !hasImageError ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className={styles.avatar}
                  onError={() => setHasImageError(true)}
                />
              ) : (
                <div className={styles.userLetters}>
                  {(firstName && firstName[0]) || ""}
                  {(lastName && lastName[0]) || ""}
                </div>
              )}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                {firstName} {lastName}
              </span>
              <span className={styles.viewProfile}>{t("sidebar.viewProfile")}</span>
            </div>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
              title={t("sidebar.logoutTitle")}
            >
              <DoorOpen size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
