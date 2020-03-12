var game = {
	players: [

	],
	coins: [

	],
	bombs: [

	],
	minLimit: 0,
	maxLimit: 24
};

var coinInterval = 5;
const coinGenerator = setInterval(function() {
	var x = Math.floor(Math.random() * game.maxLimit)
	var y = Math.floor(Math.random() * game.maxLimit)
	var color = 'rgb(216, 174, 57)'
	game.coins.push({x: x, y: y, color: color})
}, coinInterval*1000);

var bombInterval = 10;
const bombGenerator = setInterval(function() {
	var x = Math.floor(Math.random() * game.maxLimit)
	var y = Math.floor(Math.random() * game.maxLimit)
	var color = 'black';
	game.bombs.push({x: x, y: y, color: color})
}, bombInterval*1000);

module.exports = game;