using DotSwashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Features.Player.UpdatePlayback;

[SwaggerSchema("One of ContextUri or TrackUri must be provided.")]
public record UpdatePlaybackRequestBody
{
    [SwaggerSchema("The uri of a playlist, album or artist.")]
    public string? ContextUri { get; init; }

    [SwaggerSchema(
        "The track uri. Can be provided to instruct the API which track to begin playing in the newly established context. If no ContextUri is provided, only the specified track will be played.")]
    public string? TrackUri { get; init; }

    [SwaggerSchema(
        "Flag telling our API to shuffle the newly established context. Only valid when ContextUri is provided and shuffle is enabled.")]
    public bool WithImprovedShuffle { get; init; }
}
