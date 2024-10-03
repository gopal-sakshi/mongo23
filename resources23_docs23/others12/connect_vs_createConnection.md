`connect`
- creates a pool of sockets/connections 
- defined in poolSize in the connection settings
- so there is actually multiple connections, but in a single pool
- Mongoose creates a default connection when you call mongoose.connect(). 
    You can access the default connection using <mongoose.connection>
- In most simple projects, you needn't worry about specifying different 
        read or write settings, 
        pool sizes, 
        separate connections to different replica servers
    that's why .connect exists.
- the default <mongoose.connect()> method will give you the global database connection 
    it is accessible throughout the app, but you cannot switch the database with that connection
- 

`createConnection`
- you access models via the explicit connection.
- instead of <User = mongoose.model()> you need <User = db.model()>
