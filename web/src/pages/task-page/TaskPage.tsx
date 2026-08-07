import { useEffect, useState, useRef } from "react";
import styles from "./TaskPage.module.css";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { ptBR } from "date-fns/locale";
import { Task } from "../../components/Task/Task";
import { TaskSkeleton } from "../../components/Task/TaskSkeleton";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Pagination } from "../../components/Pagination/Pagination";
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";
import { CategoriesFilter } from "../../components/CategoriesFilter/CategoriesFilter";
import {
  UserTaskStatusEnum,
  type UserTask,
  type Child,
  getUserTaskStatusLabel,
  getUserTaskStatusIcon,
  getUserTaskStatusColor,
} from "../../api/types";
import { getTokenData } from "../../utils/auth";
import { getTasksByParentId } from "../../api/TaskPageApi";
import { getChildrenByParentId } from "../../api/ChildApi";
import { InfiniteSelect } from "../../components/Select/InfiniteSelect";
import { TaskModal } from "../../components/TaskModal/TaskModal";

export function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    UserTaskStatusEnum | undefined
  >(undefined);
  const [selectedChild, setSelectedChild] = useState<number | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [tasksIsLoading, setTasksIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalTasks, setTotalTasks] = useState(0);

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

    if (userInfo?.parentId) {
      setTasksIsLoading(true);
      getTasksByParentId(
        userInfo.parentId,
        selectedCategory,
        selectedChild,
        selectedDate,
        page,
        pageSize,
      )
        .then((res) => {
          setTasks(res.data.items);
          setTotalTasks(res.data.totalItems);
        })
        .catch((error) => {
          console.error("Failed to load tasks", error);
        })
        .finally(() => {
          setTasksIsLoading(false);
        });
    } else {
      setTasksIsLoading(false);
    }
  }, [selectedCategory, selectedChild, selectedDate, page, pageSize]);

  const categories = [
    { value: undefined, label: "All", icon: "List", color: "#218f26" },
    ...[
      UserTaskStatusEnum.NotStarted,
      UserTaskStatusEnum.InProgress,
      UserTaskStatusEnum.WaitingForApproval,
      UserTaskStatusEnum.Overdue,
      UserTaskStatusEnum.Completed,
    ].map((status) => ({
      value: status,
      label: getUserTaskStatusLabel(status),
      icon: getUserTaskStatusIcon(status),
      color: getUserTaskStatusColor(status),
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
    setPage(1);
  };

  return (
    <div className={styles.mainContainer}>
      <HeaderPage
        title="Quest Board"
        description="Create and manage tasks for your children."
        buttonText="+ New Task"
        buttonAction={() => setIsModalOpen(true)}
      />
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        childrenOptions={children.map((child) => ({
          value: String(child.id),
          label: child.name,
        }))}
        isLoadingChildren={childrenIsLoading}
        hasMoreChildren={childrenHasMore}
        onLoadMoreChildren={loadChildren}
      />
      <div className={styles.filters}>
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setPage(1);
          }}
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
            setDate={(date) => {
              setSelectedDate(date);
              setPage(1);
            }}
            placeholder="Filter by date"
            locale={ptBR}
          />
        </div>
      </div>
      {tasksIsLoading ? (
        Array.from({ length: pageSize }).map((_, index) => (
          <TaskSkeleton key={index} />
        ))
      ) : tasks && tasks.length > 0 ? (
        tasks.map((task) => <Task key={task.id} task={task} />)
      ) : (
        <EmptyState
          message="Nenhuma tarefa encontrada"
          description="Tente ajustar os filtros ou criar uma nova tarefa para começar."
        />
      )}
      {!tasksIsLoading && tasks && tasks.length > 0 && (
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          totalItems={totalTasks}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
