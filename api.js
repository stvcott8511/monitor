const _ = require( "lodash" );
const MonitorController = require( __dirname + "/MonitorController" );
const Eventcontroller = require( __dirname + "/Eventcontroller" );
const LogManager = require( __dirname + "/logging" ).LogManager;

var logger = LogManager.getLoogger();
var monController = new MonitorController( logger );
var eventController = new Eventcontroller( logger );

class EventWapper {
    constructor( eventController, monController, logger ) {
        this.eventController = eventController;
        this.monController = monController;
        this.logger = logger;
    }
    async add( event ) {
        // Check to see if monitor is in collection.
        // if yes, then add event and put alert on q.
        let result;
        if( _.isUndefined( _.get( event, "linkedMon" ) ) ) {
            let error = new Error( "Event must have linkedMon property." );
            this.logger( error );
            throw error;
        }
        let monitor = await this.monController.findMonitor( {
            monName: event.linkedMon
        } );
        if( monitor.length == 1 ) {
            result = await this.eventController.addEvent( event );
            // push to q.
        } else {
            let error = new Error( "No monitor for give event. Added event must have a monitor." );
            this.logger( error );
            throw error;
        }
        return result;
    }
}

var eventWapper = new EventWapper( eventController, monController, logger );

let api = {
    addMonitor: function( monitor ){
        return monController.addMonitor( monitor );
    },
    removeMonitor: function( monitor ) {
        return monController.removeMonitor( monitor );
    },
    findMonitor: function( monitor ) {
        return monController.findMonitor( monitor );
    },
    addEvent: function( event ){
        return eventWapper.add( event );
    },
    findEvent: function( event ) { 
        return eventController.findEvent( event );
    }
}

module.exports = api;