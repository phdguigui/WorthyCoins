import styles from "./CategoriesFilter.module.css";
import { getIconElement } from "../../utils/icons";

interface CategoriesFilterProps {
  categories: { value: any; label: string; icon: string; color?: string }[];
  selectedCategory: any;
  onSelectCategory: (category: any) => void;
}

export function CategoriesFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesFilterProps) {
  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <div
          key={category.value}
          className={`${styles.filterCategory} ${
            selectedCategory === category.value
              ? styles.filterCategorySelected
              : ""
          }`}
          style={
            selectedCategory === category.value && category.color
              ? { backgroundColor: category.color, color: "#fff", borderColor: category.color }
              : undefined
          }
          onClick={() => onSelectCategory(category.value)}
        >
          {getIconElement(category.icon, 14)}
          <span>{category.label}</span>
        </div>
      ))}
    </div>
  );
}
