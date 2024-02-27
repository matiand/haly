namespace Haly.WebApp.Models.Jobs;

public class CollectNewReleasesJob : Job
{
    public string UserId { get; set; }

    public PrivateUser User { get; set; }
}
