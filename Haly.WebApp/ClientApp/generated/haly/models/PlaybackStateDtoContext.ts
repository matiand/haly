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
import type { PlaybackContextDto } from './PlaybackContextDto';
import {
    PlaybackContextDtoFromJSON,
    PlaybackContextDtoFromJSONTyped,
    PlaybackContextDtoToJSON,
} from './PlaybackContextDto';

/**
 * 
 * @export
 * @interface PlaybackStateDtoContext
 */
export interface PlaybackStateDtoContext {
    /**
     * 
     * @type {string}
     * @memberof PlaybackStateDtoContext
     */
    entityId: string;
    /**
     * 
     * @type {string}
     * @memberof PlaybackStateDtoContext
     */
    type: string;
}

/**
 * Check if a given object implements the PlaybackStateDtoContext interface.
 */
export function instanceOfPlaybackStateDtoContext(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entityId" in value;
    isInstance = isInstance && "type" in value;

    return isInstance;
}

export function PlaybackStateDtoContextFromJSON(json: any): PlaybackStateDtoContext {
    return PlaybackStateDtoContextFromJSONTyped(json, false);
}

export function PlaybackStateDtoContextFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaybackStateDtoContext {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entityId': json['entityId'],
        'type': json['type'],
    };
}

export function PlaybackStateDtoContextToJSON(value?: PlaybackStateDtoContext | null): any {
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

