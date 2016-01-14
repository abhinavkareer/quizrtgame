var express = require('express');
var fs=require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'QuizRT Game World' });
});
// router.get('/getHallOFFameJson', function(req, res, next) {
// var countryContinentMap=JSON.parse(fs.readFileSync('./../public/resources/hallOfFame.json', 'utf8'));
// console.log(countryContinentMap);
// });

module.exports = router;
