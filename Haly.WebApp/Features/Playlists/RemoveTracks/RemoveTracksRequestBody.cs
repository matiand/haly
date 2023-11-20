namespace Haly.WebApp.Features.Playlists.RemoveTracks;

public record RemoveTracksRequestBody(IReadOnlyCollection<RemoveTrackDto> Tracks);
