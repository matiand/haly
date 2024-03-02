using Haly.WebApp.Data;
using Haly.WebApp.Features.Artists;
using Haly.WebApp.Models;
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

        if (latestCompletedJob is null) return null;

        var dto = new NewReleasesJobDto()
        {
            Id = latestCompletedJob.Id,
            FinishedAt = latestCompletedJob.FinishedAt!.Value,

            All = latestCompletedJob.NewReleases.Adapt<IEnumerable<ReleaseItemDto>>(),
            Albums = latestCompletedJob.NewReleases.Where(r => r.Type == AlbumType.Album)
                .Adapt<IEnumerable<ReleaseItemDto>>(),

            SinglesAndEps = latestCompletedJob.NewReleases
                .Where(r => r.Type == AlbumType.OneSong || r.Type == AlbumType.Ep)
                .Adapt<IEnumerable<ReleaseItemDto>>(),
        };


        return dto;
    }
}
