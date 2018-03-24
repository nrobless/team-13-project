Game.Game = function (game) {
	let barriers;
	let paths;
	let player;

	//Array to hold moves queue
	let movesQueue;
	//let movesQueue.length = 0;
	//Hold queue images
	let queues;
	//Current move popped from the queue
	let currentMove;

	//Moves queue coordinates
	let pX;
	let pY;

	//Players coordinates
	//Also used by the go function to move the player in the game world.
	let a;
	let b;

	//buttons
	let resetButton;
	let undoButon;
	let goButton;
	let left;
	let right;
	let up;
	let down;

	let tween;
	let trophy;
};
Game.Game.prototype = {
	create: function () {
		this.add.sprite(0, 0, 'sky');
		//this.physics.startSystem(Phaser.Physics.ARCADE);
		this.bar = this.add.group();
		this.bar.enableBody = true;
		let p = this.bar.create(0, 1111, 'bar');
		this.barriers = this.add.group();
		this.paths = this.add.group();
		this.queues = this.add.group();
		this.trophy = this.add.group();

		this.barriers.enableBody = true;
		this.paths.enableBody = true;
		this.trophy.enableBody = true;


		//Create a 10x10 grid
		let grid = new Array(10);
		for (let ab = 0; ab < 10; ab++) {
			grid[ab] = new Array(10);
		}

		let randomPathX;
		let randomPathY;
		do {
			for (let nx = 0; nx < 10; nx++) {
				for (let mx = 0; mx < 10; mx++) {
					grid[nx][mx] = 0;
				}
			}
			grid[0][0] = 1;
			randomPathX = 0;
			randomPathY = 0;
			for (let v = 0; v < 36; v++) {
				let randGen = Math.floor(Math.random() * 4);
				if (randGen == 0) {
					if (randomPathY > 0 && grid[randomPathX][randomPathY - 1] != 2) {
						randomPathY--;
						grid[randomPathX][randomPathY] = 2;
					}
				} else if (randGen == 1) {
					if (randomPathX < 9 && grid[randomPathX + 1][randomPathY] != 2) {
						randomPathX++;
						grid[randomPathX][randomPathY] = 2;
					}
				} else if (randGen == 2) {
					if (randomPathY < 9 && grid[randomPathX][randomPathY + 1] != 2) {
						randomPathY++;
						grid[randomPathX][randomPathY] = 2;
					}
				} else if (randGen == 3) {
					if (randomPathX > 0 && grid[randomPathX - 1][randomPathY] != 2) {
						randomPathX--;
						grid[randomPathX][randomPathY] = 2;
					}
				}
			}
		} while (randomPathX < 6 || randomPathY < 6);




		//Fill the grid with randomly created paths.// May no lead to the trophy
		for (var v = 0; v < 10; v++) {
			for (var w = 0; w < 10; w++) {
				let rand = Math.floor(Math.random() * 100);
				if (rand % 2 == 0) {
					grid[v][w] = 1;
				}
			}
		}



		for (var x = 0; x < 10; x++)
			for (var y = 0; y < 10; y++) {
				if (grid[x][y] == 1 || grid[x][y] == 2) {
					let path = this.paths.create(x * 108, y * 108 + 108, 'path');
					path.body.immovable = true;
				} else {
					let barrier = this.barriers.create(x * 108, y * 108 + 108, 'barrier');
					barrier.body.immovable = true;
				}
			}
		let t = this.trophy.create(randomPathX * 108, randomPathY * 108 + 108, 'goal');


		this.a = 56.25;
		this.b = 164.25;
		this.player = this.add.sprite(this.a, this.b, 'star');
		this.player.anchor.setTo(0.5);
		this.physics.arcade.enable(this.player);
		this.player.enableBody = true;
		this.player.body.immovable = true;
		this.player.body.gravity.y = 0;
		this.player.body.collideWorldBounds = true;
		this.player.body.moves = true;

		//Removes all moves already in the queue
		this.resetButton = this.add.button(101.25, 1596, 'resetButton', this.reset);

		//Removes the last move added to the queue
		this.undoButon = this.add.button(425.25, 1596, 'undoButon', this.undo);

		/*
		Player moves along a legitimate path. 
		Hitting a barrier moves the player to the start 
		and undo all moves in the queue
		*/
		this.goButton = this.add.button(749.25, 1596, 'goButton', this.go);

		//Adding moves control to the game
		this.left = this.add.button(157.5, 1812, 'goLeft', this.addQ);
		this.right = this.add.button(373.5, 1812, 'goRight', this.addQ);
		this.up = this.add.button(589.5, 1812, 'goUp', this.addQ);
		this.down = this.add.button(805.5, 1812, 'goDown', this.addQ);

		this.pX = 0;
		this.pY = 1200;
	},
	addQ: function () {

		if (this.movesQueue.length == 30) {
			return;
		}
		if (this.key == "goLeft") {
			if (this.movesQueue.length % 10 == 0 && this.movesQueue.length > 9) {
				this.pY += 108;
				this.pX = 0;
			}
			this.movesQueue.push(1);
			let lT = this.queues.create(this.pX, this.pY, 'qLeft');
			this.pX += 108;
		} else if (this.key == "goRight") {
			if (this.movesQueue.length % 10 == 0 && this.movesQueue.length > 9) {
				this.pY += 108;
				this.pX = 0;
			}
			this.movesQueue.push(2);
			let rT = this.queues.create(this.pX, this.pY, 'qRight');
			this.pX += 108;
		} else if (this.key == "goUp") {
			if (this.movesQueue.length % 10 == 0 && this.movesQueue.length > 9) {
				this.pY += 108;
				this.pX = 0;
			}
			this.movesQueue.push(3);
			let uP = this.queues.create(this.pX, this.pY, 'qUp');
			this.pX += 108;
		} else if (this.key == "goDown") {
			if (this.movesQueue.length % 10 == 0 && this.movesQueue.length > 9) {
				this.pY += 108;
				this.pX = 0;
			}
			this.movesQueue.push(4);
			let dN = this.queues.create(this.pX, this.pY, 'qDown');
			this.pX += 108;
		}
	},
	/*update: function () {
		this.physics.arcade.collide(this.player, this.bar);
		this.physics.arcade.overlap(this.player, this.bar, this.stp, null, this);

		this.physics.arcade.collide(this.player, this.barriers);
		this.physics.arcade.overlap(this.player, this.barriers, this.stp, null, this);

		this.physics.arcade.collide(this.player, this.trophy);
		this.physics.arcade.overlap(this.player, this.trophy, this.stp, null, this);
	},*/
	go: function () {

		this.tween = this.add.this.tween(this.player);
		while (this.movesQueue.length > 0) {
			var m = this.movesQueue.shift();

			if (m == 1) {
				this.a -= 108;
				this.tween.to({
					x: this.a,
					y: this.b
				}, 200, "Linear");
			} else if (m == 2) {
				this.a += 108;
				this.tween.to({
					x: this.a,
					y: this.b
				}, 200, "Linear");
			} else if (m == 3) {
				this.b -= 108;
				this.tween.to({
					x: this.a,
					y: this.b
				}, 200, "Linear");

			} else if (m == 4) {
				this.b += 108;
				this.tween.to({
					x: this.a,
					y: this.b
				}, 200, "Linear");
			}
		}
		this.pX = 0;
		this.pY = 375;

		this.tween.start();
		this.tween.onComplete.add(this.stp, this);
	},
	reset: function () {
		this.queues.removeAll();
		this.pX = 0;
		this.pY = 375;
		this.a = 18.75;
		this.b = 18.75;
		this.movesQueue.length = 0;
		this.player.x = this.a;
		this.player.y = this.b;
		this.player.anchor.setTo(0.5);
	},
	undo: function () {

		this.queues.removeChild(queues.getTop());
		this.pX -= 108;
		this.movesQueue.pop();
	},
	stp: function () {

		this.queues.removeAll();
		this.tween.stop();
		this.tweens.removeAll();
		//tween = null;
		this.movesQueue.length = 0;
		this.queues.length = 0;
		this.a = 18.75;
		this.b = 18.75;
		this.player.x = this.a;
		this.player.y = this.a;
		this.window.location.reload(true);
	}
};
