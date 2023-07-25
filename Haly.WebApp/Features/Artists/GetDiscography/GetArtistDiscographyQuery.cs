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

    public async Task<ArtistDiscographyDto> Handle(GetArtistDiscographyQuery request,
        CancellationToken cancellationToken)
    {
        // We need to fetch them separately, because their API is bugged and even though they say
        // you can specify multiple groups it will only return the first one.
        var albumTask = _spotify.GetArtistReleases(request.Id, ArtistRelease.Album, request.UserMarket);
        var singleTask = _spotify.GetArtistReleases(request.Id, ArtistRelease.Singles, request.UserMarket);
        var compilationTask = _spotify.GetArtistReleases(request.Id, ArtistRelease.Compilation, request.UserMarket);

        var (albums, singles, compilations) = (await albumTask, await singleTask, await compilationTask);

        var dto = new ArtistDiscographyDto()
        {
            All = albums.Concat(singles)
                .Concat(compilations)
                .OrderByDescending(r => r.ReleaseDate)
                .Adapt<List<ReleaseItemDto>>(),
            Albums = albums
                .OrderByDescending(r => r.ReleaseDate)
                .Adapt<List<ReleaseItemDto>>(),
            SinglesAndEps = singles
                .OrderByDescending(r => r.ReleaseDate)
                .Adapt<List<ReleaseItemDto>>(),
            Compilations = compilations
                .OrderByDescending(r => r.ReleaseDate)
                .Adapt<List<ReleaseItemDto>>(),
        };

        return dto;
    }
}
