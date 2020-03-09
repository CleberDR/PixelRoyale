var gameArea = undefined;
var context = undefined;

var createGameArena = () => {
	gameArea = document.createElement('canvas');
	gameArea.id = 'game';
	gameArea.classList.add('game');
	document.body.appendChild(gameArea);
}

var draw = (player) => {
	gameArea = document.getElementById('game');
	context = gameArea.getContext('2d')
	var draw = () => {
			context.beginPath();
			context.rect(5, 5,  5,  5);
			context.stroke();
		};
	draw();
};