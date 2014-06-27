// DEPENDS ON SVG-TODATAURL.JS IN IE / SAFARI


// DEFINE SOME HELPER VARS & FUNCTIONS
PRES.rgbToHex = function(rgb) {
  var a = rgb.match(/\d+/g);
  return "#" + (((1 << 24) + (parseInt(a[0]) << 16) + (parseInt(a[1]) << 8) + parseInt(a[2])).toString(16).slice(1));
};

PRES.whichBrowser = (function(){
  var ua= navigator.userAgent, tem, 
  M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
      tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
      return 'IE '+(tem[1] || '');
  }
  if(M[1]=== 'Chrome'){
      tem= ua.match(/\bOPR\/(\d+)/)
      if(tem!= null) return 'Opera '+tem[1];
  }
  M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
  
  return M.join(' ');
})();

PRES.printModeModern = true;


// MAIN "APP"
PRES.print = function() {

	var bgNum = PRES.$dropZone.attr('class').match(/bg-[0-9]/);
	// DONT GENERATE PRINT IF BOARD IS EMPTY
	if (PRES.$dropZone.html() === '' || bgNum == null || bgNum[0] == null) {
		PRES.toastMessage('Inget att skriva ut');
		return false;
	}

	console.log($('#presentation .tools .print'));
	$('#presentation .tools .print').addClass('loading');

	PRES.browser = PRES.whichBrowser.split(' ')[0].toLowerCase();
	if (PRES.browser === 'msie' || PRES.browser === 'ie' || PRES.browser === 'safari') {
		PRES.printModeModern = false;
	}

	var canvas = document.getElementById('canvas');
	canvas.width = 1000 * 2;
	canvas.height = 680 * 2;

	// Copy the image contents to the canvas
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = PRES.rgbToHex(PRES.$dropZone.css('backgroundColor'));
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var images = [];
	var preparedImages = [];
	$('#drop-zone img').each(function(i, el) {
		var imageObject = {
			width: parseInt(el.width, 10) * 2,
			height: parseInt(el.height, 10) * 2,
			src: el.src,
			top: (parseInt($(el).css('top').replace(/px/, ''), 10) - 130) * 2, // -130px = TOP BAR HEIGHT
			left: parseInt($(el).css('left').replace(/px/, ''), 10) * 2,
			zIndex: parseInt($(el).css('zIndex'), 10)
		};
		images.push(imageObject);
	});

	images.sort(function(a, b) { 
		// MAKE SURE WE APPEND IN THE RIGHT ORDER
		// FOR CORRECT IMAGE OVERLAPPING
		if (a.zIndex === b.zIndex) {
			return 0;
		} else if (a.zIndex < b.zIndex) {
			return -1;
		} else if (a.zIndex > b.zIndex) {
			return 1;
		}
	});

	var callbackCounter = {};
	callbackCounter.remaining = images.length + 1; // + THE BG IMAGE
	callbackCounter.addCallback = function() {
		callbackCounter.remaining--;
		if (callbackCounter.remaining <= 0) { // DRAW IMAGES IN CORRECT ORDER/Z-INDEX ONCE EVERYTHING IS LOADED
			if (PRES.printModeModern) {
				$.each(preparedImages, function(i, el) {
					ctx.drawImage(el.img, el.left, el.top, el.img.width, el.img.height);
				});
			}
			PRES.exportCanvas();
		}
	};

	if (PRES.printModeModern) {

		var bgImage = new Image();
		bgImage.onload = function() { // MAKE SURE WE ALWAYS DRAW THE BG FIRST
			ctx.drawImage(bgImage, ((1000 - this.width) / 2) * 2, ((680 - this.height) / 2) * 2, (this.width * 2), (this.height * 2));
			callbackCounter.addCallback();
		};
		bgImage.src = 'assets/img/pres_bg' + bgNum[0].replace(/bg-/g, '') + '.svg';
		bgImage.setAttribute('crossOrigin','anonymous');

	} else { // IN IE/SAFARI WE CANT RENDER SVG'S TO CANVAS, SO CONVERT SVG'S TO PNG'S

		// NEED TO TOGGLE ASYNC IN THIS MODE TO KEEP THE IMAGE ORDER
		$.ajaxSetup({async: false});
		$('#svg-export').load('assets/img/pres_bg' + bgNum[0].replace(/bg-/g, '') + '.svg', function() {
			var bgSVG = $("#svg-export svg")[0];
			var oldW = parseInt(bgSVG.getAttribute('width'), 10);
			var oldH = parseInt(bgSVG.getAttribute('height'), 10);
			bgSVG.setAttribute('width', oldW * 2);
			bgSVG.setAttribute('height', oldH * 2);
			bgSVG.toDataURL('image/png', { //svg+xml', {
				callback: function(data) {
					var bgImage = new Image();
					bgImage.onload = function() { // MAKE SURE WE ALWAYS DRAW THE BG FIRST
						ctx.drawImage(bgImage, ((1000 - oldW) / 2) * 2, ((680 - oldH) / 2) * 2, this.width, this.height);
						callbackCounter.addCallback();
					};
					bgImage.src = data;
				}
			});
		});
		$.ajaxSetup({async: true});

	}

	if (PRES.printModeModern) {

		$.each(images, function(i, el) { // PRELOAD IMAGES
			var img = new Image();
			img.onload = function() {
				preparedImages.push({
					top: el.top,
					left: el.left,
					img: img
				});
				callbackCounter.addCallback();
			};
			img.src = el.src;
			img.width = el.width;
			img.height = el.height;
			img.setAttribute('crossOrigin','anonymous');
		});

	} else {

		// NEED TO TOGGLE ASYNC IN THIS MODE TO KEEP THE IMAGE ORDER
		$.ajaxSetup({async: false});
		$('#svg-export').empty(); // REMOVE BG IMAGE
		$.each(images, function(i, img) {
			$('#svg-export').load(img.src, function(data) {
				var imageSVG = $("#svg-export svg")[0];
				imageSVG.setAttribute('width', img.width);
				imageSVG.setAttribute('height', img.height);
				imageSVG.toDataURL('image/png', {
					callback: function(data) {
						var imagePNG = new Image();
						imagePNG.onload = function() {
							ctx.drawImage(imagePNG, img.left, img.top, img.width, img.height);
							callbackCounter.addCallback();
						};
						imagePNG.src = data;
					}
				});
			});
		});
		$.ajaxSetup({async: true});

	}

};

PRES.exportCanvas = function() {
	var canvasData = canvas.toDataURL('image/png');
	window.setTimeout(function() {
		$('#overlay-print img').remove();
		$('#overlay-print a').attr({
			href: canvasData,
			target: '_blank'
		});
		if (PRES.browser === 'msie' || PRES.browser === 'ie') {
			$('#overlay-print').addClass('ie'); // SOME HELPER TEXT SINCE IE CAN'T OPEN DATA URLS IN NEW TABS
		}
		$('#overlay-print').append('<img src="' + canvasData + '">');
		window.setTimeout(function() {
			PRES.showOverlay('#overlay-print');
			$('#presentation .tools .print').removeClass('loading');
		}, 750);
		/*
		if (!printWindow || printWindow.closed || typeof printWindow.closed === 'undefined') {
			PRES.showOverlay('#overlay-popup');
		} else if (printWindow.document) {
			printWindow.document.title = 'Skriv ut presentation';
		}
		*/
	}, 0);
};