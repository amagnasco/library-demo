// general communication between services
declare global {
    namespace App {

        type Fate<T = any> = Promise<Karma<T>>
        type HopeFor<T> = Awaited<Karma<T>>

        type Karma<T = any> = KarmicSuccess<T> | KarmicFailure

        interface KarmicSuccess<T = any> {
            success: true;
            data: T;
        }

        interface KarmicFailure {
            success: false;
            error: string;
            clean?: string;
        }

        interface CRUDSVC<T> {
            create: Fate<T>;
            read: Fate<T>;
            readAll: Fate<T>;
            update: Fate<T>;
            delete: Fate<T>;
        }

        type Smoke = Promise<void>

        type NameOf<T> = keyof { [key: this]: any }
    }
}
export {} // treat as module
