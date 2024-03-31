using FluentValidation;
using Haly.WebApp.Features.Playlists;
using Haly.WebApp.Features.Playlists.AddTracks;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Features.ErrorHandling;

public static class ProblemResponses
{
    public static ActionResult BadRequest(ValidationException exception)
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

    public static ActionResult BadRequest(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/400",
            Status = 400,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 400 };
    }

    public static ActionResult Unauthorized(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/401",
            Status = 401,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 401 };
    }

    public static ActionResult Forbidden(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/403",
            Status = 403,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 404 };
    }

    public static ActionResult NotFound(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/404",
            Status = 404,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 404 };
    }

    public static ActionResult DatabaseConflict(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/409",
            Status = 409,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 409 };
    }

    public static ActionResult DuplicateConflict(PlaylistBriefDto playlist, DuplicateType duplicateType)
    {
        var problem = new DuplicateProblem
        {
            Type = "https://httpstatuses.io/409",
            Status = 409,
            Title = "One or more duplicates were found",
            PlaylistId = playlist.Id,
            PlaylistName = playlist.Name,
            DuplicateType = duplicateType,
        };

        return new ObjectResult(problem) { StatusCode = 409 };
    }

    public static ActionResult TooManyRequests(string title)
    {
        var problem = new Problem
        {
            Type = "https://httpstatuses.io/429",
            Status = 429,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 429 };
    }

    public static ActionResult InternalServerProblem(string title)
    {
        var problem = new Problem()
        {
            Type = "https://httpstatuses.io/500",
            Status = 500,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 500 };
    }

    public static ActionResult BadGateway(string title)
    {
        var problem = new Problem()
        {
            Type = "https://httpstatuses.io/502",
            Status = 502,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 500 };
    }

    public static ActionResult ServiceUnavailable(string title)
    {
        var problem = new Problem()
        {
            Type = "https://httpstatuses.io/503",
            Status = 503,
            Title = title,
        };

        return new ObjectResult(problem) { StatusCode = 503 };
    }
}
