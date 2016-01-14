var express = require('express');
var fs=require('fs');

var router = express.Router();

/* GET People page. */
router.get('/people', function(req, res, next) {
  res.render('people', { title: 'People|QuizRT Game World' });
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
