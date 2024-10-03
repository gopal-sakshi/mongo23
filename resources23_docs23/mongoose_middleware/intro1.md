Middleware
- also called pre & post hooks
- middleware ===> functions which are passed control during execution of asynchronous functions.


Mongoose has 4 types of middleware
    document middleware
    model middleware
    aggregate middleware
    query middleware
https://mongoosejs.com/docs/middleware.html
------------------------------------------------------------------------------------------

`Document middleware`
- In Mongoose, a document is an instance of a Model class. 
- In document middleware functions, <this> refers to the document
- following document functions are supported
    validate
    save
    remove
    updateOne
    deleteOne
    init
------------------------------------------------------------------------------------------

`Query middleware`
- Query middleware executes when you call exec() or then() on a Query object, or await on a Query object. 
- In query middleware functions, <this> refers to the query
- following Query functions are supported
    find, update, deleteOne, remove

------------------------------------------------------------------------------------------

`Aggregate middleware`
- Aggregate middleware executes when you call exec() on an aggregate object. 
- In aggregate middleware, <this> refers to the aggregation object.
- supports aggregate function
------------------------------------------------------------------------------------------

`Model middleware`
- model middleware hooks into static functions on a Model class, 
    document middleware hooks into methods on a Model class. 
- In model middleware functions, <this> refers to the model.
- following functions are supported
    insertMany
------------------------------------------------------------------------------------------