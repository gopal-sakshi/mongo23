sh.status()

<!-- works only against admin databases ?? -->
db.runCommand(
    { listShards: 1 }
)

db.runCommand("getShardMap")

use movies23;
db.telugu.getShardDistribution();
sh.getBalancerState();
sh.isBalancerRunning();
sh.startBalancer();
    balancer will not run outside activeWindow


`use config` --- update activeWindow timings & unset so that balancer is always running

use config --- to switch to config database

db.settings.updateOne(
    { _id: "balancer" },
    { $set: { activeWindow : { start : "18:00", stop : "19:00" } } },
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
<!----------------------------------------------------------------------------------->
