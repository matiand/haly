using FluentValidation;

namespace Haly.WebApp.Features.Player.UpdatePlayback;

public class UpdatePlaybackCommandValidator : AbstractValidator<UpdatePlaybackCommand>
{
    public UpdatePlaybackCommandValidator()
    {
        RuleFor(command => command.ContextUri)
            .Must(uri => !string.IsNullOrWhiteSpace(uri))
            .When(command => string.IsNullOrWhiteSpace(command.TrackUri))
            .WithMessage("Either ContextUri or TrackUri must be provided.");

        RuleFor(command => command.TrackUri)
            .Must(uri => !string.IsNullOrWhiteSpace(uri))
            .When(command => string.IsNullOrWhiteSpace(command.ContextUri))
            .WithMessage("Either ContextUri or TrackUri must be provided.");
    }
}
