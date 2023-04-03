In SQL databases you must declare a table's schema before inserting data
In MongoDB collections, you do not require their documents to have the same schema
    documents (rows in SQL) need not have same fields
    datatype for a field can differ across documents within a collection


# Models

`Embedded`
- embed related data in a single document. 
- also called <denormalized> datamodel
- store related pieces of information in the same database record.
- needs few queries & updates 

`Normalized`
- describe relationships using references between documents.

