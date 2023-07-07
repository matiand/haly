using Haly.WebApp.ThirdPartyApis.Spotify;
using MediatR;

namespace Haly.WebApp.Features.Artists.GetArtist;

public record GetArtistQuery(string Id) : IRequest<ArtistDetailsDto>;

public class GetArtistHandler : IRequestHandler<GetArtistQuery, ArtistDetailsDto>
{
    private readonly ISpotifyService _spotify;

    public GetArtistHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<ArtistDetailsDto> Handle(GetArtistQuery request, CancellationToken cancellationToken)
    {
        var artist = await _spotify.GetArtist(request.Id);

        return artist;
    }
}
