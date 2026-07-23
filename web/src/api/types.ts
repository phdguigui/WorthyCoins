export interface ApiResponse<T> {
  data: T;
  errorCode: string | null;
  message: string | null;
  success: boolean;
}
