var express = require('express');
var queriesRouter = express.Router();

const mongoClient2 = require('./config/mongodb-config2');
const dbString = 'queries23';


// see this file ==========>        queries23.misc_data23.json
queriesRouter.use('/books1', async (req, res) => {
    // NOT working - anyway
    const queriesDb = mongoClient2.db(dbString);
    let booksCollection = queriesDb.collection("misc_data23");
    let results = await booksCollection.aggregate([
        { $unwind: "$positions" },
        { $unwind: "$positions.nodes" },
        { $match: {"positions.nodes.bookId": "b5aa7951d4516c18"}},
        { $project: { _id: 0, name: 1, "positions.number": 1, "positions.nodes.number": 1} }
    ]).toArray()
    res.send(results).status(200);
})

module.exports = queriesRouter;