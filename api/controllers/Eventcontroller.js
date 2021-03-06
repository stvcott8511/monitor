const _ = require( "lodash" );
const moment = require( "moment" );
const dbManager = require( __dirname + "/../database/dbManager" );

// Start Eventcontroller Code
const AlertTypes = [ "CLEAR", "LOW", "MED", "HIGH" ];
const errorMsg1 = "Monitor name or alert is not defined";
const errorMsg2 = "Alert must be the following values ( \"CLEAR\", \"LOW\", \"MED\", \"HIGH\" )";

function checkEvent( event ) {
    return _.isUndefined( _.get( event, "eventID" ) ) || _.isUndefined( _.get( event, "alert" ) || _.isUndefined( _.get( event, "monName" ) ) );
}

function checkAlertType( event ) {
    return !AlertTypes.includes( event.alert );
}

function validate( event ) {
    if( checkEvent( event ) ) {
        return errorMsg1;
    }
    if( checkAlertType( event ) ) {
        return errorMsg2;
    }
}

class Eventcontroller {
    constructor( logger ) {
        this.logger = logger;
        this.dataBase = dbManager( "Defualt", logger, "events" );
    }
    /*
        {
            eventID: "Event ID",
            linkedMon: "Monitor name"
            alert: One of the folowing [ "CLEAR", "LOW", "MED", "HIGH" ]
        }
    */
    async addEvent( event ) {
        if( validate( event ) ) {
            let error = new Error( validate( event ) );
            this.logger.error( error );
            throw error;
        }
        event.timeStamp = moment().format();
        let result = await this.dataBase.insert( event );
        if( result.result.n == 0 ) {
            throw new Error( `Adding event to database failed for collection: ${this.dataBase.collection}` );
        }
        let msg = "Event Added";
        this.logger.log( `${msg} on ${event.timeStamp}, Event Name: ${event.eventID}` );
        return { status: msg };
    }
    /*
        {
            monitor.monName: name
        }
    */
    async removeEventsByMonitor( monitor ) {
        if( _.isUndefined( monitor ) && _.isUndefined( monitor.monName ) ) {
            let error = new Error( "No monitor name provided." );
            this.logger.error( error );
            throw error
        }
        let result = await this.dataBase.deleteMany( { linkedMon: {
            $eq: monitor.monName
        } } );
        if( result.result.n == 0 ) {
            throw new Error( `Removing events from database failed for collection: ${this.dataBase.collection}` );
        }
        let msg = "Events Remove";
        this.logger.log( `${msg} on ${monitor.timeStamp}, Event Name: ${monitor.eventID}` );
        return { status: msg, eventRomoved: result.result.n };
    }
    /*
        {
            linkedMon: Monitor name
        }
    */
    async findEvent( event ) {
        if( _.isUndefined( _.get( event, "linkedMon" ) ) ) {
            let error = new Error( "Most have linkedMon name" );
            this.logger.error( error );
            throw error;
        }
        let result =  await this.dataBase.find( {
            linkedMon: {
                $eq: event.linkedMon
            }
        } );
        return result;
    }
}
// End Eventcontroller Code

module.exports = Eventcontroller;