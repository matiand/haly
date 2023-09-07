using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Player.GetRecentlyPlayed;

public record GetRecentlyPlayedQuery : IRequest<IEnumerable<TrackDto>>;

public class GetRecentlyPlayedQueryHandler : IRequestHandler<GetRecentlyPlayedQuery, IEnumerable<TrackDto>>
{
    private readonly ISpotifyService _spotify;

    public GetRecentlyPlayedQueryHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<IEnumerable<TrackDto>> Handle(GetRecentlyPlayedQuery request, CancellationToken cancellationToken)
    {
        var items = await _spotify.GetRecentlyPlayedTracks();

        return items.Adapt<IEnumerable<TrackDto>>();
    }
}
