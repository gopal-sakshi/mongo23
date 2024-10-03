var mongoose = require('../mongoose23').moviesDb;
let validator = require('validator');
/************************************************************************ */

function obfuscate23(email) {
    // obfuscate23 getter is only applied if we access specific property
    // if we request whole doc --> email goes as it is... only specific property means getter is applied
    let first_last_char_regex = /(?<!^).(?!$)/g;
    const id23 = email.split('@');
    return id23[0].replace(first_last_char_regex, '*') + '@' + id23[1];
}

/************************************************************************ */
let emailSchema = new mongoose.Schema({    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        get: obfuscate23,
        validate: (value) => {
          return validator.isEmail(value)
        }
    },
    age: {
        type: Number,
        min: [18, 'pillodu raa'],
        max: 65,
        required: [true, 'age kavali babai']                // required with ERROR message
    },
    drink: {
        type: String,
        enum: ['Coffee', 'Tea', 'Water']                // only these values allowed
    },
    foods23: {
        type: [String],     // kaneesam rendu foods23 ayina cheppali
        validate: { 
            validator: function(favFoods) { return favFoods.length > 2; }, 
            message: (props) => `${JSON.stringify(props)}__not valid foods23 babai`
        },
        required: true
    },
    roleModel23: {
        type: String,
        validate: { 
            validator: async function (v) { 
                return await checkPlayers23(v); 
            },
            message: (props) => `${JSON.stringify(props)}__not valid roleModels babai`
        },
        required: true
    },
    start1: { type: Date, required: true },
    end1: { type: Date, required: true },

    start2: { type: Date, required:true },
    end2: { type:Date, validate: [ dateValidator2, 'startDate pedda ga undakoodadu ra' ] }

});


/************************************************************************ */
emailSchema.pre('validate', function(next) {
    if(this.start1 > this.end1) { next(new Error('end date failed23')) } 
    else next();
});

function dateValidator2(value23) { return this.start2 <= value23; }

async function checkPlayers23(value) {
    let disliked23 = ['xavi', 'pique', 'suarez']
    return !disliked23.includes(value.toLowerCase())
}
/************************************************************************ */

module.exports = mongoose.model('Email', emailSchema);      // Email ---> emails
