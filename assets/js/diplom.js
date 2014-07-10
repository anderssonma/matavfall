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
	activeImages: [],
	activeTextboxes: [],
	activePlaceholders: [],
	borderWidth: 46,
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

	/*
	drawGrid: function() {

		// PLACEHOLDER LINES
		// DEVELOPMENT ONLY

		// MIDDLE COL
		ctx.strokeStyle = '#DBECF9';
		ctx.beginPath();
		ctx.moveTo((this.canvas.width / 2), 0);
		ctx.lineTo((this.canvas.width / 2), this.canvas.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo((this.canvas.width / 2) - (73 * 2), 0);
		ctx.lineTo((this.canvas.width / 2) - (73 * 2), this.canvas.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo((this.canvas.width / 2) + (73 * 2), 0);
		ctx.lineTo((this.canvas.width / 2) + (73 * 2), this.canvas.height);
		ctx.stroke();

		// LEFT COL
		ctx.beginPath();
		ctx.moveTo(175 * 2, 0);
		ctx.lineTo(175 * 2, this.canvas.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo((175 - 73) * 2, 0);
		ctx.lineTo((175 - 73) * 2, this.canvas.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo((175 + 73) * 2, 0);
		ctx.lineTo((175 + 73) * 2, this.canvas.height);
		ctx.stroke();

		// RIGHT COL
		ctx.beginPath();
		ctx.moveTo((this.canvas.width - (175 * 2)), 0);
		ctx.lineTo((this.canvas.width - (175 * 2)), this.canvas.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo((this.canvas.width - (175 * 2)) - (73 * 2), 0);
		ctx.lineTo((this.canvas.width - (175 * 2)) - (73 * 2), this.canvas.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo((this.canvas.width - (175 * 2)) + (73 * 2), 0);
		ctx.lineTo((this.canvas.width - (175 * 2)) + (73 * 2), this.canvas.height);
		ctx.stroke();

	},

	*/

	paintTextBox: function(ctx, col, y, string) {
		var boxWidth = 292;
		var boxHeight = 52;
		var x = this.columns[col];
		// PAINT BG BOX
		ctx.fillStyle = this.colors[this.activeColor].darkColor;
		ctx.roundRect(x - (boxWidth / 2), y, boxWidth, boxHeight, (boxHeight / 2)).fill();
		// PAINT TEXT
		ctx.fillStyle = '#FFF';
		ctx.fillText(string, x, y + boxHeight - 13);

		this.activeTextboxes.push({
			col: col,
			top: y,
			text: string
		});
		this.setContextDefaults(ctx);
	},

	makePlaceholder: function(ctx, col, y, text) {
		this.activePlaceholders.push({
			col: col,
			top: y,
			text: text
		});
		this.paintPlaceholder(ctx, col, y, text);
	},

	paintPlaceholder: function(ctx, col, y, text) {
		// PAINT CIRCLE
		ctx.fillStyle = this.colors[this.activeColor].lightColor;
		ctx.beginPath();
		ctx.arc(this.columns[col], y, 150, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();
		// PAINT TEXT
		ctx.fillStyle = this.colors[this.activeColor].darkColor;
		ctx.font = '80px Bubbler One';
		ctx.textBaseline = 'middle';
		ctx.fillText(text, this.columns[col], y + 4);

		// RESET
		this.setContextDefaults(ctx);
	},

	paintGameData: function(ctx) {
		var score = parseInt(localStorage.getItem('SMM_GAME_HIGHSCORE') || 0, 10);
		var recipes = parseInt(localStorage.getItem('SMM_GAME_RECIPES') || 0, 10);
		var timePlayed = parseInt(localStorage.getItem('SMM_GAME_TIME') || 0, 10);

		if (score <= 0 || timePlayed <= 0) {
			this.makePlaceholder(ctx, 'left', 1050, 'BEN 1');
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
			DPLM.activeImages.push({
				type: 'image',
				src: this.src,
				top: 904,
				left: DPLM.columns.left - 139,
				width: 278,
				height: 278
			});
			ctx.drawImage(gameMedal, DPLM.columns.left - 139, 904, 278, 278);
		};
		gameMedal.src = '/assets/img/medalj_' + medalType + '.svg';

		var pointString = 'POÄNG';
		if (score > 999999) { // IF STRING IS TOO LONG TO FIT
			pointString = 'P';
		}
		this.paintTextBox(ctx, 'left', 1226, '– ' + score + ' ' + pointString + ' –');

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
		this.paintTextBox(ctx, 'left', 1304, '– ' + time + ' –');

		if (recipes > 0) {
			this.paintTextBox(ctx, 'left', 1382, '– ' + recipes + ' RECEPT –');
		}

	},

	paintStoryData: function(ctx) {
		this.paintTextBox(ctx, 'mid', 1226, '– MILJÖHJÄLTEN –');
	},

	paintPresData: function(ctx) {
		var imgBackground = localStorage.getItem('SMM_PRES_BGNUM');
		var imgWords = parseInt(localStorage.getItem('SMM_PRES_WORDS') || 0, 10);
		var imgTotal = parseInt(localStorage.getItem('SMM_PRES_TOTAL') || 0, 10);
		if (imgWords === 0 && imgTotal === 0) {
			this.makePlaceholder(ctx, 'right', 1050, 'BEN 2');
			return false;
		}

		var imgPics = imgTotal - imgWords;
		// ONLY PAINT IF THERE'S DATA
		if (imgWords > 0) {
			this.paintTextBox(ctx, 'right', 1226, '– ' + imgWords + ' ORD –');
		}
		if (imgPics > 0) {
			this.paintTextBox(ctx, 'right', 1304, '– ' + imgPics + ' BILDER –');
		}

		var bgNum;
		switch (imgBackground) {
			case 'bg-1':
				bgNum = 1;
				// PAINT GREEN IMAGE
				break;
			case 'bg-2':
				bgNum = 2;
				// PAING ... IMAGE
				break;
			case 'bg-3':
				bgNum = 3;
				// PAING ... IMAGE
				break;
			case 'bg-4':
				bgNum = 4;
				// PAING ... IMAGE
				break;
		}

		var presImage = new Image();
		presImage.onload = function() {
			DPLM.activeImages.push({
				type: 'image',
				src: this.src,
				top: 904,
				left: DPLM.columns.right - 102,
				width: 204,
				height: 209
			});
			ctx.drawImage(presImage, DPLM.columns.right - 102, 904, 204, 209);
		};
		presImage.src = '/assets/img/diplom_presbg_' + bgNum + '.svg';
	},

	paintQuizData: function(ctx, col) {

		var quizPageNum,
				totalQuestions,
				totalCorrectAnswers;

		switch (col) {
			case 'left':
				quizPageNum = 1;
				totalQuestions = parseInt(localStorage.getItem('SMM_QUIZ_1_TOTALQ') || 0, 10);
				totalCorrectAnswers = parseInt(localStorage.getItem('SMM_QUIZ_1_CORRECT') || 0, 10);
				break;
			case 'mid':
				quizPageNum = 2;
				totalQuestions = parseInt(localStorage.getItem('SMM_QUIZ_2_TOTALQ') || 0, 10);
				totalCorrectAnswers = parseInt(localStorage.getItem('SMM_QUIZ_2_CORRECT') || 0, 10);
				break;
			case 'right':
				quizPageNum = 3;
				totalQuestions = parseInt(localStorage.getItem('SMM_QUIZ_3_TOTALQ') || 0, 10);
				totalCorrectAnswers = parseInt(localStorage.getItem('SMM_QUIZ_3_CORRECT') || 0, 10);
				break;
		}

		console.log(totalCorrectAnswers);
		var medalValue;
		if (totalCorrectAnswers === 0) {
			this.paintPlaceholder(ctx, col, 1800, 'BEN ' + quizPageNum);
			return false;
		} else if (totalCorrectAnswers === totalQuestions) {
			// GOLD!
			medalValue = 'guld';
		} else if (totalCorrectAnswers > 4) {
			// SILVER
			medalValue = 'silver';
		} else {
			// BRONZE
			medalValue = 'brons';
		}

		var quizCup = new Image();
		quizCup.onload = function() {
			DPLM.activeImages.push({
				type: 'image',
				src: this.src,
				top: 1656,
				left: DPLM.columns[col] - 114,
				width: 228,
				height: 236
			});
			DPLM.ctx.drawImage(quizCup, DPLM.columns[col] - 114, 1656, 228, 236);
		};
		// TODO
		// ====
		// DECIDE ON WHICH MEDAL
		// PARSE TOTAL SCORE
		quizCup.src = '/assets/img/diplom_pokal_' + medalValue + '.svg';
		this.paintTextBox(ctx, col, 1964, '– ' + totalCorrectAnswers + '/' + totalQuestions + ' RÄTT –');
	},

	paintStaticBackground: function(ctx) {

		var circleRadii = 50;
		ctx.fillStyle = this.colors[this.activeColor].lightColor;

		ctx.fillRect(0, 0, this.canvas.width, this.borderWidth); // TOP
		ctx.fillRect(0, this.canvas.height - this.borderWidth, this.canvas.width, this.borderWidth); // BOTTOM

		ctx.fillRect(0, 0, this.borderWidth, this.canvas.height); // LEFT
		ctx.fillRect(this.canvas.width - this.borderWidth, 0, this.borderWidth, this.canvas.height); // RIGHT

		// TOP LEFT CIRCLE
		ctx.beginPath();
		ctx.arc(circleRadii, circleRadii, circleRadii, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();

		// TOP RIGHT CIRCLE
		ctx.beginPath();
		ctx.arc(this.canvas.width - circleRadii, circleRadii, circleRadii, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();

		// BOTTOM LEFT CIRCLE
		ctx.beginPath();
		ctx.arc(circleRadii, this.canvas.height - circleRadii, circleRadii, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();

		// BOTTOM RIGHT CIRCLE
		ctx.beginPath();
		ctx.arc(this.canvas.width - circleRadii, this.canvas.height - circleRadii, circleRadii, 0, 2*Math.PI);
		ctx.fill();
		ctx.closePath();

		// RESET CTX VARS
		this.setContextDefaults(ctx);
	},

	paintStaticImages: function(ctx) {
			// PAINT SOME STATIC IMAGERY
		this.staticImages.forEach(function(item){
			var img = new Image();
			img.onload = function() {
				ctx.drawImage(img, item.left, item.top, item.width, item.height);
			};
			img.src = item.src;
		});
	},

	exportCanvas: function() { // SIMPLIFIED DURING DEVELOPMENT
		//var data = this.canvas.toDataURL('image/png');
		//window.open(data);
		this.print();
	},

	clearAll: function(ctx) {
		this.activePlaceholders.length = 0;
		this.activeTextboxes.length = 0;
		this.activeImages.length = 0;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},

	renderAll: function(ctx) {
		// TEMP/DEBUG!
		// this.drawGrid();

		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.setContextDefaults(ctx);

		this.paintStaticBackground(ctx);
		this.paintStaticImages(ctx);
		this.paintGameData(ctx);
		this.paintStoryData(ctx);
		this.paintPresData(ctx);

		this.paintQuizData(ctx, 'left');
		this.paintQuizData(ctx, 'mid');
		this.paintQuizData(ctx, 'right');
	},

	setColor: function(self, color) {
		if (parseInt(color, 10) === this.activeColor) {
			return false;
		}
		$('#diploma').removeClass('color-1 color-2 color-3').addClass('color-' + (parseInt(color, 10) + 1));
		this.activeColor = color;
		this.reRender(this.ctx);
	},

	setContextDefaults: function(ctx) {
		ctx.font = '36px Bubbler One';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'alphabetic';
		ctx.fillStyle = this.colors[this.activeColor].lightColor;
	},

	reRender: function(ctx) {
		this.clearAll(ctx);
		this.renderAll(ctx);
	},

	init: function() {
		// SET SOME DEFAULTS
		this.canvas = document.getElementById('diploma-canvas');
		this.columns = {
			left: 350,
			mid: this.canvas.width / 2,
			right: this.canvas.width - 350
		};

		this.staticImages = [
			{
				type: 'image',
				src: '/assets/img/diplom_top.svg',
				top: this.borderWidth,
				left: (this.canvas.width / 2) - 272,
				width: 544,
				height: 404,
			}, {
				type: 'image',
				src: '/assets/img/diplom_strip_red.svg',
				top: 540,
				left: (this.canvas.width / 2) - 485,
				width: 970,
				height: 106,
			}, {
				type: 'image',
				src: '/assets/img/diplom_categories_top.svg',
				top: 774,
				left: 274,
				width: 1132,
				height: 42,
			}, {
				type: 'image',
				src: '/assets/img/diplom_categories_bot.svg',
				top: 1528,
				left: 274,
				width: 1058,
				height: 42,
			}
		];

		this.ctx = this.canvas.getContext('2d');
		this.renderAll(this.ctx);
	}
};


// DEPENDS ON SVG-TODATAURL.JS IN IE / SAFARI
DPLM.whichBrowser = (function(){
  var ua= navigator.userAgent, tem, 
  M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
  }
  if(M[1]=== 'Chrome'){
      tem= ua.match(/\bOPR\/(\d+)/);
      if(tem!= null) return 'Opera '+tem[1];
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
  
  return M.join(' ');
})();

DPLM.closePrintOverlay = function() {
	$('#diploma').removeClass('loading print');
};

DPLM.print = function() {

	$('#diploma').addClass('loading');
	$('#diploma .diploma-controls a').remove();
	this.browser = DPLM.whichBrowser.split(' ')[0].toLowerCase();
	this.printModeModern = true;

	var fallbackCanvas = document.getElementById('print-canvas');
	var fallbackCtx = fallbackCanvas.getContext("2d");
	this.setContextDefaults(fallbackCtx);

	try {
		var testData = this.canvas.toDataURL('image/png');
	} catch (e) {
		this.printModeModern = false;
		console.log('Couldn\'t export canvas to DataURL. Using fallback mode...');
	}

	var exportImage = function(canvas) {
		$('#diploma .diploma-overlay img').remove();
		window.setTimeout(function() {
			var data = canvas.toDataURL('image/png');
			if (DPLM.browser === 'msie' || DPLM.browser === 'ie') {
				$('#diploma .diploma-overlay').addClass('ie'); // SOME HELPER TEXT SINCE IE CAN'T OPEN DATA URLS IN NEW TABS
			}
			$('#diploma .diploma-overlay').append('<img src="' + data + '">');
			$('#diploma .diploma-overlay #diploma-open').attr({
				href: data,
				target: '_blank'
			});
			$('#diploma').removeClass('loading');
			window.setTimeout(function() {
				$('#diploma').addClass('print');
			}, 250);
		}, 1500);
	};

	if (DPLM.printModeModern) {
		exportImage(this.canvas);
	} else {
		// PAINT STATIC BG
		fallbackCtx.fillStyle = '#FFFFFF';
		fallbackCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.setContextDefaults(fallbackCtx);

		this.paintStaticBackground(fallbackCtx);
		// PAINT PLACEHOLDERS
		this.activePlaceholders.forEach(function(item) {
			DPLM.paintPlaceholder(fallbackCtx, item.col, item.top, item.text);
		});
		// PAINT TEXBOXES
		this.activeTextboxes.forEach(function(item) {
			DPLM.paintTextBox(fallbackCtx, item.col, item.top, item.text);
		});

		var loadCounter = 0;
		var $elExport = $('#svg-export');
		// NEED TO TOGGLE ASYNC IN THIS MODE TO KEEP THE IMAGE ORDER
		$elExport.empty(); // REMOVE BG IMAGE
		var imagesToConvert = this.staticImages.concat(this.activeImages);
		imagesToConvert.forEach(function(img) {
			$elExport.load(img.src, function() {
				var imageSVG = $("#svg-export svg")[0];
				imageSVG.setAttribute('width', img.width);
				imageSVG.setAttribute('height', img.height);
				imageSVG.toDataURL('image/png', {
					callback: function(data) {
						var imagePNG = new Image();
						imagePNG.onload = function() {
							loadCounter++;
							fallbackCtx.drawImage(imagePNG, img.left, img.top, img.width, img.height);
							if (loadCounter === imagesToConvert.length) {
								exportImage(fallbackCanvas);
							}
						};
						imagePNG.src = data;
					}
				});
			});
		});
	}
};


$(document).ready(function() {
	PointerEventsPolyfill.initialize({});

	var bgColor;
	switch (parseInt(PAGER.currentPage, 10)) {
		case 1: // PAGE 1
			DPLM.activeColor = 0;
			bgColor = 'color-1';
			break;
		case 2: // PAGE 2
		DPLM.activeColor = 1;
			bgColor = 'color-2';
			break;
		case 3: // PAGE 3
			DPLM.activeColor = 2;
			bgColor = 'color-3';
			break;
	}

	$('#diploma').addClass(bgColor).on('rerender', function(e, source) {
		// var type = source.split('-')[0];
		console.log('DIPLOMA RERENDER :: SOURCE -> ' + source);
		// JUST RE-RENDER EVERYTHING ON CHANGE
		DPLM.reRender(DPLM.ctx);
	});

	DPLM.init();

	/*
	window.setTimeout(function() {
		var oldVal = localStorage.getItem('SMM_GAME_HIGHSCORE') || 0;
		localStorage.setItem('SMM_GAME_HIGHSCORE', (Math.floor(Math.random() * (3500 - 1) + 1)));
		$('#diploma').trigger('rerender', ['game']);
		window.setTimeout(function() {
			localStorage.setItem('SMM_GAME_HIGHSCORE', oldVal);
		}, 2000);
	}, 5000);
*/
});