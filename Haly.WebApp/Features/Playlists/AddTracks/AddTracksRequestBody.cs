namespace Haly.WebApp.Features.Playlists.AddTracks;

public record AddTracksRequestBody
{
    public string? CollectionUri { get; init; }
    public IEnumerable<string>? TrackUris { get; init; }
    public bool AllowDuplicates { get; init; }
}
