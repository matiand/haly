using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Artists.GetDiscography;

public record GetArtistDiscographyQuery(string Id, string UserMarket) : IRequest<ArtistDiscographyDto>;

public class GetArtistDiscographyHandler : IRequestHandler<GetArtistDiscographyQuery, ArtistDiscographyDto>
{
    private readonly ISpotifyService _spotify;

    public GetArtistDiscographyHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<ArtistDiscographyDto> Handle(GetArtistDiscographyQuery request, CancellationToken cancellationToken)
    {
        var releases = await _spotify.GetArtistReleases(request.Id, ArtistRelease.Discography, request.UserMarket);

        var dto = new ArtistDiscographyDto()
        {
            Albums = releases.Where(r => r.Type == AlbumType.Album)
                .OrderByDescending(r => r.ReleaseDate)
                .Adapt<List<ReleaseItemDto>>(),
            SinglesAndEps = releases.Where(r => r.Type == AlbumType.OneSong || r.Type == AlbumType.Ep)
                .OrderByDescending(r => r.ReleaseDate)
                .Adapt<List<ReleaseItemDto>>(),
            Compilations = releases.Where(r => r.Type == AlbumType.Compilation)
                .OrderByDescending(r => r.ReleaseDate)
                .Adapt<List<ReleaseItemDto>>(),
        };

        return dto;
    }
}
