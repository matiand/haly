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
 * @interface UserProfileDto
 */
export interface UserProfileDto {
    /**
     * 
     * @type {string}
     * @memberof UserProfileDto
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserProfileDto
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof UserProfileDto
     */
    followersTotal: number;
    /**
     * 
     * @type {string}
     * @memberof UserProfileDto
     */
    imageUrl?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof UserProfileDto
     */
    isFollowed: boolean;
}

/**
 * Check if a given object implements the UserProfileDto interface.
 */
export function instanceOfUserProfileDto(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "followersTotal" in value;
    isInstance = isInstance && "isFollowed" in value;

    return isInstance;
}

export function UserProfileDtoFromJSON(json: any): UserProfileDto {
    return UserProfileDtoFromJSONTyped(json, false);
}

export function UserProfileDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserProfileDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'followersTotal': json['followersTotal'],
        'imageUrl': !exists(json, 'imageUrl') ? undefined : json['imageUrl'],
        'isFollowed': json['isFollowed'],
    };
}

export function UserProfileDtoToJSON(value?: UserProfileDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'followersTotal': value.followersTotal,
        'imageUrl': value.imageUrl,
        'isFollowed': value.isFollowed,
    };
}

