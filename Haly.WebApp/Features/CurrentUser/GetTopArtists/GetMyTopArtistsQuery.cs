using Haly.WebApp.Features.Artists;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.CurrentUser.GetTopArtists;

public record GetMyTopArtistsQuery : IRequest<IEnumerable<ArtistCardDto>>;

public class GetMyTopArtistsHandler : IRequestHandler<GetMyTopArtistsQuery, IEnumerable<ArtistCardDto>>
{
    private readonly ISpotifyService _spotify;

    public GetMyTopArtistsHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<IEnumerable<ArtistCardDto>> Handle(GetMyTopArtistsQuery request, CancellationToken cancellationToken)
    {
        var artists = await _spotify.GetCurrentUserTopArtists();

        return artists.Adapt<IEnumerable<ArtistCardDto>>();
    }
}
