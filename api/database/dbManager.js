const _ = require( "lodash" );
const BaseDB = require( __dirname + "/BaseDB" );
const MongoDB = require( __dirname + "/MongoDB" );

var databaseConfig = {};

function getBaseDB() {
    let config = {
        dbClass: BaseDB
    }
    return config;
}

// MongoDB Defualts
function getMongoDBConfig() {
    let config = {
        dbHost: process.env.DBHOST,
        port: process.env.DBPORT,
        dbname: process.env.DBNAME,
        dbClass: MongoDB
    }
    return config;
}

// Add more DB Configs later
databaseConfig["Defualt"] = getBaseDB();
databaseConfig["mongoDB"] = getMongoDBConfig();
if( process.env.DEFAULT_DB ) {
    databaseConfig["Defualt"] = databaseConfig[process.env.DEFAULT_DB];
}

class DBManager {
    constructor() {
        this.db = databaseConfig;
    }
    getDatabase( name ) {
        return this.db[name];
    }
}

let instance = undefined;

module.exports = function( name, logger, collection, config ) { 
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

    return new baseConfig.dbClass(  baseConfig.dbHost, baseConfig.port, baseConfig.dbname, collection, logger );
}