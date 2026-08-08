import apiClient from "./apiClient";
import type {
  ApiResponse,
  PagedResult,
  UserTask,
  UserTaskStatusEnum,
} from "./types";

export interface CreateUserTaskRequest {
  title: string;
  description?: string | null;
  dueDate?: Date | string | null;
  assignedChildId: number;
  rewardAmount: number;
  icon: string;
  color: string;
}

export async function getTasksByParentId(
  parentId: number,
  status: UserTaskStatusEnum | undefined,
  childId: number | undefined,
  dueDate: Date | string | undefined | null,
  pageNumber = 1,
  pageSize = 10,
  search?: string,
  dueDateSort?: string,
  filterType?: string,
): Promise<ApiResponse<PagedResult<UserTask>>> {
  let formattedDueDate = null;
  if (dueDate) {
    const d = typeof dueDate === "string" ? new Date(dueDate) : dueDate;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    formattedDueDate = `${year}-${month}-${day}`;
  }

  const response = await apiClient.get<ApiResponse<PagedResult<UserTask>>>(
    `/UserTask/${parentId}`,
    {
      params: {
        status,
        childId,
        dueDate: formattedDueDate,
        pageNumber,
        pageSize,
        search: search || null,
        dueDateSort: dueDateSort && dueDateSort !== "all" ? dueDateSort : null,
        filterType: filterType && filterType !== "all" ? filterType : null,
      },
    },
  );
  return response.data;
}

export async function createUserTask(
  request: CreateUserTaskRequest,
): Promise<ApiResponse<UserTask>> {
  const response = await apiClient.post<ApiResponse<UserTask>>(
    "/UserTask",
    request,
  );
  return response.data;
}
