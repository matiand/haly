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
 * @interface PlaylistBriefDto
 */
export interface PlaylistBriefDto {
    /**
     * 
     * @type {string}
     * @memberof PlaylistBriefDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PlaylistBriefDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof PlaylistBriefDto
     */
    ownerId: string;
    /**
     * 
     * @type {string}
     * @memberof PlaylistBriefDto
     */
    description?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PlaylistBriefDto
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PlaylistBriefDto
     */
    thumbnailUrl?: string | null;
}

/**
 * Check if a given object implements the PlaylistBriefDto interface.
 */
export function instanceOfPlaylistBriefDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "ownerId" in value;

    return isInstance;
}

export function PlaylistBriefDtoFromJSON(json: any): PlaylistBriefDto {
    return PlaylistBriefDtoFromJSONTyped(json, false);
}

export function PlaylistBriefDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaylistBriefDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'ownerId': json['ownerId'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'thumbnailUrl': !exists(json, 'thumbnailUrl') ? undefined : json['thumbnailUrl'],
    };
}

export function PlaylistBriefDtoToJSON(value?: PlaylistBriefDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'ownerId': value.ownerId,
        'description': value.description,
        'imageUrl': value.imageUrl,
        'thumbnailUrl': value.thumbnailUrl,
    };
}

