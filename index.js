const express23 = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const mongoDb = require('mongodb');
const PORT = 3021;
const app = express23();
app.use(bodyParser.json());
const dbString = 'zips23';

// // APPROACH I ==========> start mongoServer instantly 
const mongoClient2 = require('./config/mongodb-config1');
app.listen(PORT, () => { console.log(`mongo23 app @ port ===> ${PORT}`) });

// APPROACH II ===========> wait for mongoConnection & start Server (NOT WORKING)
// const mongoClient2 = require('./config/mongodb-config4');
// (async function connect23() { 
//     await mongoClient2;
//     console.log(mongoClient2);
//     app.listen(PORT, () => { console.log(`mongo23 app @ port ===> ${PORT}`) })
// })();

/****************************************************************************************************/
const queriesRouter = require('./index_queries23');
app.use('/queries23', queriesRouter);


const mongooseRouter = require('./mongoose24/index');
app.use('/mongoose', mongooseRouter);
/****************************************************************************************************/
app.use('/get4Movies', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    let results = await moviesCollection.find({}).limit(4).toArray();
    res.send(results).status(200);
});

/****************************************************************************************************/

app.use('/moviesThatStartWithM', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesColl = zipsDataBase.collection("movies");
    const filter1 = { title:/^S|^R/ };      // must start with either S (or) R
    const filter2 = { title:/^Za/ };        // must start with "Za"
    const filter3 = { year: {$gte: 2012} };
    const pipeline23 = { title:1, _id:0, year: 1 };
    // let results = await moviesColl.find(filter2).explain();
    // let results = await moviesColl.find(filter2).project(pipeline23).toArray();
    let results = await moviesColl.find({ $and: [filter2, filter3]}).project(pipeline23).toArray();
    res.send(results).status(200);
});

/****************************************************************************************************/
app.use('/allMoviesBefore1913', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
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
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    let results = await moviesCollection.aggregate([
        { $match: {} },
        { $group: { _id: "$year", movieCount: { $sum: 1 } } },
        { $sort: { "movieCount": -1 } },
    ]).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/distinctRatings', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    let results = await moviesCollection.distinct("rated");
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/showOnlySomeFields', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const projection23 = { title: 1, rated: 1, released: 1, _id:0 };
    let results = await moviesCollection.find().project(projection23).limit(12).toArray();
    // let results = await moviesCollection.find().limit(12).toArray();
    res.send(results).status(200);
});

/****************************************************************************************************/

// add index =====> db.movies.createIndex({fullplot: "text" });
// add index =====> db.movies.createIndex({title: "text" });
// add index =====> db.movies.createIndex({fullplot: "text", title: "text" });

