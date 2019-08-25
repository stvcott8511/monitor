const _ = require( "lodash" );
const RabbitMQ = require( __dirname + "/RabbitMQ" );
const BaseQ = require( __dirname + "/BaseQ" );

var queueConfig = {};

function getBaseQ() {
    let config = {
        qClass: BaseQ
    }
    return config;
}

function getRabbitMQ()
{
    let config = {
        host: process.env.QHOST,
        port: process.env.QPORT,
        queueName: process.env.QNAME,
        qClass: RabbitMQ
    }
    return config;
}

queueConfig["Defualt"] = getBaseQ();
queueConfig["RabbitMQ"] = getRabbitMQ();
if( process.env.DEFAULT_QUEUE ) {
    queueConfig["Defualt"] = queueConfig[process.env.DEFAULT_QUEUE];
}

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

    return new baseConfig.qClass( baseConfig.host, baseConfig.port, baseConfig.queueName, logger );
}