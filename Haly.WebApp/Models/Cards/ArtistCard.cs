namespace Haly.WebApp.Models.Cards;

public record ArtistCard : Card
{
    public int FollowersTotal { get; init; }
    public IEnumerable<string> Genres { get; init; }
}
