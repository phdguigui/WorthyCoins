import styles from "./CreateEntityButton.module.css";

interface CreateEntityButtonProps {
  buttonText: string;
  buttonAction: () => void;
}

export function CreateEntityButton({
  buttonText,
  buttonAction,
}: CreateEntityButtonProps) {
  return (
    <button className={styles.createEntityButton} onClick={buttonAction}>
      {buttonText}
    </button>
  );
}
