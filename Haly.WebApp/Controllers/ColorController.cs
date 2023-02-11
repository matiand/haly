using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace Haly.WebApp.Controllers;

public class ColorController : ApiControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public ColorController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    [HttpGet]
    public async Task<ActionResult> Get(string imageUrl)
    {
        var stopwatch = Stopwatch.StartNew();

        using var client = _httpClientFactory.CreateClient();
        var stream = await client.GetStreamAsync(imageUrl);
        var image = await Image.LoadAsync<Rgb24>(stream);
        var colorThief = new ColorThief.ImageSharp.ColorThief();
        var colors = colorThief.GetPalette(image);

        Console.WriteLine($"Took {stopwatch.ElapsedMilliseconds}");

        return Ok();
    }
}
