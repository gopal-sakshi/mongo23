# Transactions 
- sequence of database operations that will only succeed if every operation within the transaction has been executed correctly
- In MongoDB, an operation on a single document is atomic
- this single-document atomicity obviates the need for multi-document transactions
- For situations that require atomicity of reads and writes to multiple documents ---> MongoDb supports transactions
- steps
    starts a transaction
    executes the specified operations
    commits the result (or aborts)
- updateMany vs transaction
    When a single write operation (db.collection.updateMany()) modifies multiple documents
    the modification of each document is atomic, but the operation as a whole is not atomic.
- Transactions can only be performed on MongoDB instances that are running as part of a larger cluster. 
    either a <sharded database cluster> or <replica set>
- transfer money from CustomerA to CustomerB
    reduce money in CustA document 
    increase money in CustB document
    both operations should succeed... not like one operation succeeds, other fails ===> inconsistent banking records
- To ensure that any transactions follow ACID principles the application (nodeJs) must start a session.
    In MongoDB, a session is a database object. <session> provides a shared context for set of db operations in transaction    

# MongoShell
var session = db.getMongo().startSession();
session.startTransaction({
    "readConcern": { "level": "snapshot" },
    "writeConcern": { "w": "majority" }
});
session.commitTransaction();    // To commit the transaction & save db operations permanently to the database,

`writeConcern`
w: 1                returns acknowledgement after the commit has been applied to the primary.
w:majority          transaction will only be considered success only when a <majority> of nodes acknowledge the write operation.

`readConcern`
options = local, majority, snapshot
"level":"snapshot"
    Say that you start a transaction, but after you doing so another user adds a document to the collection 
    transaction will read a snapshot of data that has been committed by a majority of nodes in the cluster.

`startTransaction`
- this method is called on the session variable and not db
- 


# ACID 
- Atomicity
    all the actions in a transaction are treated as a single unit of work
    in MongoDB, updates within a single document are always atomic
    Either all or none of the transaction operation is done.
- Consistency
    any changes made to a database must adhere to the database’s existing constraints
- Isolation
    separate, concurrently running transactions are isolated from one another
- Durability 
    as soon as the transaction succeeds, the client can be sure the data has been properly persisted