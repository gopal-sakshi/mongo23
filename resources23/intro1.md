Read operations that return multiple documents do not immediately return all values matching the query. 
Because a query can potentially match very large sets of documents
- so, these operations rely upon an object called a cursor. 
A <cursor fetches documents in batches> to reduce both memory consumption and network bandwidth usage.

these functions return cursor directly
    Collection.find()
    Collection.aggregate()
    Collection.listIndexes()
    Db.aggregate()
    Db.listCollections()

these functions return results (not cursor)
    Collection.findOne()
    Collection.watch()          // to monitor a collection for changes
----------------------------------------------------------------------------------------------------

$text query operator ($)
- search <string type> fields in your collection (not boolean, integer type... but string type)
- first create the <text index>

db.movies.createIndex({ title23: "text" });
- create index ===> to enable text searches on the title23 field
- only one text index can be created per collection.

db.movies.createIndex({ title: "text", fullplot: "text" });                 // `compound text index`
- Every text search <queries all the fields specified in that index> for matches.

----------------------------------------------------------------------------------------------------
MongoDB doesn't support its own export format to import/add data into a collection.

// Dont use THIS
{
     "_id": { "$oid":"5e666e346e781e0b34864de4" },
     "title":"Blacksmith scene",
     "released": "1893"
}

// Use THIS
{
     "_id": ObjectId("5e666e346e781e0b34864de4"),
     "title":"Blacksmith scene",
     "released": "1893"
}
----------------------------------------------------------------------------------------------------

Aggregation vs. Query Operations

Using query operations, such as the find() method, you can perform the following actions:
    Select which documents to return.
    Select which fields to return.
    Sort the results.

Using aggregation operations, you can perform the following actions:
    Perform all query operations.
    Rename fields.
    Calculate fields.
    Summarize data.
    Group values.

Aggregation operations have some limitations:
- Returned documents must not violate the BSON-document size limit of 16 megabytes.
- Pipeline stages have a memory limit of 100 megabytes by default. 
    If necessary, you may exceed this limit by setting the <allowDiskUse> property of AggregateOptions to true.

----------------------------------------------------------------------------------------------------



$
- Positional Operator
- 

All Positional Operator
: $[]

Filtered Positional Operator
: $[<identifier>]
