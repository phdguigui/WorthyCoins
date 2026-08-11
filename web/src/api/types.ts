import i18n from "../i18n";

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
  icon: string;
  color: string;
}

export interface Child {
  id: number;
  name: string;
  dateOfBirth: Date;
  totalCoins: number;
  parentId: number;
}

export enum UserTaskStatusEnum {
  // NotStarted = 1,
  // InProgress = 2,
  // WaitingForApproval = 3,
  // Completed = 4,
  // Overdue = 5,
  // Canceled = 6,
  Pending = 1,
  Completed = 2,
}

export function getUserTaskStatusLabel(status: UserTaskStatusEnum): string {
  switch (status) {
    // case UserTaskStatusEnum.NotStarted:
    //   return "Not Started";
    // case UserTaskStatusEnum.InProgress:
    //   return "In Progress";
    // case UserTaskStatusEnum.WaitingForApproval:
    //   return "Waiting for Approval";
    // case UserTaskStatusEnum.Completed:
    //   return "Completed";
    // case UserTaskStatusEnum.Overdue:
    //   return "Overdue";
    // case UserTaskStatusEnum.Canceled:
    //   return "Canceled";
    case UserTaskStatusEnum.Pending:
      return i18n.t("tasks.pending");
    case UserTaskStatusEnum.Completed:
      return i18n.t("tasks.completed");
    default:
      return i18n.t("tasks.unknown");
  }
}

export function getUserTaskStatusIcon(status: UserTaskStatusEnum): string {
  switch (status) {
    // case UserTaskStatusEnum.NotStarted:
    //   return "Circle";
    // case UserTaskStatusEnum.InProgress:
    //   return "Play";
    // case UserTaskStatusEnum.WaitingForApproval:
    //   return "Clock";
    // case UserTaskStatusEnum.Overdue:
    //   return "AlertTriangle";
    // case UserTaskStatusEnum.Canceled:
    //   return "XCircle";
    case UserTaskStatusEnum.Completed:
      return "CheckCircle2";
    case UserTaskStatusEnum.Pending:
      return "Circle";
    default:
      return "HelpCircle";
  }
}

export function getUserTaskStatusColor(status: UserTaskStatusEnum): string {
  switch (status) {
    // case UserTaskStatusEnum.NotStarted:
    //   return "#2563eb";
    // case UserTaskStatusEnum.InProgress:
    //   return "#d97706";
    // case UserTaskStatusEnum.WaitingForApproval:
    //   return "#7c3aed";
    // case UserTaskStatusEnum.Overdue:
    //   return "#dc2626";
    // case UserTaskStatusEnum.Canceled:
    //   return "#6b7280";
    case UserTaskStatusEnum.Completed:
      return "#16a34a";
    case UserTaskStatusEnum.Pending:
      return "#2563eb";
    default:
      return "#64748b";
  }
}

export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}
