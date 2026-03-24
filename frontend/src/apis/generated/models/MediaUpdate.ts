/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MediaUpdate = {
    type?: MediaUpdate.type;
    title?: string;
    creator?: string;
    desc?: string;
    tags?: Array<string>;
    added?: string;
    active?: boolean;
    cost?: number;
};
export namespace MediaUpdate {
    export enum type {
        BOOK = 'book',
    }
}

