//MODULES
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes/router');
var bodyParser = require('body-parser');

var app = express();

//SERVER
const server = require('http').createServer(app).listen(3000)
 
const io = require('socket.io')(server, {
	pingInterval: 15000,
	pingTimeout: 30000,
});

//POSTPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//VIEW
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//ROUTES
app.use('/', router);

//VIEW RENDER
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

//ERROR HANDLER
app.use(function(req, res, next) {
  	next(createError(404));
});
app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
});
//GAME

const coinGenerator = setInterval(function() {
	var x = Math.floor(Math.random() * 26)
	var y = Math.floor(Math.random() * 26)
	var color = 'rgb(216, 174, 57)'
	game.coins.push({x, y, color})
}, 5000);

const bombGenerator = setInterval(function() {
	var x = Math.floor(Math.random() * 26)
	var y = Math.floor(Math.random() * 26)
	var color = 'black';
	game.bombs.push({x, y, color})
}, 25000);

var game = {
    players: [

    ],
    coins: [

	],
	bombs: [

    ]
}

//IO
io.on('connection', socket => {
	socket.emit('connection');

	socket.on('playerConnected', player => {
		game.players.push(player);
	});

	socket.on('renderGame', () => {
		socket.emit('renderGame', game);
		socket.broadcast.emit('renderGame', game);
	});
});


module.exports = app;


