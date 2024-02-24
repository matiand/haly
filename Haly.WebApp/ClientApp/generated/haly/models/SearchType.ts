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
export const SearchType = {
    All: 'All',
    Album: 'Album',
    Artist: 'Artist',
    Playlist: 'Playlist',
    Track: 'Track'
} as const;
export type SearchType = typeof SearchType[keyof typeof SearchType];


export function SearchTypeFromJSON(json: any): SearchType {
    return SearchTypeFromJSONTyped(json, false);
}

export function SearchTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchType {
    return json as SearchType;
}

export function SearchTypeToJSON(value?: SearchType | null): any {
    return value as any;
}
