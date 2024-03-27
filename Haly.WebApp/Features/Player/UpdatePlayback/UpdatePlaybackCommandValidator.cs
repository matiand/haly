using FluentValidation;

namespace Haly.WebApp.Features.Player.UpdatePlayback;

public class UpdatePlaybackCommandValidator : AbstractValidator<UpdatePlaybackCommand>
{
    public UpdatePlaybackCommandValidator()
    {
        RuleFor(command => command.Body.ContextUri)
            .Must(uri => !string.IsNullOrWhiteSpace(uri))
            .When(command => string.IsNullOrWhiteSpace(command.Body.TrackUri))
            .WithMessage("Either ContextUri or TrackUri must be provided.");

        RuleFor(command => command.Body.TrackUri)
            .Must(uri => !string.IsNullOrWhiteSpace(uri))
            .When(command => string.IsNullOrWhiteSpace(command.Body.ContextUri))
            .WithMessage("Either ContextUri or TrackUri must be provided.");
    }
}
