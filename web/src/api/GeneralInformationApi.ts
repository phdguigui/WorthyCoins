import apiClient from "./apiClient";
import type { ApiResponse } from "./types";

export interface SidebarData {
  avatarUrl: string | null;
  firstName: string;
  lastName: string;
  totalBalance: number;
}

export async function getSidebarInformation(
  userId: string,
): Promise<ApiResponse<SidebarData>> {
  const response = await apiClient.get<ApiResponse<SidebarData>>(
    `/GeneralInfo/sidebar`,
    {
      params: {
        userId: userId,
      },
    },
  );
  return response.data;
}
