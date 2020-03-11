const screen = document.getElementById('screen');
const context = screen.getContext('2d');
var playerList = document.getElementById('playerList');
var playerDead = false;

const renderScreen = (game) => { 
	if(!playerDead){
		clearScreen();
	}
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

const clearScreen = () => {
	context.fillStyle = 'white';
	context.clearRect(0, 0, 25, 25);
};

const playerListRender = (game) => {
	playerList.innerHTML = "";
	var listText = "";
	for(let player of game.players) {
		listText += '<h4 style="color:'+player.color+'">'+player.name+': '+player.points+'</h4><br>'
	}
	playerList.innerHTML = listText;
};

const textRender = () => {
	context.font = "Press Start 2P";
	context.fillStyle = 'red';
	context.fillText("Dead", 0, 15);
}

document.addEventListener('keydown', (event) => {
	socket.emit('keyPress', event.key)
});

















