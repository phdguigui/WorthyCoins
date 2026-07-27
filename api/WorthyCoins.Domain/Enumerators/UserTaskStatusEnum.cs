namespace WorthyCoins.Domain.Enumerators
{
    public enum UserTaskStatusEnum
    {
        NotStarted = 1,
        InProgress = 2,
        WaitingForApproval = 3,
        Completed = 4,
        Overdue = 5,
        Canceled = 6
    }
}
