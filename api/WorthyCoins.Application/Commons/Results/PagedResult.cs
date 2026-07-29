namespace WorthyCoins.Application.Commons.Results
{
    public class PagedResult<T>
    {
        public List<T> Items { get; init; } = [];
        public int PageNumber { get; init; }
        public int PageSize { get; init; }
        public long TotalItems { get; init; }
        public int TotalPages => PageSize == 0 ? 0 : (int)Math.Ceiling((double)TotalItems / PageSize);
    }
}
