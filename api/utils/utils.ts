import * as _ from 'lodash';

export interface Error {
    message: string;
}

export class ExceptionWrapper {
    status: string;

    description: string;

    constructor(error: Error) {
        this.status = 'Error';
        this.description = error.message;
    }

    toJson() {
        let obj = { status: this.status, errorDescription: this.description };
        return obj;
    }
}