namespace Haly.WebApp.Features.Artists.GetDiscography;

public record ArtistDiscographyDto
{
    public IEnumerable<ReleaseItemDto> All { get; init; }
    public IEnumerable<ReleaseItemDto> Albums { get; init; }
    public IEnumerable<ReleaseItemDto> SinglesAndEps { get; init; }
    public IEnumerable<ReleaseItemDto> Compilations { get; init; }
};
