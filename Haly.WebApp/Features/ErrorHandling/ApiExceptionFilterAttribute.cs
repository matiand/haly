using FluentValidation;
using Microsoft.AspNetCore.Mvc.Filters;
using GeneratedClient = Haly.GeneratedClients;

namespace Haly.WebApp.Features.ErrorHandling;

public class ApiExceptionFilter(ILogger<ApiExceptionFilter> logger) : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var exception = context.Exception;

        LogMessages.LogApiException(logger, exception.Message);

        switch (exception)
        {
            case ValidationException validationException:
                {
                    context.Result = ProblemResponses.BadRequest(validationException);
                    break;
                }
            case GeneratedClient.ApiException apiException:
                {
                    var isDeserializationError = apiException.StatusCode is >= 200 and < 300;
                    if (isDeserializationError)
                    {
                        context.Result =
                            ProblemResponses.InternalServerProblem("Failed to deserialize Spotify API response");
                        break;
                    }

                    context.Result = apiException.StatusCode switch
                    {
                        400 => ProblemResponses.BadRequest(apiException.Message),
                        401 => ProblemResponses.Unauthorized("Bad or expired Spotify OAuth token"),
                        403 => ProblemResponses.Forbidden("Missing scopes for Spotify OAuth token"),
                        404 => ProblemResponses.NotFound("Resource not found"),
                        429 => ProblemResponses.TooManyRequests("You have exceeded Spotify API rate limits"),
                        503 => ProblemResponses.ServiceUnavailable("Spotify API is unavailable"),
                        _ => ProblemResponses.BadGateway("Spotify API failure"),
                    };
                    break;
                }
            default:
                {
                    context.Result = ProblemResponses.InternalServerProblem("Internal server error");
                    break;
                }
        }
    }

}
