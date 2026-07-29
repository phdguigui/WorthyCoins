export interface ApiResponse<T> {
  data: T;
  errorCode: string | null;
  message: string | null;
  success: boolean;
}

export interface UserTask {
  id: number;
  title: string;
  description?: string | null;
  creationDate: Date;
  dueDate?: Date | null;
  assignedChildId: number;
  assignedChild?: Child | null;
  rewardAmount: number;
  status: UserTaskStatusEnum;
}

export interface Child {
  id: number;
  name: string;
  dateOfBirth: Date;
  totalCoins: number;
  parentId: number;
}

export enum UserTaskStatusEnum {
  NotStarted = 1,
  InProgress = 2,
  WaitingForApproval = 3,
  Completed = 4,
  Overdue = 5,
  Canceled = 6,
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}

