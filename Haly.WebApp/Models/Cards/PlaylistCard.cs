namespace Haly.WebApp.Models.Cards;

public record PlaylistCard : Card
{
    public string? Description { get; init; }
    public Owner Owner { get; init; }
}
