var mongooseClient = require('../mongoose23').zipsDb;
var mongoose = require('mongoose');
/************************************************************************ */

let moviesSchema = new mongoose.Schema({
    plot: String,
    genres: [ {type:String} ],
    runtime: Number,
    rated: String,
    cast: [String],
    num_mflix_comments: Number,
    poster: String,
    title: String,
    fullplot: String,
    languages: [ {type:String} ],
    released: Date,
    directors: [ {type:String} ],
    writers: [ {type:String} ],
    awards: mongoose.Schema.Types.Mixed,
    lastupdated: String,
    year: Number,
    imdb: mongoose.Schema.Types.Mixed,
    countries: [ {type:String} ],
    type: String,
    tomatoes: mongoose.Schema.Types.Mixed,
    timeStamps: [ {type: Number}],
});
/************************************************************************/

module.exports = mongooseClient.model('movies', moviesSchema);