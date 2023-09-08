using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class CurrentlyPlayingObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<CurrentlyPlayingContextObject, PlaybackState>()
            .Map(dest => dest.Context, src => GetPlaybackContext(src.Context));
    }

    private static PlaybackContext? GetPlaybackContext(ContextObject? src)
    {
        if (src is null) return null;

        if (src.Type is "playlist" or "album")
        {
            return new PlaybackContext()
            {
                EntityId = src.Uri.Split(separator: ':').Last(),
                Type = src.Type,
            };
        }

        return null;
    }
}
