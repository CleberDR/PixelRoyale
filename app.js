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
	let date = new Date();
	var x = Math.floor(Math.random() * 26)
	var y = Math.floor(Math.random() * 26)
	var color = 'rgb(216, 174, 57)'
	game.coins.push({id: date.getTime(), x: x, y: y, color: color})
}, 5000);

const bombGenerator = setInterval(function() {
	let date = new Date();
	var x = Math.floor(Math.random() * 26)
	var y = Math.floor(Math.random() * 26)
	var color = 'black';
	game.bombs.push({id: date.getTime(), x: x, y: y, color: color})
}, 25000);

var game = {
	players: [

	],
	coins: [

	],
	bombs: [

	]
};

//IO
io.on('connection', socket => {
	socket.emit('connection', socket.id);

	socket.on('playerConnected', player => {
		player.id = socket.id;
		game.players.push(player);
	});

	socket.on('renderGame', () => {
		socket.emit('renderGame', game);
		socket.broadcast.emit('renderGame', game);
	});

	socket.on('keyPress', key => {
		keyHandler = {
			'ArrowUp': function (game) {
				game.players.map((player) => {
					if(player.id == socket.id  && player.y > 0) {
						player.y--;

						for(let [index, coin] of game.coins.entries()) {
							if(player.x == coin.x && player.y == coin.y) {
								game.coins.splice(index, 1);
								player.points++;
							}
						}
						for(let [index, enemyPlayer] of game.players.entries()) {
							if(player.x == enemyPlayer.x && player.y == enemyPlayer.y && player.id != enemyPlayer.id) {
								game.players.splice(index, 1);
								player.points = player.points + 10;
							}
						}
						for(let [index, bomb] of game.bombs.entries()) {
							if(player.x == bomb.x && player.y == bomb.y) {
								game.bombs.splice(index, 1);
								player.points = player.points - 10;
								game.players = game.players.filter((p) => {
									return p.id != player.id;
								}, player);
							}
						}
					}
				})
			},
			'ArrowDown': function(game) {
				game.players.map((player) => {
					if(player.id == socket.id  && player.y < 24) {
						player.y++;

						for(let [index, coin] of game.coins.entries()) {
							if(player.x == coin.x && player.y == coin.y) {
								game.coins.splice(index, 1);
								player.points++;
							}
						}
						for(let [index, enemyPlayer] of game.players.entries()) {
							if(player.x == enemyPlayer.x && player.y == enemyPlayer.y && player.id != enemyPlayer.id) {
								game.players.splice(index, 1);
								player.points = player.points + 10;
							}
						}
						for(let [index, bomb] of game.bombs.entries()) {
							if(player.x == bomb.x && player.y == bomb.y) {
								game.bombs.splice(index, 1);
								player.points = player.points - 10;
								game.players = game.players.filter((p) => {
									return p.id != player.id;
								}, player);
							}
						}
					}
				})
			},
			'ArrowRight': function(game) {
				game.players.map((player) => {
					if(player.id == socket.id && player.x < 24) {
						player.x++;

						for(let [index, coin] of game.coins.entries()) {
							if(player.x == coin.x && player.y == coin.y) {
								game.coins.splice(index, 1);
								player.points++;
							}
						}
						for(let [index, enemyPlayer] of game.players.entries()) {
							if(player.x == enemyPlayer.x && player.y == enemyPlayer.y && player.id != enemyPlayer.id) {
								game.players.splice(index, 1);
								player.points = player.points + 10;
							}
						}
						for(let [index, bomb] of game.bombs.entries()) {
							if(player.x == bomb.x && player.y == bomb.y) {
								game.bombs.splice(index, 1);
								player.points = player.points - 10;
								game.players = game.players.filter((p) => {
									return p.id != player.id;
								}, player);
							}
						}
					}
				})
			},
			'ArrowLeft': function (game) {
				game.players.map((player) => {
					if(player.id == socket.id && player.x > 0) {
						player.x--;

						for(let [index, coin] of game.coins.entries()) {
							if(player.x == coin.x && player.y == coin.y) {
								game.coins.splice(index, 1);
								player.points++;
							}
						}
						for(let [index, enemyPlayer] of game.players.entries()) {
							if(player.x == enemyPlayer.x && player.y == enemyPlayer.y && player.id != enemyPlayer.id) {
								game.players.splice(index, 1);
								player.points = player.points + 10;
							}
						}
						for(let [index, bomb] of game.bombs.entries()) {
							if(player.x == bomb.x && player.y == bomb.y) {
								game.bombs.splice(index, 1);
								player.points = player.points - 10;
								game.players = game.players.filter((p) => {
									return p.id != player.id;
								}, player);
							}
						}
					}
				})
			},
		}

		if(key == "ArrowUp" || key == "ArrowDown" || key == "ArrowRight" || key == "ArrowLeft") {
			keyHandler[key](game);
		}

		socket.broadcast.emit('renderGame', game);
		socket.emit('renderGame', game);
	});

});


module.exports = app;


