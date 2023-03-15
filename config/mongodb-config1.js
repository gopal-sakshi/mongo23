const { MongoClient } = require('mongodb');
var url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
client.connect();
module.exports = client;