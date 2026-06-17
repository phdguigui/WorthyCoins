namespace WorthyCoins.Application.Commons.Results
{
    public class Result<T> : Result
    {
        public T? Data { get; init; }

        public static Result<T> Ok(T data)
            => new()
            {
                Success = true,
                Data = data
            };

        public static new Result<T> Fail(string errorCode)
            => new()
            {
                Success = false,
                ErrorCode = errorCode
            };
    }
}
