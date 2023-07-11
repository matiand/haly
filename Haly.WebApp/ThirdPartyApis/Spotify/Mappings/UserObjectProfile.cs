using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class UserObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<PrivateUserObject, PrivateUser>()
            .Map(dest => dest.Name, src => src.Display_name)
            .Map(dest => dest.Market, src => src.Country)
            .Map(dest => dest.Plan, src => src.Product == "premium" ? Plan.Premium : Plan.Free);

        config.ForType<PublicUserObject, PublicUser>()
            .Map(dest => dest.Name, src => src.Display_name)
            .Map(dest => dest.FollowersTotal, src => src.Followers.Total)
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl());
    }
}
