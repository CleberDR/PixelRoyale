const {
    bombCollisionTest,
    coinCollisionTest,
	enemyPlayerCollisionTest,
  } = require('./gameFunctions');

const keyHandler = {
    'ArrowUp': function (game, socket) {
        game.players.map((player) => {
            if(player.id == socket.id) {
                if(player.y == game.minLimit) {
                    player.y = game.maxLimit
                } else {
                    player.y--;
                }
                enemyPlayerCollisionTest(game, player, socket);
                bombCollisionTest(game, player, socket);
                coinCollisionTest(game, player, socket);
            }
        })
    },
    'ArrowDown': function(game, socket) {
        game.players.map((player) => {
            if(player.id == socket.id) {
                if(player.y == game.maxLimit) {
                    player.y = game.minLimit
                } else {
                    player.y++;
                }
                enemyPlayerCollisionTest(game, player, socket);
                bombCollisionTest(game, player, socket);
                coinCollisionTest(game, player, socket);
            }
        })
    },
    'ArrowRight': function(game, socket) {
        game.players.map((player) => {
            if(player.id == socket.id) {
                if(player.x == game.maxLimit) {
                    player.x = game.minLimit
                } else {
                    player.x++;
                }
                enemyPlayerCollisionTest(game, player, socket);
                bombCollisionTest(game, player, socket);
                coinCollisionTest(game, player, socket);
            }
        })
    },
    'ArrowLeft': function (game, socket) {
        game.players.map((player) => {
            if(player.id == socket.id) {
                if(player.x == game.minLimit) {
                    player.x = game.maxLimit
                } else {
                    player.x--;
                }
                enemyPlayerCollisionTest(game, player, socket);
                bombCollisionTest(game, player, socket);
                coinCollisionTest(game, player, socket);
            }
        })
    },
}

module.exports = keyHandler;