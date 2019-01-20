class SimpleLogger {
    log( data ) {
        console.log( data );
    }
    error( error ) {
        console.error( error );
    }
}

class LogManager {
    constructor() {
    }
    static getLoogger() {
        return new SimpleLogger();
    }
}

var lib = {
    SimpleLogger: SimpleLogger,
    LogManager: LogManager
};

module.exports = lib;