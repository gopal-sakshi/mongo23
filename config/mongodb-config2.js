const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const connectionString = "mongodb://localhost:27017/";
const client = new MongoClient(connectionString, { useUnifiedTopology: true } );
console.log('sdfsdfd');
client.connect(function(err) {
    if(err) console.log(err);
	console.log('Connected successfully to server');
});
module.exports = client;