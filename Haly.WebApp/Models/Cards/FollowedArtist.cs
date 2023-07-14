namespace Haly.WebApp.Models.Cards;

public record FollowedArtist : Card
{
    public int FollowersTotal { get; init; }
}
