const express = require( "express" );
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load settings configuration from env file.
dotenv.config( {
    path: __dirname + "/config/settings.env"
} );

const LogManager = require( __dirname + "/logging/LogManager" ).LogManager;
const ExceptionWraper = require( __dirname + "/utils/utils" ).ExceptionWraper;
const api = require( __dirname + "/apicontroller" );
const graphQLAPI = require( __dirname + "/graphql/graphQLAPI" );

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

// Start of APP Application
app.get( "/health",  ( req, res ) => { 
    logger.log( "Health check invoked" );
    res.send( { status: "UP" } );
 } );

// Set Monitor API
app.post( "/monitor/add", jsonParser, async ( req, res ) => {
    try {
        res.send( await api.addMonitor( req.body ) );
    } catch (error) {
        res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
    }
 } );

app.post( "/monitor/remove", jsonParser, async ( req, res ) => {
    try {
        res.send( await api.removeMonitor( req.body ) );
    } catch (error) {
        res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
    }
 } );

 app.post( "/monitor/find", jsonParser, async ( req, res ) => {
    try {
        res.send( await api.findMonitor( req.body ) );
    } catch (error) {
        res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
    }
 } );

 // Set Client API
app.post( "/event/add", jsonParser, async ( req, res ) => {
    try {
        res.send( await api.addEvent( req.body ) );
    } catch (error) {
        res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
    }
 } );

app.post( "/event/find", jsonParser, async ( req, res ) => {
    try {
        res.send( await api.findEvent( req.body ) )
    } catch (error) {
        res.status( 500 ).send( new ExceptionWraper( error ).toJSON() );
    }
 } );


// GraphQl hook
graphQLAPI( app, logger );

app.listen( port, () => { logger.log( `Server running on port: ${port}` ) } );