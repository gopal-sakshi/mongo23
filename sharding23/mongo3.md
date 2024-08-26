docker compose -f sharding23/docker-compose.yml up -d

mongosh mongodb://192.168.29.120:10001


rs.initiate(
    {
        _id: "cfgrs",
        configsvr: true,
        members: [
            { _id : 0, host : "192.168.29.120:10001" },
            { _id : 1, host : "192.168.29.120:10002" },
            { _id : 2, host : "192.168.29.120:10003" }
        ]
    }
)
<!------------------------------------------------------------------------------------------->

<Each shard can be set up as a replica set>
- ensuring that each piece of the dataset is replicated across multiple servers.

<create 1st shard>
docker compose -f sharding23/docker-compose-shard.yml up -d
mongosh mongodb://192.168.29.120:20001
rs.initiate(
    {
        _id: "shard1rs",
        members: [
            { _id : 0, host : "192.168.29.120:20001" },
            { _id : 1, host : "192.168.29.120:50002" },
            { _id : 2, host : "192.168.29.120:50003" }
        ]
    }
)

<create 2nd shard>
docker compose -f sharding23/docker-compose-shard2.yml up -d
mongosh mongodb://192.168.29.120:20011
rs.initiate(
    {
        _id: "shard2rs",
        members: [
            { _id : 0, host : "192.168.29.120:20011" },
            { _id : 1, host : "192.168.29.120:20012" },
            { _id : 2, host : "192.168.29.120:20013" }
        ]
    }
)
<!------------------------------------------------------------------------------------------->

docker compose -f sharding23/docker-compose-mongos.yml up -d

mongosh mongodb://192.168.29.120:30000

<add 1st shard to cluster>
sh.addShard("shard1rs/192.168.29.120:20001,192.168.29.120:50002,192.168.29.120:50003")  

<add 2nd shard to cluster>
sh.addShard("shard2rs/192.168.29.120:20011,192.168.29.120:20012,192.168.29.120:20013")  

sh.enableSharding("movies23")

range based sharding
    sh.shardCollection("db23.collection23", { name: 1 } )
    sh.shardCollection("movies23.telugu", { hero: 1 } )
    sh.shardCollection("movies23.english", { rated:1 })

hashed sharding
    sh.shardCollection("db23.collection23", { name: "hashed" } )

<!------------------------------------------------------------------------------------------->