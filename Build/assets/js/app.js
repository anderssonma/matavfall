var UserScrollDisabler = function() {

    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    // left: 37, up: 38, right: 39, down: 40
    this.scrollEventKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
    this.$window = $(window);
    this.$document = $(document);

};
UserScrollDisabler.prototype = {

    disable_scrolling : function() {
        var t = this;
        t.$window.on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler", this._handleWheel);
        t.$document.on("mousewheel.UserScrollDisabler touchmove.UserScrollDisabler", this._handleWheel);
        t.$document.on("keydown.UserScrollDisabler", function(event) {
            t._handleKeydown.call(t, event);
        });
    },

    enable_scrolling : function() {
        var t = this;
        t.$window.off(".UserScrollDisabler");
        t.$document.off(".UserScrollDisabler");
    },

    _handleKeydown : function(event) {
        for (var i = 0; i < this.scrollEventKeys.length; i++) {
            if (event.keyCode === this.scrollEventKeys[i]) {
                event.preventDefault();
                return;
            }
        }
    },

    _handleWheel : function(event) {
        event.preventDefault();
    }

};

var supportsLocalStorage = function(){
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch(e) {
		return false;
	}
};


var AL = function(type, url, callback) {

	var el, doc = document;

	switch(type) {
		case 'js':
			el = doc.createElement('script');
			if (callback) {
				el.addEventListener('load', function (e) { callback(e); }, false);
			}
			el.src = url;
			doc.getElementsByTagName('body')[0].appendChild(el);
			break;
		case 'css':
			el = doc.createElement('link');
			if (callback) {
				el.addEventListener('load', function (e) { callback(e); }, false);
			}
			el.href= url;
			el.rel='stylesheet';
			doc.getElementsByTagName('head')[0].appendChild(el);
			break;
		default:
			return;
	}
	
};

var disabler = new UserScrollDisabler();

var PAGER = {
	changeView: function(nextPage) {
		$(this.el).removeClass(function (index, css) {
			return (css.match (/\bpage-\S+/g) || []).join(' ');
		}).addClass('page-' + APP.currentPage + '-active');
	},
	setup: function() {
		this.el = document.getElementById('pager');
		this.pages = [
			document.getElementById('page-1'),
			document.getElementById('page-2'),
			document.getElementById('page-3')
		]
	}
}

PAGER.setup();

PAGER.el.addEventListener('transitionend', function(e) {
	if (e.target.className === 'page-wrapper') {
		disabler.enable_scrolling();
	}
}, true);

console.dir(PAGER.pages);


var APP = {
	currentPage: 2,
	insertPage: function() {
		// THIS ONE IS ASYNCHRONOUS, HANDLERS HAVE TO CALL EACH OTHER UPON COMPLETION
		window.setTimeout(function() { // TOO FAST LOCALLY OTHERWISE ;)
			CSSHandler.start(); // CALLS -> HTMLHandler.start() :: CALLS -> JSHandler.start()
		}, 500);
	},
	removePage: function() {
		// HIDE THE PAGE
		$('#body').removeClass('scroll');
		$('.loader').show();
		// THEN REMOVE HTML/JS/CSS
		HTMLHandler.remove();
		CSSHandler.remove();
	},
	goTo: function(pageNum) {
		this.progressText.innerHTML = '0%';
		$('.loader').show();

		disabler.disable_scrolling();
		$('body').removeClass('scroll').scrollTop(0);
		

		this.removePage();
		this.currentPage = pageNum;
		this.setLoadCount();
		this.insertPage();
	},
	pageReady: function() {
		window.location.hash = '#' + APP.currentPage;
		// GET SAVED SCROLL POS IF IT EXISTS
		var prevPos = 0;
		var savedPos = localStorage.getItem('scrollpos_3');
		if (supportsLocalStorage() && savedPos !== null) {
			prevPos = savedPos;
		}
		// SHOW PAGE 
		// =========
		// TODO: SCROLL TO PREVIOUS SPOT
			 //.scrollTop(0);
			window.setTimeout(function() {
				$('body').addClass('scroll');
				PAGER.changeView();
				window.setTimeout(function() {
					$('.loader').hide();
				}, 1000);
			}, 1000);
	},
	setLoadCount: function() {
		this.filesLoaded = 0;
		this.filesToLoad = CSSHandler.files[this.currentPage].length + 1; // 1 HTML FILE PER PAGE
	},
	updateLoadProgress: function() {
		this.filesLoaded++;
		var percentLoaded = Math.round(((this.filesLoaded / this.filesToLoad).toFixed(2)) * 100);
		this.progressText.innerHTML = percentLoaded + '%';
	},
	init: function() {
		this.progressText = document.getElementById('progress-text');
		if (window.location.hash) {
  		this.currentPage = location.hash.slice(1) || '/';
  	}
  	this.setLoadCount();
  	this.progressText.innerHTML = '0%';
		window.setTimeout(function() {
			APP.insertPage();
		}, 1000);
	}
};

