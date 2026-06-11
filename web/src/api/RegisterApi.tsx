import apiClient from "./apiClient";

export async function registerUser(email: string, password: string) {
  try {
    let response = await apiClient.post("/authentication/register", {
      email,
      password,
    });
    return response;
  } catch (error: any) {
    throw error?.response?.data;
  }
}
