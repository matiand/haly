using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.RemoveTracks;

public record RemoveTracksCommand(string PlalistId, RemoveTracksRequestBody Body) : IRequest<PlaylistBriefDto>;

public class RemoveTracksCommandHandler(LibraryContext db, ISpotifyService spotify)
    : IRequestHandler<RemoveTracksCommand, PlaylistBriefDto>
{
    public async Task<PlaylistBriefDto> Handle(RemoveTracksCommand request, CancellationToken cancellationToken)
    {
        var cachedPlaylistTask = db.Playlists.FirstAsync(p => p.Id == request.PlalistId, cancellationToken);
        var removalTask = spotify.RemoveTracks(request.PlalistId, request.Body.Tracks);

        var cachedPlaylist = await cachedPlaylistTask;
        await removalTask;

        return cachedPlaylist.Adapt<PlaylistBriefDto>();
    }
}
