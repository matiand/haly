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


import * as runtime from '../runtime';
import type {
  PlaylistBriefDto,
  PlaylistCardDto,
  Problem,
  UserProfileDto,
} from '../models';
import {
    PlaylistBriefDtoFromJSON,
    PlaylistBriefDtoToJSON,
    PlaylistCardDtoFromJSON,
    PlaylistCardDtoToJSON,
    ProblemFromJSON,
    ProblemToJSON,
    UserProfileDtoFromJSON,
    UserProfileDtoToJSON,
} from '../models';

export interface CreatePlaylistRequest {
    userId: string;
    name?: string;
}

export interface GetPlaylistsRequest {
    userId: string;
}

export interface GetUserRequest {
    id: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public </b>
     * Create new playlist
     */
    async createPlaylistRaw(requestParameters: CreatePlaylistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PlaylistBriefDto>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling createPlaylist.');
        }

        const queryParameters: any = {};

        if (requestParameters.name !== undefined) {
            queryParameters['name'] = requestParameters.name;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users/{userId}/playlist`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlaylistBriefDtoFromJSON(jsonValue));
    }

    /**
     * This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-modify-public </b>
     * Create new playlist
     */
    async createPlaylist(requestParameters: CreatePlaylistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PlaylistBriefDto> {
        const response = await this.createPlaylistRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetch a list of the playlists owned or followed by user from Spotify<br/>This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-read-collaborative </b>
     * Get user\'s playlists
     */
    async getPlaylistsRaw(requestParameters: GetPlaylistsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlaylistCardDto>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getPlaylists.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users/{userId}/playlists`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlaylistCardDtoFromJSON));
    }

    /**
     * Fetch a list of the playlists owned or followed by user from Spotify<br/>This endpoint calls Spotify API.<br/>Scopes needed: <b> playlist-read-collaborative </b>
     * Get user\'s playlists
     */
    async getPlaylists(requestParameters: GetPlaylistsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlaylistCardDto>> {
        const response = await this.getPlaylistsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetch user from Spotify<br/>This endpoint calls Spotify API.
     * Get user
     */
    async getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserProfileDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserProfileDtoFromJSON(jsonValue));
    }

    /**
     * Fetch user from Spotify<br/>This endpoint calls Spotify API.
     * Get user
     */
    async getUser(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserProfileDto> {
        const response = await this.getUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
