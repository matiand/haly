using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Features.ErrorHandling;

public class ProblemResponses
{
    public static IActionResult InternalServerProblem(string title)
    {
        var problem = new ProblemDetails
        {
            Type = "https://www.rfc-editor.org/rfc/rfc7231#section-6.6.1",
            Status = 500,
            Title = title,
        };

        return new ObjectResult(problem);
    }

    public static IActionResult BadRequestProblem(string title, string? details)
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

    public static IActionResult BadRequestProblem(ValidationException exception)
    {
        var errors = exception.Errors.Select(failure => failure.ErrorMessage);
        var problem = new ProblemDetails
        {
            Type = "https://www.rfc-editor.org/rfc/rfc7231#section-6.5.1",
            Status = 400,
            Title = "One or more validation errors occured",
            Extensions = { { "errors", errors } },
        };

        return new ObjectResult(problem);
    }

    public static IActionResult UnauthorizedProblem(string title)
    {
        var problem = new ProblemDetails
        {
            Type = "https://www.rfc-editor.org/rfc/rfc7235#section-3.1",
            Status = 401,
            Title = title,
        };

        return new ObjectResult(problem);
    }

    public static IActionResult TooManyRequestsProblem(string title)
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
