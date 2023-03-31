const mongoDb = require('mongodb');
const MongoClient = mongoDb.MongoClient;
const connectionString = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(connectionString, { useUnifiedTopology: true } );
module.exports = client.connect();