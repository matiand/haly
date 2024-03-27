using DotSwashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Features.Player.AddToQueue;

[SwaggerSchema("One of CollectionUri or TrackUris must be provided.")]
public record AddToQueueRequestBody
{
    [SwaggerSchema("URI of a playlist or album that you want to get tracks from.", Nullable = true)]
    public string? CollectionUri { get; init; }

    [SwaggerSchema("Array of track URIs that you want to add.", Nullable = true)]
    public IEnumerable<string>? TrackUris { get; init; }
};
