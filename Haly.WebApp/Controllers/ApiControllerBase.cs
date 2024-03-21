using Haly.WebApp.Features.CurrentUser.TokenManagement;
using Haly.WebApp.Features.ErrorHandling;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

[ApiController]
[ServiceFilter(typeof(ApiExceptionFilter))]
[ServiceFilter(typeof(ValidateAccessTokenFilterService))]
[Route("[controller]")]
[Produces("application/json")]
public abstract class ApiControllerBase : ControllerBase
{
    private ISender? _mediator;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
}
