var PRES = {
	imgRemaining: 50,
	imgAllowed: 50,
	imgArrayPage: 0,
	mode: 'images',
	undoMode: false,
	htmlBackup: '',
	bgBackup: ''
};

PRES.preloadImages = function() { // PRELOAD ALL DRAGGABLE IMAGES JUST IN CASE
	var imageArray = [];
	imageArray.push(imageData.images);
	imageArray.push(imageData.words);
	imageArray.forEach(function(imageTypes) {
		imageTypes.forEach(function(pageArrays) {
			pageArrays.forEach(function(item) {
				var img = new Image();
				img.src = '/assets/img/' + item.src;
			});
		});
	});
};

PRES.removePlaceholder = function() {
	$('#presentation .image-drawer .placeholder').fadeOut(250, function() {
		$(this).remove();
	});
};
PRES.updateLimitCount = function(boolSub) {
	if ((this.imgRemaining === 0 && boolSub) || (this.imgRemaining === this.imgAllowed && (!boolSub))) {
		return false;
	}
	this.imgRemaining = (boolSub) ? (this.imgRemaining - 1) : (this.imgRemaining + 1);
	$('#image-counter').text('BILDER KVAR: ' + this.imgRemaining);
};

PRES.displayLayerHelper = function(el) {
	$('#layer-help').text('LAGER: ' + $(el).css('zIndex')).addClass('show');
};
PRES.hideLayerHelper = function() {
	$('#layer-help').removeClass('show');
};

var toastEl = document.getElementById('pres-toast');
PRES.toastMessage = function(msg) {
	$(toastEl).text(msg);
	window.setTimeout(function() {
		$(toastEl).addClass('show');
	}, 0);
	window.setTimeout(function() {
		$(toastEl).removeClass('show');
	}, 2000);
};


PRES.pickBg = function(self) {
	$('#overlay-intro .bg-choice').removeClass('selected');
	$(self).addClass('selected');
};
PRES.changeBg = function(self, bgNum) {
	$('#color-swatches .color').removeClass('selected');
	$(self).addClass('selected');
	PRES.$dropZone.removeClass(function (i, css) {
		return (css.match (/\bbg-\S+/g) || []).join(' ');
	}).addClass(bgNum);
};


PRES.saveData = function() {
	var imageData = PRES.$dropZone.html();
	var backgroundImage = PRES.$dropZone.attr('class').match(/bg-[0-9]/);
	if (imageData === '' || backgroundImage == null || backgroundImage[0] == null) {
		this.toastMessage('Inget att spara');
	} else {
		var saveObject = {
			background: backgroundImage[0],
			data: imageData
		};
		localStorage.setItem('MAT_BEN3_PRES', JSON.stringify(saveObject));
		this.toastMessage('Data sparat!');
	} 
};

PRES.checkSavedData = function() {
	if (localStorage.getItem('MAT_BEN3_PRES') === null) {
		$('#overlay-intro').addClass('show');
	} else {
		$('#overlay-import').addClass('show');
	}
};

PRES.getSavedData = function(self) {
	if (!PRES.$dropZone.is(':empty')) {
		this.removeBoardImages();
	}
	$(self).parent().removeClass('show');
	var savedData = localStorage.getItem('MAT_BEN3_PRES');
	var countImg = savedData.match(/<img/g).length;
	savedData = JSON.parse(savedData);
	PRES.$dropZone.append(savedData.data).addClass(savedData.background);
	$('#drop-zone .ui-draggable').draggable({
		cursor: 'move',
		containment: '#remove-wrap',
		start: function() {
			PRES.$pres.addClass('show-delete');
		},
		stop: function() {
			PRES.$pres.removeClass('show-delete');
		}
	}).hover(function() {
		PRES.imageControls(this);
	}, function() {
		PRES.removeImageControls(this);
	});
	this.imgRemaining = this.imgRemaining - countImg;
	$('#presentation .color-swatches .' + savedData.background).addClass('selected');
	this.$pres.addClass('editing');
	$('#image-counter').text('BILDER KVAR: ' + this.imgRemaining);
	this.toastMessage('Data importerat');
};

PRES.showOverlay = function(selector) {
	$('#presentation ' + selector).addClass('show');
};

