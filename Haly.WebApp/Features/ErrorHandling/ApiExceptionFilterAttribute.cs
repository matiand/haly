using Haly.GeneratedClients;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Haly.WebApp.Features.ErrorHandling;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        // For validation use fluent validator
        // Make sure this does not interfere with Polly
        var ex = context.Exception;

        Console.WriteLine($"Inside filter, exception happened:\n{ex.Message}");
        Console.WriteLine(ex.InnerException);

        switch (ex)
        {
            case ApiException apiException:
                {
                    var isDeserializationError = apiException.Message.Contains("Could not deserialize");
                    if (isDeserializationError)
                    {
                        context.Result =
                            ProblemResponses.InternalServerProblem("Failed to deserialize response from Spotify API");
                        break;
                    }

                    context.Result = apiException.StatusCode switch
                    {
                        400 => ProblemResponses.BadRequestProblem("X-Spotify-Token header is missing",
                            "It should contain a valid Spotify API access token"),
                        401 => ProblemResponses.UnauthorizedProblem("Bad or expired access token for using Spotify API"),
                        429 => ProblemResponses.TooManyRequestsProblem("You have exceeded Spotify API rate limits"),
                        _ => throw apiException,
                    };
                    break;
                }
        }
    }
}
