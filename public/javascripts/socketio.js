var socket = io();
var coinAudio = new Audio('audio/coin.mp3');
var bombAudio = new Audio('audio/bomb.mp3');

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

socket.on('playBomb', () => {
	bombAudio.play();
});

socket.on('playerDied', () => {
	if(confirm('Parabéns, você se matou! Aperte OK para retornar ao menu!')){
		window.location.href = 'index.html'
	}
});

socket.on('playerKilled', duel => {
	console.log(socket.id);
	console.log(duel.killed.id);
	if(socket.id == duel.killed.id) {
		if(confirm('Você foi morto por '+duel.killer.name+' Aperte OK para retornar ao menu!')){
			window.location.href = 'index.html'
		};
	}
});





















