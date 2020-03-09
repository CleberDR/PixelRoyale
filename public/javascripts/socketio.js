var socket = io();

socket.on('connection', () => {
	socket.emit('playerConnected', player);
	socket.emit('renderGame');
});

socket.on('renderGame', game => {
	renderScreen(game);
});



















