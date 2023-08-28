using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Features.Playlists.GetPlaylist;

public static class PlaylistTrackQueryableExtensions
{
    public static IQueryable<PlaylistTrack> OrderBy(this IQueryable<PlaylistTrack> queryable, string? sortOrder)
    {
        var sortedTracks = sortOrder switch
        {
            "title" => queryable.OrderBy(t => t.QueryData.Name),
            "title_desc" => queryable.OrderByDescending(t => t.QueryData.Name),
            "artist" => queryable.OrderBy(t => t.QueryData.ArtistName)
                .ThenBy(t => t.QueryData.AlbumName)
                .ThenBy(t => t.PositionInAlbum),
            "artist_desc" => queryable.OrderByDescending(t => t.QueryData.ArtistName)
                .ThenBy(t => t.QueryData.AlbumName)
                .ThenBy(t => t.PositionInAlbum),
            "album" => queryable.OrderBy(t => t.QueryData.AlbumName).ThenBy(t => t.PositionInAlbum),
            "album_desc" => queryable.OrderByDescending(t => t.QueryData.AlbumName).ThenBy(t => t.PositionInAlbum),
            "added_at" => queryable.OrderBy(t => t.AddedAt)
                .ThenBy(t => t.QueryData.AlbumName)
                .ThenBy(t => t.PositionInAlbum),
            "added_at_desc" => queryable.OrderByDescending(t => t.AddedAt)
                .ThenBy(t => t.QueryData.AlbumName)
                .ThenBy(t => t.PositionInAlbum),
            "duration" => queryable.OrderBy(t => t.DurationInMs),
            "duration_desc" => queryable.OrderByDescending(t => t.DurationInMs),
            _ => queryable.OrderBy(t => t.PositionInPlaylist),
        };

        return sortedTracks.ThenBy(t => t.PositionInPlaylist);
    }
}
