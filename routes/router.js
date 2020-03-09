var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');

router.get('/', function(req, res, next) {
  	res.render('index.html');
});

router.post('/game', function(req, res, next) {
	userContext = {
		'user':  req.body.user,
		'color': req.body.color
	};
	res.render('game.html', { userContext: userContext });
});

module.exports = router;
