/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StatusUpdate = {
    mediaId?: number;
    type?: StatusUpdate.type;
    user?: number;
    date?: string;
};
export namespace StatusUpdate {
    export enum type {
        READY = 'ready',
        LOANED = 'loaned',
        RETURNED = 'returned',
    }
}

