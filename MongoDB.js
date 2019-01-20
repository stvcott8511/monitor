const mongo = require( "mongodb" );
const dbLib = require( __dirname + "/dbUtils" );
const _ = require( "lodash" );

class MongoDB {
    constructor( url, dbName, collection, logger ) {
        this.url = url;
        this.dbName = dbLib;
        this.collection = collection;
        this.logger = logger;
    }
    connect() {
        mongo.connect( this.url, this.dbName, ( err, db ) => {
            return new Promise( ( resolve, reject ) => {
                if ( _.isUndefined( db ) ) { 
                    this.logger.log( `Connected to MongoDB: ${this.url}` );
                    resolve( db );
                } else {
                    this.logger.log( `Connection error to MongoDB: ${this.url}` );
                    //TODO error logging
                    reject( err );
                }
            } );
        } );
    }
    find( data ) {
        return new Promise( ( resolve, reject ) => {
            this.connect.then( ( db ) => {
                db.collection( this.collection ).find.toArray( data, ( err, result ) => {
                    if( !_.isUndefined( err ) ) {
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
            this.connect.then( ( db ) => {
                db.collection( this.collection ).insertOne( data, ( err, result ) => {
                    if( !_.isUndefined( err ) ) {
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
                db.collection( this.collection ).updateOne( data, ( err, result ) => {
                    if( !_.isUndefined( err ) ) {
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
            this.connect.then( ( db ) => {
                db.collection( this.collection ).deleteOne( data, ( err, result ) => {
                    if( !_.isUndefined( err ) ) {
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