var express = require('express');
var router = express.Router();
let rma23 = require("./routes/rma");
let email23 = require("./routes/email");
let telMovies23 = require("./routes/telMovies");
let engMovies23 = require('./routes/engMovies');
/***************************************************************************/

router.put('/addPlayer', rma23.addPlayerCb);
router.put('/updatePlayer', rma23.updatePlayerCb);
router.put('/searchRM', rma23.searchRMCb)


router.post('/addEmail', email23.addEmailCb);
router.get('/emailSearch23/:email', email23.emailSearchCb);


router.put('/addMovieTelugu', telMovies23.addMovieCb);
router.get('/heroHeroine/:movie23', telMovies23.heroHeroineCb);
router.put('/updateMovie23/:movie23', telMovies23.updateMovieCb23);     // DOESNT WORK
router.put('/updateMovie24/:movie23', telMovies23.updateMovieCb24);     // WORKS


router.get('/top5Movies', engMovies23.top5Movies);
router.get('/top4Movies', engMovies23.top4Movies);
router.get('/top6Movies', engMovies23.top6Movies);      // NOT WORKING
router.get('/aggregate23', engMovies23.aggregate23);
router.get('/aggregate24_group', engMovies23.aggregate24_group);
router.post('/update23', engMovies23.update23);
router.get('/recentMovies23', engMovies23.recentMovies23);
router.get('/search23', engMovies23.search23);

module.exports = router;
/***************************************************************************/