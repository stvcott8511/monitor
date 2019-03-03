const _ = require( "lodash" );

class ExceptionWraper {
    constructor( error ) {
        this.status = "Error";
        this.description = error.message;
    }
    toJSON() {
        let obj = { status: this.status, errorDescription: this.description };
        return obj;
    }
}

var lib = {
    ExceptionWraper: ExceptionWraper
}

module.exports = lib;