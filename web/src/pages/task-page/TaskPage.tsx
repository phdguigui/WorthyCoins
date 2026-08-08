import { useEffect, useState, useRef } from "react";
import styles from "./TaskPage.module.css";
import { DatePicker } from "../../components/DatePicker/DatePicker";
import { ptBR } from "date-fns/locale";
import { Task } from "../../components/Task/Task";
import { TaskSkeleton } from "../../components/Task/TaskSkeleton";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Pagination } from "../../components/Pagination/Pagination";
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { type UserTask, type Child } from "../../api/types";
import { getTokenData } from "../../utils/auth";
import { getTasksByParentId, deleteUserTask } from "../../api/TaskPageApi";
import { getChildrenByParentId } from "../../api/ChildApi";
import { InfiniteSelect } from "../../components/Select/InfiniteSelect";
import { TaskModal } from "../../components/TaskModal/TaskModal";
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal/DeleteConfirmModal";

export function TaskPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("today_all");
  const [selectedChild, setSelectedChild] = useState<number | undefined>(
    undefined,
  );
  const [taskToEdit, setTaskToEdit] = useState<UserTask | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<UserTask | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [tasks, setTasks] = useState<UserTask[]>([]);
  const [tasksIsLoading, setTasksIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalTasks, setTotalTasks] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  // States for search and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [dueDateSort, setDueDateSort] = useState("all");

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
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const userInfo = getTokenData();

    if (userInfo?.parentId) {
      setTasksIsLoading(true);
      const dateFilter =
        selectedDate ||
        (selectedStatusFilter.startsWith("today_") ||
        selectedStatusFilter === "overdue"
          ? new Date()
          : undefined);

      getTasksByParentId(
        userInfo.parentId,
        undefined,
        selectedChild,
        dateFilter,
        page,
        pageSize,
        debouncedSearchQuery,
        dueDateSort,
        selectedStatusFilter,
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
  }, [
    selectedStatusFilter,
    selectedChild,
    selectedDate,
    page,
    pageSize,
    debouncedSearchQuery,
    dueDateSort,
    refreshKey,
  ]);

  const statusOptions = [
    { value: "today_all", label: "Today's tasks" },
    { value: "today_pending", label: "Today's pendings" },
    { value: "today_completed", label: "Today's completed" },
    { value: "all_pending", label: "All pendings" },
    { value: "all_completed", label: "All completed" },
    { value: "overdue", label: "Overdue" },
  ];

  const childrenSelectOptions = [
    { value: "all", label: "All Children" },
    ...children.map((child) => ({
      value: String(child.id),
      label: child.name,
    })),
  ];

  const handleEditTask = (task: UserTask) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (task: UserTask) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!taskToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteUserTask(taskToDelete.id);
      setRefreshKey((prev) => prev + 1);
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Failed to delete task", error);
      alert("Ocorreu um erro ao excluir a tarefa.");
    } finally {
      setIsDeleting(false);
    }
  };

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
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        childrenOptions={children.map((child) => ({
          value: String(child.id),
          label: child.name,
        }))}
        isLoadingChildren={childrenIsLoading}
        hasMoreChildren={childrenHasMore}
        onLoadMoreChildren={loadChildren}
        onTaskCreated={() => setRefreshKey((prev) => prev + 1)}
        taskToEdit={taskToEdit}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Excluir Tarefa"
        itemName={taskToDelete?.title}
        isSubmitting={isDeleting}
      />
      <div className={styles.filters}>
        <div className={styles.searchFilter}>
          <SearchInput
            placeholder="Filtrar por nome..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>

        <div className={styles.statusFilter}>
          <InfiniteSelect
            value={selectedStatusFilter}
            onValueChange={(val) => {
              setSelectedStatusFilter(val);
              setPage(1);
            }}
            placeholder="Filter by status"
            options={statusOptions}
          />
        </div>
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

        {!selectedStatusFilter.includes("today") ? (
          <div className={styles.dateFilter}>
            <DatePicker
              date={selectedDate}
              setDate={(date) => {
                setSelectedDate(date);
                setPage(1);
              }}
              placeholder="Filter by due date"
              locale={ptBR}
            />
          </div>
        ) : null}

        {!selectedStatusFilter.includes("today") ? (
          <div className={styles.sortFilter}>
            <InfiniteSelect
              value={dueDateSort}
              onValueChange={(val) => {
                setDueDateSort(val);
                setPage(1);
              }}
              placeholder="Order by due date"
              options={[
                { value: "all", label: "Default Order" },
                { value: "asc", label: "Mais recente" },
                { value: "desc", label: "Mais distante" },
              ]}
            />
          </div>
        ) : null}
      </div>
      {tasksIsLoading ? (
        Array.from({ length: pageSize }).map((_, index) => (
          <TaskSkeleton key={index} />
        ))
      ) : tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={() => handleEditTask(task)}
            onDelete={() => handleDeleteTask(task)}
          />
        ))
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
