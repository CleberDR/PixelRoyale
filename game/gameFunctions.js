const bombCollisionTest = (game, player, socket) => {
	for(let [index, bomb] of game.bombs.entries()) {
		if(player.x == bomb.x && player.y == bomb.y) {
			game.bombs.splice(index, 1);
			game.players = game.players.filter((p) => {
				return p.id != player.id;
			}, player);
			socket.emit('playerDied');
			socket.emit('playBomb');
			socket.broadcast.emit('playBomb');
		}
	}
};

const coinCollisionTest = (game, player, socket) => {
	for(let [index, coin] of game.coins.entries()) {
		if(player.x == coin.x && player.y == coin.y) {
			game.coins.splice(index, 1);
			player.points++;
			socket.emit('playCoin');
		}
	}
}

const enemyPlayerCollisionTest = (game, player, socket) => {
	for(let [index, enemyPlayer] of game.players.entries()) {
		if(player.x == enemyPlayer.x && player.y == enemyPlayer.y && player.id != enemyPlayer.id) {

			if(player.points >= enemyPlayer.points) {
				var duel = {
					'killer': player,
					'killed': enemyPlayer
				}
				player.points = player.points + enemyPlayer.points;
				game.players.splice(index, 1);

			} else {
				var duel = {
					'killer': enemyPlayer,
					'killed': player
				}
				enemyPlayer.points = enemyPlayer.points + player.points;
				game.players = game.players.filter((p) => {
					return p.id != player.id;
				}, player);
				
			}
			socket.emit('playerKilled', duel);
			socket.broadcast.emit('playerKilled', duel);
		}
	}
};

const sortPlayers = (players) => {
	var sortedPlayers =  players.sort((playerA, playerB) => {
		if(playerA.points < playerB.points) {
			return 1;
		}
		if(playerA.points > playerB.points) {
			return -1;
		}
		return 0;
	});
	return sortedPlayers;
}

const isGameKey = (key) => {
	return (key == "ArrowUp" || key == "ArrowDown" || key == "ArrowRight" || key == "ArrowLeft");
}

module.exports = {
    bombCollisionTest,
    coinCollisionTest,
	enemyPlayerCollisionTest,
	sortPlayers,
	isGameKey
}


