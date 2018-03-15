Game.Lobby = function(game) {
};
Game.Lobby.prototype = {
	create: function() {
		this.buttonContinue = this.add.button(0, 0, 'screen-lobby', this.startGame, this);
	},
	startGame: function() {
		this.game.state.start('Game');
	}
};