app.use('/textSearch', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    await zipsDataBase.collection("movies").createIndex({fullplot: "text", title: "text" });
    console.log("indices on movies collection ===> ", await zipsDataBase.collection("movies").listIndexes().toArray());
    let moviesCollection = zipsDataBase.collection("movies");
    const query22 = { $text: { $search: "trek" } };                         // query single word
    const query23 = { $text: { $search: "\"star trek\"" } };                // query phrase
    const projection23 = { title: 1, _id:0 };
    let results = await moviesCollection.find(query23).project(projection23).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/delete', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const docToDelete = { title: { $eq: "Blacksmith Scene" } };
    let deleteResult = await moviesCollection.deleteOne(docToDelete);
    res.send(deleteResult).status(200);             // deleteResult = { "acknowledged": true, "deletedCount": 1 }
});
/****************************************************************************************************/
app.use('/add23', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const docToAdd = req.body;    
    let addResult = await moviesCollection.insertOne(docToAdd);
    res.send(addResult).status(200);        // addResult = { "acknowledged": true, "insertedId": "ObjectId('5e666e346e781e0b34864de4')" }
});
/****************************************************************************************************/
app.use('/updateArray', async (req, res) => {                   // update array within a row (ie. Document)
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const query12 = { title: "Meshes of the Afternoon" };
    const updateDocument1 = { $set: { "items.size": "extra large" } };
    const updateDocument2 = { $set: { "items.size": "extra large", "timeStamps12": req.body.timestamps23 } };
    let addResult = await moviesCollection.updateOne(query12, updateDocument2);
    res.send(addResult).status(200);    
});
/****************************************************************************************************/
app.use('/group23', async (req, res) => {                           // group all unrated movies; year-wise
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const pipeline23 = [
        { $match: { $and: [ {rated: { $nin: ["UNRATED", "TV-PG"] }  }, { year : {$gte: 1923}} ] }},
        { $group: { 
            _id: "$year", 
            count: { $sum: -1 }, 
            field23: {$push: {$concat:["$title", " __ ", "$awards.text"]}} 
        }},
        { $sort: { "_id": 1 } },
        { $limit: 10 }
    ];    
    let results = await moviesCollection.aggregate(pipeline23).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/updateRatings', async (req, res) => {                           // group all unrated movies; year-wise
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const newRatings = {        
          $map: {
            input: "$genres",
            as: "comments23",
            in: { $concat: [ "$$comments23", "_1912" ] }
        }        
    }
    const pipeline23 = [
        { $match: { year:1912 } },
        { $project: { title: 1, newRatings } },
    ];    // this only returns the results with _1912 appended... wont modify original array
    let results = await moviesCollection.aggregate(pipeline23).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/addFields', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const pipeline24 = [ 
        { $match: { $and: [ { year: {$gte: 2000} }, { year: {$lte: 2025} } ] } },
        { $project: { title: 1, totalRatings23: 1, imdb : { rating: 1 } } }, 
        { $addFields: { totalRatings23: { $concat: [ { $toString: "$imdb.rating"}, { $toString: "$tomatoes.fresh"} ] }} },
        // { $addFields: { totalRatings23: Date.now()} }
    ]
    let results = await moviesCollection.aggregate(pipeline24).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/queryRatings', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const query1 = { "imdb.rating" : 7.1 };
    const query2 = { "imdb.rating" : { $gt: 8 } };
    const projection23 = { _id:0, title:1, "imdb.rating": 1, imdb : { votes: 1 }, writers:1 };
    let results = await moviesCollection.find(query2).project(projection23).limit(10).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/queryArray', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const query1 = { languages: ["English", "French"] };
    const query2 = { genres: ["Drama", "Short"] };                      // matches EXACTLY
    const query3 = { genres: { $all: ["Drama", "Short"] }};             // matches with "Drama, Short, Fantasy"
    const query4 = { genres: { $in: ["Drama", "Short"] }};              // either Drama (or) Short must be present
    const projection23 = { _id:0, title:1, languages:1, genres:1 };
    let results = await moviesCollection.find(query4).project(projection23).limit(10).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/addArrayAttribute', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies"); 
    const query1 = { title: "Gertie the Dinosaur" };
    const options1 = { '$set' : {'timeStamps' : [11,12,14,15] } };
    let results = await moviesCollection.updateMany(query1,options1);
    res.send(results).status(200);          
    // results = { "acknowledged": true, "modifiedCount": 2, "upsertedId": null, "upsertedCount": 0, "matchedCount": 2 }
});
/****************************************************************************************************/
app.use('/deleteField', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    let unset23 = { $unset: { timeStamps12: "" } }
    let results = await moviesCollection.updateMany({},unset23);
    res.send(results).status(200);          
});

/****************************************************************************************************/
function customJs23 () { 
    return [ 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100) 
    ];
}
app.use('/addRandomArray', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const query1 = { year: { $lt: 1900} }
    const customJsFunction = { $function: {
        body: customJs23.toString(),

        // We can also provide entire function here itself as "body property"
        // body: `function() { 
        //     return [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100) ];
        // }`,

        args: [],
        lang: "js"
    }};
    const options1 = [{ $set: { timeStamps12: customJsFunction } }];    
    let results = await moviesCollection.updateMany({},options1);   // NOT WORKING in Ubuntu... worked in Windows
    // let results = await moviesCollection.updateOne(query1,options1);   // WORKING
    res.send(results).status(200);
});
/****************************************************************************************************/

