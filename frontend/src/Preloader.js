Game.Preloader = function (game) {};
Game.Preloader.prototype = {
	preload: function () {
		this.preloadBar = this.add.sprite(Game._WIDTH * 0.5, Game._HEIGHT * 0.5, 'preloaderBar');
		this.preloadBar.anchor.set(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.game.add.plugin(PhaserInput.Plugin);

		this.load.image('star', 'assets/star.png');
		this.load.image('prize', 'assets/prize.png');
		this.load.image('bar', 'assets/button_bar.png');
		this.load.image('sky', 'assets/sky.png');
		this.load.image('path', 'assets/path.png');
		this.load.image('barrier', 'assets/barrier.png');
		this.load.image('goLeft', 'assets/left.png');
		this.load.image('goRight', 'assets/right.png');
		this.load.image('goUp', 'assets/up.png');
		this.load.image('goDown', 'assets/down.png');
		this.load.image('qLeft', 'assets/minileft.png');
		this.load.image('qRight', 'assets/miniright.png');
		this.load.image('qUp', 'assets/miniup.png');
		this.load.image('qDown', 'assets/minidown.png');
		this.load.image('resetButton', 'assets/reset.png');
		this.load.image('undoButon', 'assets/undo.png');
		this.load.image('goButton', 'assets/gobutton.png');
		this.load.image('goal', 'assets/goal.png');

		this.load.image('ball', 'img/ball.png');
		this.load.image('hole', 'img/hole.png');
		this.load.image('element-w', 'img/element-w.png');
		this.load.image('element-h', 'img/element-h.png');
		this.load.image('panel', 'img/panel.png');
		this.load.image('title', 'img/title.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('screen-bg', 'img/screen-bg.png');
		this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		this.load.image('screen-lobby', 'img/screen-lobby.png');
		this.load.image('border-horizontal', 'img/border-horizontal.png');
		this.load.image('border-vertical', 'img/border-vertical.png');

		this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);
		this.load.spritesheet('button-play', 'img/button-play.png', 330, 132);

		this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
	},
	create: function () {
		this.game.state.start('MainMenu');
	}
};
