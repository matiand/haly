using Haly.WebApp.ThirdPartyApis.Genius.Dtos;
using Refit;

namespace Haly.WebApp.ThirdPartyApis.Genius;

public interface IGeniusApi
{
    [Get("/search")]
    Task<ResponseDto<SearchResponseDto>> Search(string q, [AliasAs("access_token")] string token);
}
