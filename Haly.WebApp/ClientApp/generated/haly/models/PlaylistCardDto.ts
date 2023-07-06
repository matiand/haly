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
 * @interface PlaylistCardDto
 */
export interface PlaylistCardDto {
    /**
     * 
     * @type {string}
     * @memberof PlaylistCardDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PlaylistCardDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof PlaylistCardDto
     */
    imageUrl?: string | null;
}

/**
 * Check if a given object implements the PlaylistCardDto interface.
 */
export function instanceOfPlaylistCardDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function PlaylistCardDtoFromJSON(json: any): PlaylistCardDto {
    return PlaylistCardDtoFromJSONTyped(json, false);
}

export function PlaylistCardDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaylistCardDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
    };
}

export function PlaylistCardDtoToJSON(value?: PlaylistCardDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'imageUrl': value.imageUrl,
    };
}
