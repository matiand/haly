using System.Text.RegularExpressions;
using System.Web;
using Haly.GeneratedClients;
using Haly.WebApp.Features.CurrentUser.UpdateLikes;
using Haly.WebApp.Features.Player.GetAvailableDevices;
using Haly.WebApp.Models;
using Mapster;
using Track = Haly.WebApp.Models.Track;

namespace Haly.WebApp.ThirdPartyApis.Spotify;

public class SpotifyMappingProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<PrivateUserObject, User>()
            .Map(dest => dest.Name, src => src.Display_name)
            .Map(dest => dest.Market, src => src.Country)
            .Map(dest => dest.Plan, src => src.Product == "premium" ? Plan.Premium : Plan.Free);

        config.ForType<SimplifiedPlaylistObject, Playlist>()
            .Map(dest => dest.SnapshotId, src => src.Snapshot_id)
            .Map(dest => dest.Metadata.ImageUrl, src => GetPlaylistImage(src.Images))
            .Map(dest => dest.Metadata.Description, src => TrimAndDecodePlaylistDescription(src.Description))
            .Map(dest => dest.Metadata.Owner.Id, src => src.Owner.Id)
            .Map(dest => dest.Metadata.Owner.Name, src => src.Owner.Display_name);

        config.ForType<PlaylistObject, Playlist>()
            .Map(dest => dest.SnapshotId, src => src.Snapshot_id)
            .Map(dest => dest.Metadata.ImageUrl, src => GetPlaylistImage(src.Images))
            .Map(dest => dest.Metadata.Description, src => TrimAndDecodePlaylistDescription(src.Description))
            .Map(dest => dest.Metadata.Owner.Id, src => src.Owner.Id)
            .Map(dest => dest.Metadata.Owner.Name, src => src.Owner.Display_name)
            .Map(dest => dest.Tracks, src => src.Tracks.Items.ToList());

        config.ForType<PlaylistTrackObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms)
            .Map(dest => dest.Type,
                src => src.Track.Type == TrackObjectType.Track ? TrackType.Song : TrackType.Podcast);

        config.ForType<SavedTrackObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms)
            .Map(dest => dest.Type,
                src => src.Track.Type == TrackObjectType.Track ? TrackType.Song : TrackType.Podcast);

        config.ForType<SimplifiedAlbumObject, Album>()
            // Try to get the last image, because it's the smallest one.
            // We only show those images as album covers of tracks inside playlist view.
            .Map(dest => dest.ImageUrl, src => src.Images.Any() ? src.Images.Last().Url : null);

        config.ForType<SimplifiedArtistObject, Artist>();

        config.ForType<DeviceObject, DeviceDto>()
            .Map(dest => dest.IsActive, src => src.Is_active)
            .Map(dest => dest.VolumePercent, src => src.Volume_percent);


        config.ForType<PagingSavedTrackObject, LikesSnapshot>()
            .Map(dest => dest.LastTrackId,
                src => src.Items.FirstOrDefault() != null ? src.Items.FirstOrDefault()!.Track.Id : null);
    }

    private static string? GetPlaylistImage(ICollection<ImageObject> image)
    {
        // If there is more than one image, we want to use the second one, because it has similar
        // dimensions to what we want to display to the user.
        if (image.Count > 1) return image.ElementAt(index: 1).Url;

        return image.FirstOrDefault()?.Url;
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
