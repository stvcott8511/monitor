import * as _ from 'lodash';

/**
 * Basic Error type of which classes may implement.
 */
export interface Error {
    message: string;
}

export type ExceptionWrapperJson = {
    status: string;
    errorDescription: string;
    [x: string]: string;
};

/**
 * Wraps application exception information into a single object which contains
 * methods to convert into various data formats.
 */
export class ExceptionWrapper {
    status: string;

    description: string;

    constructor(error: Error) {
        this.status = 'Error';
        this.description = error.message;
    }

    /**
     * Converts the instance into a JSON format.
     */
    toJson(): ExceptionWrapperJson {
        let obj = { status: this.status, errorDescription: this.description };
        return obj;
    }
}