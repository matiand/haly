using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Player.GetRecentlyPlayed;

public record GetRecentlyPlayedQuery : IRequest<IEnumerable<TrackDto>>;

public class GetRecentlyPlayedQueryHandler(ISpotifyService spotify)
    : IRequestHandler<GetRecentlyPlayedQuery, IEnumerable<TrackDto>>
{
    public async Task<IEnumerable<TrackDto>> Handle(GetRecentlyPlayedQuery request, CancellationToken cancellationToken)
    {
        var items = await spotify.GetRecentlyPlayedTracks();

        // This list is often buggy and can contain multiple duplicates in a row.
        return items.DistinctBy(t => t.Id).Adapt<IEnumerable<TrackDto>>();
    }
}
