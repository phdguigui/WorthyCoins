import { useState } from "react";
import styles from "./TaskPage.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select/Select";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { ptBR } from "date-fns/locale";
import { Task } from "../../components/Task/Task";
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";

export function TaskPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const categories = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
    { id: "approved", label: "Approved" },
    { id: "overdue", label: "Overdue" },
  ];

  const childrenOptions = [
    { id: "all", name: "All Children" },
    { id: "pedro", name: "Pedro" },
    { id: "sofia", name: "Sofia" },
  ];

  return (
    <div className={styles.mainContainer}>
      <HeaderPage
        title="Quest Board"
        description="Create and manage tasks for your children."
        buttonText="+ New Task"
        buttonAction={() => {}}
      />
      <div className={styles.filters}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${styles.filterCategory} ${
                selectedCategory === category.id
                  ? styles.filterCategorySelected
                  : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </div>
          ))}
        </div>
        <div className={styles.childrenFilter}>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger>
              <SelectValue placeholder="Select a child" />
            </SelectTrigger>
            <SelectContent>
              {childrenOptions.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  {child.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className={styles.dateFilter}>
          <DatePicker
            date={selectedDate}
            setDate={setSelectedDate}
            placeholder="Filtrar por data"
            locale={ptBR}
          />
        </div>
      </div>
      <Task />
    </div>
  );
}
