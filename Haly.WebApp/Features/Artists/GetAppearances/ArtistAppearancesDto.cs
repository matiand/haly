namespace Haly.WebApp.Features.Artists.GetAppearances;

public record ArtistAppearancesDto
{
    public IEnumerable<ReleaseItemDto> Albums { get; init; }
    public IEnumerable<ReleaseItemDto> SinglesAndEps { get; init; }
    public IEnumerable<ReleaseItemDto> Compilations { get; init; }
}
