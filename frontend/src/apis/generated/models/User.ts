/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Locale } from './Locale';
export type User = {
    id: number;
    active: boolean;
    login: string;
    type: User.type;
    locale?: Locale;
    phone?: string;
};
export namespace User {
    export enum type {
        ADMIN = 'admin',
        PATRON = 'patron',
    }
}

