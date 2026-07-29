import apiClient from "./apiClient";
import type { ApiResponse, Child, PagedResult } from "./types";

export async function getChildrenByParentId(
  parentId: number,
  pageNumber = 1,
  pageSize = 10,
): Promise<ApiResponse<PagedResult<Child>>> {
  const response = await apiClient.get<ApiResponse<PagedResult<Child>>>(
    "/Child/get-by-parent-id",
    {
      params: {
        parentId,
        pageNumber,
        pageSize,
      },
    },
  );
  return response.data;
}
