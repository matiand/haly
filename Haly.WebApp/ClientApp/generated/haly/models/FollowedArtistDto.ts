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
 * @interface FollowedArtistDto
 */
export interface FollowedArtistDto {
    /**
     * 
     * @type {string}
     * @memberof FollowedArtistDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof FollowedArtistDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof FollowedArtistDto
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {number}
     * @memberof FollowedArtistDto
     */
    followersTotal: number;
}

/**
 * Check if a given object implements the FollowedArtistDto interface.
 */
export function instanceOfFollowedArtistDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "followersTotal" in value;

    return isInstance;
}

export function FollowedArtistDtoFromJSON(json: any): FollowedArtistDto {
    return FollowedArtistDtoFromJSONTyped(json, false);
}

export function FollowedArtistDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FollowedArtistDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'followersTotal': json['followersTotal'],
    };
}

export function FollowedArtistDtoToJSON(value?: FollowedArtistDto | null): any {
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
        'followersTotal': value.followersTotal,
    };
}
