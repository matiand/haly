using Haly.WebApp.Models;
using Haly.WebApp.ThirdPartyApis.Spotify;
using Mapster;
using MediatR;

namespace Haly.WebApp.Features.Artists.GetAppearances;

public record GetArtistAppearancesQuery(string Id, string UserMarket) : IRequest<ArtistAppearancesDto>;

public class GetArtistAppearancesHandler : IRequestHandler<GetArtistAppearancesQuery, ArtistAppearancesDto>
{
    private readonly ISpotifyService _spotify;

    public GetArtistAppearancesHandler(ISpotifyService spotify)
    {
        _spotify = spotify;
    }

    public async Task<ArtistAppearancesDto> Handle(GetArtistAppearancesQuery request,
        CancellationToken cancellationToken)
    {
        var releases =
            await _spotify.GetArtistReleases(request.Id, ArtistRelease.AppearsOn, request.UserMarket);

        var dto = new ArtistAppearancesDto()
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
