// Step 1: Start a Client Session
const session = client.startSession();


// Step 2: Optional. Define options to use for the transaction
const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
};


// Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
// Note: The callback for withTransaction MUST be async and/or return a Promise.
try {
    await session.withTransaction(async () => {
        const coll1 = client.db('mydb1').collection('foo');
        const coll2 = client.db('mydb2').collection('bar');        
        await coll1.insertOne({ abc: 1 }, { session });         // Important:: You must pass the session to the operations
        await coll2.insertOne({ xyz: 999 }, { session });
    }, transactionOptions);
} finally {
    await session.endSession();
    await client.close();
}