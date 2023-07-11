using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Albums.GetAlbum;

public record GetAlbumQuery(string Id, string UserMarket) : IRequest<AlbumDetailed>;

public class GetAlbumHandler : IRequestHandler<GetAlbumQuery, AlbumDetailed>
{
    private readonly ISpotifyService _spotify;

    public GetAlbumHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<AlbumDetailed> Handle(GetAlbumQuery request, CancellationToken cancellationToken)
    {
        var album = await _spotify.GetAlbum(request.Id, request.UserMarket);

        return album;
    }
}
