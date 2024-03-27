using DotSwashbuckle.AspNetCore.Annotations;
using Haly.WebApp.Features.ErrorHandling;
using Haly.WebApp.Features.Lyrics.FindLyrics;
using Haly.WebApp.Features.Lyrics.UpdateGeniusLyrics;
using Microsoft.AspNetCore.Mvc;

namespace Haly.WebApp.Controllers;

public class LyricsController : ApiControllerBase
{
    [HttpGet("{id}", Name = nameof(GetLyrics))]
    [SwaggerOperation(Summary = "Get lyrics from our cache")]
    [SwaggerResponse(statusCode: 200, "A Lyrics object", typeof(LyricsDto))]
    [SwaggerResponse(statusCode: 404, Type = typeof(Problem))]
    public async Task<ActionResult<LyricsDto>> GetLyrics(string id)
    {
        var response = await Mediator.Send(new GetLyricsQuery(id));

        if (response is null) return ProblemResponses.NotFound("Lyrics not found");

        return response;
    }

    [HttpPut("{id}")]
    [SwaggerOperation(Summary = "Update lyrics", Description = "Fetch lyrics from GENIUS and update our cache.")]
    [SwaggerResponse(statusCode: 201, "Lyrics created", typeof(LyricsDto))]
    [SwaggerResponse(statusCode: 204, "Lyrics updated")]
    public async Task<ActionResult<LyricsDto>> PutLyrics(string id, GeniusQueryBody geniusQuery)
    {
        var response = await Mediator.Send(new UpdateGeniusLyricsCommand(id, geniusQuery));

        if (response is not null)
        {
            return CreatedAtAction(nameof(GetLyrics), new { id = response.PlaybackId }, response);
        }

        return NoContent();
    }
}
