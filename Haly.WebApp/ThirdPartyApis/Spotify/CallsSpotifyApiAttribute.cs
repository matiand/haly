namespace Haly.WebApp.ThirdPartyApis.Spotify;

// Attribute used by swagger to generate additional info for controller actions communicating with Spotify API
[AttributeUsage(AttributeTargets.Method)]
public class CallsSpotifyApiAttribute : Attribute
{
    public string Scopes { get; }

    public CallsSpotifyApiAttribute(params string[] scopes)
    {
        Scopes = string.Join(", ", scopes);
    }
}
