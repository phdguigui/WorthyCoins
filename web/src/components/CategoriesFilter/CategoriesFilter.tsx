import styles from "./CategoriesFilter.module.css";

interface CategoriesFilterProps {
  categories: { value: any; label: string }[];
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
          onClick={() => onSelectCategory(category.value)}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
}
