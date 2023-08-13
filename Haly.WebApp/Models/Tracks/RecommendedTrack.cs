using Haly.WebApp.Models.Cards;

namespace Haly.WebApp.Models.Tracks;

public class RecommendedTrack : Track
{
    public ReleaseItem Album { get; set; }
}
