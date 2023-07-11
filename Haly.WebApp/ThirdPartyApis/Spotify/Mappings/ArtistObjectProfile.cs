using Haly.GeneratedClients;
using Haly.WebApp.Features.Artists.GetArtist;
using Haly.WebApp.Features.CurrentUser.GetFollowedArtists;
using Haly.WebApp.Features.CurrentUser.GetTopArtists;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class ArtistObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<ArtistObject, ArtistDetailsDto>()
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl());

        config.ForType<ArtistObject, FollowedArtistDto>()
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl());

        config.ForType<ArtistObject, TopArtistDto>()
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl());
    }
}
