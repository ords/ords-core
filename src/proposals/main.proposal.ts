import { Observable, Observer } from 'rxjs';

/**
 * Proposal for pesant taking care of the microservices
 * root: none is attacted
 */
export namespace main {
    /**
     * Operational flags
     */
    export namespace flag {
        /**
         * Indicate that a flag is send
         */
        export const FLAGSEND = 'flag_send';
        /**
         * Flags for datatype
         */
        export namespace dataType {
            /**
             * Data type send back is array
             */
            export const MULTIPLE = 'array is returned'
            /**
             * Object is send back
             */
            export const OBJECT = 'OBJECT IS RETURNED'
            /**
             * Raw value suca as a number or date returned
             */
            export const RAW = 'string number or other'
        }
        /**
         * Common errors
         */
        export namespace error {
            /**
             * No root found
             */
            export const NO_ROOT_FOUND = 'No root found for command';
            /**
             * No operation by that name is found on root
             */
            export const NO_NAME_ON_ROOT = 'No name on root found';
            /**
             * Microservice allready exists on root
             */
            export const NAME_ON_ROOT_EXISTS = 'Name on root allready exists';
        }
    }
    /**
     * Types used in proposals
     */
    export namespace types {
        /**
         * Observable in key value pairs
         */
        export type PairObserver = Observer<[any, any]>;
        /**
         * Observable in key value pairs
         */
        export type PairObservable = Observable<[any, any]>;
        /**
         * Base package of request
         */
        export interface _BaseRequest<T> {
            /**
             * Pairwise content of the request
             */
            package: T;
            /**
             * Authorised user identifier
             */
            auth: string;
            /**
             * Attachted to the request by registry is what msroot and name that is run
             */
            _meta?: {
                /**
                 * Microservice root
                 */
                msRoot: string,
                /**
                 * Microservice name
                 */
                msName: string;
            }
        }
        /**
         * Request package and auth information about the user
         */
        export type Request = _BaseRequest<PairObservable>;
        /**
         * Respons and meta of a service
         */
        export interface Response {
            /**
             * Pairwise result of the service
             */
            package: PairObservable;
            /**
             * Meta calculated in the service
             */
            meta: PairObservable;
        }
        /**
         * Microservice that takes request and two handlers for returned package and meta
         */
        export type MicroService = {
            (request: Request, metaHand: PairObserver, packHand: PairObserver): void
        }
        /**
         * Hook that can change behavior of either input or output depedning on the load given
         */
        export type Hook<T> = {
            (load: T): T
        }
        /**
         * Services hold in a pesant 
         */
        export type Services = {
            [root: string]: {
                [name: string]: MicroService
            }
        }
        /**
         * Hooks hold in a pesant
         */
        export type Hooks = {
            pre: Array<{
                root: string; // regexp
                name: string; // regexp
                hook: Hook<Request>
            }>,
            post: Array<{
                root: string; // regexp
                name: string; // regexp
                hook: Hook<Response>
            }>
        }
    }
    /**
     * Default content of packages
     */
    export interface Packages {
        /**
         * Packages can contain any key with corrosponding value
         */
        [key: string]: any
    }
}