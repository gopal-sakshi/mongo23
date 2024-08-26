databases [
{
    database: { _id: 'config', primary: 'config', partitioned: true },
    collections: {
        'config.system.sessions': {
            shardKey: { _id: 1 },
            unique: false,
            balancing: true,
            chunkMetadata: [ { shard: 'shard1rs', nChunks: 1 } ],
            chunks: [
                { 
                    min: { _id: MinKey() }, 
                    max: { _id: MaxKey() }, 
                    'on shard': 'shard1rs', 
                    'last modified': Timestamp({ t: 1, i: 0 }) 
                }
            ],
            tags: []
        }
    }
},
{
    database: {
        _id: 'movies23',
        primary: 'shard1rs',
        partitioned: false,
        version: {
            uuid: UUID('e757df34-cfec-4235-8d6d-92656818887a'),
            timestamp: Timestamp({ t: 1724669115, i: 1 }),
            lastMod: 1
        }
    },
    collections: {
        'movies23.telugu': {
            shardKey: { hero: 1 },
            unique: false,
            balancing: true,
            chunkMetadata: [ { shard: 'shard1rs', nChunks: 1 } ],
            chunks: [
                { 
                    min: { hero: MinKey() }, 
                    max: { hero: MaxKey() }, 
                    'on shard': 'shard1rs', 
                    'last modified': Timestamp({ t: 1, i: 0 }) 
                }
            ],
            tags: []
        }
    }
}]