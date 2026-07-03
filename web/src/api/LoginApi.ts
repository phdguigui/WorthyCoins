import apiClient from "./apiClient";

export async function loginUser(email: string, password: string) {
  try {
    let response = await apiClient.post("/authentication/login", {
      email,
      password,
    });
    return response;
  } catch (error: any) {
    throw error?.response?.data;
  }
}
