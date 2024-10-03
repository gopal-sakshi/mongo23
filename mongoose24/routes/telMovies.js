let TeluguModel = require('../schemas/teluguSchema');


let addMovieCb = async (req, res) => {
    let msg = new TeluguModel(req.body);
    const result23 = await msg.save().then(doc => {
        console.log(doc);
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    });
    if(result23) res.send('hittu, movie added');
    else res.send('phatttuuu');
}

let heroHeroineCb = async (req, res) => {
    console.log(req.params.movie23);
    const queryResult = await TeluguModel.findOne({
        'name': req.params.movie23                        // searches in 'name' field in teluguSchema
    }).then(doc => {
        console.log(doc.toObject({virtuals:true}));        
        return doc;
    });
    res.send(queryResult);
    // if(queryResult) res.send({res23: queryResult});
    // else res.send('po ra rei');
}

let updateMovieCb23 = async (req, res) => {
    const filter23 = { name: req.params.movie23 };    
    const update23 = { $set: { 
        hero: "$hero" + Math.round(Math.random() * 100),
        heroine: req.body.heroine ? req.body.heroine : `soundarya_${Date.now()}` 
    }}
    // returnOriginal: false ===> new updated document is retured instead of old one
    const queryResult = await TeluguModel.findOneAndUpdate(filter23, update23, { returnOriginal: false })
    .then(doc => { console.log("updated movie ===> ", doc); return doc })
    .catch(err => {console.log(err); return null});
    if(queryResult) res.send(queryResult);
    else res.send({info23: 'poyindi', time23: Date.now() });
}

/*
    update23 ---> i want to update hero, based on hero... but $hero DOESNT WORK... it saves "$hero97"
    we need to use aggregate pipeline
    the normal update query can not allow using an internal properties as reference to another property,
*/

let updateMovieCb24 = async (req, res) => {
    const filter23 = { name: req.params.movie23 };    
    const update23 = [
        { $set: { hero: { $concat: [ '$hero', '__' ] } } }
    ];
    const queryResult = await TeluguModel.findOneAndUpdate(filter23, 
        update23,           // are we using aggreate pipeline here ??
        { returnOriginal: false })
    .then(doc => { console.log("updated movie ===> ", doc); return doc })
    .catch(err => {console.log(err); return null});
    if(queryResult) res.send(queryResult);
    else res.send({info23: 'poyindi', time23: Date.now() });
}


module.exports = {
    addMovieCb, heroHeroineCb, updateMovieCb23, updateMovieCb24
}