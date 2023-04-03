# mongodb
- NoSQL database (document database)
    redis is key-value database
- stores the data in the form of the BSON structure
- supports JSON-like documents with the dynamic schemas
- written in C++

# type of NoSQL databases
- Document databases.
- Key-value stores.
- Column-oriented databases.
- Graph databases.

# index
- without using Indexes, MongoDB carries out collection scan
- If a suitable index is available for a query, 
    MongoDB will use an index for restricting the number of documents it should examine.

# replica set
- In the replica set, one node will be primary, and another one will be secondary.
- The primary is the only member in the replica set that receives write operations. 
    MongoDB applies write operations on the primary and then records the operations on the <primary's oplog> 
    Secondary members replicate this log and apply the operations to their data sets.
- All members of the replica set can accept read operations (default is primary)

# supported languages
- C, C++, Node, Java, Python, Ruby

# GridFS
- storing files that exceed the BSON-document size limit of 16 MB
- GridFS uses two collections to store files. 
    One collection stores the file chunks, and the other stores file metadata

# Journaling
- To provide durability in the event of a failure, MongoDB uses write ahead logging to on-disk journal files.
- 

# Profiler
- off by default... enable profiler per-instance (or) per-database basis
- profiling Levels
    0           off; doesnt collect data
    1           collects data for operations that take longer time (100 ms)
    2           collects data for all operations
- db.setProfilingLevel(1, { slowms: 20 })       slowms = slow operation time in milliseconds
- profiler logs information about database operations in the system.profile collection
    db.system.profile.find().limit(10).sort( { ts : -1 } ).pretty();


# System collections
- MongoDB stores system information in collections      
    db23.system (or) movies23.system
- 


# join operations in Mongo
- $lookup operator
{
   $lookup: {
        from: <collection to join>,
        localField: <field from the input documents>,
        foreignField: <field from the documents of the "from" collection>,
        as: <output array field>
    }
}

# storageEngines
- wiredTiger (latest since Mongo 3.2), MMAPv1 (earlier)