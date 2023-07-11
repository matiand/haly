/* tslint:disable */
/* eslint-disable */
/**
 * Haly API
 * An ASP.NET Core Web API that adds quality of life improvements to Spotify and helps with music exploration
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
 * 
 * @export
 */
export const PlaylistTrackType = {
    Song: 'Song',
    Podcast: 'Podcast'
} as const;
export type PlaylistTrackType = typeof PlaylistTrackType[keyof typeof PlaylistTrackType];


export function PlaylistTrackTypeFromJSON(json: any): PlaylistTrackType {
    return PlaylistTrackTypeFromJSONTyped(json, false);
}

export function PlaylistTrackTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaylistTrackType {
    return json as PlaylistTrackType;
}

export function PlaylistTrackTypeToJSON(value?: PlaylistTrackType | null): any {
    return value as any;
}
