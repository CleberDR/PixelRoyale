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
var game = {
	players: [

	],
	coins: [

	],
	bombs: [

	],
	minLimit: 0,
	maxLimit: 24
};

const bombCollisionTest = (game, player, socket) => {
	for(let [index, bomb] of game.bombs.entries()) {
		if(player.x == bomb.x && player.y == bomb.y) {
			game.bombs.splice(index, 1);
			game.players = game.players.filter((p) => {
				return p.id != player.id;
			}, player);
			socket.emit('playerDied');
			socket.emit('playBomb');
			socket.broadcast.emit('playBomb');
		}
	}
};

const coinCollisionTest = (game, player, socket) => {
	for(let [index, coin] of game.coins.entries()) {
		if(player.x == coin.x && player.y == coin.y) {
			game.coins.splice(index, 1);
			player.points++;
			socket.emit('playCoin');
		}
	}
}

const enemyPlayerCollisionTest = (game, player, socket) => {
	for(let [index, enemyPlayer] of game.players.entries()) {
		if(player.x == enemyPlayer.x && player.y == enemyPlayer.y && player.id != enemyPlayer.id) {

			if(player.points >= enemyPlayer.points) {
				var duel = {
					'killer': player,
					'killed': enemyPlayer
				}
				player.points = player.points + enemyPlayer.points;
				game.players.splice(index, 1);
			} else {
				var duel = {
					'killer': enemyPlayer,
					'killed': player
				}
				enemyPlayer.points = enemyPlayer.points + player.points;
				game.players = game.players.filter((p) => {
					return p.id != player.id;
				}, player);
			}
			socket.emit('playerKilled', duel);
			socket.broadcast.emit('playerKilled', duel);
		}
	}
};

const sortPlayers = (players) => {
	var sortedPlayers =  players.sort((playerA, playerB) => {
		if(playerA.points < playerB.points) {
			return 1;
		}
		if(playerA.points > playerB.points) {
			return -1;
		}
		return 0;
	});
	return sortedPlayers;
}

const isGameKey = (key) => {
	return (key == "ArrowUp" || key == "ArrowDown" || key == "ArrowRight" || key == "ArrowLeft");
}

const coinGenerator = setInterval(function() {
	var x = Math.floor(Math.random() * game.maxLimit)
	var y = Math.floor(Math.random() * game.maxLimit)
	var color = 'rgb(216, 174, 57)'
	game.coins.push({x: x, y: y, color: color})
}, 10000);

const bombGenerator = setInterval(function() {
	var x = Math.floor(Math.random() * game.maxLimit)
	var y = Math.floor(Math.random() * game.maxLimit)
	var color = 'black';
	game.bombs.push({x: x, y: y, color: color})
}, 15000);

//IO
io.on('connection', socket => {
	socket.emit('connection', socket.id);

	socket.on('playerConnected', player => {
		player.x = Math.floor(Math.random() * game.maxLimit);
		player.y = Math.floor(Math.random() * game.maxLimit);
		player.id = socket.id;
		game.players.push(player);
	});

	socket.on('renderGame', () => {
		socket.emit('renderGame', game);
		socket.broadcast.emit('renderGame', game);
	});

	socket.on('disconnect', () => {
		for(let [index, player] of game.players.entries()) {
			if(player.id == socket.id) {
				game.players.splice(index, 1);
			}
		}
		socket.broadcast.emit('renderGame', game);
	});



	socket.on('keyPress', key => {
		const keyHandler = {
			'ArrowUp': function (game) {
				game.players.map((player) => {
					if(player.id == socket.id) {
						if(player.y == game.minLimit) {
							player.y = game.maxLimit
						} else {
							player.y--;
						}
                        enemyPlayerCollisionTest(game, player, socket);
                        bombCollisionTest(game, player, socket);
						coinCollisionTest(game, player, socket);
					}
				})
			},
			'ArrowDown': function(game) {
				game.players.map((player) => {
					if(player.id == socket.id) {
						if(player.y == game.maxLimit) {
							player.y = game.minLimit
						} else {
							player.y++;
						}
                        enemyPlayerCollisionTest(game, player, socket);
                        bombCollisionTest(game, player, socket);
						coinCollisionTest(game, player, socket);
					}
				})
			},
			'ArrowRight': function(game) {
				game.players.map((player) => {
					if(player.id == socket.id) {
						if(player.x == game.maxLimit) {
							player.x = game.minLimit
						} else {
							player.x++;
						}
                        enemyPlayerCollisionTest(game, player, socket);
                        bombCollisionTest(game, player, socket);
						coinCollisionTest(game, player, socket);
					}
				})
			},
			'ArrowLeft': function (game) {
				game.players.map((player) => {
					if(player.id == socket.id) {
						if(player.x == game.minLimit) {
							player.x = game.maxLimit
						} else {
							player.x--;
						}
                        enemyPlayerCollisionTest(game, player, socket);
                        bombCollisionTest(game, player, socket);
						coinCollisionTest(game, player, socket);
					}
				})
			},
		}
		
		if(isGameKey(key)) {
			keyHandler[key](game);
			game.players = sortPlayers(game.players);
		}

		socket.broadcast.emit('renderGame', game);
		socket.emit('renderGame', game);
	});

});


module.exports = app;