app.use('/optimize23', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const addFields23 = { maxTime: { $max: "$timeStamps12" }, minTime: { $min: "$timeStamps12" } }
    const project23 = { _id: 0, title: 1, timeStamps12: 1, maxTime: 1, minTime: 1, 
        awards23: "$" + "awards.wins",  avgTime: { $avg: ["$maxTime",  "$minTime"] }  };
    const match23 = {  
        //  "awards.wins": 1,                            // enduko idi work avvatam ledu
        minTime: { $lt: 10 }, 
        avgTime: { $gt: 40 } 
    };
    const pipeline23 = [
        { $addFields: addFields23 },
        { $project: project23 },
        { $match: match23 }
    ];    
    let results = await moviesCollection.aggregate(pipeline23).limit(3).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/discountedPrice', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let suppliesCollection = zipsDataBase.collection("supplies23");
    // calculate the discounted price based on the qty 
    // return documents whose calculated discount price is less than 5
    // instead of NumberDecimal(); use mongoDb.Decimal128.fromString()
    // binder 12, notebook 8, pencil 6, eraser 3, legal_pad 10
    // binder 6, notebook 4, pencil 4.5, eraser 1.5, legal_pad 7.5
    let discountedPrice = {
        $cond: {
           if: { $gte: ["$qty", 100] },
           then: { $multiply: ["$price", 0.50] },           // provide 50% discount if qty > 100 units
           else: { $multiply: ["$price", 0.75] }            // else provide 25% discount
        }
    };
    const query1 = { $expr: { $lt: [ discountedPrice, 700 ] }};
    
    // // APPROACH I
    // let results = await suppliesCollection.find(query1).toArray();

    // // APPROACH II --------> project before addFields ---> discount23 is null
    // let results = await suppliesCollection.aggregate([ 
    //     { $match: query1 },
    //     { $project: {item: 1, qty: 1, _id: 0, discount23: 1 } },
    //     { $addFields: { discount23: discountedPrice } }
    // ]).toArray();

    // // APPROACH III --------> project after addFields ---> discount23 is correct value
    let results = await suppliesCollection.aggregate([ 
        { $match: query1 },        
        { $addFields: { discount23: discountedPrice } },
        { $project: {item: 1, qty: 1, _id: 0, discount23: 1 } },
    ]).toArray();

    res.send(results).status(200);
});
/****************************************************************************************************/
app.use('/lookup23', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let suppliesCollection = zipsDataBase.collection("supplies23");
    // collect the information from the document 'order' & 'SKU' field from the 'inventory' document.
    const lookup1 = {
        from: "supplies24",
        localField: "item",
        foreignField: "item",
        as: "docs22"
    };    
    const project1 = {_id: 0, item: 1, price: 1, material22: '$docs22.material', madeBy: '$docs22.manufacturer'};
    const res11 = await suppliesCollection.aggregate([ {$lookup: lookup1}, {$unwind: '$docs22'}, {$project: project1} ]).toArray();
    res.send(res11).status(200);
});
/****************************************************************************************************/
app.use('/updateId', async (req, res) => {
    const coll1 = mongoClient2.db(dbString).collection("movies");
    const coll2 = mongoClient2.db('movies23').collection("movies_copy4");
    var count = 50001;
    await coll1.find().forEach(doc => {
        doc._id = count++;
        coll2.insertOne(doc);
    });
    res.send({info:`${count - 50001} doc updated`}).status(200);
});
/****************************************************************************************************/

app.use('/splitCollection', async (req, res) => {
    const coll1 = mongoClient2.db('movies23').collection("movies_copy");
    const basicDoc = mongoClient2.db('movies23').collection("movies_basic");
    const detailedDoc = mongoClient2.db('movies23').collection("movies_detail");    
    await coll1.find().forEach(doc => {
        var basic = { _id: doc._id, title:doc.title, year:doc.year, runtime:doc.runtime, released:doc.released, type:doc.type, directors:doc.directors, countries:doc.countries, genres:doc.genres };
        var detailed = { _id:doc._id, poster:doc.poster, plot:doc.plot, fullplot:doc.fullplot, lastupdated:doc.lastupdated, imdb:doc.imdb, tomatoes:doc.tomatoes };
        basicDoc.insertOne(basic);
        detailedDoc.insertOne(detailed);
    });
    res.send({info:`doc updated`}).status(200);
});

/****************************************************************************************************/

// NOT WORKING
app.use('/lowestTimestamps', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let moviesCollection = zipsDataBase.collection("movies");
    const query12 = { };
    let results = await moviesCollection.aggregate(pipeline23).limit(3).toArray();
    res.send(results).status(200);
});
/****************************************************************************************************/

app.use('/addStudent12', async (req, res) => {
    const zipsDataBase = mongoClient2.db(dbString);
    let studentsCollection = zipsDataBase.collection("students23");
    let result12 = { info: 'phattu' };
    const payload = req.body;
    console.log(payload);
    try { result12 = await studentsCollection.insertOne(payload); } catch(err) { console.log(err) };
    res.send(result12).status(200);
});
/****************************************************************************************************/
