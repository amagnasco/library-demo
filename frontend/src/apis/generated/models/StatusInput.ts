/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StatusInput = {
    mediaId: number;
    type: StatusInput.type;
    user: number;
    date: string;
};
export namespace StatusInput {
    export enum type {
        READY = 'ready',
        LOANED = 'loaned',
        RETURNED = 'returned',
    }
}

