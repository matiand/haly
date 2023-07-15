namespace Haly.WebApp.Models.Cards;

public record ReleaseItem : Card
{
    public DateOnly ReleaseDate { get; init; }
    public AlbumType Type { get; init; }

    public int ReleaseYear => ReleaseDate.Year;
}
