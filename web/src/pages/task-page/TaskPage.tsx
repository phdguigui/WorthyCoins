import { useEffect, useState, useRef } from "react";
import styles from "./TaskPage.module.css";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { ptBR } from "date-fns/locale";
import { Task } from "../../components/Task/Task";
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";
import { CategoriesFilter } from "../../components/CategoriesFilter/CategoriesFilter";
import {
  UserTaskStatusEnum,
  type UserTask,
  type Child,
  getUserTaskStatusLabel,
} from "../../api/types";
import { getTokenData } from "../../utils/auth";
import { getTasksByParentId } from "../../api/TaskPageApi";
import { getChildrenByParentId } from "../../api/ChildApi";
import { InfiniteSelect } from "../../components/Select/InfiniteSelect";

export function TaskPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    UserTaskStatusEnum | undefined
  >(undefined);
  const [selectedChild, setSelectedChild] = useState<number | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [tasks, setTasks] = useState<UserTask[]>([]);

  // States for InfiniteSelect with backend API
  const [children, setChildren] = useState<Child[]>([]);
  const [childrenPage, setChildrenPage] = useState(1);
  const [childrenIsLoading, setChildrenIsLoading] = useState(false);
  const [childrenHasMore, setChildrenHasMore] = useState(true);
  const isLoadingRef = useRef(false);

  const loadChildren = async () => {
    if (childrenIsLoading || isLoadingRef.current || !childrenHasMore) return;

    const userInfo = getTokenData();
    if (!userInfo || !userInfo.parentId) return;

    isLoadingRef.current = true;
    setChildrenIsLoading(true);
    try {
      const res = await getChildrenByParentId(
        userInfo.parentId,
        childrenPage,
        10,
      );
      if (res.success && res.data) {
        const { items, totalItems } = res.data;
        setChildren((prev) => {
          const newItems = items.filter(
            (item) => !prev.some((p) => p.id === item.id),
          );
          const updated = [...prev, ...newItems];
          setChildrenHasMore(updated.length < totalItems);
          return updated;
        });
        setChildrenPage((prev) => prev + 1);
      } else {
        setChildrenHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load children options", error);
      setChildrenHasMore(false);
    } finally {
      setChildrenIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    const userInfo = getTokenData();

    if (userInfo!.parentId) {
      getTasksByParentId(
        userInfo!.parentId!,
        selectedCategory,
        selectedChild,
        selectedDate,
      ).then((res) => {
        setTasks(res.data.items);
      });
    }
  }, [selectedCategory, selectedChild, selectedDate]);

  const categories = [
    { value: undefined, label: "All", icon: "List", color: "#64748b" },
    ...[
      { value: UserTaskStatusEnum.NotStarted, icon: "Circle", color: "#2563eb" },
      { value: UserTaskStatusEnum.InProgress, icon: "Play", color: "#d97706" },
      { value: UserTaskStatusEnum.WaitingForApproval, icon: "Clock", color: "#7c3aed" },
      { value: UserTaskStatusEnum.Overdue, icon: "AlertTriangle", color: "#dc2626" },
      { value: UserTaskStatusEnum.Completed, icon: "CheckCircle2", color: "#16a34a" },
    ].map((item) => ({
      value: item.value,
      label: getUserTaskStatusLabel(item.value),
      icon: item.icon,
      color: item.color,
    })),
  ];

  const childrenSelectOptions = [
    { value: "all", label: "All Children" },
    ...children.map((child) => ({
      value: String(child.id),
      label: child.name,
    })),
  ];

  const selectedChildValue =
    selectedChild !== undefined ? String(selectedChild) : "all";

  const handleChildChange = (val: string) => {
    setSelectedChild(val === "all" ? undefined : Number(val));
  };

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
          <InfiniteSelect
            value={selectedChildValue}
            onValueChange={handleChildChange}
            placeholder="Select a child"
            options={childrenSelectOptions}
            isLoading={childrenIsLoading}
            hasMore={childrenHasMore}
            onLoadMore={loadChildren}
          />
        </div>

        <div className={styles.dateFilter}>
          <DatePicker
            date={selectedDate}
            setDate={setSelectedDate}
            placeholder="Filter by date"
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
