using Haly.WebApp.Features.Playlists.TotalDuration;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Albums.GetAlbum;

public record GetAlbumQuery(string Id, string UserMarket) : IRequest<AlbumDetailedDto>;

public class GetAlbumHandler(ISpotifyService spotify, ITotalDurationService totalDurationService)
    : IRequestHandler<GetAlbumQuery, AlbumDetailedDto>
{
    public async Task<AlbumDetailedDto> Handle(GetAlbumQuery request, CancellationToken cancellationToken)
    {
        var album = await spotify.GetAlbum(request.Id, request.UserMarket);
        var totalDuration = totalDurationService.FromTracks(album.Tracks);

        var dto = album.Adapt<AlbumDetailedDto>();
        dto.TotalDuration = totalDuration.Format();

        return dto;
    }
}
