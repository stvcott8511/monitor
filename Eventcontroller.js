const _ = require( "lodash" );

// Start Eventcontroller Code
const AlertTypes = [ "CLEAR", "LOW", "MED", "HIGH" ];
const errorMsg1 = "Monitor name or alert is not defined";
const errorMsg2 = "Alert must be the following values ( \"CLEAR\", \"LOW\", \"MED\", \"HIGH\" )";

function checkEvent( event ) {
    return _.isUndefined( _.get( event, "name" ) ) || _.isUndefined( _.get( event, "alert" ) );
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
    }
    /*
        {
            name: "Monitor name",
            event: One of the folowing [ "CLEAR", "LOW", "MED", "HIGH" ]
        }
    */
    addEvent( event ) {
        if( validate( event ) ) {
            let error = new Error( validate( event ) );
            this.logger.error( error );
            throw error;
        }
        // DB logic
        // Msg q
        this.logger.log( "Event Added" );
    }
    /*
        {
            name: "Monitor name",
            event: One of the folowing [ "CLEAR", "LOW", "MED", "HIGH" ]
            id: unique id {optional}
            time: range
        }
    */
    findEvent( event ) {
        if( validate( event ) ) {
            let error = new Error( validate( event ) );
            this.logger.error( error );
            throw error;
        }
        // DB logic
        this.logger.log( "Event found(s)" );
    }
}
// End Eventcontroller Code

module.exports = Eventcontroller;