using Haly.GeneratedClients;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Haly.WebApp.Controllers;

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
                        context.Result = InternalServerProblem("Failed to deserialize response from Spotify API");
                        break;
                    }

                    context.Result = apiException.StatusCode switch
                    {
                        400 => BadRequestProblem("X-Spotify-Token header is missing",
                            "It should contain a valid Spotify API access token"),
                        401 => UnauthorizedProblem("Bad or expired access token for using Spotify API"),
                        429 => TooManyRequestsProblem("You have exceeded Spotify API rate limits"),
                        _ => throw apiException,
                    };
                    break;
                }
        }
    }

    private static IActionResult InternalServerProblem(string title)
    {
        var problem = new ProblemDetails
        {
            Type = "https://www.rfc-editor.org/rfc/rfc7231#section-6.6.1",
            Status = 500,
            Title = title,
        };

        return new ObjectResult(problem);
    }

    private static IActionResult BadRequestProblem(string title, string? details)
    {
        var problem = new ProblemDetails
        {
            Type = "https://www.rfc-editor.org/rfc/rfc7231#section-6.5.1",
            Status = 400,
            Title = title,
            Detail = details,
        };

        return new ObjectResult(problem);
    }

    private static IActionResult UnauthorizedProblem(string title)
    {
        var problem = new ProblemDetails
        {
            Type = "https://www.rfc-editor.org/rfc/rfc7235#section-3.1",
            Status = 401,
            Title = title,
        };

        return new ObjectResult(problem);
    }

    private static IActionResult TooManyRequestsProblem(string title)
    {
        var problem = new ProblemDetails
        {
            Type = "https://www.rfc-editor.org/rfc/rfc6585#section-4",
            Status = 429,
            Title = title,
        };

        return new ObjectResult(problem);
    }
}
