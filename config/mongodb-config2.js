const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const connectionString = "mongodb://127.0.0.1:27017/";
// const connectionString = "mongodb://127.0.0.1:59002/";
// 59002 is host port listening to docker container mongo @ 27017... plus use nodeVersion 18
// const connectionString = "mongodb://127.0.0.1:27034/";
// const connectionString = "mongodb://127.0.0.1:27030/,127.0.0.1:27031/,127.0.0.1:27032/?replicaSet=rs23";
const client = new MongoClient(connectionString, { 
    useUnifiedTopology: true
});
client.connect(function(err) {
    if(err) console.log(err);
	console.log('Connected successfully to server');
});

module.exports = client;