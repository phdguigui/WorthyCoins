import apiClient from "./apiClient";

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
) {
  try {
    let response = await apiClient.post("/authentication/register", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    return response;
  } catch (error: any) {
    throw error?.response?.data;
  }
}
