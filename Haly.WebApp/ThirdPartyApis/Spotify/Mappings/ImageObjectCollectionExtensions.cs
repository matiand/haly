using Haly.GeneratedClients;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public static class ImageObjectCollectionExtensions
{
    public static string? FindMediumImageUrl(this ICollection<ImageObject> images)
    {
        // If there is more than one image, we want to use the second one, because it has similar
        // dimensions to what we want to display to the user.
        if (images.Count > 1) return images.ElementAt(index: 1).Url;

        return images.FirstOrDefault()?.Url;
    }

    public static string? FindSmallImageUrl(this ICollection<ImageObject> images)
    {
        return images.LastOrDefault()?.Url;
    }
}
