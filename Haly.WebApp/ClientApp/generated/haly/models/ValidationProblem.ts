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
 * @interface ValidationProblem
 */
export interface ValidationProblem {
    /**
     * 
     * @type {string}
     * @memberof ValidationProblem
     */
    type: string;
    /**
     * 
     * @type {number}
     * @memberof ValidationProblem
     */
    status: number;
    /**
     * 
     * @type {string}
     * @memberof ValidationProblem
     */
    title: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ValidationProblem
     */
    errors: Array<string>;
}

/**
 * Check if a given object implements the ValidationProblem interface.
 */
export function instanceOfValidationProblem(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "errors" in value;

    return isInstance;
}

export function ValidationProblemFromJSON(json: any): ValidationProblem {
    return ValidationProblemFromJSONTyped(json, false);
}

export function ValidationProblemFromJSONTyped(json: any, ignoreDiscriminator: boolean): ValidationProblem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'status': json['status'],
        'title': json['title'],
        'errors': json['errors'],
    };
}

export function ValidationProblemToJSON(value?: ValidationProblem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'status': value.status,
        'title': value.title,
        'errors': value.errors,
    };
}

