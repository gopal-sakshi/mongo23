db.vehicles.aggregate([
    { addFields: {"specs.fuel_type": "diesel"} }
]);


db.scores.aggregate([
    { $match: { score: { $gt: 80 } } },             // 4 out of 6 documents are matched (scores above 80)
    { $count: "passing_scores" }                    // count equals 4 (bcoz, 4 documents from previous stage)
]);


// $group stage separates documents into groups according to a "group key".

db.sales.aggregate([
    { $group : { 
        _id : "$item", 
        totalSaleAmount: { $sum: { $multiply: [ "$price", "$quantity" ] } } 
    }},       
    { $match: { "totalSaleAmount": { $gte: 100 } } }
]);

db.books.aggregate([
    { $group : { _id : "$author", books: { $push: "$title" } } }
]);

db.moviesCollection.aggregate([
    { $match: {} },
    { $group: { _id: "$year", movieCount: { $sum: 1 } } }
]);
// -----------------------------------------------------------------------------------------

// removes the properties copies23 from all documents
db.books.aggregate([ { $unset: "copies23" } ])


// exclude the _id field & salesManager fields from 'sales' collection ===> resulting fields are stored in newCollection23
db.sales.aggregate( [
    { $project: { _id: 0, salesManager: 0 } },
    { $merge : { into : "newCollection23" } }
]);



db.newDailySales201905.createIndex( { salesDate: 1 }, { unique: true } )

db.sales.aggregate([
    { $match: { date: { $gte: new Date("2019-05-01"), $lt: new Date("2019-06-01") } } },
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, totalqty: { $sum: "$quantity" } } },
    { $project: { _id: 0, salesDate: { $toDate: "$_id" }, totalqty: 1 } },
    { $merge : { into : "newDailySales201905", on: "salesDate" } }
]);

// db.getSiblingDB() ====> return to another Db without modifying db variable in shell envi
db.getSiblingDB("zoo").salaries.aggregate([
    { $group: { _id: { fiscal_year: "$fiscal_year", dept: "$dept" }, salaries: { $sum: "$salary" } } },
    { $merge : { into: { db: "reporting", coll: "budgets" }, on: "_id",  whenMatched: "replace", whenNotMatched: "insert" } }
]);

// to view the documents in budgets collection
db.getSiblingDB("reporting").budgets.find().sort( { _id: 1 } )