namespace Haly.WebApp.Models.Cards;

public record ReleaseItem : Card
{
    public DateOnly ReleaseDate { get; init; }

    // We could use the AlbumType class, but then this property would be empty in the database. We
    // don't know how to fix it, so let's leave it as is for now.
    public string Type { get; init; }

    public List<ArtistBrief> Artists { get; init; }

    public int ReleaseYear => ReleaseDate.Year;

    public string Uri => $"spotify:album:{Id}";
}
