namespace WorthyCoins.Application.Commons.Results
{
    public class Result
    {
        public bool Success { get; init; }
        public string? ErrorCode { get; init; }
        public string? Message { get; set; }

        public static Result Ok() => new() { Success = true };

        public static Result Fail(string errorCode)
            => new()
            {
                Success = false,
                ErrorCode = errorCode
            };
    }
}
