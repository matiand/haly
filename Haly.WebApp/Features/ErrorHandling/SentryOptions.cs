namespace Haly.WebApp.Features.ErrorHandling;

public class SentryOptions
{
    public const string Key = "Sentry";

    public string? Dsn { get; init; }
    public double TracesSampleRate { get; init; }
    public bool SendDefaultPii { get; init; }
}
