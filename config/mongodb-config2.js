const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const connectionString = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(connectionString, { useUnifiedTopology: true } );
client.connect(function(err) {
    if(err) console.log(err);
	console.log('Connected successfully to server');
});
module.exports = client;