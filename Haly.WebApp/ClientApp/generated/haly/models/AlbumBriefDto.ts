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
 * @interface AlbumBriefDto
 */
export interface AlbumBriefDto {
    /**
     * 
     * @type {string}
     * @memberof AlbumBriefDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AlbumBriefDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof AlbumBriefDto
     */
    imageUrl?: string | null;
}

/**
 * Check if a given object implements the AlbumBriefDto interface.
 */
export function instanceOfAlbumBriefDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;

    return isInstance;
}

export function AlbumBriefDtoFromJSON(json: any): AlbumBriefDto {
    return AlbumBriefDtoFromJSONTyped(json, false);
}

export function AlbumBriefDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlbumBriefDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
    };
}

export function AlbumBriefDtoToJSON(value?: AlbumBriefDto | null): any {
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
