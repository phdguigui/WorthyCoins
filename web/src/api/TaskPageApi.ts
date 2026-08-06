import apiClient from "./apiClient";
import type {
  ApiResponse,
  PagedResult,
  UserTask,
  UserTaskStatusEnum,
} from "./types";

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
