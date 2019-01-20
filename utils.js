class ExceptionWraper {
    constructor( error ) {
        this.description = error.message;
    }
    toJSON() {
        return { errorDescription: this.description };
    }
}

var lib = {
    ExceptionWraper: ExceptionWraper
}

module.exports = lib;