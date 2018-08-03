var express = require('express');
var router = express.Router();
var path = require('path'); 

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
 res.sendFile(path.join(__dirname + '/signup.html'));
});
router.get('/login.html', function(req, res, next) {
 res.sendFile(path.join(__dirname + '/login.html'));
});
router.get('/savingsPlan.html', function(req, res, next) {
 res.sendFile(path.join(__dirname + '/savingsPlan.html'));
});
router.get('/withdrawal.html', function(req, res, next) {
 res.sendFile(path.join(__dirname + '/withdrawal.html'));
});

module.exports = router;
