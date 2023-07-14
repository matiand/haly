namespace Haly.WebApp.Models.Cards;

public record Card
{
    public string Id { get; init; }
    public string Name { get; init; }
    public string? ImageUrl { get; init; }
}
