/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MediaInput = {
    type: MediaInput.type;
    title: string;
    creator: string;
    desc?: string;
    tags?: Array<string>;
    added: string;
    active: boolean;
    cost?: number;
};
export namespace MediaInput {
    export enum type {
        BOOK = 'book',
    }
}

