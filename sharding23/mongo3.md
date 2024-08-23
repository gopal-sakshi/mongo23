docker compose -f resources23_sortLater/docker-compose.yml up -d

mongosh mongodb://10.0.54.240:10001


rs.initiate(
    {
        _id: "cfgrs",
        configsvr: true,
        members: [
            { _id : 0, host : "10.0.54.240:10001" },
            { _id : 1, host : "10.0.54.240:10002" },
            { _id : 2, host : "10.0.54.240:10003" }
        ]
    }
)

docker compose -f resources23_sortLater/docker-compose-shard.yml up -d

mongosh mongodb://10.0.54.240:20001


rs.initiate(
    {
        _id: "shard1rs",
        members: [
            { _id : 0, host : "10.0.54.240:20001" },
            { _id : 1, host : "10.0.54.240:50002" },
            { _id : 2, host : "10.0.54.240:50003" }
        ]
    }
)

docker compose -f resources23_sortLater/docker-compose-mongos.yml up -d

mongosh mongodb://10.0.54.240:30000

sh.addShard("shard1rs/10.0.54.240:20001,10.0.54.240:50002,10.0.54.240:50003")



sh.enableSharding("movies23")

range based sharding
    sh.shardCollection("db23.collection23", { name: 1 } )
    sh.shardCollection("movies23.telugu", { hero: 1 } )


hashed sharding
    sh.shardCollection("db23.collection23", { name: "hashed" } )

