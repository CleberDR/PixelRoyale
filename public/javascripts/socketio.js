var socket = io();
var coinAudio = new Audio('audio/coin.mp3');

socket.on('playCoin', () => {
	coinAudio.play();
})

socket.on('connection', () => {
	socket.emit('playerConnected', player);
	socket.emit('renderGame');
});

socket.on('renderGame', game => {
	renderScreen(game);
});



















