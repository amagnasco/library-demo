/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Media } from '../models/Media';
import type { MediaInput } from '../models/MediaInput';
import type { MediaUpdate } from '../models/MediaUpdate';
import type { Status } from '../models/Status';
import type { StatusInput } from '../models/StatusInput';
import type { StatusUpdate } from '../models/StatusUpdate';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * List users
     * @returns User A list of users
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users',
        });
    }
    /**
     * Get user by ID
     * @param id
     * @returns User A user
     * @throws ApiError
     */
    public static getUsers1(
        id: number,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * List media
     * @returns Media A list of media
     * @throws ApiError
     */
    public static getMedia(): CancelablePromise<Array<Media>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/media',
        });
    }
    /**
     * Create media
     * @param requestBody
     * @returns Media Created
     * @throws ApiError
     */
    public static postMedia(
        requestBody: MediaInput,
    ): CancelablePromise<Media> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/media',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get media by ID
     * @param id
     * @returns Media A media item
     * @throws ApiError
     */
    public static getMedia1(
        id: number,
    ): CancelablePromise<Media> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/media/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update media
     * @param id
     * @param requestBody
     * @returns Media Updated
     * @throws ApiError
     */
    public static patchMedia(
        id: number,
        requestBody: MediaUpdate,
    ): CancelablePromise<Media> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/media/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete media
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteMedia(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/media/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * List media status records
     * @returns Status A list of media status
     * @throws ApiError
     */
    public static getStatus(): CancelablePromise<Array<Status>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status',
        });
    }
    /**
     * Create media status
     * @param requestBody
     * @returns Status Created
     * @throws ApiError
     */
    public static postStatus(
        requestBody: StatusInput,
    ): CancelablePromise<Status> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/status',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get media status by ID
     * @param id
     * @returns Status A media status record
     * @throws ApiError
     */
    public static getStatus1(
        id: number,
    ): CancelablePromise<Status> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/status/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update media status
     * @param id
     * @param requestBody
     * @returns Status Updated
     * @throws ApiError
     */
    public static patchStatus(
        id: number,
        requestBody: StatusUpdate,
    ): CancelablePromise<Status> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/status/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Read all media (bulk query)
     * Returns all media, optionally filtered
     * @param requestBody
     * @returns Media List of media
     * @throws ApiError
     */
    public static postMediaReadAll(
        requestBody?: {
            ids?: Array<number>;
            active?: boolean;
            tags?: Array<string>;
        },
    ): CancelablePromise<Array<Media>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/media/read-all',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Read all media status records (bulk query)
     * Returns all media status records, optionally filtered
     * @param requestBody
     * @returns Status List of media status records
     * @throws ApiError
     */
    public static postStatusReadAll(
        requestBody?: {
            mediaIds?: Array<number>;
            userIds?: Array<number>;
            type?: 'ready' | 'loaned' | 'returned';
            fromDate?: string;
            toDate?: string;
        },
    ): CancelablePromise<Array<Status>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/status/read-all',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
