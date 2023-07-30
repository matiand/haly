using Haly.GeneratedClients;
using Haly.WebApp.Models.Search;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class SearchResultObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<Response13, SpotifySearchResult>()
            .Map(dest => dest.Albums, src => src.Albums.Items)
            .Map(dest => dest.Artists, src => src.Artists.Items)
            .Map(dest => dest.Playlists, src => src.Playlists.Items)
            .Map(dest => dest.Tracks, src => src.Tracks.Items);
    }
}
