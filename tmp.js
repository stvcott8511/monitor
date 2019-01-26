const LogManager = require( __dirname + "/logging" ).LogManager;
var dbManager = require( __dirname + "/dbManager" );;
var logger = LogManager.getLoogger();
var db = dbManager( "MongoDB", logger );

async function f() {
    var p = db.insert( {
        name: "DBtest",
        description: "Information about monitor"
    } );
    var result = [];
    result[0] = await p;

    p = db.update( {
        name: {
            $eq: "DBtest"
        }
    }, { $set: {
        description: "test"
    } } );
    result[1] = await p;

    p = db.find( {} );
    result[2] = await p;

    debugger;
    p = db.delete( {
        name: {
            $eq: "DBtest"
        }
    } );
    result[3] = await p;

    return result;
}

f().then( ( out ) => {
    console.log( out );
} ).catch( () => {
} );