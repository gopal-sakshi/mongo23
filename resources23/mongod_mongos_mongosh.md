`mongod`
- its MongoDb daemon (or) server for MongoDb
- You run <mongod> to start your server.
    express server listens on [4000] port
    <mongod> server listens on [27017] port
    postgres server listens on [5432] port
- <mongod> stores data in the /data/db directory

mongod --port 27018 --dbpath /newPath23

<!------------------------------------------------------------------------------>

`mongosh`
- earlier, its called <mongo> but now its <mongosh>
- client to connect to MongoDb server

mongosh --host mongodb0.example.com:27017
mongosh mongodb://192.168.29.120:30000

<!------------------------------------------------------------------------------>

# Note
generally any application will have two -- client & server
- client is <mongosh>; server is <mongod>
- but here we have <mongos> also

`mongos`
- its a proxy 
- sits between <client (mongosh)> and  <sharded database cluster>
- we need mongos
    to route the <read queries>, <write operations> to the shard(s) as required.
- mongos proxy ===> a map
- the database cluster doesnt know which shard that particular data exists on
    but <mongos proxy> knows
- it also knows which shard to insert data into
<!------------------------------------------------------------------------------>