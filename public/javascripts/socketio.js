var socket = io();

socket.on('connection', () => {
	socket.emit('playerConnected', player);
});

socket.on('renderGame', game => {
	console.log(game)
	renderScreen(game);
});

















