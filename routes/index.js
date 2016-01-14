var express = require('express');
var fs=require('fs');

var router = express.Router();

/* GET People page. */
router.get('/people', function(req, res, next) {
  res.render('people', { title: 'People|QuizRT Game World' });
});

/* GET tournament page. */
router.get('/tournament', function(req, res, next) {
  res.render('tournament', { title: 'QuizRT Game World' });
});

/* GET tournament page. */
router.get('/tournament-json', function(req, res, next) {
  var tournamentJSON=fs.readFileSync('./public/resources/tournament.json', 'utf8');
  res.send(tournamentJSON);
  //res.json(tournamentJSON);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QuizRT Game World' });
});
router.get('/getHallOFFameJson', function(req, res, next) {
  var countryContinentMap=JSON.parse(fs.readFileSync('./public/resources/hallOfFame.json', 'utf8'));
  res.json(countryContinentMap);
});

module.exports = router;
