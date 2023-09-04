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
 * @interface PlaybackContextDto
 */
export interface PlaybackContextDto {
    /**
     * 
     * @type {string}
     * @memberof PlaybackContextDto
     */
    entityId: string;
    /**
     * 
     * @type {string}
     * @memberof PlaybackContextDto
     */
    type: string;
}

/**
 * Check if a given object implements the PlaybackContextDto interface.
 */
export function instanceOfPlaybackContextDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entityId" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function PlaybackContextDtoFromJSON(json: any): PlaybackContextDto {
    return PlaybackContextDtoFromJSONTyped(json, false);
}

export function PlaybackContextDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaybackContextDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityId': json['entityId'],
        'type': json['type'],
    };
}

export function PlaybackContextDtoToJSON(value?: PlaybackContextDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entityId': value.entityId,
        'type': value.type,
    };
}

