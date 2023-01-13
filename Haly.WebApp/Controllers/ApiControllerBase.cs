using Haly.WebApp.Features.CurrentUser;
using Haly.WebApp.Features.ErrorHandling;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

[ApiController]
[ApiExceptionFilter]
[ServiceFilter(typeof(ValidateCurrentUserStoreFilterService))]
[Route("[controller]")]
[Produces("application/json")]
public abstract class ApiControllerBase : ControllerBase
{
    private ISender? _mediator;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}
