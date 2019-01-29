const _ = require( "lodash" );
const dbManager = require( __dirname + "/dbManager" );

// Start MonitorController code
const errorMsg1 = "Monitor name is not defined";

function checkMonitor( monitor ) {
    return _.isUndefined( _.get( monitor, "name" ) );
}

class MonitorController {
    constructor( logger ) {
        this.logger = logger;
        this.dataBase = dbManager.getDataBase( "Defualt" );
    }

    /*
       [
        {
            name: "Monitor name",
        }
       ]
    */
    findMonitor( monitor ) {
        // TODO Add to table logic
        return { status: "Good" };
    }
    /*
        {
            name: "Monitor name",
            description: "Information about monitor"
            timeout: Length of time monitor does not respond {Optional}
        }
    */
    addMonitor( monitor ) {
        if( checkMonitor( monitor ) ) {
            let error = new Error( errorMsg1 );
            this.logger.error( error );
            throw error;
        }
        // TODO security
        this.dataBase.insert( monitor );
        this.logger.log( "Monitor Added" );
        return { status: "Good" };
    }
    /*
        {
            name: "Monitor name",}
        }
    */
    removeMonitor( monitor ) {
        if( checkMonitor( monitor ) ) {
            let error = new Error( errorMsg1 );
            this.logger.error( error );
            throw error;
        }
        // TODO security
        // TODO Add to table logic
        this.logger.log( "Monitor Remove" );
        return { status: "Good" };
    }
}
// End MonitorController code

module.exports = MonitorController;