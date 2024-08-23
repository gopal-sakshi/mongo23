1) create docker network
docker network create mongo-shard-cluster23


2) create 3 <config server> containers

docker run -d --net mongo-shard-cluster23 --name config-svr-1 -p 27101:27017 mongo:4.4 mongod --port 27017 --configsvr --replSet config-svr-replica-set

docker run -d --net mongo-shard-cluster23 --name config-svr-2 -p 27102:27017 mongo:4.4 mongod --port 27017 --configsvr --replSet config-svr-replica-set

docker run -d --net mongo-shard-cluster23 --name config-svr-3 -p 27103:27017 mongo:4.4 mongod --port 27017 --configsvr --replSet config-svr-replica-set


3) initialize <config server replica set>
docker exec -it config-svr-1 mongo

rs.initiate({
    _id: "config-svr-replica-set",
    configsvr: true,
    members: [
        { _id: 0, host: "config-svr-1:27017" },
        { _id: 1, host: "config-svr-2:27017" },
        { _id: 2, host: "config-svr-3:27017" }
    ]
})
rs.status()

4) create & initialize shards


docker run -d --net mongo-shard-cluster23 --name shard-X-node-a -p 27119:27017 mongo:4.4 mongod --port 27017 --shardsvr --replSet shard-X-replica-set

docker run -d --net mongo-shard-cluster23 --name shard-X-node-b -p 27129:27017 mongo:4.4 mongod --port 27017 --shardsvr --replSet shard-X-replica-set

docker run -d --net mongo-shard-cluster23 --name shard-X-node-c -p 27139:27017 mongo:4.4 mongod --port 27017 --shardsvr --replSet shard-X-replica-set

4) a) Initialize shard replica set

docker exec -it shard-X-node-a mongo

rs.initiate({
    _id: "shard-X-replica-set",
    members: [
        { _id: 0, host: "shard-X-node-a:27017" },
        { _id: 1, host: "shard-X-node-b:27017" },
        { _id: 2, host: "shard-X-node-c:27017" }
    ]
})
rs.status()


5) create 2 router containers

docker run -d --net mongo-shard-cluster23 --name router-1 -p 27141:27017 mongo:4.4 mongos --port 27017 --configdb config-svr-replica-set/config-svr-1:27017,config-svr-2:27017,config-svr-3:27017 --bind_ip_all

docker run -d --net mongo-shard-cluster23 --name router-2 -p 27142:27017 mongo:4.4 mongos --port 27017 --configdb config-svr-replica-set/config-svr-1:27017,config-svr-2:27017,config-svr-3:27017 --bind_ip_all


6) initialize routers & add shards

docker exec -it router-1 mongo

sh.addShard("shard-1-replica-set/172.19.0.7:27017, shard-1-replica-set/172.19.0.8:27017, shard-1-replica-set/172.19.0.9:27017")

sh.addShard("shard-2-replica-set/shard-2-node-a:27017", "shard-2-replica-set/shard-2-node-b:27017", "shard-2-replica-set/shard-2-node-c:27017")

sh.addShard("shard-3-replica-set/shard-3-node-a:27017", "shard-3-replica-set/shard-3-node-b:27017", "shard-3-replica-set/shard-3-node-c:27017")

sh.status()
<!-- ------------------------------------------------------------------------------------------- -->