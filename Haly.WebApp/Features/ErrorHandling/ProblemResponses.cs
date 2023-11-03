using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Features.ErrorHandling;

public class ProblemResponses
{
    public static IActionResult BadRequestProblem(ValidationException exception)
    {
        var errors = exception.Errors.Select(failure => failure.ErrorMessage);
        var problem = new ValidationProblem()
        {
            Type = "https://httpstatuses.io/400",
            Status = 400,
            Title = "One or more validation errors occured",
            Errors = errors,
        };

        return new ObjectResult(problem) { StatusCode = 400 };
    }

    public static IActionResult BadRequestProblem(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/400",
            Status = 400,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 400 };
    }

    public static IActionResult UnauthorizedProblem(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/401",
            Status = 401,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 401 };
    }

    public static IActionResult NotFound(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/404",
            Status = 404,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 404 };
    }

    public static IActionResult DuplicateConflict(bool? allDuplicates, bool? someDuplicates)
    {
        var problem = new DuplicateProblem
        {
            Type = "https://httpstatuses.io/409",
            Status = 409,
            Title = "One or more duplicates were found",
            SomeDuplicates = someDuplicates ?? false,
            AllDuplicates = allDuplicates ?? false,
        };

        return new ObjectResult(problem) { StatusCode = 409 };
    }

    public static IActionResult TooManyRequestsProblem(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/429",
            Status = 429,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 429 };
    }

    public static IActionResult InternalServerProblem(string title)
    {
        var problem = new Problem()
        {
            Type = "https://httpstatuses.io/500",
            Status = 500,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 500 };
    }
}
