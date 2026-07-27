import { CreateEntityButton } from "../CreateEntityButton/CreateEntityButton";
import styles from "./HeaderPage.module.css";

interface HeaderPageProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export function HeaderPage({
  title,
  description,
  buttonText,
  buttonAction,
}: HeaderPageProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitles}>
        <p className={styles.mainTitle}>{title}</p>
        <p className={styles.subtitle}>{description}</p>
      </div>
      {buttonText && buttonAction && (
        <CreateEntityButton
          buttonText={buttonText}
          buttonAction={buttonAction}
        />
      )}
    </div>
  );
}
