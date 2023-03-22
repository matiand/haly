namespace Haly.WebApp.Features.Pagination;

public record PaginatedList<T>
{
    public int Limit { get; init; }
    public int Offset { get; init; }
    public int Total { get; init; }
    public IEnumerable<T> Items { get; init; }

    public PaginatedList()
    {
    }

    public PaginatedList(List<T> srcItems, int limit)
    {
        Limit = limit;
        Offset = 0;
        Total = srcItems.Count;
        Items = srcItems.Take(limit);
    }
}
