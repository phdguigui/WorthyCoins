import styles from "./TaskIconPicker.module.css";
import styleModalField from "../Modal/ModalFields.module.css";
import {
  BookOpen,
  BrushCleaning,
  Bubbles,
  Cat,
  Dog,
  Fish,
  GraduationCap,
  Heart,
  Languages,
  Music,
  Sparkles,
  Sprout,
  Star,
  TowelRack,
  Trash,
  Trophy,
} from "lucide-react";

export const TASK_ICONS = [
  { value: "Sparkles", icon: <Sparkles size={20} /> },
  { value: "Trash", icon: <Trash size={20} /> },
  { value: "Dog", icon: <Dog size={20} /> },
  { value: "Cat", icon: <Cat size={20} /> },
  { value: "Fish", icon: <Fish size={20} /> },
  { value: "Star", icon: <Star size={20} /> },
  { value: "Trophy", icon: <Trophy size={20} /> },
  { value: "Heart", icon: <Heart size={20} /> },
  { value: "Music", icon: <Music size={20} /> },
  { value: "BookOpen", icon: <BookOpen size={20} /> },
  { value: "Bubbles", icon: <Bubbles size={20} /> },
  { value: "TowelRack", icon: <TowelRack size={20} /> },
  { value: "BrushCleaning", icon: <BrushCleaning size={20} /> },
  { value: "GraduationCap", icon: <GraduationCap size={20} /> },
  { value: "Languages", icon: <Languages size={20} /> },
  { value: "Sprout", icon: <Sprout size={20} /> },
];

interface TaskIconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskIconPicker({ value, onChange }: TaskIconPickerProps) {
  return (
    <div className={styles.iconPicker}>
      <p className={styleModalField.label}>CHOOSE AN ICON</p>
      <div className={styles.iconsGrid}>
        {TASK_ICONS.map((item) => (
          <div
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`${styles.iconWrapper} ${
              value === item.value ? styles.selected : ""
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
