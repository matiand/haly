namespace Haly.WebApp.Models.Cards;

public record TopArtist : Card
{
    public IEnumerable<string> Genres { get; init; }
}
