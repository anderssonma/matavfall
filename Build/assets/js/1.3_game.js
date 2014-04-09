/**
 * Matavfallsspelet
 * V: 1.0
 *
 * Marcus Andersson
 * 2013-2014 Givakt Skåne AB
 *
 * DEPENDENCIES:
 * jQuery 1.10.2
 * Preload.js 0.4
 */

/* 



TOMAT -> PIZZA
ÄPPLE -> ÄPPLEPAJ
MAKARONER -> MAKARONILÅDA

KORV - KYLSKÅP
CREME FRAICHE - KYLSKÅP
OST FRÄSCH - KYLSKÅP

AVFALL
- ÄPPLESKRUTT
- FISKBEN
- BANANSKAL

TELEFON
BURK TILLPLATTAD


GÖR OM TID TILL BARA TEXT, ANVÄND PAUSE/LJUD AV STYLING

*/

// ATTACH THINGS WE NEED GLOBALLY TO THE GAME OBJECT
// LOOP, GLOBALS ETC
var GAME = {
	pauseTimer: function() {
		this.elapsed = new Date((new Date()) -  this.startTime);
		//console.log(this.getTimeTotal());
	},
	getTimeTotal: function() {
		var ms = this.elapsed;
		var m = Math.floor(ms / 60000);
    ms -= m * 60000;
    var s = Math.round((ms / 1000));
    if (m > 0) {
    	return m + ' MIN, ' + s + ' S';
    } else {
    	return s + ' SEKUNDER';
    }
	}

};

// 
// MOVE THIS INTO THE JS
function drawImageRot(ctx,img,x,y,width,height,deg){

		//Convert degrees to radian 
		var rad = deg * Math.PI / 180;

    //Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    //Rotate the canvas around the origin
    ctx.rotate(rad);

    //draw the image    
    ctx.drawImage(img,width / 2 * (-1),height / 2 * (-1),width,height);

    //reset the canvas  
    ctx.rotate(rad * ( -1 ) );
    ctx.translate((x + width / 2) * (-1), (y + height / 2) * (-1));
}

