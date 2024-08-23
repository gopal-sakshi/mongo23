##### NICE ARTICLE
https://medium.com/@parvjn616/demystifying-mongodb-sharding-255983d376e1


https://medium.com/@parvjn616/setting-up-a-mongodb-sharded-cluster-a-step-by-step-guide-20cbba33c0e8


Shard Servers (Mongod)
- individual servers that store data
- each shard ===> replica set
    contains one primary node & multiple secondary nodes

Routers (mongos)
- serve as intermediaries between <your application> & <shard servers>
- They <route queries> to the <appropriate shard> based on the shard key. 
- Routers are <multi-threaded> to handle concurrent queries efficiently.
- routers cache copy of <routing table>

Config Servers
- store metadata describing the sharded cluster
    routing table = map <shard key values> to <shard connection strings>
- shard connection strings ===> chunk ranges & their distribution across the shards 


client makes a request
mongos process use routing table to determine which shard should handle the request
based on shard-key
shard-key ====> its a field/column (used to distribute data across shards)

read operation & request isnt served by single shard
- mongos process parallelize the request to multiple shards
- merge the results before sending them back to client

Balancer
- background process
- responsible for redistributing chunks of data across the shards

`select a shard key`
- shard key field === exists in all 23432 documents 
- high cardinality ==== large number of distinct values
- shard key === should align with applications query patterns

