const mongo = require( "mongodb" );
const dbLib = require( __dirname + "/dbUtils" );
const _ = require( "lodash" );

class MongoDB {
    constructor( dbHost, port, dbName, collection, logger ) {
        this.dbHost = dbHost;
        this.port = port;
        this.dbName = dbName;
        this.collection = collection;
        this.logger = logger;
    }
    async connect() {
        let url = `${this.dbHost}:${this.port}`;
        let conn = await mongo.connect( url, { useNewUrlParser: true } )
            .catch( ( err ) => {
                this.logger.error( `Connection error to MongoDB on Host:${this.dbHost}, Port:${this.port}` );
                throw err;
            } );
        this.logger.log( `Connected to MongoDB on Host: ${this.dbHost}, Port:${this.port}` );
        return conn;
    }
    async find( query ) {
        let conn = await this.connect();
        let result = await conn.db( this.dbName ).collection( this.collection ).find( query ).toArray();
        conn.close();
        return result;
    }
    async insert( data ) {
        let conn = await this.connect();
        let result = await conn.db( this.dbName ).collection( this.collection ).insertOne( data );
        conn.close();
        if( result.result.n == 0 ) {
            let errMsg = `Insert failed to MongoDB collection: ${this.collection}`
            this.logger.error( errMsg );
            throw new Error( errMsg );
        }
        return result;
    }
    async update( query, data ) {
        let conn = await this.connect();
        let result = await conn.db( this.dbName ).collection( this.collection ).updateOne( query, data );
        conn.close();
        if( result.result.n == 0 ) {
            let errMsg = `Update failed to MongoDB collection: ${this.collection}`
            this.logger.error( errMsg );
            throw new Error( errMsg );
        }
        return result;
    }
    async delete( query ) {
        let conn = await this.connect();
        let result = await conn.db( this.dbName ).collection( this.collection ).deleteOne( query );
        conn.close();
        if( result.result.n == 0 ) {
            let errMsg = `Delete failed to MongoDB collection: ${this.collection}`
            this.logger.error( errMsg );
            throw new Error( errMsg );
        }
        return result;
    }
}

module.exports = MongoDB;