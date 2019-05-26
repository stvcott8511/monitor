const _ = require( "lodash" );

var queueConfig = {};

class BaseQ {
    constructor( logger ) {
        this.logger = logger;
    }
    push( message ){
        this.logger.log( `Testing push to queue: ${ JSON.stringify( message ) }` );
    }
}

function getBaseQ() {
    let config = {
        qClass: BaseQ
    }
    return config;
}

queueConfig["Defualt"] = getBaseQ();
//queueConfig["Kafka"] = getKafkaConfig();

class QManager {
    constructor(){
        this.q = queueConfig;
    }
    getQueue( name ) {
        return this.q[name];
    }
}

let instance = undefined;

module.exports = function( name, logger, config ) { 
    if( _.isUndefined( instance ) ) {
        instance = new QManager();
    }
    
    let baseConfig;
    try {
        baseConfig = instance.getQueue( name );
    } catch ( err ) {
        throw new Error( `No config for database type: ${name}` );
    }

    return new baseConfig.qClass( logger );
}