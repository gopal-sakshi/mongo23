let rmModel = require('../schemas/realMadrid');

let addPlayerCb = async(req, res) => {
    let player = new rmModel(req.body);
    console.log(player);
    const result23 = await player.save().then(doc => {
        return true
    }).catch(err => {console.log(err); return false});
    if(result23) res.send('hittu, player added');
    else res.send('phatttuuu');
}

let updatePlayerCb = async(req, res) => {
    let player = new rmModel(req.body);
    console.log(player);
    const filter12 = { playerName: player.playerName };
    const update12 = { phone: player.phone };
    const result23 = await rmModel.findOneAndUpdate(filter12, update12, { new: true });
    res.send(result23);
}

let searchRMCb = async(req, res) => {
    let searchString = req.body.searchString;
    const result23 = await rmModel.find({ $text: { $search: searchString } })
    .select({ "playerName": 1, "_id": 0, "description": 1, "otherStuff": 1 })
    .then(doc => { console.log("search doc ====> ", doc); return doc })
    .catch(err => { console.log("err ==> ", err.message); return null });

    if(result23) res.send(result23);
    else res.send('phattu');
}
/***************************************************************************/

// build a text index and use it to find coffee shops, given only text fields.
    // https://www.mongodb.com/docs/v4.4/text-search/

/***************************************************************************/

module.exports = {
    addPlayerCb, updatePlayerCb, searchRMCb
}