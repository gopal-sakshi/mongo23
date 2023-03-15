var mongo = require('mongodb');
var MongoDb = mongo.Db;
var db = new MongoDb(
    'zips23', 
    new Server("127.0.0.1", 27017, { auto_reconnect: false, poolSize: 4}), 
    { w:0, native_parser: false });


var MongoClient = mongo.MongoClient; 
const url23 = 'mongodb://localhost:27017/zips23';
MongoClient.connect(url23,function(err, db) {
    if(err) console.log(err);
    else console.log('db connection established');
});
module.exports = { zipsDb: MongoClient } ;