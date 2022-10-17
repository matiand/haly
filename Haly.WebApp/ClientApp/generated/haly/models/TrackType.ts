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
export const TrackType = {
    Song: 'Song',
    Podcast: 'Podcast'
} as const;
export type TrackType = typeof TrackType[keyof typeof TrackType];


export function TrackTypeFromJSON(json: any): TrackType {
    return TrackTypeFromJSONTyped(json, false);
}

export function TrackTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrackType {
    return json as TrackType;
}

export function TrackTypeToJSON(value?: TrackType | null): any {
    return value as any;
}

