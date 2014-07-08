CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.beginPath();
	this.moveTo(x+r, y);
	this.arcTo(x+w, y, x+w, y+h, r);
	this.arcTo(x+w, y+h, x, y+h, r);
	this.arcTo(x, y+h, x, y, r);
	this.arcTo(x, y, x+w, y, r);
	this.closePath();
	return this;
};

var DPLM = {
	activeColor: 0,
	colors: [
		{	// RED
			darkColor: '#BA4A3C',
			lightColor: '#DEA58D',
		}, { // GREEN
			darkColor: '#3B6336',
			lightColor: '#578357',
		}, { // BLUE
			darkColor: '#5188B1',
			lightColor: '#87B7DC',
		}
	],

	drawGrid: function() {

		// PLACEHOLDER LINES
		// DEVELOPMENT ONLY

		// MIDDLE COL
		this.ctx.strokeStyle = '#DBECF9';
		this.ctx.beginPath();
		this.ctx.moveTo((this.canvas.width / 2), 0);
		this.ctx.lineTo((this.canvas.width / 2), this.canvas.height);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo((this.canvas.width / 2) - (73 * 2), 0);
		this.ctx.lineTo((this.canvas.width / 2) - (73 * 2), this.canvas.height);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo((this.canvas.width / 2) + (73 * 2), 0);
		this.ctx.lineTo((this.canvas.width / 2) + (73 * 2), this.canvas.height);
		this.ctx.stroke();

		// LEFT COL
		this.ctx.beginPath();
		this.ctx.moveTo(175 * 2, 0);
		this.ctx.lineTo(175 * 2, this.canvas.height);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo((175 - 73) * 2, 0);
		this.ctx.lineTo((175 - 73) * 2, this.canvas.height);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo((175 + 73) * 2, 0);
		this.ctx.lineTo((175 + 73) * 2, this.canvas.height);
		this.ctx.stroke();

		// RIGHT COL
		this.ctx.beginPath();
		this.ctx.moveTo((this.canvas.width - (175 * 2)), 0);
		this.ctx.lineTo((this.canvas.width - (175 * 2)), this.canvas.height);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo((this.canvas.width - (175 * 2)) - (73 * 2), 0);
		this.ctx.lineTo((this.canvas.width - (175 * 2)) - (73 * 2), this.canvas.height);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo((this.canvas.width - (175 * 2)) + (73 * 2), 0);
		this.ctx.lineTo((this.canvas.width - (175 * 2)) + (73 * 2), this.canvas.height);
		this.ctx.stroke();

	},

	paintTextBox: function(col, y, string) {
		var boxWidth = 292;
		var boxHeight = 52;
		var x = this.columns[col];
		// PAINT BG BOX
		this.ctx.fillStyle = this.colors[this.activeColor].darkColor;
		this.ctx.roundRect(x - (boxWidth / 2), y, boxWidth, boxHeight, (boxHeight / 2)).fill();
		// PAINT TEXT
		this.ctx.fillStyle = '#FFF';
		this.ctx.fillText(string, x, y + boxHeight - 13);
		this.setContextDefaults();
	},

	paintPlaceholder: function(col, y, text) {
		// PAINT CIRCLE
		this.ctx.fillStyle = this.colors[this.activeColor].lightColor;
		this.ctx.beginPath();
		this.ctx.arc(this.columns[col], y, 150, 0, 2*Math.PI);
		this.ctx.fill();
		this.ctx.closePath();
		// PAINT TEXT
		this.ctx.fillStyle = this.colors[this.activeColor].darkColor;
		this.ctx.font = '80px Bubbler One';
		this.ctx.textBaseline = 'middle';
		this.ctx.fillText(text, this.columns[col], 1050);
		// RESET
		this.setContextDefaults();
	},

	paintGameData: function() {
		var score = parseInt(localStorage.getItem('SMM_GAME_HIGHSCORE') || 0, 10);
		var recipes = parseInt(localStorage.getItem('SMM_GAME_RECIPES') || 0, 10);
		var timePlayed = parseInt(localStorage.getItem('SMM_GAME_TIME') || 0, 10);

		if (score <= 0 || timePlayed <= 0) {
			this.paintPlaceholder('left', 1050, 'BEN 1');
			return false;
		}

		// GOLD, SILVER OR BRONZE?
		var medalType;
		if (score >= 2500) {
			medalType = 'guld';
		} else if (score >= 1000) {
			medalType = 'silver';
		} else {
			medalType = 'brons';
		}

		var gameMedal = new Image();
		gameMedal.onload = function() {
			DPLM.ctx.drawImage(gameMedal, DPLM.columns.left - (278 / 2), 904, 278, 278);
		};
		gameMedal.src = '/assets/img/medalj_' + medalType + '.svg';

		var pointString = 'POÄNG';
		if (score > 999999) { // IF STRING IS TOO LONG TO FIT
			pointString = 'P';
		}
		this.paintTextBox('left', 1226, '– ' + score + ' ' + pointString + ' –');

		var time = Math.ceil(timePlayed / 1000),
				minutes, seconds;

		if (time > 60) { // CONVERT TIME TO THE MOST SUITABLE FORMAT
			minutes = Math.floor(time / 60);
			seconds = time - (minutes * 60);
			if (seconds === 0) {
				time = minutes + ' MINUTER';
			} else {
				time = minutes + ' MIN, ' + seconds + ' S';
			}
		} else {
			time = time + ' SEKUNDER';
		}
		this.paintTextBox('left', 1304, '– ' + time + ' –');

		if (recipes > 0) {
			this.paintTextBox('left', 1382, '– ' + recipes + ' RECEPT –');
		}

	},

	paintStoryData: function() {
		this.paintTextBox('mid', 1226, '– MILJÖHJÄLTEN –');
	},

	paintPresData: function() {
		var imgWords = parseInt(localStorage.getItem('SMM_PRES_WORDS') || 0, 10);
		var imgTotal = parseInt(localStorage.getItem('SMM_PRES_TOTAL') || 0, 10);
		if (imgWords === 0 && imgTotal === 0) {
			this.paintPlaceholder('right', 1050, 'BEN 2');
			return false;
		}

		var imgPics = imgTotal - imgWords;
		// ONLY PAINT IF THERE'S DATA
		if (imgWords > 0) {
			this.paintTextBox('right', 1226, '– ' + imgWords + ' ORD –');
		}
		if (imgPics > 0) {
			this.paintTextBox('right', 1304, '– ' + imgPics + ' BILDER –');
		}
	},

	paintQuizData: function(col) {
		var quizCup = new Image();
		quizCup.onload = function() {
			DPLM.ctx.drawImage(quizCup, DPLM.columns[col] - 114, 1656, 228, 236);
		};
		// TODO
		// ====
		// DECIDE ON WHICH MEDAL
		// PARSE TOTAL SCORE
		quizCup.src = '/assets/img/diplom_pokal_guld.svg';
		this.paintTextBox(col, 1964, '– 8/8 RÄTT –');
	},

	drawStatics: function() {

		var borderWidth = 46;
		var circleRadii = 50;
		this.ctx.fillStyle = this.colors[this.activeColor].lightColor;

		this.ctx.fillRect(0, 0, this.canvas.width, borderWidth); // TOP
		this.ctx.fillRect(0, this.canvas.height - borderWidth, this.canvas.width, borderWidth); // BOTTOM

		this.ctx.fillRect(0, 0, borderWidth, this.canvas.height); // LEFT
		this.ctx.fillRect(this.canvas.width - borderWidth, 0, borderWidth, this.canvas.height); // RIGHT

		// TOP LEFT CIRCLE
		this.ctx.beginPath();
		this.ctx.arc(circleRadii, circleRadii, circleRadii, 0, 2*Math.PI);
		this.ctx.fill();
		this.ctx.closePath();

		// TOP RIGHT CIRCLE
		this.ctx.beginPath();
		this.ctx.arc(this.canvas.width - circleRadii, circleRadii, circleRadii, 0, 2*Math.PI);
		this.ctx.fill();
		this.ctx.closePath();

		// BOTTOM LEFT CIRCLE
		this.ctx.beginPath();
		this.ctx.arc(circleRadii, this.canvas.height - circleRadii, circleRadii, 0, 2*Math.PI);
		this.ctx.fill();
		this.ctx.closePath();

		// BOTTOM RIGHT CIRCLE
		this.ctx.beginPath();
		this.ctx.arc(this.canvas.width - circleRadii, this.canvas.height - circleRadii, circleRadii, 0, 2*Math.PI);
		this.ctx.fill();
		this.ctx.closePath();

		// RESET CTX VARS
		this.setContextDefaults();

		// PAINT SOME STATIC IMAGERY
		var topBG = new Image();
		topBG.onload = function() {
			DPLM.ctx.drawImage(topBG, (DPLM.canvas.width / 2) - (544 / 2), borderWidth, 544, 404);
		};
		topBG.src = '/assets/img/diplom_top.svg';

		var topStrap = new Image();
		topStrap.onload = function() {
			DPLM.ctx.drawImage(topStrap, (DPLM.canvas.width / 2) - (970 / 2), 540, 970, 106);
		};
		topStrap.src = '/assets/img/diplom_strip_red.svg';

		var labelsTop = new Image();
		labelsTop.onload = function() {
			DPLM.ctx.drawImage(labelsTop, 274, 774, 1132, 42);
		};
		labelsTop.src = '/assets/img/diplom_categories_top.svg';

		var labelsBottom = new Image();
		labelsBottom.onload = function() {
			DPLM.ctx.drawImage(labelsBottom, 274, 1528, 1058, 42);
		};
		labelsBottom.src = '/assets/img/diplom_categories_bot.svg';


	},

	exportCanvas: function() { // SIMPLIFIED DURING DEVELOPMENT
		var data = this.canvas.toDataURL('image/png');
		window.open(data);
	},

	clearAll: function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	renderAll: function() {
		// TEMP/DEBUG!
		this.drawGrid();

		this.drawStatics();
		this.paintGameData();
		this.paintStoryData();
		this.paintPresData();

		this.paintQuizData('left');
		this.paintQuizData('mid');
		this.paintQuizData('right');
	},

	setColor: function(self, color) {
		console.log(self);
		if (parseInt(color, 10) === this.activeColor) {
			return false;
		}
		$('#diploma').removeClass('color-1 color-2 color-3').addClass('color-' + (parseInt(color, 10) + 1));
		$('#diploma .diploma-controls .circle').removeClass('active');
		$(self).addClass('active');

		this.activeColor = color;
		this.clearAll();
		this.renderAll();
	},

	setContextDefaults: function() {
		this.ctx.font = '36px Bubbler One';
		this.ctx.textAlign = 'center';
		this.ctx.textBaseline = 'alphabetic';
		this.ctx.fillStyle = this.colors[this.activeColor].lightColor;
	},

	init: function() {
		// SET SOME DEFAULTS
		this.canvas = document.getElementById('diploma-canvas');
		this.columns = {
			left: 350,
			mid: this.canvas.width / 2,
			right: this.canvas.width - 350
		};

		this.ctx = this.canvas.getContext('2d');
		this.setContextDefaults();

		this.renderAll();
	}
};

$(document).ready(function() {
	$('#diploma').on('rerender', function(e, source) {
		// var type = source.split('-')[0];
		console.log('DIPLOMA RERENDER :: SOURCE -> ' + source);
		// JUST RE-RENDER EVERYTHING ON CHANGE
		DPLM.clearAll();
		DPLM.renderAll();
	});

	DPLM.init();

	window.setTimeout(function() {
		var oldVal = localStorage.getItem('SMM_GAME_HIGHSCORE') || 0;
		localStorage.setItem('SMM_GAME_HIGHSCORE', (Math.floor(Math.random() * (3500 - 1) + 1)));
		$('#diploma').trigger('rerender', ['game']);
		window.setTimeout(function() {
			localStorage.setItem('SMM_GAME_HIGHSCORE', oldVal);
		}, 2000);
	}, 5000);
});