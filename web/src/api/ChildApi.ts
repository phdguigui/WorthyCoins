import apiClient from "./apiClient";
import type { ApiResponse, Child, PagedResult } from "./types";

export interface CreateChildRequest {
  name: string;
  dateOfBirth: Date | string;
  parentId: number;
}

export interface UpdateChildRequest {
  id: number;
  name: string;
  dateOfBirth: Date | string;
}

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

export async function createChild(
  request: CreateChildRequest,
): Promise<ApiResponse<Child>> {
  const response = await apiClient.post<ApiResponse<Child>>("/Child", request);
  return response.data;
}

export async function updateChild(
  request: UpdateChildRequest,
): Promise<ApiResponse<Child>> {
  const response = await apiClient.put<ApiResponse<Child>>("/Child", request);
  return response.data;
}

export async function deleteChild(childId: number): Promise<ApiResponse<void>> {
  const response = await apiClient.delete<ApiResponse<void>>("/Child", {
    params: { childId },
  });
  return response.data;
}
