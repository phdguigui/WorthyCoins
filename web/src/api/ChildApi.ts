import apiClient from "./apiClient";
import type { ApiResponse, Child, PagedResult } from "./types";

export async function getChildrenByParentId(
  pageNumber = 1,
  pageSize = 10,
): Promise<ApiResponse<PagedResult<Child>>> {
  const response = await apiClient.get<ApiResponse<PagedResult<Child>>>(
    "/Child/get-by-parent-id",
    {
      params: {
        pageNumber,
        pageSize,
      },
    },
  );
  return response.data;
}
