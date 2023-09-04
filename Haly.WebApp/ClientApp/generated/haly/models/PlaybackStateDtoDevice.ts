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
import type { DeviceDto } from './DeviceDto';
import {
    DeviceDtoFromJSON,
    DeviceDtoFromJSONTyped,
    DeviceDtoToJSON,
} from './DeviceDto';

/**
 * 
 * @export
 * @interface PlaybackStateDtoDevice
 */
export interface PlaybackStateDtoDevice {
    /**
     * 
     * @type {string}
     * @memberof PlaybackStateDtoDevice
     */
    id: string;
    /**
     * 
     * @type {boolean}
     * @memberof PlaybackStateDtoDevice
     */
    isActive: boolean;
    /**
     * 
     * @type {string}
     * @memberof PlaybackStateDtoDevice
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof PlaybackStateDtoDevice
     */
    volumePercent: number;
}

/**
 * Check if a given object implements the PlaybackStateDtoDevice interface.
 */
export function instanceOfPlaybackStateDtoDevice(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "isActive" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "volumePercent" in value;

    return isInstance;
}

export function PlaybackStateDtoDeviceFromJSON(json: any): PlaybackStateDtoDevice {
    return PlaybackStateDtoDeviceFromJSONTyped(json, false);
}

export function PlaybackStateDtoDeviceFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlaybackStateDtoDevice {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'isActive': json['isActive'],
        'name': json['name'],
        'volumePercent': json['volumePercent'],
    };
}

export function PlaybackStateDtoDeviceToJSON(value?: PlaybackStateDtoDevice | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'isActive': value.isActive,
        'name': value.name,
        'volumePercent': value.volumePercent,
    };
}

