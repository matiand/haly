namespace Haly.WebApp.Models.Cards;

public record ReleaseItem : Card
{
    public DateOnly ReleaseDate { get; init; }
    public AlbumType Type { get; init; }
    public List<ArtistBrief> Artists { get; init; }

    public int ReleaseYear => ReleaseDate.Year;
}
