var socket = io();

socket.on('connection', () => {
	createGameArena();
	socket.emit('playerConnected', player);
	socket.emit('updateContext', gameArea.getContext('2d'));
});

socket.on('drawPlayer', player => {
	draw(player);
});













