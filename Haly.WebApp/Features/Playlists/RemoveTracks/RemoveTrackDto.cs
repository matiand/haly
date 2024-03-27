using DotSwashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Features.Playlists.RemoveTracks;

public record RemoveTrackDto
{
    [SwaggerSchema("Track URI. Example: spotify:track:4OMJGnvZfDvsePyCwRGO7X")]
    public string Uri { get; init; }

    [SwaggerSchema("Track position in playlist. Use -1 if you want to remove the first track with that URI in playlist.")]
    public int Position { get; init; }
}
