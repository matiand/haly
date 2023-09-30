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
 * @interface UpdatePlaybackCommand
 */
export interface UpdatePlaybackCommand {
    /**
     * 
     * @type {string}
     * @memberof UpdatePlaybackCommand
     */
    contextUri: string;
    /**
     * 
     * @type {string}
     * @memberof UpdatePlaybackCommand
     */
    trackUri?: string | null;
}

/**
 * Check if a given object implements the UpdatePlaybackCommand interface.
 */
export function instanceOfUpdatePlaybackCommand(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "contextUri" in value;

    return isInstance;
}

export function UpdatePlaybackCommandFromJSON(json: any): UpdatePlaybackCommand {
    return UpdatePlaybackCommandFromJSONTyped(json, false);
}

export function UpdatePlaybackCommandFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdatePlaybackCommand {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'contextUri': json['contextUri'],
        'trackUri': !exists(json, 'trackUri') ? undefined : json['trackUri'],
    };
}

export function UpdatePlaybackCommandToJSON(value?: UpdatePlaybackCommand | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'contextUri': value.contextUri,
        'trackUri': value.trackUri,
    };
}

