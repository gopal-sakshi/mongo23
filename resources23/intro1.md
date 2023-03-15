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



