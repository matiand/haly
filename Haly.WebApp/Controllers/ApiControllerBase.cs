using Haly.WebApp.Features.ErrorHandling;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

[ApiController]
[ApiExceptionFilter]
[Route("[controller]")]
[Produces("application/json")]
public abstract class ApiControllerBase : ControllerBase
{
    private ISender? _mediator;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}
