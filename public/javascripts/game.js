const screen = document.getElementById('screen');
const context = screen.getContext('2d');
var playerList = document.getElementById('playerList');

renderScreen = (game) => { 
	clearScreen();
	for(const coin of game.coins) {
		context.fillStyle = coin.color;
		context.fillRect(coin.x, coin.y, 1, 1);
	}
	for(const bomb of game.bombs) {
		context.fillStyle = bomb.color;
		context.fillRect(bomb.x, bomb.y, 1, 1);
	}
	for(const player of game.players) {
		context.fillStyle = player.color;
		context.fillRect(player.x, player.y, 1, 1);
	}
	playerListRender(game);
}

clearScreen = () => {
	context.fillStyle = 'white';
	context.clearRect(0, 0, 25, 25);
};

playerListRender = (game) => {
	playerList.innerHTML = "";
	var listText = "";
	for(let player of game.players) {
		listText += '<h4 style="color:'+player.color+'">'+player.name+': '+player.points+'</h4><br>'
	}
	playerList.innerHTML = listText;
};

document.addEventListener('keydown', (event) => {
	socket.emit('keyPress', event.key)
});

