// JAVASCRIPT LOADER
// =================
/*
var JSHandler = {
	files: {
		1: [
			'assets/js/1.1_fakta.js',
			'assets/js/1.2_uppdrag.js',
			'assets/js/1.3_game.helpers.js',
			'assets/js/1.3_game.js',
			'assets/js/1.4_recept.js',
			'assets/js/1.5.1_popcorn.js',
			'assets/js/1.5.2_bio.js',
			'assets/js/1.5.3_kylskap.js',
			'assets/js/1.6_quiz.js',
		],
		2: [
			'assets/js/2.1.1_vag.js',
			'assets/js/2.1.2_fabrik.js',
			'assets/js/2.3_fakta.js',
			'assets/js/1.6_quiz.js',
			'assets/js/2.9_dropdown.js'
		],
		3: [
			'assets/js/3.1_agg.js',
			'assets/js/3.2_tidslinjen.js'
		]
	},
	loaded: function() {
		this.count = this.count - 1;
		if (this.count === 0) {
			APP.pageReady();
		}
	},
	start: function() {
		$('.loader h6').text('LADDAR BEN 3: 100% …');
		var data = this.files[APP.currentPage];
		this.count = data.length;
		data.forEach(function(item) { // IE9+
			AL('js', item, function() {
				JSHandler.loaded();
			});
		});
	},
	remove: function() {
		var data = this.files[APP.currentPage];
		data.forEach(function(item) { // IE9+
			$('script[src~="' + item + '"]').remove();
		});
	}
};
*/

// HTML LOADER
// ===========
var HTMLHandler = {
	files: [
		'ben1.html',
		'ben2.html',
		'ben3.html'
	],
	loaded: function() {
		APP.updateLoadProgress();
		APP.pageReady();
	},
	start: function() {
		//APP.updateLoadProgress('50% …');
		$.get(this.files[APP.currentPage - 1], function(data) {
			$('#content').append(data);
			HTMLHandler.loaded();
		});
	},
	remove: function() {
		$('#content').empty();
	}
};

// CSS LOADER
// ==========
var CSSHandler = {
	files: {
		1: [
			'/assets/css/1.0_intro.css',
			'/assets/css/1.1_fakta.css',
			'/assets/css/uppdrag.css',
			'/assets/css/1.2_uppdrag.css',
			'/assets/css/1.3_spel.css',
			'/assets/css/1.4_recept.css',
			'/assets/css/1.5.1_popcorn.css',
			'/assets/css/1.5.2_bio.css',
			'/assets/css/1.5.3_kylskap.css',
			'/assets/css/1.6_quiz.css',
			'/assets/css/1.6_quiz.slides.css',
			'/assets/css/1.7_diplom.css'
		],
		2: [
			'/assets/css/2.1.1_vag.css',
			'/assets/css/2.1.2_fabrik.css',
			'/assets/css/uppdrag.css',
			'/assets/css/2.2_uppdrag.css',
			'/assets/css/2.3_fakta.css',
			'/assets/css/1.6_quiz.css',
			'/assets/css/2.4_quiz.slides.css',
			'/assets/css/2.9_dropdown.css'
		],
		3: [ 
			'/assets/css/3.1_agg.css',
			'/assets/css/3.2_tidslinjen.css'
		]
	},
	loaded: function() {
		APP.updateLoadProgress();
		this.count = this.count - 1;
		if (this.count === 0) {
			window.setTimeout(function() { // TOO FAST LOCALLY OTHERWISE ;)
				HTMLHandler.start();
			}, 500);
		}
	},
	start: function() {
		//APP.updateLoadProgress('25% …')
		var data = this.files[APP.currentPage];
		this.count = data.length;
		data.forEach(function(item) { // IE9+
			AL('css', item, function() {
				CSSHandler.loaded();
			});
		});
	},
	remove: function() {
		var data = this.files[APP.currentPage];
		data.forEach(function(item) { // IE9+
			$('link[href~="' + item + '"]').remove();
		});
	}
};




// START LOADING
// =============
$(function() {
	APP.init();
	console.log(localStorage.getItem('scrollpos_3'));
});

window.addEventListener('onbeforeunload', function() {
	// SAVE THE SCROLL POS ON EXIT/RELOAD
	// TODO: TRY TO RESTORE IT LATER
	localStorage.setItem('scrollpos_3', $(document).scrollTop());
});

window.addEventListener('hashchange', function() {
	APP.goTo(location.hash.slice(1) || '/');
}, false);

window.addEventListener('keyup', function(e) {
	switch (e.keyCode) {
		case 49: // 1
			window.location.hash = '#' + 1;
			break;
		case 50: // 2
			window.location.hash = '#' + 2;
			break;
		case 51: // 3
			window.location.hash = '#' + 3;
			break;
		default:
			return;
	}
});