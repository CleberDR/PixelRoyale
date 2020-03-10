const screen = document.getElementById('screen');
const context = screen.getContext('2d');
var playerList = document.getElementById('playerList');

renderScreen = (game) => { 
	clearScreen();

	for(const coinId in game.coins) {
		const coin = game.coins[coinId]
		context.fillStyle = coin.color;
		context.fillRect(coin.x, coin.y, 1, 1);
	}

	for(const bombId in game.bombs) {
		const bomb = game.bombs[bombId]
		context.fillStyle = bomb.color;
		context.fillRect(bomb.x, bomb.y, 1, 1);
	}

	for(const playerId in game.players) {
		const player = game.players[playerId]
		context.fillStyle = player.color;
		context.fillRect(player.x, player.y, 1, 1);
	}


}

clearScreen = () => {
	context.fillStyle = 'white';
	context.clearRect(0, 0, 25, 25);
}

document.addEventListener('keydown', (event) => {
	socket.emit('keyPress', event.key)
});











