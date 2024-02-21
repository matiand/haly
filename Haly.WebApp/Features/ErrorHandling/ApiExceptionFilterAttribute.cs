using FluentValidation;
using Microsoft.AspNetCore.Mvc.Filters;
using GeneratedClient = Haly.GeneratedClients;

namespace Haly.WebApp.Features.ErrorHandling;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        // For validation use fluent validator
        // todo: Make sure this does not interfere with Polly
        var ex = context.Exception;

        Console.WriteLine($"Inside filter, exception happened:\n{ex.Message}");
        Console.WriteLine(ex);
        Console.WriteLine(ex.InnerException);

        switch (ex)
        {
            case ValidationException validationException:
                {
                    context.Result = ProblemResponses.BadRequestProblem(validationException);
                    break;
                }
            case GeneratedClient.ApiException apiException:
                {
                    var isDeserializationError = apiException.StatusCode == 200 ||
                                                 apiException.Message.Contains("Could not deserialize");
                    if (isDeserializationError)
                    {
                        context.Result =
                            ProblemResponses.InternalServerProblem("Failed to deserialize the response from Spotify API");
                        break;
                    }

                    context.Result = apiException.StatusCode switch
                    {
                        // 400 => ProblemResponses.BadRequestProblem("Bad request"),
                        400 => ProblemResponses.BadRequestProblem(apiException.Message),
                        401 => ProblemResponses.UnauthorizedProblem("Bad or expired Spotify API access token"),
                        404 => ProblemResponses.NotFound("Resource not found"),
                        429 => ProblemResponses.TooManyRequestsProblem("You have exceeded Spotify API rate limits"),
                        _ => ProblemResponses.BadGatewayProblem("Spotify API is unavailable"),
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
