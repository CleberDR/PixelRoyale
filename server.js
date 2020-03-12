var app = require('./app.js');
var game = require('./game/gameStructure.js');
const keyHandler = require('./game/gameKeyHandler.js');
const {
	sortPlayers,
	isGameKey
  } = require('./game/gameFunctions');

const server = require('http').createServer(app).listen(3000)
const io = require('socket.io')(server, {
	pingInterval: 15000,
	pingTimeout: 30000,
});

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
		if(isGameKey(key)) {
			keyHandler[key](game, socket);
			game.players = sortPlayers(game.players);
		}
		socket.broadcast.emit('renderGame', game);
		socket.emit('renderGame', game);
	});

});

module.exports = {
    server,
    io
}