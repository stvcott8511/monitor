class BaseQ {
    constructor( host, port, queueName, logger ) {
        this.logger = logger;
    }
    push( message ){
        this.logger.log( `Testing push to queue: ${ JSON.stringify( message ) }` );
    }
}

module.exports = BaseQ;