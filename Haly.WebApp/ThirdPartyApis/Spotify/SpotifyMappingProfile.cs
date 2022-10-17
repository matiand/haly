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
            .Map(dest => dest.Owner.Name, src => src.Owner.Display_name);

        config.ForType<PlaylistTrackObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms);

        config.ForType<SavedTrackObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms);

        config.ForType<SimplifiedAlbumObject, Album>();
        config.ForType<SimplifiedArtistObject, Artist>();

        config.ForType<DeviceObject, DeviceDto>()
            .Map(dest => dest.IsActive, src => src.Is_active)
            .Map(dest => dest.VolumePercent, src => src.Volume_percent);
    }
}
