const _ = require( "lodash" );

class ExceptionWraper {
    constructor( error ) {
        this.status = "Error";
        this.description = error.message;
    }
    toJSON() {
        let obj = { status: this.status, errorDescription: this.description };
        if( _.isUndefined( this.errCode ) ) {
            obj.errCode = 1;
            return obj;
        }
        obj.errCode = this.errCode;
        return obj;
    }
}

var lib = {
    ExceptionWraper: ExceptionWraper
}

module.exports = lib;