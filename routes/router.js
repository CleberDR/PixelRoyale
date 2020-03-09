var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  	res.render('index.html');
});

router.post('/game', (req, res, next) => {
	userContext = {
		'user':  req.body.user,
		'color': req.body.color
	};
	res.render('game.html', { userContext: userContext });
});

module.exports = router;
