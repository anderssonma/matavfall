// DEPENDS ON SVG-TODATAURL.JS IN IE / SAFARI

PRES.rgbToHex = function(rgb) {
  var a = rgb.match(/\d+/g);
  return "#" + (((1 << 24) + (parseInt(a[0]) << 16) + (parseInt(a[1]) << 8) + parseInt(a[2])).toString(16).slice(1));
};

PRES.print = function() {

	var bgNum = PRES.$dropZone.attr('class').match(/bg-[0-9]/);
	// DONT GENERATE PRINT IF BOARD IS EMPTY
	if (PRES.$dropZone.html() === '' || bgNum == null || bgNum[0] == null) {
		PRES.toastMessage('Inget att skriva ut');
		return false;
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
			$.each(preparedImages, function(i, el) {
				ctx.drawImage(el.img, el.left, el.top, el.img.width, el.img.height);
			});
			PRES.exportCanvas();
		}
	};

	var bgImage = new Image();
	bgImage.onload = function() { // MAKE SURE WE ALWAYS DRAW THE BG FIRST
		ctx.drawImage(bgImage, ((1000 - this.width) / 2) * 2, ((680 - this.height) / 2) * 2, (this.width * 2), (this.height * 2));
		callbackCounter.addCallback();
	};
	bgImage.src = 'assets/img/pres_bg' + bgNum[0].replace(/bg-/g, '') + '.svg';
	bgImage.setAttribute('crossOrigin','anonymous');

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

};

PRES.exportCanvas = function() {
	var canvasData = canvas.toDataURL('image/png');
	window.setTimeout(function() {
		$('#overlay-print a').attr({
			href: canvasData,
			target: '_blank'
		});
		PRES.showOverlay('#overlay-print');
		/*
		if (!printWindow || printWindow.closed || typeof printWindow.closed === 'undefined') {
			PRES.showOverlay('#overlay-popup');
		} else if (printWindow.document) {
			printWindow.document.title = 'Skriv ut presentation';
		}
		*/
	}, 0);
};