namespace Haly.WebApp.Features.Playlists.AddTracks;

public record AddTracksCommandResponse(PlaylistBriefDto? Playlist, bool AllDuplicates, bool SomeDuplicates);
