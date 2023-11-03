using Haly.WebApp.Data;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Haly.WebApp.Features.Playlists.UpdatePlaylistDetails;

public record UpdatePlaylistDetailsCommand(string PlaylistId, UpdatePlaylistDetailsRequestBody Body) : IRequest<Unit>;

public class UpdatePlaylistDetailsCommandHandler : IRequestHandler<UpdatePlaylistDetailsCommand, Unit>
{
    private readonly ISpotifyService _spotify;
    private readonly LibraryContext _db;

    public UpdatePlaylistDetailsCommandHandler(ISpotifyService spotify, LibraryContext db)
    {
        _spotify = spotify;
        _db = db;
    }

    public async Task<Unit> Handle(UpdatePlaylistDetailsCommand request, CancellationToken cancellationToken)
    {
        await _spotify.UpdatePlaylistDetails(request.PlaylistId, request.Body.Name, request.Body.Description);

        var playlist = await _db.Playlists.FirstOrDefaultAsync(p => p.Id == request.PlaylistId, cancellationToken);
        if (playlist is null) return Unit.Value;

        playlist.Name = request.Body.Name;
        // Their API does not accept empty descriptions, so we only update it when it's not empty.
        if (!string.IsNullOrWhiteSpace(request.Body.Description))
        {
            playlist.Description = request.Body.Description;
        }

        await _db.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
