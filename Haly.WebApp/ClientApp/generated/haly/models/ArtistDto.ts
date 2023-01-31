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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ArtistDto
 */
export interface ArtistDto {
    /**
     * 
     * @type {string}
     * @memberof ArtistDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ArtistDto
     */
    name: string;
}

/**
 * Check if a given object implements the ArtistDto interface.
 */
export function instanceOfArtistDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function ArtistDtoFromJSON(json: any): ArtistDto {
    return ArtistDtoFromJSONTyped(json, false);
}

export function ArtistDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArtistDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
    };
}

export function ArtistDtoToJSON(value?: ArtistDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
    };
}
