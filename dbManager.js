const MongoDB = require( "MongoDB" );

var databases = {};

// MongoDB Defualts
function getMongoDBConfig() {
    let config = {
        dbHost: "mongodb://localhost",
        port: 27017,
        collection: "monitor",
    }
    return new MongoDB( `${config.dbHost}:${config.port}/${config.collection}` );
}
// Add more DBs later
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

module.exports = function( name ) {
    if( instance ) {
        instance = new DBManager();
    }
    return instance.getDatabase( name );
}