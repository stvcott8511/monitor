const fs = require('fs'); 

let setting;
try {
    let rawdata = fs.readFileSync( __dirname + '/../config/settings.json' );
    settings = JSON.parse( rawdata );
} catch ( e ) {
    throw e;
}

module.exports = {
    settings: settings
};