namespace Haly.WebApp.Features.Player.AddToQueue;

public record AddToQueueRequestBody
{
    public string? CollectionUri { get; init; }
    public IEnumerable<string>? TrackUris { get; init; }
};
