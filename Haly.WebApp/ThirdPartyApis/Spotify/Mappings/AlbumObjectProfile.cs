using System.Globalization;
using Haly.GeneratedClients;
using Haly.WebApp.Models;
using Mapster;

namespace Haly.WebApp.ThirdPartyApis.Spotify.Mappings;

public class AlbumObjectProfile : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.ForType<AlbumObject, AlbumDetailed>()
            .Map(dest => dest.ImageUrl, src => src.Images.FindMediumImageUrl())
            .Map(dest => dest.Type, src => GetAlbumType(src.Album_type, src.Total_tracks))
            .Map(dest => dest.Copyrights, src => GetCopyrights(src.Copyrights))
            .Map(dest => dest.ReleaseDate,
                src => DateOnly.Parse(src.Release_date!, CultureInfo.InvariantCulture));

        config.ForType<SimplifiedAlbumObject, Album>()
            // We want the smallest ones, because we only show those images as album covers of
            // tracks inside playlist view.
            .Map(dest => dest.ImageUrl, src => src.Images.FindSmallImageUrl());
    }


    private static AlbumType GetAlbumType(AlbumBaseAlbum_type? type, int trackTotal)
    {
        return (type, trackTotal) switch
        {
            (AlbumBaseAlbum_type.Compilation, _) => AlbumType.Compilation,
            (AlbumBaseAlbum_type.Single, 1) => AlbumType.OneSong,
            (AlbumBaseAlbum_type.Single, _) => AlbumType.Ep,
            _ => AlbumType.Album,
        };
    }

    private static List<string> GetCopyrights(ICollection<CopyrightObject> copyrights)
    {
        var copyright = copyrights.FirstOrDefault(c => c.Type == "C");
        var performanceCopyright = copyrights.FirstOrDefault(c => c.Type == "P");

        var data = new List<string>();
        if (copyright is not null)
        {
            if (copyright.Text.Contains(value: '©'))
            {
                data.Add(copyright.Text);
            }

            else if (copyright.Text.StartsWith("(C)", StringComparison.InvariantCultureIgnoreCase))
            {
                var fixedText = string.Concat("© ", copyright.Text.AsSpan(start: 4));
                data.Add(fixedText);
            }
            else
            {
                var fixedText = string.Concat("© ", copyright.Text);
                data.Add(fixedText);
            }
        }

        if (performanceCopyright is not null)
        {
            if (performanceCopyright.Text.Contains(value: '℗'))
            {
                data.Add(performanceCopyright.Text);
            }

            else if (performanceCopyright.Text.StartsWith("(P)", StringComparison.InvariantCultureIgnoreCase))
            {
                var fixedText = string.Concat("℗ ", performanceCopyright.Text.AsSpan(start: 4));
                data.Add(fixedText);
            }
            else
            {
                var fixedText = string.Concat("℗ ", performanceCopyright.Text);
                data.Add(fixedText);
            }
        }

        return data;
    }
}
