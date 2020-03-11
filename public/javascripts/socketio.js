var socket = io();
const coinAudio = new Audio('audio/coin.mp3');
const bombAudio = new Audio('audio/bomb.mp3');
const killAudio = new Audio('audio/kill.mp3');

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
	playerDead = true;
	textRender();
});

socket.on('playerKilled', duel => {
	if(socket.id == duel.killed.id) {
		playerDead = true;
		textRender();
	} else {
		killAudio.play();
	}
});





















