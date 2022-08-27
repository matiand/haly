namespace Haly.WebApp.Features.XSpotifyToken;

public class RetrieveSpotifyAccessTokenMiddleware
{
    private readonly RequestDelegate _next;
    private readonly SpotifyAccessToken _spotifyAccessToken;

    public RetrieveSpotifyAccessTokenMiddleware(RequestDelegate next, SpotifyAccessToken spotifyAccessToken)
    {
        _next = next;
        _spotifyAccessToken = spotifyAccessToken;
    }

    public async Task InvokeAsync(HttpContext ctx)
    {
        Console.WriteLine($"x-spotify-token Retrieve middleware {ctx.Request.Path} {ctx.Request.Headers["x-spotify-token"]}");
        _spotifyAccessToken.Value = ctx.Request.Headers["x-spotify-token"];
        await _next(ctx);
    }
}

public static class RetrieveSpotifyAccessTokenMiddlewareExtensions
{
    public static IApplicationBuilder UseRetrieveSpotifyAccessToken(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<RetrieveSpotifyAccessTokenMiddleware>();
    }
}
