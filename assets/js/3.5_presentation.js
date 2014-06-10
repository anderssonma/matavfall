var shuffleArray = function(array) {
	var currentIndex = array.length,
			temporaryValue,
			randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};


var PRES = {
	imgRemaining: 50,
	imgAllowed: 50,
	imgArrayPage: 0,
	mode: 'images'
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
	$('#presentation #drop-zone').removeClass(function (i, css) {
		return (css.match (/\bbg-\S+/g) || []).join(' ');
	}).addClass(bgNum);
};


PRES.saveData = function() {
	var imageData = $('#drop-zone').html();
	var backgroundImage = $('#drop-zone').attr('class').match(/bg-[0-9]/);
	//var backgroundImage = 'bg-1';
	if (imageData !== '' && backgroundImage[0] !== null) {
		var saveObject = {
			background: backgroundImage[0],
			data: imageData
		};
		localStorage.setItem('MAT_BEN3_PRES', JSON.stringify(saveObject));
		this.toastMessage('Data sparat!');
	} else {
		this.toastMessage('Inget att spara');
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
	if (!$('#presentation #drop-zone').is(':empty')) {
		this.removeBoardImages();
	}
	$(self).parent().removeClass('show');
	var savedData = localStorage.getItem('MAT_BEN3_PRES');
	var countImg = savedData.match(/<img/g).length;
	savedData = JSON.parse(savedData);
	$('#presentation #drop-zone').append(savedData.data).addClass(savedData.background);
	$('#drop-zone .ui-draggable').draggable({
		cursor: 'move',
		containment: '#remove-wrap',
		start: function() {
			$('#presentation').addClass('show-delete');
		},
		stop: function() {
			$('#presentation').removeClass('show-delete');
		}
	}).hover(function() {
		PRES.imageControls(this);
	}, function() {
		PRES.removeImageControls(this);
	});
	this.imgRemaining = this.imgRemaining - countImg;
	$('#presentation .color-swatches .' + savedData.background).addClass('selected');
	$('#presentation').addClass('editing');
	$('#image-counter').text('BILDER KVAR: ' + this.imgRemaining);
	this.toastMessage('Data importerat');
};


PRES.showIntroOverlay = function(self) {
	$(self).parent().removeClass('show');
	$('#presentation #overlay-intro').addClass('show');
};

PRES.closeIntroOverlay = function(self) {
	$(self).parent().removeClass('show');
	var selectedBg = $('#overlay-intro .selected').attr('class').match(/bg-[0-9]/)[0];
	$('#drop-zone').addClass(selectedBg);
	$('#presentation .color-swatches .' + selectedBg).addClass('selected');
	$('#presentation').addClass('editing');
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
	$('#presentation .image-drawer').empty().removeClass().addClass('image-drawer mode-' + clickedMode);
	this.mode = (this.mode === 'images') ? 'words' : 'images';
	$('#presentation .controls').removeClass().addClass('controls ' + this.mode + '-active');
	$('#presentation .image-drawer').append(this.createImageDOMString());
	$('#presentation #page-count').html((this.imgArrayPage + 1) + '&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' + imageData[this.mode].length);
	this.setupDraggables('.image-drawer .draggable');
	$('#presentation .image-drawer').addClass('show');

};

PRES.changeImagePage = function(num) {
	if ((this.imgArrayPage + num < 0) || (this.imgArrayPage + num > imageData[this.mode].length - 1)) {
		return false;
	} else {
		this.imgArrayPage = this.imgArrayPage + num;
		$('#presentation .image-drawer').empty().removeClass('show').append(this.createImageDOMString());
		$('#presentation #page-count').html((this.imgArrayPage + 1) + '&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;' + imageData[this.mode].length);
		this.setupDraggables('.image-drawer .draggable');
		$('#presentation .image-drawer').addClass('show');
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
			$('#presentation .image-drawer').append(placeholder);
			$(this).attr('data-off-left', ev.target.offsetLeft).attr('data-off-top', ev.target.offsetTop);
		},
		stop: function() { 
			// REMOVE IF NOT NEEDED
		}
	});
};

var undoMode = false;
var lastBoard = {
	html: '',
	bg: ''
};

PRES.removeBoardImages = function() {
	lastBoard.html = $('#presentation #drop-zone').html();
	lastBoard.bg = $('#drop-zone').attr('class').match(/bg-[0-9]/);
	$('#presentation #drop-zone').empty();
	$('.tools .restart').addClass('undo-mode');
	undoMode = true;
};

PRES.clearBoard = function() {
	if (!undoMode) { // CLEAR BOARD
		if (!$('#presentation #drop-zone').is(':empty') && confirm('Vill du verkligen ta bort alla bilder?')) {
			PRES.removeBoardImages();
			//localStorage.removeItem('MAT_BEN3_PRES');
			PRES.toastMessage('Data rensat. Klicka igen för att ångra');
		} else {
			PRES.toastMessage('Inget att rensa');
		}
	} else { // RESTORE PREVIOUS BOARD
		$('#presentation #drop-zone').empty().append(lastBoard.html).addClass(lastBoard.bg);
		$('.tools .restart').removeClass('undo-mode');
		undoMode = false;
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

	$('#presentation .image-drawer').append(this.createImageDOMString('images'));
	this.checkSavedData();
	this.setupDraggables('.draggable');

	$('#drop-zone').droppable({
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
			var compensateWidth = imageWidth * (imageHeight / item.height);
			// CALC DIFF BETWEEN NEW & OLD WIDTH
			compensateWidth = (compensateWidth - imageWidth) / 2;
			var compensateHeight = (imageHeight - item.height) / 2;

			var newImage = new Image();
			newImage.src = imageSrc;
			$(newImage).css({
				position: 'absolute',
				left: endPos.left + startLeft - compensateWidth,
				top: endPos.top + startTop - compensateHeight, // TOP MARGIN
				zIndex: 10
			}).attr('height', imageHeight);
			$('#drop-zone').append(newImage);
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
});