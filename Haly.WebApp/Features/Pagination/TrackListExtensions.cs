using Haly.WebApp.Models.Tracks;

namespace Haly.WebApp.Features.Pagination;

public static class TrackListExtensions
{
    /**
    <summary>
    Extension method to annotate a list of tracks with their position in the playlist.
    </summary>
    <param name="tracks">The list of tracks to annotate.</param>
    <returns>The annotated list of tracks.</returns>
    */
    public static List<PlaylistTrack> AnnotateWithPosition(this List<PlaylistTrack> tracks)
    {
        for (var i = 0; i < tracks.Count; i++)
        {
            var item = tracks[i];
            item.PositionInPlaylist = i;
        }

        return tracks;
    }
}
