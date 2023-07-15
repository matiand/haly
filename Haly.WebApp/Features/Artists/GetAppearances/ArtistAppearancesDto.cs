namespace Haly.WebApp.Features.Artists.GetAppearances;

public record ArtistAppearancesDto
{
    public IEnumerable<ReleaseItemDto> Compilations { get; init; }
    public IEnumerable<ReleaseItemDto> AlbumsAndSingles { get; init; }
}
