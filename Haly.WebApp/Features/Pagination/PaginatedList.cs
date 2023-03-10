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

    public PaginatedList(List<T> sourceList, int limit, int offset)
    {
        Limit = limit;
        Offset = offset;
        Total = sourceList.Count;
        Items = sourceList.Take(limit);
    }
}
