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
  Music,
  Sparkles,
  Sprout,
  Trash,
  Trophy,
} from "lucide-react";

export function getTaskIcon(iconName: string, size = 20): React.ReactNode {
  switch (iconName) {
    case "Sparkles":
      return <Sparkles size={size} />;
    case "Trash":
      return <Trash size={size} />;
    case "Dog":
      return <Dog size={size} />;
    case "Cat":
      return <Cat size={size} />;
    case "Fish":
      return <Fish size={size} />;
    case "Trophy":
      return <Trophy size={size} />;
    case "Music":
      return <Music size={size} />;
    case "BookOpen":
      return <BookOpen size={size} />;
    case "Bubbles":
      return <Bubbles size={size} />;
    case "BrushCleaning":
      return <BrushCleaning size={size} />;
    case "GraduationCap":
      return <GraduationCap size={size} />;
    case "Sprout":
      return <Sprout size={size} />;
    default:
      return <Sparkles size={size} />;
  }
}

export const TASK_ICONS = [
  { value: "Sparkles", icon: <Sparkles size={20} /> },
  { value: "Trash", icon: <Trash size={20} /> },
  { value: "Dog", icon: <Dog size={20} /> },
  { value: "Cat", icon: <Cat size={20} /> },
  { value: "Fish", icon: <Fish size={20} /> },
  { value: "Trophy", icon: <Trophy size={20} /> },
  { value: "Music", icon: <Music size={20} /> },
  { value: "BookOpen", icon: <BookOpen size={20} /> },
  { value: "Bubbles", icon: <Bubbles size={20} /> },
  { value: "BrushCleaning", icon: <BrushCleaning size={20} /> },
  { value: "GraduationCap", icon: <GraduationCap size={20} /> },
  { value: "Sprout", icon: <Sprout size={20} /> },
];

import { HexColorPicker } from "react-colorful";

interface TaskIconPickerProps {
  value: string;
  onChange: (value: string) => void;
  color: string;
  onChangeColor: (color: string) => void;
}

export function TaskIconPicker({
  value,
  onChange,
  color,
  onChangeColor,
}: TaskIconPickerProps) {
  const selectedBgColor =
    color.startsWith("#") && color.length === 7 ? `${color}40` : color;
  const unselectedBgColor =
    color.startsWith("#") && color.length === 7 ? `${color}14` : color;

  return (
    <div className={styles.iconPicker}>
      <p className={styleModalField.label}>CHOOSE AN ICON & COLOR</p>
      <div className={styles.pickerContainer}>
        <div className={styles.colorPickerWrapper}>
          <HexColorPicker color={color} onChange={onChangeColor} />
          <div className={styles.colorInputContainer}>
            <span className={styles.hashPrefix}>#</span>
            <input
              type="text"
              className={styles.colorInput}
              value={color.replace("#", "").toUpperCase()}
              onChange={(e) => {
                const hex = e.target.value;
                if (/^[0-9A-Fa-f]{0,6}$/.test(hex)) {
                  onChangeColor(`#${hex}`);
                }
              }}
              maxLength={6}
            />
          </div>
        </div>
        <div className={styles.iconsGrid}>
          {TASK_ICONS.map((item) => {
            const isSelected = value === item.value;
            return (
              <div
                key={item.value}
                onClick={() => onChange(item.value)}
                className={`${styles.iconWrapper} ${
                  isSelected ? styles.selected : ""
                }`}
                style={{
                  color: color,
                  backgroundColor: isSelected
                    ? selectedBgColor
                    : unselectedBgColor,
                  border: isSelected
                    ? `2px solid ${color}`
                    : "2px solid transparent",
                }}
              >
                {item.icon}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
