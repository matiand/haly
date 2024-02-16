namespace Haly.WebApp.ThirdPartyApis.Genius.Dtos;

public record ResponseDto<T>
{
    public T Response { get; init; }
}
