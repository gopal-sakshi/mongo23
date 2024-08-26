sh.status()

<!-- works only against admin databases ?? -->
db.runCommand(
    { listShards: 1 }
)

db.runCommand("getShardMap")

use movies23;
db.telugu.getShardDistribution();
db.airbnb.getShardDistribution();
sh.getBalancerState();
sh.isBalancerRunning();
sh.startBalancer();
    balancer will not run outside activeWindow
https://www.mongodb.com/docs/manual/reference/method/sh.getShardedDataDistribution/

`use config` --- update activeWindow timings & unset so that balancer is always running

use config --- to switch to config database

db.settings.updateOne(
    { _id: "balancer" },
    { $set: { activeWindow : { start : "18:00", stop : "23:00" } } },
    { upsert: true }
)

db.settings.updateOne( { _id : "balancer" }, { $unset : { activeWindow : true } } )

<!----------------------------------------------------------------------------------->

db.stats();
db.english.stats();

<!----------------------------------------------------------------------------------->
use config <to switch to config database>
db.settings.updateOne(
    { _id: "chunksize" },
    { $set: { _id: "chunksize", value: 18 } },
    { upsert: true }
)

<to verify chunkSize>
use config
db.settings.find()
<!----------------------------------------------------------------------------------->

Please <create an index> that starts with the <proposed shard key> before sharding the collection. 
- read about index in mongodb
- https://www.mongodb.com/docs/manual/indexes/

<!----------------------------------------------------------------------------------->
`select distinct fields`
db.divvy_2017.distinct("usertype");
db.divvy_2017.distinct("gender");
db.divvy_2017.distinct("birthyear");


`choosing chunk size`

db.divvy_2017.countDocuments({usertype:"Dependent"});           3
db.divvy_2017.countDocuments({usertype:"Customer"});            441623
db.divvy_2017.countDocuments({usertype:"Subscriber"});          1166644 

If I choose usertype: "HASHED" as my shardkey
- this is the output

shard1rs - has 3 documents              all with usertype <Dependent>
shard2rs - has 1608267 documents        both <Customer> & <Subscriber>

see the file <shardkey1__usertype2.png>
localhost:20001 belongs to shard1rs - it has only 3 documents 


so, reshard the collection based on another <shardkey>

db.runCommand({
    reshardCollection: "movies23.divvy_2017",
    key: {"trip_id": 1},
    unique: false
})              <!-- must be run agianst admin database -->

db.adminCommand({
    reshardCollection: "movies23.divvy_2017",
    key: {"trip_id": 1}
})                      <!-- so use this -------->

If you see "divvy_2017" collection - these are the details
    shardKey, unique, balancing, chunkMetadata; []
    It has 4 chunks [
        { min: MinKey(), max: 15467353 }
        { min: 15467353, max: 15800957 }
        { min: 15800957, max: 16335074 }
        { min: 16335074, max: MaxKey() }
    ]
    


<!----------------------------------------------------------------------------------->
connect to any replicaSet
    mongosh mongodb://192.168.29.120:20011
run this command
    db.runCommand("ismaster")
then we will know which is the primary node in that replica set

# OR
rs.status()
rs.status().members ---> array of all nodes - 1 primary & 2 secondary nodes
see <mongo3_rs.status.txt>

All <write operations> are performed on <primary node>
<!----------------------------------------------------------------------------------->