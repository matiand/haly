namespace Haly.WebApp.Features.ErrorHandling;

public static partial class LogMessages
{
    [LoggerMessage(Level = LogLevel.Error, Message = "Failed Deserialization of type: {Type}. {Details}")]
    public static partial void LogSerializationMessage(ILogger logger, string type, string details);

    [LoggerMessage(Level = LogLevel.Error, Message = "Exception happened: {Message}")]
    public static partial void LogApiException(ILogger logger, string message);
}
