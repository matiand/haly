using Haly.GeneratedClients;
using Haly.WebApp.Features.CurrentUser.UpdateLikedSongs;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class PagingSavedTrackObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<PagingSavedTrackObject, LikedSongsSnapshot>()
            .Map(dest => dest.LastTrackId,
                src => src.Items.FirstOrDefault() != null ? src.Items.First().Track.Id : null);
    }
}
