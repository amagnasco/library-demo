/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Status = {
    id: number;
    mediaId: number;
    type: Status.type;
    user: number;
    date: string;
};
export namespace Status {
    export enum type {
        READY = 'ready',
        LOANED = 'loaned',
        RETURNED = 'returned',
    }
}

