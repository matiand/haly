using Haly.WebApp.Data;
using Haly.WebApp.Features.CurrentUser.UpdatePlaylists;
using Haly.WebApp.Hubs;
using Haly.WebApp.Models;
using Haly.WebApp.Models.Cards;
using Haly.WebApp.Models.Jobs;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Haly.WebApp.Features.Jobs.CollectNewReleases;

public record CollectNewReleasesCommand(string UserId, string UserMarket) : IRequest;

public class CollectNewReleasesHandler(
    ISpotifyService spotify,
    LibraryContext db,
    IDateOnlyService dateOnlyService,
    IHubContext<MessageHub, IMessageHubClient> messageHub)
    : IRequestHandler<CollectNewReleasesCommand>
{
    public async Task Handle(CollectNewReleasesCommand request, CancellationToken cancellationToken)
    {
        var job = await AddJob(request, cancellationToken);

        job.NewReleases = await CollectNewReleases(request);
        job.FinishedAt = DateTime.UtcNow;

        await db.SaveChangesAsync(cancellationToken);
    }

    private async Task<CollectNewReleasesJob> AddJob(CollectNewReleasesCommand request,
        CancellationToken cancellationToken)
    {
        var job = new CollectNewReleasesJob()
        {
            UserId = request.UserId,
            NewReleases = new List<ReleaseItem>(),
        };
        db.CollectNewReleasesJobs.Add(job);

        await db.SaveChangesAsync(cancellationToken);

        return job;
    }

    private async Task<List<ReleaseItem>> CollectNewReleases(CollectNewReleasesCommand request)
    {
        var followedArtists = await spotify.GetCurrentUserFollows();
        var allReleases = new List<ReleaseItem>();

        await messageHub.Clients.All.CollectingNewReleases(followedArtists.Count);
        for (var i = 0; i < followedArtists.Count; i++)
        {
            var artist = followedArtists[i];
            var albumsTask = spotify.GetArtistReleases(artist.Id, ArtistRelease.Album, request.UserMarket);
            var singlesTask = spotify.GetArtistReleases(artist.Id, ArtistRelease.Singles, request.UserMarket);

            // To reduce the amount of API calls, we don't fetch compilations. Ideally, we would use
            // ArtistRelease.Discography to get them in a single call, but it's currently broken.
            // Rewrite this when it's fixed by them.
            // var compilations = await _spotify.GetArtistReleases(artist.Id, ArtistRelease.Compilation, request.UserMarket);

            allReleases.AddRange(await albumsTask);
            allReleases.AddRange(await singlesTask);

            await messageHub.Clients.All.CollectingNewReleases(followedArtists.Count - i - 1);
        }

        var releasesFromLastSixMonths =
            allReleases.Where(r => !dateOnlyService.IsOlderThanSixMonths(r.ReleaseDate))
                .DistinctBy(r => r.Id)
                .OrderByDescending(r => r.ReleaseDate)
                .ToList();

        return releasesFromLastSixMonths;
    }
}
