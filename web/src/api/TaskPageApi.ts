import apiClient from "./apiClient";
import type { ApiResponse, UserTask, UserTaskStatusEnum } from "./types";

export async function getTasksByParentId(
  parentId: number,
  status: UserTaskStatusEnum | undefined,
  childId: number | undefined,
  dueDate: Date | undefined | null,
): Promise<ApiResponse<UserTask[]>> {
  const response = await apiClient.get<ApiResponse<UserTask[]>>(
    `/UserTask/${parentId}`,
    {
      params: {
        status,
        childId,
        dueDate: dueDate ?? null,
      },
    },
  );
  return response.data;
}
