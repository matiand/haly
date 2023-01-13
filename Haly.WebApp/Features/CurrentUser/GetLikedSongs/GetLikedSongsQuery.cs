using Haly.WebApp.Features.Playlists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.GetLikedSongs;

public record GetLikedSongsQuery(string UserMarket) : IRequest<IEnumerable<TrackDto>>;

public record GetLikedSongsHandler : IRequestHandler<GetLikedSongsQuery, IEnumerable<TrackDto>>
{
    private readonly ISpotifyService _spotifyService;

    public GetLikedSongsHandler(ISpotifyService spotifyService)
    {
        _spotifyService = spotifyService;
    }

    public async Task<IEnumerable<TrackDto>> Handle(GetLikedSongsQuery request, CancellationToken cancellationToken)
    {
        // There is no way to see if this collection changed, so we don't try to cache it and just fetch it always
        var likedSongs = await _spotifyService.GetLikedSongs(request.UserMarket);

        return likedSongs.Adapt<IEnumerable<TrackDto>>();
    }
}
