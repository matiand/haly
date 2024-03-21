namespace Haly.WebApp.Features.ErrorHandling;

public static class WebApplicationBuilderExtensions
{
    /// <summary>
    /// Adds error capturing using Sentry if appropriate environment variables are provided.
    /// </summary>
    public static void AddErrorCapturingIfAvailable(this WebApplicationBuilder builder)
    {
        var options = builder.Configuration.GetSection(SentryOptions.Key).Get<SentryOptions>();

        if (options is null || string.IsNullOrEmpty(options.Dsn)) return;

        builder.WebHost.UseSentry((o) =>
        {
            o.Dsn = options.Dsn;
            o.TracesSampleRate = options.TracesSampleRate;
            o.SendDefaultPii = options.SendDefaultPii;
            o.CaptureFailedRequests = true;
            o.ShutdownTimeout = TimeSpan.FromSeconds(value: 2);
        });
    }
}
