using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class TrackObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<PlaylistTrackObject, PlaylistTrack>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms)
            .Map(dest => dest.Type,
                src => src.Track.Type == TrackObjectType.Track ? PlaylistTrackType.Song : PlaylistTrackType.Podcast);

        config.ForType<SavedTrackObject, PlaylistTrack>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms)
            .Map(dest => dest.Type,
                src => src.Track.Type == TrackObjectType.Track ? PlaylistTrackType.Song : PlaylistTrackType.Podcast);

        config.ForType<SimplifiedTrackObject, AlbumTrack>()
            .Map(dest => dest.SpotifyId, src => src.Id)
            .Map(dest => dest.DurationInMs, src => src.Duration_ms);
    }
}
