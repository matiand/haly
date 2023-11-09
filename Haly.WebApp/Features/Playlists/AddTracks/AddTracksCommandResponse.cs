namespace Haly.WebApp.Features.Playlists.AddTracks;

public record AddTracksCommandResponse(PlaylistBriefDto? Playlist, DuplicateType DuplicateType = DuplicateType.None);
