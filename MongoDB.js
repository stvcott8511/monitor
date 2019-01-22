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
            mongo.connect( url, { useNewUrlParser: true }, ( err, db ) => {
                if ( _.isNull( db ) ) { 
                    this.logger.log( `Connection error to MongoDB Host:${this.dbHost}, Port:${this.port}` );
                    reject( err );
                    return;
                } 
                this.logger.log( `Connected to MongoDB: ${this.dbHost}` );
                resolve( db );
            } );
        } );
    }
    find( data ) {
        return new Promise( ( resolve, reject ) => {
            this.connect().then( ( db ) => {
                db.db( this.dbName ).collection( this.collection ).find.toArray( data, ( err, result ) => {
                    if( _.isNull( result ) ) {
                        this.logger.log( `Find to MongoDB collection: ${this.collection}` );
                        // TODO error logging
                        reject( err );
                    } else {
                        resolve( result );
                    }
                    db.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );    
    }
    insert( data ) {
        return new Promise( ( resolve, reject ) => {
            this.connect().then( ( db ) => {
                db.db( this.dbName ).collection( this.collection ).insertOne( data, ( err, result ) => {
                    if( _.isNull( result ) ) {
                        this.logger.log( `Insertion failed to MongoDB collection: ${this.collection}` );
                        // TODO error logging
                        reject( err );
                    } else {
                        resolve( result );
                    };
                    db.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );
    }
    update( data ) {
        return new Promise( ( resolve, reject ) => {
            this.connect.then( ( db ) => {
                db.db( this.dbName ).collection( this.collection ).updateOne( data, ( err, result ) => {
                    if( _.isNull( result ) ) {
                        this.logger.log( `Update failed to MongoDB collection: ${this.collection}` );
                        // TODO error logging
                        reject( err );
                    } else {
                        resolve( result );
                    };
                    db.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );
    }
    delete( data ) {
        return new Promise( ( resolve, reject ) => {
            this.connect().then( ( db ) => {
                db.db( this.dbName ).collection( this.collection ).deleteOne( data, ( err, result ) => {
                    if( _.isNull( result ) ) {
                        this.logger.log( `Update failed to MongoDB collection: ${this.collection}` );
                        // TODO error logging
                        reject( err );
                    } else {
                        resolve( result );
                    };
                    db.close();
                } );
            } ).catch( ( err ) => {
                reject( err );
            } );
        } );
    }
}

module.exports = MongoDB;