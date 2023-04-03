mongoexport --uri mongodb+srv://gopal612:Benzema1@cluster0.pi54y.mongodb.net/myFirstDatabase --collection <collection-name> --out <path-to-export>

mongoexport             only for collection
--------------------------------------------------------------------

`cd "C:\Program Files\MongoDB\Server\6.0\bin"   `
mongodump --uri mongodb+srv://gopal612:Benzema1@cluster0.pi54y.mongodb.net/myFirstDatabase
    // error creating directory for metadata file dump\myFirstDatabase: mkdir dump: Access is denied.
`mongodump --uri mongodb+srv://gopal612:Benzema1@cluster0.pi54y.mongodb.net/myFirstDatabase --out "C:\temp"     `
    WORKS

`mongorestore -d library23 "C:\temp\myFirstDatabase"`
--------------------------------------------------------------------