var mongoose = require('mongoose');     // module-caching == ONLY 1 instance of mongoose


// CONNECTION I
const server = '127.0.0.1:27017';
const database = 'movies23';
const mongoString = `mongodb://${server}/${database}`;
mongoose.connect(mongoString, { useNewUrlParser: true , useUnifiedTopology: true});
// now mongoose across whole application is this mongoose which is connected to "movies23" db

// CONNECTION II
var zipsDbString = `mongodb://127.0.0.1:27017/zips23`;
var zipsDb = mongoose.createConnection(zipsDbString);

module.exports = {
    moviesDb: mongoose,
    zipsDb: zipsDb
}

/************************************************************************************/

// APPROACH I ========> mongoose.connect()      permitted only once in application
// mongoose.connect(mongoString, { useNewUrlParser: true , useUnifiedTopology: true});


// APPROACH II =======> mongoose.createConnection()         used for accessing multiple databases

// createConnection() ===> doesnt return a promise
// connect() ============> returns a promise

// APPORACH III ===> mongoose.connection.useDb()

/*
    the first time you call require(‘mongoose’), 
    it is creating an instance of the Mongoose class and returning it. 
    On subsequent calls, it will return the same instance that was created and returned to you the first time 
    because of how module import/export works in ES6.... module is CACHEDDDDDDDDDDD
*/

/************************************************************************************/