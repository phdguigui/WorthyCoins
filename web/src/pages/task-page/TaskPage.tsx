import { useEffect, useState } from "react";
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
import { UserTaskStatusEnum, type UserTask } from "../../api/types";
import { getTokenData } from "../../utils/auth";
import { getTasksByParentId } from "../../api/TaskPageApi";

export function TaskPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    UserTaskStatusEnum | undefined
  >(undefined);
  const [selectedChild, setSelectedChild] = useState<number | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [tasks, setTasks] = useState<UserTask[]>([]);

  useEffect(() => {
    const userInfo = getTokenData();

    if (userInfo!.parentId) {
      getTasksByParentId(
        userInfo!.parentId!,
        selectedCategory,
        selectedChild,
        selectedDate,
      ).then((res) => {
        setTasks(res.data);
      });
    }
  }, [selectedCategory, selectedChild, selectedDate]);

  const categories = [
    { value: undefined, label: "All" },
    { value: UserTaskStatusEnum.NotStarted, label: "Pending" },
    { value: UserTaskStatusEnum.Completed, label: "Completed" },
    {
      value: UserTaskStatusEnum.WaitingForApproval,
      label: "Waiting for Approval",
    },
    { value: UserTaskStatusEnum.Overdue, label: "Overdue" },
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
          <Select
            value={selectedChild !== undefined ? String(selectedChild) : "all"}
            onValueChange={(val) =>
              setSelectedChild(val === "all" ? undefined : Number(val))
            }
          >
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
      {tasks?.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
