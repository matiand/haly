using FluentValidation;

namespace Haly.WebApp.Features.Player.AddToQueue;

public class AddToQueueCommandValidator : AbstractValidator<AddToQueueCommand>
{
    public AddToQueueCommandValidator()
    {
        RuleFor(command => command.CollectionUri)
            .Must(uri => !string.IsNullOrWhiteSpace(uri))
            .When(command => command.TrackUris is null)
            .WithMessage("Either CollectionUri or TrackUris must be provided.");

        RuleFor(command => command.TrackUris)
            .Must(uris => uris is not null && uris.All(uri => !string.IsNullOrWhiteSpace(uri)))
            .When(command => command.CollectionUri is null)
            .WithMessage("Either CollectionUri or TrackUris must be provided.");
    }
}
