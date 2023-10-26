using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Playlists.CreatePlaylist;

public record CreatePlaylistCommand(string UserId, string Name) : IRequest<PlaylistBriefDto>;

public class CreatePlaylistHandler : IRequestHandler<CreatePlaylistCommand, PlaylistBriefDto>
{
    private readonly ISpotifyService _spotify;

    public CreatePlaylistHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<PlaylistBriefDto> Handle(CreatePlaylistCommand request, CancellationToken cancellationToken)
    {
        var playlist = await _spotify.CreatePlaylist(request.UserId, request.Name);

        return playlist.Adapt<PlaylistBriefDto>();
    }
}
