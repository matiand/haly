using Haly.WebApp.Features.Playlists.TotalDuration;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Albums.GetAlbum;

public record GetAlbumQuery(string Id, string UserMarket) : IRequest<AlbumDetailedDto>;

public class GetAlbumHandler : IRequestHandler<GetAlbumQuery, AlbumDetailedDto>
{
    private readonly ISpotifyService _spotify;
    private readonly ITotalDurationService _totalDurationService;

    public GetAlbumHandler(ISpotifyService spotify, ITotalDurationService totalDurationService)
    {
        _spotify = spotify;
        _totalDurationService = totalDurationService;
    }

    public async Task<AlbumDetailedDto> Handle(GetAlbumQuery request, CancellationToken cancellationToken)
    {
        var album = await _spotify.GetAlbum(request.Id, request.UserMarket);
        var totalDuration = _totalDurationService.FromTracks(album.Tracks);

        var dto = album.Adapt<AlbumDetailedDto>();
        dto.TotalDuration = totalDuration.Format();

        return dto;
    }
}
