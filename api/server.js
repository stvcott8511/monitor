const express = require( "express" );
const bodyParser = require('body-parser');
const LogManager = require( __dirname + "/logging/LogManager" ).LogManager;
const ExceptionWraper = require( __dirname + "/utils/utils" ).ExceptionWraper;
const settings = require( __dirname + "/utils/configure" ).settings;
const api = require( __dirname + "/api/apicontroller" );

// main
var port = settings.port;
var logger = LogManager.getLoogger();
var app = express();
var jsonParser = bodyParser.json();

app.get( "/health",  ( req, res ) => { 
    logger.log( "Health check invoked" );
    res.send( { status: "UP" } );
 } );

  // Set Monitor API
app.post( "/monitor/add", jsonParser,( req, res ) => {
    api.addMonitor( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

app.post( "/monitor/remove", jsonParser, ( req, res ) => {
    api.removeMonitor( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

 app.post( "/monitor/find", jsonParser, ( req, res ) => {
    api.findMonitor( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

 // Set Client API
app.post( "/event/add", jsonParser,( req, res ) => {
    api.addEvent( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

app.post( "/event/find", jsonParser, ( req, res ) => {
    api.findEvent( req.body )
        .then( ( result ) => {
            res.send( result );
        } ).catch( ( error ) => { 
            res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
        } );
 } );

app.listen( port, () => { logger.log( `Server running on port: ${port}` ) } );