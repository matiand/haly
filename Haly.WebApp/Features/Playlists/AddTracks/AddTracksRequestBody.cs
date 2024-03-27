using DotSwashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Features.Playlists.AddTracks;

[SwaggerSchema("One of CollectionUri or TrackUris must be provided.")]
public record AddTracksRequestBody
{
    [SwaggerSchema("URI of a playlist or album that you want to get tracks from.")]
    public string? CollectionUri { get; init; }

    [SwaggerSchema("Array of track URIs that you want to add.")]
    public IEnumerable<string>? TrackUris { get; init; }

    [SwaggerSchema("Enum specifying how duplicates should be handled.")]
    public DuplicatesStrategy DuplicatesStrategy { get; init; }
}