PRES.closeOverlay = function(self) {
	$(self).parent().removeClass('show');
};

PRES.showIntroOverlay = function(self, selector) {
	PRES.closeOverlay(self);
	PRES.showOverlay('#overlay-intro');
};

PRES.closeIntroOverlay = function(self) {
	PRES.closeOverlay(self);
	var selectedBg = $('#overlay-intro .selected').attr('class').match(/bg-[0-9]/)[0];
	PRES.$dropZone.addClass(selectedBg);
	$('#presentation .color-swatches .' + selectedBg).addClass('selected');
	this.$pres.addClass('editing');
};




PRES.createImageDOMString = function() { // MAKE A LONG STRING WITH ALL IMAGES IN SET
	var imageString = '';
	//var imageSet = shuffleArray(imageData[PRES.mode].concat(imageData[PRES.mode]));
	// COPY THE ARRAY, REVERSE IT THEN CONCATENATE ANOTHER INSTANCE ONTO IT
	var imageSet = imageData[PRES.mode][PRES.imgArrayPage]; //.slice().reverse().concat(imageData[PRES.mode]);
	imageSet.forEach(function(item) {
		var spacerString = (item.hasOwnProperty('lastInSet') && item.lastInSet) ? '<div class="word-spacer"></div>' : '';
		imageString = imageString + '<img class="draggable" src="' + '/assets/img/' + item.src + '" data-height="' + item.height + '">' + spacerString; 
	});
	return imageString;
};

PRES.changeImageType = function(clickedMode) {
	if (this.mode === clickedMode) {
		return false;
	}
	this.imgArrayPage = 0;
	this.$imageDrawer.empty().removeClass().addClass('image-drawer mode-' + clickedMode);
	this.mode = (this.mode === 'images') ? 'words' : 'images';
	$('#presentation .controls').removeClass().addClass('controls ' + this.mode + '-active');
	this.$imageDrawer.append(this.createImageDOMString());
	$('#presentation #page-count').html((this.imgArrayPage + 1) + '&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' + imageData[this.mode].length);
	this.setupDraggables('.image-drawer .draggable');
	this.$imageDrawer.addClass('show');

};

PRES.changeImagePage = function(num) {
	if ((this.imgArrayPage + num < 0) || (this.imgArrayPage + num > imageData[this.mode].length - 1)) {
		return false;
	} else {
		this.imgArrayPage = this.imgArrayPage + num;
		this.$imageDrawer.empty().removeClass('show').append(this.createImageDOMString());
		$('#presentation #page-count').html((this.imgArrayPage + 1) + '&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' + imageData[this.mode].length);
		this.setupDraggables('.image-drawer .draggable');
		this.$imageDrawer.addClass('show');
	}
};

PRES.setupDraggables = function(selector) {
	$('#presentation ' + selector).draggable({
		cursor: 'move',
		revert: function(valid) {
			console.log(valid);
			if (!valid) {
				PRES.removePlaceholder();
			}
			return true;
		},
		revertDuration: 0,
		start: function(ev) {
			var placeholderImage = new Image();
			placeholderImage.src = this.src;
			$(placeholderImage).css({
				width: this.width,
				height: this.height,
				opacity: 0.25
			});
			var placeholder = document.createElement('div');
			$(placeholder).css({
				position: 'absolute',
				top: ev.target.offsetTop,
				left: ev.target.offsetLeft
			}).addClass('placeholder').append(placeholderImage);
			PRES.$imageDrawer.append(placeholder);
			$(this).attr('data-off-left', ev.target.offsetLeft).attr('data-off-top', ev.target.offsetTop);
		},
		stop: function() { 
			// REMOVE IF NOT NEEDED
		}
	});
};

PRES.removeBoardImages = function() {
	PRES.htmlBackup = PRES.$dropZone.html();
	PRES.bgBackup = PRES.$dropZone.attr('class').match(/bg-[0-9]/);
	PRES.$dropZone.empty();
	$('.tools .restart').addClass('undo-mode');
	PRES.imgRemaining = PRES.imgAllowed;
	PRES.undoMode = true;
};

