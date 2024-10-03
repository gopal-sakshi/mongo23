Mongoose
- is a MongoDB object modeling tool 
- its designed to work in an asynchronous environment
- Mongoose supports Node, Deno
- Mongoose acts as a front end to MongoDB
- A "collection" of "documents" in a MongoDB database 
    is analogous to a "table" of "rows" in a relational database
-------------------------------------------------------------------------

Mongoose vs MongoDB

    MongoDB	                                            Mongoose
Stores giant amounts of data	            Manages relationships between data
Supports multiple languages	                Works only with MongoDB
Stores collections in the database	        Defines schema for collections


MongoDB
- document-oriented database management system 
- stores data in the form of BSON documents. 
- It is a NoSQL (Not-only SQL) type database 
- allowing users to store gigantic amounts of data. 
- Unlike SQL databases where data is stored in the form of tables
    a NoSQL database stores data efficiently as documents inside collections.

Mongoose
- its an ODM Object Document Mapper. 
- built on top of the MongoDB driver for MongoDB & Node.js
- helps developers 
    to model their data
    define the schema for documents inside a collection
    manage relationships between data.
- Mongoose allows users to conveniently create & manage data in MongoDB. 
- While it is possible to manage data, define schemas (using MongoDB APIs) it is quite difficult to do so
- But, if our collection holds an unpredictable schema for the documents
    then, MongoDB driver is then the simplest option to choose.
---------------------------------------------------------------------------------


Collections
- equivalent to tables in relational databases. 
- They can hold multiple JSON documents... Each JSON document = one row

Documents
- equivalent to records or rows of data in SQL. 
- While a SQL row can reference data in other tables, Mongo documents usually combine that in a document.

Fields
- similar to columns in a SQL table.

Schema
- While Mongo is schema-less, SQL defines a schema via the table definition. 
- A Mongoose "schema" is a document data structure (or shape of the document) 
    that is enforced via the application layer.

Models
- higher-order constructors that <take a schema> 
- and create <an instance of a document> equivalent to records in a relational database.

Schema_vs_Model
- A Mongoose schema defines the structure/blue_print of the document, default values, validators, 
- A Mongoose model provides an interface to the database for creating, querying, updating, deleting records


-----------------------------------------------------------------------------------------------

