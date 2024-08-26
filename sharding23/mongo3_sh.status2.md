# commands
mongosh mongodb://192.168.29.120:30000
sh.status()
<!------------------------------------------------------------------------------------------>

# main keys/properties

shardingVersion
shards
active mongoses
autosplit
balancer
databases
<!------------------------------------------------------------------------------------------>

`shardingVersion`
    { 
        _id: 1, 
        clusterId: ObjectId('66cc5b653753b6efa69a4f14') 
    }

`shards` 
    [
        {
            _id: 'shard1rs',
            host: 'shard1rs/192.168.29.120:20001,192.168.29.120:50002,192.168.29.120:50003',
            state: 1,
            topologyTime: Timestamp({ t: 1724669039, i: 2 })
        }
    ]

`active mongoses`
    [ 
        { '7.0.5': 1 } 
    ]

`autosplit`
    { 
        'Currently enabled': 'yes' 
    }

`balancer`
    {
        'Currently running': 'no',
        'Currently enabled': 'yes',
        'Failed balancer rounds in last 5 attempts': 0,
        'Migration Results for the last 24 hours': 'No recent migrations'
    }
`databases` -- see nextFile
