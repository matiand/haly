using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Pagination;

public static class QueryableExtensions
{
    public static async Task<PaginatedList<T>> ToPaginatedListAsync<T>(this IQueryable<T> queryable, int offset,
        int limit, CancellationToken cancellationToken = default)
        where T : class
    {
        var total = await queryable.CountAsync(cancellationToken);
        var items = await queryable
            .Skip(offset)
            .Take(limit)
            .ToListAsync(cancellationToken);

        return new PaginatedList<T>
        {
            Offset = offset,
            Limit = limit,
            Total = total,
            Items = items,
        };
    }
}