PRES.clearBoard = function() {
	if (!PRES.undoMode) { // CLEAR BOARD
		if (!PRES.$dropZone.is(':empty') && confirm('Vill du verkligen ta bort alla bilder?')) {
			PRES.removeBoardImages();
			PRES.toastMessage('Data rensat. Klicka igen för att ångra');
			//localStorage.removeItem('MAT_BEN3_PRES');
		} else {
			PRES.toastMessage('Inget att rensa');
		}
	} else { // RESTORE PREVIOUS BOARD
		PRES.$dropZone.empty().append(PRES.htmlBackup).addClass(PRES.bgBackup);
		$('.tools .restart').removeClass('undo-mode');
		PRES.toastMessage('Data återställt');
		PRES.undoMode = false;
	}
};

PRES.imageControls = function(image) {
	var self = image;
	PRES.displayLayerHelper(self);
	$(document).keydown(function(e) {
		switch (e.keyCode) {
			case 27: // ESCAPE = REMOVE IMG
				PRES.updateLimitCount(false);
				PRES.hideLayerHelper(self);
				$(self).remove();
				break;

			case 38: // UP = (Z-INDEX+1)
				e.preventDefault();
				$(self).css('zIndex', (parseInt($(self).css('zIndex'), 10) + 1));
				PRES.displayLayerHelper(self);
				break;

			case 40: // DOWN = (Z-INDEX-1)
				e.preventDefault();
				var zIndex = parseInt($(self).css('zIndex'), 10);
				if (zIndex === 0) {
					return false;
				} else {
					$(self).css('zIndex', (zIndex - 1));
					PRES.displayLayerHelper(self);
				}
				break;
		}
	});
};

PRES.removeImageControls = function(image) {
	$(document).unbind("keydown");
	PRES.hideLayerHelper(image);
};


PRES.setup = function() {

	this.$pres = $('#presentation');
	this.$dropZone = $('#presentation #drop-zone');
	this.$imageDrawer = $('#presentation .image-drawer');

	this.$imageDrawer.append(this.createImageDOMString('images'));
	this.checkSavedData();
	this.setupDraggables('.draggable');

	this.$dropZone.droppable({
		hoverClass: 'valid',
		drop: function(ev, ui) {

			var endPos = ui.position;
			var item = ui.draggable[0];
			var startLeft = $(item).attr('data-off-left');
			if (typeof startLeft === 'undefined') {
				return false;
			} else {
				if (PRES.imgRemaining <= 0){
					PRES.removePlaceholder();
					PRES.toastMessage('Du har redan för många bilder');
					return false;
				}
			}
			startLeft = parseInt(startLeft, 10);
			var startTop = parseInt($(item).attr('data-off-top'), 10); // STANDARD TOP MARGIN
			
			startLeft = parseInt(startLeft, 10);

			var imageSrc = item.src;
			var imageHeight = $(item).attr('data-height');
			var imageWidth = item.width;

			// CALC NEW WIDTH BASED ON NEW HEIGHT
			var newImageWidth = imageWidth * (imageHeight / item.height);
			// CALC DIFF BETWEEN NEW & OLD WIDTH
			var compensateWidth = (newImageWidth - imageWidth) / 2;
			var compensateHeight = (imageHeight - item.height) / 2;

			var newImage = new Image();
			newImage.src = imageSrc;
			$(newImage).css({
				position: 'absolute',
				left: endPos.left + startLeft - compensateWidth,
				top: endPos.top + startTop - compensateHeight, // TOP MARGIN
				zIndex: 10
			}).attr('height', imageHeight).attr('width', newImageWidth);
			PRES.$dropZone.append(newImage);
			$(newImage).hover(function() {
				PRES.imageControls(this);
			}, function() {
				PRES.removeImageControls(this);
			}).draggable({
				cursor: 'move',
				containment: '#remove-wrap'
			});

			PRES.removePlaceholder();
			PRES.updateLimitCount(true);

		}
		});

	$('#trash-can').droppable({
		hoverClass: 'remove',
		drop: function(ev, ui) {
			if (typeof $(ui.draggable[0]).attr('data-off-left') !== 'undefined'){
				return false;
			}
			$(ui.draggable[0]).addClass('shrink').fadeOut(250, function() {
				$(this).remove();
			});
		}
	});
};

$(document).ready(function() {
	PRES.setup();
	PRES.preloadImages();
});




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