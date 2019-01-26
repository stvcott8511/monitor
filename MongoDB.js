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
    connect() {
        return new Promise( ( resolve, reject ) => {
            let url = `${this.dbHost}:${this.port}`;
            mongo.connect( url, { useNewUrlParser: true }, ( err, conn ) => {
                if ( _.isNull( conn ) || _.isUndefined( conn ) ) { 
                    this.logger.error( `Connection error to MongoDB on Host:${this.dbHost}, Port:${this.port}` );
                    reject( err );
                    return;
                } 
                this.logger.log( `Connected to MongoDB on Host: ${this.dbHost}, Port:${this.port}` );
                resolve( conn );
            } );
        } );
    }
    find( query ) {
        return new Promise( ( resolve, reject ) => {
            this.connect().then( ( conn ) => {
                conn.db( this.dbName ).collection( this.collection ).find( query ).toArray( ( err, result ) => {
                    if( _.isNull( result ) || _.isUndefined( result ) ) {
                        this.logger.error( `Find to MongoDB collection: ${this.collection}` );
                        reject( err );
                    } else {
                        resolve( result );
                    }
                    conn.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );    
    }
    insert( data ) {
        return new Promise( ( resolve, reject ) => {
            this.connect().then( ( conn ) => {
                conn.db( this.dbName ).collection( this.collection ).insertOne( data, ( err, result ) => {
                    if( _.isNull( result ) || _.isUndefined( result ) ) {
                        this.logger.error( `Insertion failed to MongoDB collection: ${this.collection}` );
                        reject( err );
                    } else {
                        resolve( result );
                    };
                    conn.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );
    }
    update( query, data ) {
        return new Promise( ( resolve, reject ) => {
            this.connect().then( ( conn ) => {
                conn.db( this.dbName ).collection( this.collection ).updateOne( query, data, ( err, result ) => {
                    if( _.isNull( result ) || _.isUndefined( result ) ) {
                        this.logger.error( `Update failed to MongoDB collection: ${this.collection}` );
                        reject( err );
                    } else {
                        resolve( result );
                    };
                    conn.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );
    }
    delete( query ) {
        return new Promise( ( resolve, reject ) => {
            this.connect().then( ( conn ) => {
                conn.db( this.dbName ).collection( this.collection ).deleteOne( query, ( err, result ) => {
                    if( _.isNull( result ) || _.isUndefined( result ) ) {
                        this.logger.error( `Update failed to MongoDB collection: ${this.collection}` );
                        reject( err );
                    } else {
                        resolve( result );
                    };
                    conn.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );
    }
}

module.exports = MongoDB;