var supportsLocalStorage = function(){
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch(e) {
		return false;
	}
};


var AL = function(type, url, callback) {

	//	Usage:
	//	AL('css', 'http://somewhe.re/css/glam.css');
	//	AL('js', '/js/something.js', function(e) { alert('LOADED'); });

	var el, doc = document;

	switch(type) {
		case 'js':
			el = doc.createElement('script');
			if (callback) {
				el.addEventListener('load', function (e) { callback(e); }, false);
			}
			el.src = url;
			break;
		case 'css':
			el = doc.createElement('link');
			if (callback) {
				el.addEventListener('load', function (e) { callback(e); }, false);
			}
			el.href= url;
			el.rel='stylesheet';
			break;
		default:
			return;
	}

	doc.getElementsByTagName('head')[0].appendChild(el);
};


// JAVASCRIPT LOADER
// =================
var JSHandler = {
	files: [
		'assets/js/3.1_agg.js',
		'assets/js/3.2_tidslinjen.js'
	],
	loaded: function() {
		this.count = this.count - 1;
		if (this.count === 0) {
			pageReady();
		}
	},
	start: function() {
		$('.loader h6').text('LADDAR BEN 3: 100% …');
		this.count = this.files.length;
		this.files.forEach(function(item) { // IE9+
			AL('js', item, function() {
				JSHandler.loaded();
			});
		});
	}
};

// HTML LOADER
// ===========
var HTMLHandler = {
	current: 0,
	files: [
		{
			el: '#eggs',
			url: '/includes/3.1_agg.html'
		}, {
			el: '#timeline',
			url: '/includes/3.2_tidslinjen.html'
		}
	],
	loaded: function() {
		this.count = this.count - 1;
		if (this.count === 0) {
			JSHandler.start();
		} else {
			this.nextPartial();
		}
	},
	nextPartial: function() {
		var next = this.files[this.current];
		$(next.el).load(next.url, function() {
			HTMLHandler.loaded();
		});
		this.current = this.current + 1;
	},
	start: function() {
		$('.loader h6').text('LADDAR BEN 3: 66% …');
		this.count = this.files.length;
		this.nextPartial();
	}
};

// CSS LOADER
// ==========
var CSSHandler = {
	files: [
		'/assets/css/3.1_agg.css',
		'/assets/css/3.2_tidslinjen.css'
	],
	loaded: function() {
		this.count = this.count - 1;
		if (this.count === 0) {
			HTMLHandler.start();
		}
	},
	start: function() {
		$('.loader h6').text('LADDAR BEN 3: 33% …');
		this.count = this.files.length;
		this.files.forEach(function(item) { // IE9+
			AL('css', item, function() {
				CSSHandler.loaded();
			});
		});
	}
};

// SHOW PAGE
// =========
var pageReady = function() {
	// GET SAVED SCROLL POS IF IT EXISTS
	var prevPos = 0;
	var savedPos = localStorage.getItem('scrollpos_3');
	if (supportsLocalStorage() && savedPos !== null) {
		prevPos = savedPos;
	}
	// SHOW PAGE 
	// =========
	// TODO: SCROLL TO PREVIOUS SPOT
	$('body').addClass('scroll').scrollTop(0);
	window.setTimeout(function() {
		$('.loader').hide();
	}, 1000);
};


// START LOADING
// =============
$(function() {
	window.setTimeout(function() {
		CSSHandler.start();
	}, 1000);
	console.log(localStorage.getItem('scrollpos_3'));
});

window.onbeforeunload = function() {
	// SAVE THE SCROLL POS ON EXIT/RELOAD
	// TODO: TRY TO RESTORE IT LATER
	localStorage.setItem( 'scrollpos_3', $(document).scrollTop());
};