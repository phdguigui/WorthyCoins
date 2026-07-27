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
import { CategoriesFilter } from "../../components/CategoriesFilter/CategoriesFilter";

export function TaskPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChild, setSelectedChild] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const categories = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "approved", label: "Approved" },
    { value: "overdue", label: "Overdue" },
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
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
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
