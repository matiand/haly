using Haly.WebApp.Features.Artists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Albums.GetRecommendations;

public record GetAlbumRecommendationsQuery(string AlbumId, string UserMarket, string TrackIds)
    : IRequest<IEnumerable<ReleaseItemDto>>;

public class GetAlbumRecommendationsHandler(ISpotifyService spotify)
    : IRequestHandler<GetAlbumRecommendationsQuery, IEnumerable<ReleaseItemDto>>
{
    public async Task<IEnumerable<ReleaseItemDto>> Handle(GetAlbumRecommendationsQuery request,
        CancellationToken cancellationToken)
    {
        var tracks = await spotify.GetRecommendations(request.UserMarket, request.TrackIds, artistIds: null);

        var albums = tracks.Where(t => t.Album.Id != request.AlbumId)
            .GroupBy(t => t.Album.Name)
            .OrderByDescending(group => group.Count())
            .Take(count: 10)
            .Select(group => group.First().Album);

        return albums.Adapt<IEnumerable<ReleaseItemDto>>();
    }
}
