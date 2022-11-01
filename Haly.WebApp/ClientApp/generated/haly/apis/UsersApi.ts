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
  ProblemDetails,
  TrackDto,
  UserDto,
  UserPlaylistDto,
} from '../models';
import {
    ProblemDetailsFromJSON,
    ProblemDetailsToJSON,
    TrackDtoFromJSON,
    TrackDtoToJSON,
    UserDtoFromJSON,
    UserDtoToJSON,
    UserPlaylistDtoFromJSON,
    UserPlaylistDtoToJSON,
} from '../models';

export interface GetLikedSongsRequest {
    userId: string;
    xSpotifyToken: string;
    market?: string;
}

export interface GetUserRequest {
    userId: string;
}

export interface PutCurrentUserRequest {
    xSpotifyToken: string;
}

export interface PutUserPlaylistsRequest {
    userId: string;
    xSpotifyToken: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Get current user \'Liked Songs\' collection
     */
    async getLikedSongsRaw(requestParameters: GetLikedSongsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TrackDto>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getLikedSongs.');
        }

        if (requestParameters.xSpotifyToken === null || requestParameters.xSpotifyToken === undefined) {
            throw new runtime.RequiredError('xSpotifyToken','Required parameter requestParameters.xSpotifyToken was null or undefined when calling getLikedSongs.');
        }

        const queryParameters: any = {};

        if (requestParameters.market !== undefined) {
            queryParameters['market'] = requestParameters.market;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xSpotifyToken !== undefined && requestParameters.xSpotifyToken !== null) {
            headerParameters['X-Spotify-Token'] = String(requestParameters.xSpotifyToken);
        }

        const response = await this.request({
            path: `/Users/{userId}/tracks`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TrackDtoFromJSON));
    }

    /**
     * Get current user \'Liked Songs\' collection
     */
    async getLikedSongs(requestParameters: GetLikedSongsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TrackDto>> {
        const response = await this.getLikedSongsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get user from our cache
     * Get user by id
     */
    async getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Users/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * Get user from our cache
     * Get user by id
     */
    async getUser(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.getUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetches current user from Spotify API, updates our cache with that data, creates new User if he\'s missing
     * Update current user
     */
    async putCurrentUserRaw(requestParameters: PutCurrentUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserDto>> {
        if (requestParameters.xSpotifyToken === null || requestParameters.xSpotifyToken === undefined) {
            throw new runtime.RequiredError('xSpotifyToken','Required parameter requestParameters.xSpotifyToken was null or undefined when calling putCurrentUser.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xSpotifyToken !== undefined && requestParameters.xSpotifyToken !== null) {
            headerParameters['X-Spotify-Token'] = String(requestParameters.xSpotifyToken);
        }

        const response = await this.request({
            path: `/Users/me`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserDtoFromJSON(jsonValue));
    }

    /**
     * Fetches current user from Spotify API, updates our cache with that data, creates new User if he\'s missing
     * Update current user
     */
    async putCurrentUser(requestParameters: PutCurrentUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserDto> {
        const response = await this.putCurrentUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Fetches user playlists from Spotify API, updates our cache with that data.
     * Update user playlists
     */
    async putUserPlaylistsRaw(requestParameters: PutUserPlaylistsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<UserPlaylistDto>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling putUserPlaylists.');
        }

        if (requestParameters.xSpotifyToken === null || requestParameters.xSpotifyToken === undefined) {
            throw new runtime.RequiredError('xSpotifyToken','Required parameter requestParameters.xSpotifyToken was null or undefined when calling putUserPlaylists.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xSpotifyToken !== undefined && requestParameters.xSpotifyToken !== null) {
            headerParameters['X-Spotify-Token'] = String(requestParameters.xSpotifyToken);
        }

        const response = await this.request({
            path: `/Users/{userId}/playlists`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(UserPlaylistDtoFromJSON));
    }

    /**
     * Fetches user playlists from Spotify API, updates our cache with that data.
     * Update user playlists
     */
    async putUserPlaylists(requestParameters: PutUserPlaylistsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<UserPlaylistDto>> {
        const response = await this.putUserPlaylistsRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
