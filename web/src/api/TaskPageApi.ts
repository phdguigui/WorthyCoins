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
  dueDate: Date | undefined | null,
  pageNumber = 1,
  pageSize = 10,
): Promise<ApiResponse<PagedResult<UserTask>>> {
  const response = await apiClient.get<ApiResponse<PagedResult<UserTask>>>(
    `/UserTask/${parentId}`,
    {
      params: {
        status,
        childId,
        dueDate: dueDate ?? null,
        pageNumber,
        pageSize,
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
