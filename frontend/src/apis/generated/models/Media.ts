/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Media = {
    id: number;
    type: Media.type;
    title: string;
    creator: string;
    desc?: string;
    tags?: Array<string>;
    added: string;
    active: boolean;
    cost?: number;
};
export namespace Media {
    export enum type {
        BOOK = 'book',
    }
}

