sh.status()

<!-- works only against admin databases ?? -->
db.runCommand(
    { listShards: 1 }
)

db.runCommand("getShardMap")

