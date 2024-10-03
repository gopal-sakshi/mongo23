let EmailModel = require('../schemas/emailSchema');

let addEmailCb = async (req, res) => {    
    let msg = new EmailModel({
        email: req.body.email,
        age: Number(req.body.age),
        drink: req.body.drink,
        foods23: req.body.foods23,
        roleModel23: req.body.roleModel23,
        start1: req.body.start1,    end1: req.body.end1,
        start2: req.body.start2,    end2: req.body.end2
    });
    const result23 = await msg.save().then(doc => {
        console.log("new entry23 ===> ", doc); return doc;
    }).catch(err => { console.log("err ===> ", err.message); return false; });
    res.send(result23);    
}

let emailSearchCb = async (req, res) => {

    // APPROACH I =====> normally return
    const queryResult = await EmailModel.findOne({
        email: req.params.email
    }).then(doc => {console.log("email found ===> ", doc); return doc})
    .catch(err => {console.log(err.message); return false });
    // thats WHY use this ===> _doc dont bother other mongoose properties
    res.send({ ...queryResult._doc, email: queryResult.email });
}

// findOneAndUpdate
// EmailModel.findOneAndUpdate(
//   { email: 'ada.lovelace@gmail.com' },                                  // search query
//   { email: 'theoutlander@live.com'  },                                 // field:values to update
//   { new: true, runValidators: true }              // return updated doc... validate before update
// ).then().catch();


// delete
// EmailModel.findOneAndRemove({
//     email: 'theoutlander@live.com'
// }).then().catch();

module.exports = {
    addEmailCb, emailSearchCb
}