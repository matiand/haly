using DotSwashbuckle.AspNetCore.Annotations;

namespace Haly.WebApp.Features.Lyrics.UpdateGeniusLyrics;

public record GeniusQueryBody(
    string TrackName,
    string ArtistName,
    [SwaggerSchema("Genius OAuth token. Prefer using a *client* token. These ones valid for read-only endpoints.")]
    string GeniusToken);
