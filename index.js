const express23 = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const mongoClient2 = require('./config/mongodb-config2');
// const mongoClient1 = require('./config/mongodb-config1');
const PORT = 3021;
const app = express23();
app.use(bodyParser.json());
app.listen(PORT, () => { console.log(`mongo23 app @ port ===> ${PORT}`) })
/****************************************************************************************************/
app.use('/get4Movies', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    let results = await moviesCollection.find({}).limit(4).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/allMoviesBefore1913', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    // APPROACH I
    // let results1 = await moviesCollection.find(
    //     { released: { $lte: new Date('1913-11-24T00:00:00.000+00:00') } }
    // ).toArray();
    // res.send(results1).status(200);

    // APPROACH II
    // let results2 = await moviesCollection.find(
    //     { released: { $lte: new Date('1913-11-24T00:00:00.000+00:00') } }
    // ).forEach(console.dir);
    // res.send('hello23').status(200);

    // APPROACH III
    // let results3 = moviesCollection.find(
    //     { released: { $lte: new Date('1913-11-24T00:00:00.000+00:00') } }
    // ).sort({ released:-1 }).skip(4);
    // var res23 = [];
    // for await (const doc of results3) { res23.push({ year: doc.year, title: doc.title } ) }
    // res.send(res23).status(200);

    // APPROACH IV
    const query23 = { released: { $lte: new Date('1920-11-24T00:00:00.000+00:00') } };
    const options23 = { sort : { released: -1 }, skip : 5,}
    let results4 = moviesCollection.find(query23, options23);
    var res23 = [];
    for await (const doc of results4) { res23.push({ year: doc.year, title: doc.title } ) }
    res.send(res23).status(200);
});
/****************************************************************************************************/

app.use('/groupByYear', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    let results = await moviesCollection.aggregate([
        { $match: {} },
        { $group: { _id: "$year", movieCount: { $sum: 1 } } }
    ]).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/distinctRatings', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    let results = await moviesCollection.distinct("rated");
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/showOnlySomeFields', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    const projection23 = { title: 1, rated: 1, released: 1, _id:0 };
    let results = await moviesCollection.find().project(projection23).limit(12).toArray();
    // let results = await moviesCollection.find().limit(12).toArray();
    res.send(results).status(200);
});

/****************************************************************************************************/

// add index =====> db.movies.createIndex({fullplot: "text" });
// add index =====> db.movies.createIndex({title: "text" });

app.use('/textSearch', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    const query22 = { $text: { $search: "trek" } };                         // query single word
    const query23 = { $text: { $search: "\"star trek\"" } };                // query phrase
    const projection23 = { title: 1, _id:0 };
    let results = await moviesCollection.find(query23).project(projection23).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/delete', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    const docToDelete = { title: { $eq: "Blacksmith Scene" } };
    let deleteResult = await moviesCollection.deleteOne(docToDelete);
    res.send(deleteResult).status(200);             // deleteResult = { "acknowledged": true, "deletedCount": 1 }
});
/****************************************************************************************************/
app.use('/add23', async (req, res) => {
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    const docToAdd = req.body;    
    let addResult = await moviesCollection.insertOne(docToAdd);
    res.send(addResult).status(200);        // addResult = { "acknowledged": true, "insertedId": "ObjectId('5e666e346e781e0b34864de4')" }
});
/****************************************************************************************************/
// app.use('/updateArray', async (req, res) => {                   // update array within a row (ie. Document)
//     const zipsDataBase = mongoClient2.db('zips23');
//     let moviesCollection = zipsDataBase.collection("movies");
//     const query12 = { title: "Meshes of the Afternoon" };
//     const updateDocument = { $set: { "items.$.size": "extra large" } };
//     let addResult = await moviesCollection.updateOne(query12, updateDocument);
//     res.send(addResult).status(200);    
// });
/****************************************************************************************************/
app.use('/group23', async (req, res) => {                           // group all unrated movies; year-wise
    const zipsDataBase = mongoClient2.db('zips23');
    let moviesCollection = zipsDataBase.collection("movies");
    const pipeline23 = [
        { $match: { rated: "UNRATED" } },
        { $group: { _id: "$year", count: { $sum: 1 } } },
        { $sort: { "_id": 1 } },
        { $limit: 10 }
    ];    
    let results = await moviesCollection.aggregate(pipeline23).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
