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
 * @interface RemoveTrackDto
 */
export interface RemoveTrackDto {
    /**
     * 
     * @type {string}
     * @memberof RemoveTrackDto
     */
    uri: string;
    /**
     * 
     * @type {number}
     * @memberof RemoveTrackDto
     */
    position: number;
}

/**
 * Check if a given object implements the RemoveTrackDto interface.
 */
export function instanceOfRemoveTrackDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "uri" in value;
    isInstance = isInstance && "position" in value;

    return isInstance;
}

export function RemoveTrackDtoFromJSON(json: any): RemoveTrackDto {
    return RemoveTrackDtoFromJSONTyped(json, false);
}

export function RemoveTrackDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RemoveTrackDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uri': json['uri'],
        'position': json['position'],
    };
}

export function RemoveTrackDtoToJSON(value?: RemoveTrackDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uri': value.uri,
        'position': value.position,
    };
}

