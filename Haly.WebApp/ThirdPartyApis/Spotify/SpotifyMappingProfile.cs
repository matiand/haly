using System.Text.RegularExpressions;
using System.Web;
using Haly.GeneratedClients;
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
            .Map(dest => dest.Metadata.ImageUrl, src => src.Images.Any() ? src.Images.First().Url : null)
            .Map(dest => dest.Metadata.Description, src => TrimAndDecodePlaylistDescription(src.Description))
            .Map(dest => dest.Metadata.Owner.Id, src => src.Owner.Id)
            .Map(dest => dest.Metadata.Owner.Name, src => src.Owner.Display_name);

        config.ForType<PlaylistObject, Playlist>()
            .Map(dest => dest.SnapshotId, src => src.Snapshot_id)
            .Map(dest => dest.Metadata.ImageUrl, src => src.Images.Any() ? src.Images.First().Url : null)
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
            .Map(dest => dest.Type, src => src.Track.Type == "track" ? TrackType.Song : TrackType.Podcast);

        config.ForType<SavedTrackObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms)
            .Map(dest => dest.Type, src => src.Track.Type == "track" ? TrackType.Song : TrackType.Podcast);

        config.ForType<SimplifiedAlbumObject, Album>()
            .Map(dest => dest.ImageUrl, src => src.Images.Any() ? src.Images.First().Url : null);

        config.ForType<SimplifiedArtistObject, Artist>();

        config.ForType<DeviceObject, DeviceDto>()
            .Map(dest => dest.IsActive, src => src.Is_active)
            .Map(dest => dest.VolumePercent, src => src.Volume_percent);
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
