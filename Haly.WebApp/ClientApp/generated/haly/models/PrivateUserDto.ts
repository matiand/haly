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
 * @interface PrivateUserDto
 */
export interface PrivateUserDto {
    /**
     * 
     * @type {string}
     * @memberof PrivateUserDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof PrivateUserDto
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof PrivateUserDto
     */
    market: string;
    /**
     * 
     * @type {boolean}
     * @memberof PrivateUserDto
     */
    canUseSpotifyPlayer: boolean;
}

/**
 * Check if a given object implements the PrivateUserDto interface.
 */
export function instanceOfPrivateUserDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "market" in value;
    isInstance = isInstance && "canUseSpotifyPlayer" in value;

    return isInstance;
}

export function PrivateUserDtoFromJSON(json: any): PrivateUserDto {
    return PrivateUserDtoFromJSONTyped(json, false);
}

export function PrivateUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrivateUserDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'market': json['market'],
        'canUseSpotifyPlayer': json['canUseSpotifyPlayer'],
    };
}

export function PrivateUserDtoToJSON(value?: PrivateUserDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'market': value.market,
        'canUseSpotifyPlayer': value.canUseSpotifyPlayer,
    };
}
