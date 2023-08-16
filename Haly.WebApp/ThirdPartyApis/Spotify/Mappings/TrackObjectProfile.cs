using Haly.GeneratedClients;
using Haly.WebApp.Models.Tracks;
using Mapster;
using Track = Haly.WebApp.Models.Tracks.Track;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class TrackObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForDestinationType<PlaylistTrack>()
            .AfterMapping(track =>
            {
                track.QueryData = new PlaylistTrackQueryData(track.Name, track.Album, track.Artists);
            });

        config.ForType<TrackObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Id)
            .Map(dest => dest.Name, src => src.Name)
            .Map(dest => dest.Artists, src => src.Artists)
            .Map(dest => dest.IsPlayable, src => src.Is_playable)
            .Map(dest => dest.IsExplicit, src => src.Explicit)
            .Map(dest => dest.DurationInMs, src => src.Duration_ms);

        config.ForType<PlaylistTrackObject, PlaylistTrack>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms)
            .Map(dest => dest.IsPlayable, src => src.Track.Is_playable)
            .Map(dest => dest.IsExplicit, src => src.Track.Explicit)
            .Map(dest => dest.PositionInAlbum, src => src.Track.Disc_number * src.Track.Track_number)
            .Map(dest => dest.Type,
                src => src.Track.Type == TrackObjectType.Track ? PlaylistTrackType.Song : PlaylistTrackType.Podcast);

        config.ForType<SavedTrackObject, PlaylistTrack>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Album, src => src.Track.Album)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.AddedAt, src => src.Added_at)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms)
            .Map(dest => dest.IsPlayable, src => src.Track.Is_playable)
            .Map(dest => dest.IsExplicit, src => src.Track.Explicit)
            .Map(dest => dest.PositionInAlbum, src => src.Track.Disc_number * src.Track.Track_number)
            .Map(dest => dest.Type,
                src => src.Track.Type == TrackObjectType.Track ? PlaylistTrackType.Song : PlaylistTrackType.Podcast);

        config.ForType<SimplifiedTrackObject, AlbumTrack>()
            .Map(dest => dest.SpotifyId, src => src.Id)
            .Map(dest => dest.IsPlayable, src => src.Is_playable)
            .Map(dest => dest.IsExplicit, src => src.Explicit)
            .Map(dest => dest.DiscNumber, src => src.Disc_number)
            .Map(dest => dest.DurationInMs, src => src.Duration_ms);

        config.ForType<TrackObject, ArtistTopTrack>()
            .Map(dest => dest.SpotifyId, src => src.Id)
            .Map(dest => dest.IsPlayable, src => src.Is_playable)
            .Map(dest => dest.IsExplicit, src => src.Explicit)
            .Map(dest => dest.DurationInMs, src => src.Duration_ms);

        config.ForType<PlayHistoryObject, Track>()
            .Map(dest => dest.SpotifyId, src => src.Track.Id)
            .Map(dest => dest.Name, src => src.Track.Name)
            .Map(dest => dest.Artists, src => src.Track.Artists)
            .Map(dest => dest.IsPlayable, src => src.Track.Is_playable)
            .Map(dest => dest.IsExplicit, src => src.Track.Explicit)
            .Map(dest => dest.DurationInMs, src => src.Track.Duration_ms);
    }
}
