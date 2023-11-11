using FluentValidation;

namespace Haly.WebApp.Features.Player.AddToQueue;

public class AddToQueueCommandValidator : AbstractValidator<AddToQueueCommand>
{
    public AddToQueueCommandValidator()
    {
        RuleFor(command => command.UserMarket).Must(market => !string.IsNullOrWhiteSpace(market));

        RuleFor(command => command.Body.CollectionUri)
            .Must(uri => !string.IsNullOrWhiteSpace(uri))
            .When(command => command.Body.TrackUris is null)
            .WithMessage("Either CollectionUri or TrackUris must be provided.");

        RuleFor(command => command.Body.TrackUris)
            .Must(uris => uris is not null && uris.All(uri => !string.IsNullOrWhiteSpace(uri)))
            .When(command => command.Body.CollectionUri is null)
            .WithMessage("Either CollectionUri or TrackUris must be provided.");
    }
}
