const screen = document.getElementById('screen');
const context = screen.getContext('2d');

renderScreen = (game) => {
    for(playerId in game.players) {
        const player = game.players[playerId]
        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, 1, 1);
    }

    for(coinId in game.coins) {
        const coin = game.coins[coinId]
        context.fillStyle = coin.color;
        context.fillRect(coin.x, coin.y, 1, 1);
    }
}