var setupGame = function() {
	'use strict';

	/* FPS BINDINGS
	var fps = 0, now, lastUpdate = (new Date()) * 1 - 1;
	var fpsFilter = 60;
	var fpsOut = document.getElementById('fps-meter');
	*/

	// ELEMENT BINDINGS
	var canvas						= document.getElementById('game-sort'),
			canvas2						= document.getElementById('game-interactive'),
			gamePauseBox			= document.getElementById('game-pause'),
			gameOverBox				= document.getElementById('game-over'),
			gameOverTitle			= document.getElementById('game-over-title'),
			soundToggle				= document.getElementById('sound-toggle'),
			pauseToggle				= document.getElementById('pause-toggle'),
			helpToggle				= document.getElementById('help-toggle');

	// KEY GLOBALS
	var	bgLayer = canvas.getContext('2d');
	var intLayer = canvas2.getContext('2d');

	var spawnPoints = [200, 350, 500, 650, 800];

	var svgURLs = [
		{src: '../assets/img/broccoli.svg', type:createjs.LoadQueue.IMAGE},
		{src: '../assets/img/tomathalva_spel.svg', type:createjs.LoadQueue.IMAGE},
		{src: '../assets/img/ost_spel.svg', type:createjs.LoadQueue.IMAGE},
		{src: '../assets/img/bananskal_spel.svg', type:createjs.LoadQueue.IMAGE},
		{src: '../assets/img/appelskrutt.svg', type:createjs.LoadQueue.IMAGE},
		{src: '../assets/img/fiskben_spel.svg', type:createjs.LoadQueue.IMAGE},
		{src: '../assets/img/mobil.svg', type:createjs.LoadQueue.IMAGE},
		// AND THE PLAYER HAND!
		{src: '../assets/img/hand.svg', type:createjs.LoadQueue.IMAGE}
	];

	// IMAGE RESOURCES
	var trashTypes = [
		{
			type: 'broccoli',
			title: 'Broccoli',
			isDish: true,
			image: '../assets/img/broccoli.svg',
			width: 100,
			height: 111
		}, {
			type: 'tomato',
			title: 'Tomat',
			isDish: true,
			image: '../assets/img/tomathalva_spel.svg',
			width: 100,
			height: 59
		}, {
			type: 'cheese',
			title: 'Ost',
			isDish: true,
			image: '../assets/img/ost_spel.svg',
			width: 100,
			height: 104
		}, {
			type: 'banana',
			title: 'Banan',
			isDish: false,
			image: '../assets/img/bananskal_spel.svg',
			width: 100,
			height: 101,
		}, {
			type: 'apple',
			title: 'Äppleskrutt',
			isDish: false,
			image: '../assets/img/appelskrutt.svg',
			width: 58,
			height: 120,
		}, {
			type: 'fish',
			title: 'Fiskben',
			isDish: false,
			image: '../assets/img/fiskben_spel.svg',
			width: 120,
			height: 69
		}, {
			type: 'trash',
			title: 'Telefon',
			isDish: false,
			image: '../assets/img/mobil.svg',
			width: 54,
			height: 104,
		}
	];

	// BEZIER PATHS FOR OBJECTS
	var possibleRecipeItems = [];

	for (var i = 0; i < trashTypes.length; i++) {
		if (trashTypes[i].isDish) {
			var newArr = [];
			newArr.push(trashTypes[i].type);
			possibleRecipeItems.push(newArr);
		}
	}

	var pathArray = [
		{	// PATH LEFT
			accepts: ['broccoli'],
			point1: {x:0, y:300},
			point2: {x:80, y:90},
			// goal: {x:140, y:150}
			goal: {x:90, y:120}
		},
		{	// PATH MIDDLE
			accepts: ['broccoli', 'tomato', 'cheese'],
			point1: {x:400, y:300},
			point2: {x:470, y:150},
			// goal: {x:500, y:190}
			goal: {x:520, y:190}
		},
		{	// PATH RIGHT
			accepts: ['banana', 'apple', 'fish'],
			point1: {x:840, y:400},
			point2: {x:880, y:160},
			goal: {x:738, y:270}
		}
	];

	var occupiedSpawns,
			availableSpawns = [],
			activeTrash = [],
			activeScores = [],
			remainingTime,
			repaintRemainingTime,
			repaintScoreboard,
			lastTime,
			jumpTriggered,
			keysDown,
			spawnHandler,
			trashMaxUptime,
			stoveHandler;
	GAME.initGlobals = function() {
		GAME.gameInProgress = true,
		GAME.isPaused = false,
		//GAME.timerIntervals = [],

		occupiedSpawns = [false, false, false, false, false];
		availableSpawns.length = 0;
		activeTrash.length = 0;
		remainingTime = 20;
		repaintRemainingTime = true;
		repaintScoreboard = false;
		lastTime = remainingTime;
		jumpTriggered = false;
		keysDown = {};
		spawnHandler = {
			countSinceLast: 0,
			minCount: 40,
			chance: 20 // 100 / 20 = 5% chance
		};
		trashMaxUptime = 2; // 3 SECONDS + THIS VAL

		var randomStartItem = Math.floor(Math.random() * possibleRecipeItems.length);
		//console.log(randomStartItem);
		pathArray[0].accepts = possibleRecipeItems[randomStartItem];
		//console.log(pathArray[0]);

		stoveHandler = {
			// DOESNT WORK WITH CORRECT SOUNDS RIGHT NOW
			// OK SOUND BECOMES OUT OF SYNC, ISSUE ON THE TARGET MANAGING PART HOWEVER
			el: $('#stove-bubble'),
			elCount: $('#stove-bubble span'),
			changeItem: function() {

				this.completedRecipes++;

				var target = {
					x: 70,
					y: 90
				};
				var newPopup = new ScorePopup(target, 1000);
				newPopup.init();
				activeScores.push(newPopup);

				this.el.removeClass();
				var newSelection = this.stoveCandidates.slice(0);
				var currentItemIndex = $.inArray(this.currentItem, newSelection);
				newSelection.splice(currentItemIndex, 1);

				var newStoveItem = newSelection[Math.floor(Math.random() * newSelection.length)];
				
				pathArray[0].accepts[0] = '';
				window.setTimeout(function() {
					stoveHandler.currentItem = newStoveItem;
					pathArray[0].accepts[0] = newStoveItem;
					stoveHandler.el.addClass(newStoveItem);

					stoveHandler.remainingHits = stoveHandler.requiredHits;
					stoveHandler.elCount.text(stoveHandler.remainingHits);
					}, 1500);

				/*
				if (this.currentItem === 'broccoli') {
					this.el.removeClass('broccoli');
					pathArray[0].accepts[0] = '';
					window.setTimeout(function() {
						stoveHandler.currentItem = 'tomat';
						pathArray[0].accepts[0] = 'tomat';
						stoveHandler.el.addClass('tomat');
					}, 1500);
				} else {
					this.el.removeClass('tomat');
					pathArray[0].accepts[0] = '';
					window.setTimeout(function() {
						stoveHandler.currentItem = 'broccoli';
						pathArray[0].accepts[0] = 'broccoli';
						stoveHandler.el.addClass('broccoli');
					}, 1500);
				}*/				
				
			},
			subtractItem: function() {
				this.remainingHits--;
				if (this.remainingHits <= 0) {
					this.changeItem();
				} else {
					this.elCount.text(this.remainingHits);
				}
			},
			hideBubble: function() {
				this.el.removeClass()
			},
			init: function() {
				this.requiredHits = 2;
				this.remainingHits = 2;
				this.currentItem = pathArray[0].accepts.toString();
				this.completedRecipes = 0;
				this.stoveCandidates = [];
				// PREPARE POSSIBLE RECIPE ITEMS
				for (var i = 0; i < possibleRecipeItems.length; i++) {
					this.stoveCandidates.push(possibleRecipeItems[i].toString());
				}
				// RESET / INIT HTML
				this.elCount.text(this.remainingHits);
				this.el.removeClass().addClass(pathArray[0].accepts.toString());
			}
		};
		stoveHandler.init();
	};
	GAME.initGlobals();

	// CONSTANTS
	var	CANVAS_HEIGHT = canvas.height,
			CANVAS_WIDTH	= canvas.width;

	// PRELOAD IMAGES, SHOULD PROBABLY DO IT LATER
	/*
	trashTypes.forEach(function(type) {
		var loadImg = new Image();
		loadImg.src = type.image;
	});
	*/

	// var crackedPhone = new Image();
	// crackedPhone.src = '../assets/img/mobil_paj.png';

	// GAME SOUNDS
	// ===========
	/*
	var gameSounds = {
		bad: new Audio('../assets/sound/error.mp3'),
		ok: new Audio('../assets/sound/lostitem.mp3'),
		great: new Audio('../assets/sound/gotitem.mp3'),
		punch: new Audio('../assets/sound/punch.mp3'),
		end: new Audio('../assets/sound/lose.mp3'),
		crack: new Audio('../assets/sound/glass_crack.mp3'),
		highScore: new Audio('../assets/sound/newhighscore.mp3')
	};
	*/
	var gameSounds = {};
	var soundURLs = [
		'../assets/sound/error.mp3',
		'../assets/sound/lostitem.mp3',
		'../assets/sound/gotitem.mp3',
		'../assets/sound/punch.mp3',
		'../assets/sound/lose.mp3',
		'../assets/sound/glass_crack.mp3',
		'../assets/sound/newhighscore.mp3'
	];

	var playSound = function(sound) {
		if (!player.soundEnabled) {
			return false;
		}
		gameSounds.punch.play();
		switch (sound) {
			case 'punch':
				gameSounds.punch.currentTime = 0;
				gameSounds.punch.play();
				break;
			case 'great': // 100% CORRECT HIT
				gameSounds.great.currentTime = 0;
				gameSounds.great.play();
				break;
			case 'ok': // OKAY BUT NOT A PERFECT MATCH
				gameSounds.ok.currentTime = 0;
				gameSounds.ok.play();
				break;
			case 'miss':
				gameSounds.bad.currentTime = 0;
				gameSounds.bad.play();
				break;
			case 'crack':
				window.setTimeout(function() {
					gameSounds.crack.currentTime = 0;
					gameSounds.crack.play();
				}, 350);
				break;
			// WE ONLY PLAY THESE ONCE PER SESSION, NO NEED TO REWIND
			case 'highscore':
				window.setTimeout(function() {
					gameSounds.highScore.play();
				}, 750);
				break;
			case 'gameover':
				window.setTimeout(function() {
					gameSounds.end.play();
				}, 750);
				break;
		} 
	};

	// HANDLE GAME TIME
	// ================
	var updateTime = function(timeToAdd) {
		// MAKE SURE IT NEVER DIPS BELOW 0 SINCE IT MAKES NO SENSE
		remainingTime = ((remainingTime + timeToAdd) < 0) ? 0 : remainingTime + timeToAdd;
		repaintRemainingTime = true;
	};

	function ScorePopup(target, score) { // MUST BE CALLED WITH {}
		var S = {};
		S.x = target.x;
		S.y = target.y;
		if (target.x === 90) { // POPUP ON RIGHT SIDE ON SAUCEPAN HIT, OVERLAYS SCORE OTHERWISE
			S.x = S.x + 100;
		}
		S.score = score;
		S.counter = 0;
		S.update = function() {
			// ANIMATE IT?
			if (this.counter % 2 === 0) {
				this.y = this.y - 1;
			}
			this.counter = this.counter + 1;
		};
		S.render = function() {
			if (this.active) {
				intLayer.fillStyle = this.color;
				intLayer.beginPath();
				intLayer.arc(this.x,this.y,30,0,2*Math.PI);
				intLayer.fill();
				intLayer.closePath();

				intLayer.fillStyle = '#FFF';
				intLayer.font = "bold 20px Lato";
				intLayer.textAlign = "center";
				intLayer.fillText(this.score, this.x, this.y + 8);

				if (player.combo > 1) {
					intLayer.fillStyle = '#333';
					intLayer.beginPath();
					intLayer.arc(this.x + 28,this.y + 28,16,0,2*Math.PI);
					intLayer.fill();
					intLayer.closePath();

					intLayer.font = "14px Lato";
					intLayer.fillStyle = '#FFF';
					intLayer.fillText('x' + player.combo, this.x + 28, this.y + 33);
				}
			}
		};
		S.init = function() {
			this.active = true;
			if (this.score > 0) {
				this.color = '#81C439';
			} else {
				this.color = '#B94236';
			}
			var self = this;
			window.setTimeout(function() {
				self.active = false;
				removeScorePopup();
			}, 500);
		};
		return S;
	}

	// CREATE A PLAYER AND INITIALIZE
	var player = {
		height: 50,
		width: 100,
		soundEnabled: true,
		handOffset: 23, // SINCE THE INDEX FINGER ISN'T CENTRALIZED WE HAVE TO OFFSET THE HAND SLIGHTLY
		updateScore: function(scoreToAdd, target) { // ADD SCORE AND COMBO IF THERE'S ONE

			this.currentScore = this.currentScore + (scoreToAdd * this.combo);
			repaintScoreboard = true;

			// HANDLE THE COMBO
			// SCORE 100 IS NEUTRAL / OKAY
			if (scoreToAdd > 100) {
				if (this.comboHandler.progress >= this.comboHandler.required) {
					// 2X REQUIRES 3 CONSECUTIVE HITS, 3X REQUIRES ANOTHER 3 HITS AFTER THAT ETC.
					this.combo = this.combo + 1;
					this.comboHandler.required++;
					this.comboHandler.progress = 0;
				} else {
					this.comboHandler.progress++;
				}
			} else if (scoreToAdd < 100) {
				this.combo = 1;
				this.comboHandler.required = 3;
				this.comboHandler.progress = 0;
			}

			// CREATE A SCORE POPUP AS LONG AS THE SCORE IS NOT 0
			if (target !== undefined && scoreToAdd !== 0) {
				var newPopup = new ScorePopup(target, scoreToAdd);
				newPopup.init();
				activeScores.push(newPopup);
			}

			// CHANGE DIFFICULTY WHEN SCORE GOES ABOVE X
			// MAKE IT MORE DYNAMIC IF POSSIBLE
			if (this.level === 1 && this.currentScore > 2000) {
				trashMaxUptime = trashMaxUptime - 1;
				window.setTimeout(function() {
					spawnHandler.chance = spawnHandler.chance - 10;
				}, 5000);
				this.level = 2;
			}
			if (this.level === 2 && this.currentScore > 5000) {
				trashMaxUptime = trashMaxUptime - 1;
				window.setTimeout(function() {
					spawnHandler.chance = spawnHandler.chance - 3;
				}, 5000);
				this.level = 3;
			}

		},
		update: function() {
			if (jumpTriggered) {
				this.y = this.y - 10;
				if (this.y < 410) {
					this.y = 510;
					jumpTriggered = false;
					this.speed = 5;
					if (this.nothingHitYet) {
						// PUNISHMENT FOR HITTING NOTHING BUT AIR
						updateTime(-2);
						this.updateScore(-50);
					}
				}
			} else if (37 in keysDown) { // MOVE LEFT
				this.spawnIndex = (this.spawnIndex > 0) ? this.spawnIndex - 1 : 0;
				this.x = spawnPoints[this.spawnIndex] - (this.width / 2 + this.handOffset);
				delete keysDown[37];
			} else if (39 in keysDown) { // MOVE RIGHT
				this.spawnIndex = (this.spawnIndex < spawnPoints.length - 1) ? this.spawnIndex + 1 : spawnPoints.length - 1;
				this.x = spawnPoints[this.spawnIndex] - (this.width / 2 + this.handOffset);
				delete keysDown[39];
			}
		},
		draw: function() {
			intLayer.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
		},
		init: function() {
			this.image = new Image();
			this.image.src = '../assets/img/hand.svg';
			this.image.width = 118;
			this.image.height =  171; // 251 FOR .PNG
			this.spawnIndex = 2;
			this.x = spawnPoints[this.spawnIndex] - (this.width / 2 + this.handOffset);
			this.combo = 1;
			this.currentScore = 0;
			this.y = CANVAS_HEIGHT - 190;
			this.nothingHitYet = false;
			this.level = 1;
			this.comboHandler = {
				required: 3,
				progress: 0
			};
			//console.log(this.y);
		}
	};
	player.init();

	// TRASH CONSTRUCTOR
	function Trash(I, spawn) {
		I.active = true;
		I.isFlung = false;
		I.spawnPoint = spawn;
		I.alpha = 1;

		I.time = 0;
		I.speed = 0.0250;

		I.clock = {
			// YOU HAVE 3-5 SECONDS TO HIT THE ITEM BEFORE IT DESPAWNS
			// WHEN THERE'S ONLY 2 SECONDS LEFT THE TRASH BECOMES OPAQUE
			init: function() {
				I.birthday = (new Date()).getTime();
				if (I.type !== 'trash') {
					I.lifetime = Math.floor(Math.random() * trashMaxUptime + 3) * 1000;
					I.clock.startAlert();
				} else {
					I.lifetime = 2000;
				}
				I.remainingLifetime = I.lifetime;
				I.clock.start(I.lifetime);
			},
			start: function() {
				I.timeout = window.setTimeout(function() {
					if (I.isFlung) { // IF IT'S IN FLIGHT WHEN THE TIMER RUNS OUT
						return false;
					}
					I.active = false;
					occupiedSpawns[I.spawnPoint] = false;
					if (I.type !== 'trash') {
						player.updateScore(-100);
						updateTime(-5);
					}
					removeTrash();
					delete I.timeout;
				}, I.remainingLifetime);
			},
			startAlert: function() {
				I.alertTimeout = window.setTimeout(function() {
					I.alpha = 0.75;
					delete I.alertTimeout;
				}, I.lifetime - 2000);
			},
			pause: function() {
				I.remainingLifetime = (new Date()).getTime() - I.birthday;
				window.clearInterval(I.timeout);
				delete I.timeout;
			},
			resume: function() {
				if (!I.timeout) this.start();
			}
		};

		I.init = function() {
			var newTrash = trashTypes[Math.floor(Math.random() *  trashTypes.length)];
			this.image = newTrash.image;
			this.type = newTrash.type;
			this.height = newTrash.height;
			this.width = newTrash.width;
			this.x = spawnPoints[this.spawnPoint] - this.width / 2;
			this.y = 400 + (100 - this.height); // WE NEED TO COMPENSATE FOR TRASH THAT ARENT 100 PX HIGH
			this.image = new Image();
			this.image.src = newTrash.image;
			this.image.height = this.height;
			this.image.width = this.width;

			this.rotation = 0;

			this.startPos = {
				x: this.x,
				y: this.y
			};

			/* KEEP THIS UNTIL I.CLOCK IS TESTED
			var self = this;
			this.birthday = (new Date()).getTime();
			this.uptime = window.setTimeout(function() {
				self.alpha = 0.5;
				self.uptime = window.setTimeout(function() {
					console.log((new Date()).getTime() - self.birthday);
					if (I.isFlung) { // IF IT'S IN FLIGHT WHEN THE TIMER RUNS OUT
						return false;
					}
					I.active = false;
					occupiedSpawns[I.spawnPoint] = false;
					if (I.type !== 'trash') {
						player.updateScore(-100);
						updateTime(-5);
					}
					removeTrash();
				}, 2000);
			}, Math.floor(Math.random() * 2 + 2) * 1000);
			*/

			I.clock.init(I);
			
		};

		I.calcBezierPoint = function (t, p0, p1, p2, p3) {
			var data = [p0, p1, p2, p3];
			var at = 1 - t;
			for (var i = 1; i < data.length; i++) {
				for (var k = 0; k < data.length - i; k++) {
					data[k] = {
						x: Math.round(data[k].x * at + data[k + 1].x * t),
						y: Math.round(data[k].y * at + data[k + 1].y * t)
					};
				}
			}
			return data[0];
		};

		I.update = function() {

			if (this.isFlung) {
				this.time = this.time + this.speed;
				this.rotation = this.rotation + 10;
				if (this.time < 1) {
					var newXY = this.calcBezierPoint(this.time, this.startPos, this.point1, this.point2, this.goal);
					this.x = newXY.x;
					this.y = newXY.y;
				} else {
					var typeOfHit = $.inArray(this.type, pathArray[this.path].accepts);
					if (typeOfHit > -1) { // IF HIT
						if (typeOfHit === 0) {
							playSound('great');
							player.updateScore(200, this.goal);
							updateTime(2);
						} else {
							playSound('ok');
							player.updateScore(100, this.goal);
							updateTime(1);
						}

						if (this.path === 0) { // IF IT'S A SAUCEPAN HIT
							stoveHandler.subtractItem();
						}
					} else { // IF MISS
						playSound('miss');
						if (this.type === 'trash') {
							player.updateScore(-200, this.goal);
						} else {
							player.updateScore(-100, this.goal);
						}
						updateTime(-5);
					}
					this.active = false;
					removeTrash();
					occupiedSpawns[I.spawnPoint] = false;
				}
			}

		};

		I.draw = function() {
			if (this.active) {
				if (this.alpha < 1) {
					//console.log(this.width);
					intLayer.globalAlpha = this.alpha;
					drawImageRot(intLayer, this.image, this.x, this.y, this.width, this.height, this.rotation);
					intLayer.globalAlpha = 1;
				} else {
					// MAKE IT PROPERLY
					// ================
					// - START FROM ZERO AND INCREMENT SLOWLY, RESET AT 360
					// - DEPENDANT ON START -> GOAL COMBO
					//		AN ITEM HIT AT THE LEFT SIDE AIMED AT THE RIGHTMOST TARGET SHOULD
					//		ROTATE/BEND MORE THAN SAY ONE FROM POSITION 3 TO THE RIGHTMOST ONE
					//		INTEGRATE THE DRAW-IMAGE-ROT()
					//var randomN = Math.floor(Math.random() * 360);
					//console.log(this.rotation);
					drawImageRot(intLayer, this.image, this.x, this.y, this.width, this.height, this.rotation);
					/* NORMAL DRAW W/O ROTATION
					intLayer.drawImage(this.image, this.x, this.y, this.width, this.height);
					*/
				}
			}
		};
		I.init();
		return I;
	}

	var removeTrash = function() {
		activeTrash = $.grep(activeTrash, function(el) {
			return el.active;
		});
	};

	var removeScorePopup = function() {
		activeScores = $.grep(activeScores, function(el) {
			return el.active;
		});
	};

	var collides = function(a, b) {
		// CHECKS IF ANY EDGE OF A IS "INSIDE" OF B
		return	a.x < b.x + b.width  &&
						a.x + a.width > b.x &&
						a.y < b.y + b.height &&
						a.y + a.height > b.y;
	};

	var savedDir;
	window.addEventListener('keydown', function(e) {
		// NEW BINDS:  A = 65 | S = 83 | D = 68
		// OLD BINDS:  1 = 49 | 2 = 50 | 3 = 51
		if (e.keyCode === 38 || e.keyCode === 40) {
			e.preventDefault();
		} else if (e.keyCode === 32) { // SPACE
			e.preventDefault();
		} else if ( e.keyCode === 37 || e.keyCode === 39) { // LEFT/RIGHT ARROW
			keysDown[e.keyCode] = true;
		} else if (e.keyCode === 65 || e.keyCode === 83 || e.keyCode === 68) { // 'A','S','D'
			jumpTriggered = true;
			player.nothingHitYet = true;
			if (e.keyCode === 65) {
				savedDir = 0; // LEFT PATH
			} else if (e.keyCode === 83) {
				savedDir = 1; // MIDDLE PATH
			} else {
				savedDir = 2; // RIGHT PATH
			}
		}
	});

	window.addEventListener('keyup', function(e) {
		delete keysDown[e.keyCode];
	});


	// TEXT BINDINGS FOR GAME OVER STATE
	var scoreText = document.getElementById('game-score-text'),
			scoreTitle = document.getElementById('game-score-title'),
			timerText = document.getElementById('game-timer-text'),
			recipeText = document.getElementById('game-recipe-text');

	var gameOver = function() {
		GAME.gameInProgress = false;
		window.cancelAnimationFrame(GAME.loop);
		// DO A FINAL PAINT TO MAKE SURE TIME = 0 ON THE SCREEN
		update();
		render();

		GAME.pauseTimer();
		$(gameOverBox).fadeIn(500);
		stoveHandler.hideBubble();

		// WE HAVE TO DISABLE CLICKS OTHERWISE THE NEXT SESSION WILL PAUSE RIGHT AWAY
		$(document).off('click');
		// MAKE SURE WE CLEAN UP ANY REMAINING TRASH AND THEIR TIMEOUTS!
		if (activeTrash.length > 0) {
			activeTrash.forEach(function(trash) {
				window.clearTimeout(trash.timeout);
				//console.log('RM: ' + trash.type);
				trash.active = false;
			});
			removeTrash();
		}


		timerText.innerHTML = GAME.getTimeTotal();
		if (stoveHandler.completedRecipes > 0) {
			var dishString = (stoveHandler.completedRecipes > 1) ? ' RÄTTER' : ' RÄTT';
			recipeText.innerHTML = stoveHandler.completedRecipes + dishString;
		} else {
			recipeText.innerHTML = 'INGET ALLS &nbsp;;..(';
		}

		if (player.currentScore > player.savedHighScore) {
			scoreTitle.innerHTML = '<strong>NYTT REKORD!</strong>';
			scoreText.innerHTML = '<i style="color:#94C11F;">' + player.currentScore + ' POÄNG</i>';
			if (player.savedHighScore !== 0) { // IF NEW HIGHSCORE
				playSound('highscore');
			}
			if (HELPER.supportsLocalStorage()) { // SAVE TO LOCAL STORAGE IF POSS
				localStorage.setItem('highScore', player.currentScore);
			}
		} else if (player.currentScore > 0) {
			scoreText.innerHTML = player.currentScore + ' POÄNG';
			playSound('gameover');
		} else {
			scoreText.innerHTML = '<i style="color:#D21937;">' + player.currentScore + ' POÄNG</i>';
			playSound('gameover');
		}
	};

	var nextSpawnPoint;
	var update = function() {

		function shuffle(o) { // V 1.0
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}

		// CHECK FOR ANY OPEN POSITIONS
		availableSpawns.length = 0;
		occupiedSpawns.forEach(function(point, index) {
			if (!point && availableSpawns.indexOf(index) === -1) {
				availableSpawns.push(index + 1);
			}
		});

		// RANDOMIZE THE ORDER OF THE OPEN POSITIONS
		if (availableSpawns.length) {
			var tempArr = availableSpawns;
			availableSpawns = [];
			availableSpawns = shuffle(tempArr);
			nextSpawnPoint = availableSpawns[0];
		} else {
			nextSpawnPoint = false;
		}

		player.update();
		// IF ACTIVE TRASH
		if (activeTrash.length > 0) {
			activeTrash.forEach(function(trash) {
				trash.update();
				if (!trash.isFlung && jumpTriggered && collides(player, trash)) {
					/* IF YOU HIT THE PHONE CRACK IT
					if (trash.type === 'trash') {
						//trash.image.src = crackedPhone.src;
					} */
					trash.isFlung = true;
					player.nothingHitYet = false;
					trash.path = savedDir;
					playSound('punch');
					var curveArr = pathArray[savedDir];
					trash.point1 = curveArr.point1;
					trash.point2 = curveArr.point2;
					trash.goal = curveArr.goal;
					if (trash.hasOwnProperty('alertTimeout')) {
						// DONT WANT THESE TURN OPAQUE MID-FLIGHT
						delete trash.alertTimeout;
					}
					//activeTrash.push(new Trash({}));
				}
			});
		}

		if (nextSpawnPoint && spawnHandler.countSinceLast > spawnHandler.minCount && Math.floor(Math.random() * spawnHandler.chance) === 0) {
				// Theres a ~5% chance of new Trash spawning each ms after the first 30 ms after the last spawn
				// Once there has been a succesful spawn, the timer resets
				activeTrash.push(new Trash({}, nextSpawnPoint - 1));
				occupiedSpawns[nextSpawnPoint - 1] = true;
				spawnHandler.countSinceLast = 0;
				//console.log(nextSpawnPoint);
		}
		spawnHandler.countSinceLast++;

	};

	GAME.paintScores = function() {
		bgLayer.clearRect(0, 0, 100, 180);
		bgLayer.textAlign = 'left';
		bgLayer.font = "14px Lato";
		bgLayer.fillStyle = '#666';
		
		bgLayer.fillText('REKORD', 0, 10);
		bgLayer.fillText('POÄNG', 0, 64);
		bgLayer.fillText('KOMBO', 0, 124);

		bgLayer.font = "400 20px Lato";
		if (player.hasOwnProperty('savedHighScore') ) {
			bgLayer.fillText(player.savedHighScore, 0, 34);
		}

		bgLayer.fillStyle = '#F8F8F8';
		bgLayer.font = "400 26px Lato";
		bgLayer.fillText(player.combo + 'x', 0, 152);
		if (player.currentScore < 0) {
			bgLayer.fillStyle = '#D21937';
		}
		bgLayer.fillText(player.currentScore, 0, 92);
		repaintScoreboard = false;
	};

	GAME.paintTime = function() {
		// CIRCLE DIAG = 72 px
		bgLayer.clearRect(CANVAS_WIDTH - 70, 112, 72, 72);
		bgLayer.fillStyle = '#699C9E';
		if (remainingTime < 5) {
			bgLayer.fillStyle = '#D21937';
		}
		bgLayer.beginPath();
		bgLayer.arc(CANVAS_WIDTH - 35, 148, 35, 0, 2*Math.PI);
		bgLayer.fill();
		bgLayer.closePath();
		// TEXT
		bgLayer.fillStyle = '#FFF';
		bgLayer.font = "30px Lato";
		bgLayer.textAlign = 'center';
		bgLayer.fillText(remainingTime, CANVAS_WIDTH - 36, 159);
		repaintRemainingTime = false;
	};

	var render = function() {

		intLayer.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		if (activeTrash.length > 0) {
			activeTrash.forEach(function(trash) {
				trash.draw();
			});
		}
		player.draw();

		// ONLY REPAINT WHEN NEEDED
		if (repaintScoreboard) {
			GAME.paintScores();
		}

		// ONLY REPAINT WHEN NEEDED
		if (repaintRemainingTime) {
			GAME.paintTime();	
		}

		if (activeScores.length > 0) {
			activeScores.forEach(function(score) {
				score.update();
				score.render();
			});
		}

		/* FPS COUNTER
		var thisFrameFPS = 1000 / ((now = new Date()) - lastUpdate);
		fps += (thisFrameFPS - fps) / fpsFilter;
		lastUpdate = now;
		*/

	};

	GAME.clock = {
		start: function() {
			var self = this;
			this.interval = window.setInterval(function() {
				updateTime(-1);
				if (remainingTime < 1) {
					self.pause();
					gameOver();
				}
			}, 1000);
		},
		pause: function() {
			window.clearInterval(this.interval);
			delete this.interval;
		},
		resume: function() {
			if (!this.interval) this.start();
		}
	};

	GAME.pauseGame = function() {
		if (!GAME.isPaused) {
			GAME.isPaused = true;
			$(gamePauseBox).fadeIn(500);
			window.cancelAnimationFrame(GAME.loop);
			GAME.clock.pause();
			activeTrash.forEach(function(trash) {
				trash.clock.pause();
			});
		}
	};

	GAME.resumeGame = function() {
		if (GAME.isPaused) {
			GAME.isPaused = false;
			$(gamePauseBox).fadeOut(500, function() {
				window.setTimeout(function() {
					player.gameLoop();
					GAME.clock.resume();
					activeTrash.forEach(function(trash) {
						trash.clock.resume();
					});
				}, 1000);
			});
		}
	};

	GAME.handleState = function() {
		if (GAME.gameInProgress) {
			if (GAME.isPaused) {
				GAME.resumeGame();
				$(pauseToggle).removeClass('paused');
			} else {
				GAME.pauseGame();
				$(pauseToggle).addClass('paused');
			}
		}
	};

	GAME.handleSound = function() {

	};

	GAME.paintBackground = function() {
		// NO NEED TO REPAINT THESE 24/7
		/*
		var bgimg = new Image();
		bgimg.onload = function() {
		*/
			//bgLayer.drawImage(bgimg, 50, 0, 900, 600);
			// NEED TO REPAINT THESE TO KEEP STACKING CONTEXT / Z-INDEX
			repaintScoreboard = true;
			repaintRemainingTime = true;
			// PLACEHOLDER SPAWNPOINTS
			

			/*
			var floorBg = new Image();
			floorBg.onload = function() {
				// CLEAN UP / SPLIT TABLE FROM BG
				// bgLayer.fillStyle = '#699C9E';
				// bgLayer.fillRect(0, CANVAS_HEIGHT - 100, CANVAS_WIDTH, 100);
				bgLayer.drawImage(floorBg, 0, CANVAS_HEIGHT - 293, CANVAS_WIDTH, 229);

				bgLayer.fillStyle = '#E8E8E8';
				bgLayer.globalAlpha = 0.25;
				spawnPoints.forEach(function(point) {
					bgLayer.beginPath();
					bgLayer.arc(point, CANVAS_HEIGHT - 186, 20, 0, 2 * Math.PI, false);
					bgLayer.fill();
				});
				bgLayer.globalAlpha = 1;
			}
			floorBg.src = 'img/koksgolv.png';

			bgLayer.beginPath();
			bgLayer.moveTo(0,514);
			bgLayer.lineTo(1000,514);
			bgLayer.stroke();
			*/

			bgLayer.globalAlpha = 0.25;
			spawnPoints.forEach(function(point) {
				bgLayer.beginPath();
				bgLayer.arc(point, CANVAS_HEIGHT - 194, 20, 0, 2 * Math.PI, false);
				bgLayer.fill();
			});
			bgLayer.globalAlpha = 1;

		/*
		};
		bgimg.src = 'img/kitchen_background_alt.png';
		*/
	};

	var startGame = function() {

		var legacyTimeout;

		window.requestAnimationFrame = (function(){
			return  window.requestAnimationFrame	||
				window.webkitRequestAnimationFrame	||
				window.mozRequestAnimationFrame			||
				function(callback) { // USE A TIMEOUT FOR OLD BROWSERS -> 1000 / 60 for 60 FPS
					var legacyTimeout = window.setTimeout(callback, 1000 / 60);
					return legacyTimeout;
				};
		})();

		window.cancelAnimationFrame = (function(){
			return window.cancelAnimationFrame		||
				window.webkitCancelAnimationFrame		||
				window.mozCancelAnimationFrame			||
				function() {
					window.clearTimeout(legacyTimeout);
				};
		})();

		// THESE NEEDS TO BE REINITIALIZED FOR EACH SESSION
		GAME.keyParts = function() {

			if (HELPER.supportsLocalStorage()) {
				player.savedHighScore = localStorage.getItem('highScore');
				if (!player.savedHighScore) {
					player.savedHighScore = 0;
				}
				repaintScoreboard = true;
			}

			player.gameLoop = function() {
				GAME.loop = window.requestAnimationFrame(player.gameLoop);
				update();
				render();
			};
			player.gameLoop();
			GAME.clock.start();
			GAME.startTime = (new Date());

			window.setTimeout(function() {
				// NEED TO WAIT A LITTLE HERE, OR THE GAME IMMDEDIATELY PAUSES
				$(document).on('click', function (e) {
					if (
						!cnvs.is(e.target) &&
						!pauseBox.is(e.target) && 
						!pauseBtn.is(e.target) && 
						!soundBtn.is(e.target)
					) {
						if (GAME.gameInProgress) {
							GAME.pauseGame();
						}
					}
				});
			}, 500);

		};
		GAME.keyParts();


		// SET UP SOME EXTERNAL BTNS
		// =========================
		// SOUND TOGGLE BTN
		$(soundToggle).on('click', function() {
			player.soundEnabled = (player.soundEnabled === true) ? false : true;
			if (!player.soundEnabled) {
				$(soundToggle).addClass('off');
			} else {
				$(soundToggle).removeClass('off');
			}
			// EASIER WITH AN ICON
			//this.innerHTML = (this.innerHTML === 'LJUD PÅ') ? 'LJUD AV' : 'LJUD PÅ';
		});
		// PAUSE BTN
		$(pauseToggle).on('click', function() {
			//console.log(this.innerHTML);
			GAME.handleState();
			/*
			if (this.innerHTML === 'PAUSA') {
				GAME.pauseGame();
				this.innerHTML = 'SPELA';
			} else {
				GAME.resumeGame();
				this.innerHTML = 'PAUSA';
			}
			*/
			this.blur();
		});
		// PAUSE IF CLICK OUTSIDE OF CANVAS
		var cnvs = $(canvas2);
		var pauseBtn = $(pauseToggle);
		var soundBtn = $(soundToggle);
		var pauseBox = $('#game-pause a');

		/* FPS COUNTER
		setInterval(function(){
			fpsOut.innerHTML = fps.toFixed(1);
		}, 1000); */

		if (typeof document.addEventListener === 'undefined' || typeof hidden === 'undefined') {
			// Not much to do here unless there's a polyfill
		} else {
			// Handle page visibility change   
			document.addEventListener(visibilityChange, HELPER.handleVisibilityChange, false);
		}

	};

	var init = function() { // PRELOAD ASSETS WITH PRELOAD.JS

		var loadProgressEl = document.getElementById('load-progress');

		// PASS IN FALSE TO USE <IMG> TAG TO PRELOAD SVG'S - CORS ERRORS OTHERWISE ON DEV
		var queue = new createjs.LoadQueue(false);
		queue.addEventListener('progress', function(e) {
			var progress = e.progress;
			if (progress.toString().length > 1) {
				progress = progress.toFixed(2).substring(2);
				loadProgressEl.innerHTML = progress + '%';
			} else if (progress === 1) {
				e.remove();
				loadProgressEl.innerHTML = '100 %';
			}
		});

		queue.addEventListener('complete', function() {

			gameSounds = {
				bad: new Audio('../assets/sound/error.mp3'),
				ok: new Audio('../assets/sound/lostitem.mp3'),
				great: new Audio('../assets/sound/gotitem.mp3'),
				punch: new Audio('../assets/sound/punch.mp3'),
				end: new Audio('../assets/sound/lose.mp3'),
				crack: new Audio('../assets/sound/glass_crack.mp3'),
				highScore: new Audio('../assets/sound/newhighscore.mp3')
			};

			window.setTimeout(function() {
				// 3 x 1 SECS TO COUNT DOWN (1.., 2.., 3..)
				$('#game-desc').addClass('countdown');
				loadProgressEl.innerHTML = 'KLARA';
				window.setTimeout(function() {
					loadProgressEl.innerHTML = 'FÄRDIGA';
					window.setTimeout(function() {
						loadProgressEl.innerHTML = 'GÅ!';

						// 1S + 1.5S TO LET THE CIRCLE FADE OUT BEFORE THE GAME BEGINS
						window.setTimeout(function() {
							$('#game-desc').addClass('out');
							window.setTimeout(function() {
								$('#game-desc').removeClass('show');
								startGame();
							}, 500);
						}, 1000);

					}, 1000);
				}, 1000);
			}, 1500);

		});
		// COMBINE IMAGERY AND AUDIO ARRAYS
		var resourcesToPreload = svgURLs.concat(soundURLs);
		queue.loadManifest(resourcesToPreload);
	};

	GAME.restart = function() {
		$(gameOverBox).fadeOut(500, function() {
			window.setTimeout(function() {
				GAME.keyParts();
			}, 1000);
		});
		intLayer.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		GAME.initGlobals();
		player.init();
		GAME.paintScores();
		GAME.paintTime();
	};

	GAME.start = function() {
		init();
	};

};

$(document).ready(function() {
	$('#start-btn').on('click', function() {
		$('#game-desc').addClass('prepare');
		window.setTimeout(function() {
			// FADE IN PRELOADER AND START GAME/PRELOADING
			GAME.start();
		}, 500);
		setupGame();
		GAME.paintBackground();
	});

	GAME.showInfoScreen = function() {
		$('#game-start').fadeOut(350, function() {
			$('#game-desc').addClass('show');
		});
	};
	$('#game-start').on('click', function() {
		GAME.showInfoScreen();
	});
});