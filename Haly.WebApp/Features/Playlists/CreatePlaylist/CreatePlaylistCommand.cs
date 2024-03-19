using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Playlists.CreatePlaylist;

public record CreatePlaylistCommand(string UserId, string Name) : IRequest<PlaylistBriefDto>;

public class CreatePlaylistHandler(ISpotifyService spotify) : IRequestHandler<CreatePlaylistCommand, PlaylistBriefDto>
{
    public async Task<PlaylistBriefDto> Handle(CreatePlaylistCommand request, CancellationToken cancellationToken)
    {
        var playlist = await spotify.CreatePlaylist(request.UserId, request.Name);

        return playlist.Adapt<PlaylistBriefDto>();
    }
}
