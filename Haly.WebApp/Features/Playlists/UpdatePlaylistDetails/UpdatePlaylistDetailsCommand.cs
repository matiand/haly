using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.UpdatePlaylistDetails;

public record UpdatePlaylistDetailsCommand(string PlaylistId, UpdatePlaylistDetailsRequestBody Body) : IRequest<Unit>;

public class UpdatePlaylistDetailsCommandHandler(ISpotifyService spotify, LibraryContext db)
    : IRequestHandler<UpdatePlaylistDetailsCommand, Unit>
{
    public async Task<Unit> Handle(UpdatePlaylistDetailsCommand request, CancellationToken cancellationToken)
    {
        await spotify.UpdatePlaylistDetails(request.PlaylistId, request.Body.Name, request.Body.Description);

        var playlist = await db.Playlists.FirstOrDefaultAsync(p => p.Id == request.PlaylistId, cancellationToken);
        if (playlist is null) return Unit.Value;

        playlist.Name = request.Body.Name;
        // Their API does not accept empty descriptions, so we only update it when it's not empty.
        if (!string.IsNullOrWhiteSpace(request.Body.Description))
        {
            playlist.Description = request.Body.Description;
        }

        await db.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
