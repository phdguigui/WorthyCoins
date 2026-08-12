import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Construction } from "lucide-react";
import styles from "./UnderConstruction.module.css";

export function UnderConstruction() {
  const { t } = useTranslation();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return t("sidebar.home");
      case "/children":
        return t("sidebar.children");
      case "/rewards":
        return t("sidebar.rewards");
      case "/settings":
        return t("sidebar.settings");
      case "/notifications":
        return t("sidebar.notifications");
      case "/profile":
        return t("sidebar.viewProfile");
      default:
        return t("underConstruction.title");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Construction size={24} className={styles.icon} />
          <span className={styles.squareText}>{getPageTitle()}</span>
        </div>
        <h1 className={styles.title}>{t("underConstruction.title")}</h1>
        <p className={styles.description}>
          {t("underConstruction.description")}
        </p>
        {/* <button className={styles.backButton} onClick={() => navigate("/")}>
          <ArrowLeft size={18} />
          <span>{t("underConstruction.backHome")}</span>
        </button> */}
      </div>
    </div>
  );
}
