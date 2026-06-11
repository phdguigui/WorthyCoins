import apiClient from "./apiClient";

export async function registerUser(email: string, password: string) {
  const response = await apiClient.post("/authentication/register", {
    email,
    password,
  });
  return response.data;
}
