using Haly.GeneratedClients;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public static class ImageObjectCollectionExtensions
{
    public static string? FindLargestImageUrl(this ICollection<ImageObject> images)
    {
        return images.FirstOrDefault()?.Url;
    }

    // Usually the medium image has similar dimensions to what we want to display to the user.
    public static string? FindMediumImageUrl(this ICollection<ImageObject> images)
    {
        if (images.Count > 1) return images.ElementAt(index: 1).Url;

        return images.FirstOrDefault()?.Url;
    }

    public static string? FindSmallestImageUrl(this ICollection<ImageObject> images)
    {
        return images.LastOrDefault()?.Url;
    }
}
