const express23 = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const mongoClient = require('./config/mongodb-config2');
const PORT = 3021;
const app = express23();
app.use(bodyParser.json());
app.listen(PORT, () => { console.log(`mongo23 app @ port ===> ${PORT}`) })


app.use('/', async (req, res) => {
    const zipsDataBase = mongoClient.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    let results = await moviesCollection.find({}).limit(10).toArray();
    res.send(results).status(200);
});