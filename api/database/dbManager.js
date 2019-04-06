const _ = require( "lodash" );
const MongoDB = require( __dirname + "/MongoDB" );

var databases = {};

// MongoDB Defualts
function getMongoDBConfig() {
    let config = {
        dbHost: "mongodb://localhost",
        port: 27017,
        dbname: "mondb",
        collection: "monitor",
        dbClass: MongoDB
    }
    return config;
}

// Add more DBs later
databases["Defualt"] = getMongoDBConfig();
databases["MongoDB"] = getMongoDBConfig();

class DBManager {
    constructor() {
        this.db = databases;
    }
    getDatabase( name ) {
        return this.db[name];
    }
}

let instance = undefined;

module.exports = function( name, logger, config ) { 
    if( _.isUndefined( instance ) ) {
        instance = new DBManager();
    }
    
    let baseConfig;
    try {
        baseConfig = instance.getDatabase( name );
    } catch ( err ) {
        throw new Error( `No config for database type: ${name}` );
    }

    baseConfig.dbHost = _.get( config,  "dbHost" , baseConfig.dbHost );
    baseConfig.port = _.get( config, "port" , baseConfig.port );
    baseConfig.dbname = _.get( config, "dbname" , baseConfig.dbname );
    baseConfig.collection = _.get( config, "collection", baseConfig.collection );

    return new baseConfig.dbClass(  baseConfig.dbHost, baseConfig.port, baseConfig.dbname, baseConfig.collection, logger );
}