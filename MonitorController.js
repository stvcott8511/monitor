const _ = require( "lodash" );
const moment = require( "moment" );
const dbManager = require( __dirname + "/dbManager" );

// Start MonitorController code
const errorMsg1 = "Monitor name is not defined";

function checkMonitor( monitor ) {
    return _.isUndefined( _.get( monitor, "name" ) );
}

function createLogErr( msg ) {
    let error = new Error( errorMsg1 );
    this.logger.error( error );
    return error;
}

class MonitorController {
    constructor( logger ) {
        this.logger = logger;
        this.dataBase = dbManager( "Defualt", logger );
    }

    /*
       [
        {
            name: "Monitor name",
        }
       ]
    */
    async findMonitor( monitor ) {
        if( checkMonitor( monitor ) ) {
            throw createLogErr( errorMsg1 ) ;
        }
        let result =  await this.dataBase.find( {
            name: {
                $eq: monitor.name
            }
        } ); 
        return result;
    }
    /*
        {
            name: "Monitor name",
            description: "Information about monitor"
            timeout: Length of time monitor does not respond {Optional}
        }
    */
    async addMonitor( monitor ) {
        if( checkMonitor( monitor ) ) {
            throw createLogErr( errorMsg1 ) ;
        }
        // TODO security
        let found = await this.dataBase.find( monitor );
        if( found.length >= 1 ) {
            throw new Error( `${monitor.name} already in database. Cannot add monitor with the same name` );
        }
        monitor.timeStamp = moment().format();
        let result = await this.dataBase.insert( monitor );
        if( result.result.n == 0 ) {
            throw new Error( `Adding monitor to database failed for collection: ${this.dataBase.collection}` );
        }
        let msg = "Monitor Added";
        this.logger.log( `${msg} on ${monitor.timeStamp}, Name: ${monitor.name}` );
        return { status: msg };
    }
    /*
        {
            name: "Monitor name",}
        }
    */
    async removeMonitor( monitor ) {
        if( checkMonitor( monitor ) ) {
            throw createLogErr( errorMsg1 ) ;
        }
        // TODO security
        let result = await this.dataBase.delete( { name: {
            $eq: monitor.name
        } } );
        if( result.result.n == 0 ) {
            throw new Error( `Removing monitor from database failed for collection: ${this.dataBase.collection}` );
        }
        let msg = "Monitor Remove";
        this.logger.log( `${msg} on ${moment().format()}, Name: ${monitor.name}` );
        return { status: msg };
    }
    // Update Monitor todo
        // if( result.result.n == 0 ) {
        //     let errMsg = `Update failed to MongoDB collection: ${this.collection}`
        //     this.logger.error( errMsg );
        //     throw new Error( errMsg );
        // }
}
// End MonitorController code

module.exports = MonitorController;