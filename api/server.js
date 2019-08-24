const express = require( "express" );
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const LogManager = require( __dirname + "/logging/LogManager" ).LogManager;
const ExceptionWraper = require( __dirname + "/utils/utils" ).ExceptionWraper;
const api = require( __dirname + "/apicontroller" );

// Setttings
dotenv.config( {
    path: __dirname + "/config/settings.env"
} );

// main
var port = process.env.PORT || 8000;
var logger = LogManager.getLoogger();
var app = express();
var jsonParser = bodyParser.json();

// Server Addons
// Use morgan to log Express routes.
if( process.env.NODE_ENV == "development" )
{
    var writer = {
        write: (data) =>
        {
            logger.log( `morgan express log: ${data}` );
        }
    };

    app.use( morgan( "combined", {
        stream: writer
    } ) );
}

app.get( "/health",  ( req, res ) => { 
    logger.log( "Health check invoked" );
    res.send( { status: "UP" } );
 } );

  // Set Monitor API
app.post( "/monitor/add", jsonParser, ( req, res ) => {
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
app.post( "/event/add", jsonParser, ( req, res ) => {
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