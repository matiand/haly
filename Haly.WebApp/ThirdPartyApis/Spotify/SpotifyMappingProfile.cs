using Haly.GeneratedClients;
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
            .Map(dest => dest.Plan, src => src.Product == "product" ? Plan.Premium : Plan.Free);

        config.ForType<SimplifiedPlaylistObject, Playlist>()
            .Map(dest => dest.SnapshotId, src => src.Snapshot_id)
            .Ignore(dest => dest.Owner);

        config.ForType<PlaylistTrackObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms);

        config.ForType<SimplifiedAlbumObject, Album>();
        config.ForType<SimplifiedArtistObject, Artist>();
    }
}
