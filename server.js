const express = require( "express" );
const bodyParser = require('body-parser');
const MonitorController = require( __dirname + "/MonitorController" );
const Eventcontroller = require( __dirname + "/Eventcontroller" );
const LogManager = require( __dirname + "/logging" ).LogManager;
const ExceptionWraper = require( __dirname + "/utils" ).ExceptionWraper;

// main
var port = 1985;
var logger = LogManager.getLoogger();
var monController = new MonitorController( logger );
var eventController = new Eventcontroller( logger );
var app = express();
var jsonParser = bodyParser.json();

app.get( "/health",  ( req, res ) => { 
    logger.log( "Health check invoked" );
    res.send( { status: "UP" } );
 } );

  // Set Monitor API
app.post( "/monitor/add", jsonParser,( req, res ) => {
    monController.addMonitor( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

app.post( "/monitor/remove", jsonParser, ( req, res ) => {
    monController.removeMonitor( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

 app.post( "/monitor/find", jsonParser, ( req, res ) => {
    monController.findMonitor( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

 // Set Client API
app.post( "/event/add", jsonParser,( req, res ) => {
    eventController.addEvent( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

app.post( "/event/find", jsonParser, ( req, res ) => {
    eventController.findEvent( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

app.listen( port, () => { logger.log( `Server running on port: ${port}` ) } );