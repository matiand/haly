using Haly.WebApp.Data;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Jobs.GetNewReleasesJob;

public record GetLatestNewReleasesJobQuery(string UserId) : IRequest<NewReleasesJobDto?>;

public class GetLatestNewReleasesJobHandler : IRequestHandler<GetLatestNewReleasesJobQuery, NewReleasesJobDto?>
{
    private readonly LibraryContext _db;

    public GetLatestNewReleasesJobHandler(LibraryContext db)
    {
        _db = db;
    }

    public async Task<NewReleasesJobDto?> Handle(GetLatestNewReleasesJobQuery request,
        CancellationToken cancellationToken)
    {
        var latestCompletedJob = await _db.CollectNewReleasesJobs
            .OrderByDescending(j => j.FinishedAt)
            .FirstOrDefaultAsync(j => j.UserId == request.UserId && j.FinishedAt.HasValue, cancellationToken);

        var dto = latestCompletedJob?.Adapt<NewReleasesJobDto>();

        return dto;
    }
}
