using System.Text.RegularExpressions;
using System.Web;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class PlaylistObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<SimplifiedPlaylistObject, Playlist>()
            .Map(dest => dest.SnapshotId, src => src.Snapshot_id)
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl())
            .Map(dest => dest.Description, src => TrimAndDecodePlaylistDescription(src.Description))
            .Map(dest => dest.Owner.Id, src => src.Owner.Id)
            .Map(dest => dest.Owner.Name, src => src.Owner.Display_name);

        config.ForType<PlaylistObject, Playlist>()
            .Map(dest => dest.SnapshotId, src => src.Snapshot_id)
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl())
            .Map(dest => dest.Description, src => TrimAndDecodePlaylistDescription(src.Description))
            .Map(dest => dest.Owner.Id, src => src.Owner.Id)
            .Map(dest => dest.Owner.Name, src => src.Owner.Display_name)
            .Map(dest => dest.LikesTotal, src => src.Followers.Total)
            .Map(dest => dest.Tracks, src => src.Tracks.Items.ToList());
    }

    // Trims descriptions from anchor tags, because we can't render them correctly and their hrefs
    // often contain internal Spotify links. After we Html decode remaining text.
    private static string? TrimAndDecodePlaylistDescription(string? description)
    {
        if (string.IsNullOrEmpty(description)) return description;

        var sentences = Regex.Split(description, @"(?<=[.!?])\s+");

        return HttpUtility.HtmlDecode(
            string.Join(" ", sentences.Where(s => !s.Contains("</a>")))
        );
    }
}
