



var disabler = new UserScrollDisabler();

var WORLD = {
	changeBackground: function(nextPage) {
		$(this.el).removeClass(function (index, css) {
			return (css.match (/\bpage-\S+/g) || []).join(' ');
		}).addClass('page-' + PAGER.currentPage + '-active');
	},
	setup: function() {
		this.el = document.getElementById('pager');
		this.pages = [
			document.getElementById('page-1'),
			document.getElementById('page-2'),
			document.getElementById('page-3')
		];
		this.el.addEventListener('transitionend', function(e) {
			if (e.target.className === 'page-wrapper') {
				disabler.enable_scrolling();
				$('.nav').removeClass('disabled');
			}
		}, true);
	}
}
WORLD.setup();


var PAGER = {
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
		window.location.hash = '#' + PAGER.currentPage;
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
				WORLD.changeBackground();
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
		$('#nav-page' + this.currentPage).addClass('active');
		this.setLoadCount();
		this.progressText.innerHTML = '0%';
		window.setTimeout(function() {
			PAGER.insertPage();
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
			PAGER.pageReady();
		}
	},
	start: function() {
		$('.loader h6').text('LADDAR BEN 3: 100% …');
		var data = this.files[PAGER.currentPage];
		this.count = data.length;
		data.forEach(function(item) { // IE9+
			ResourceLoader('js', item, function() {
				JSHandler.loaded();
			});
		});
	},
	remove: function() {
		var data = this.files[PAGER.currentPage];
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
		PAGER.updateLoadProgress();
		PAGER.pageReady();
	},
	start: function() {
		//PAGER.updateLoadProgress('50% …');
		$.get(this.files[PAGER.currentPage - 1], function(data) {
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
		PAGER.updateLoadProgress();
		this.count = this.count - 1;
		if (this.count === 0) {
			window.setTimeout(function() { // TOO FAST LOCALLY OTHERWISE ;)
				HTMLHandler.start();
			}, 500);
		}
	},
	start: function() {
		//PAGER.updateLoadProgress('25% …')
		var data = this.files[PAGER.currentPage];
		this.count = data.length;
		data.forEach(function(item) { // IE9+
			ResourceLoader('css', item, function() {
				CSSHandler.loaded();
			});
		});
	},
	remove: function() {
		var data = this.files[PAGER.currentPage];
		data.forEach(function(item) { // IE9+
			$('link[href~="' + item + '"]').remove();
		});
	}
};




// START LOADING
// =============
$(function() {
	PAGER.init();
	console.log(localStorage.getItem('scrollpos_3'));
});

window.addEventListener('onbeforeunload', function() {
	// SAVE THE SCROLL POS ON EXIT/RELOAD
	// TODO: TRY TO RESTORE IT LATER
	localStorage.setItem('scrollpos_3', $(document).scrollTop());
});

window.addEventListener('hashchange', function() {
	PAGER.goTo(location.hash.slice(1) || '/');
}, false);

var navDisabled = false;
var updateNav = function(pageNum, item) {
	if (PAGER.currentPage != pageNum && !navDisabled) {
		window.location.hash = '#' + pageNum;
		$('.nav li').removeClass('active');
		$(item).addClass('active');
		$('.nav').addClass('disabled');
	}
};

document.getElementById('nav-page1').addEventListener('click', function() { updateNav(1, this); });
document.getElementById('nav-page2').addEventListener('click', function() { updateNav(2, this); });
document.getElementById('nav-page3').addEventListener('click', function() { updateNav(3, this); });

/* DISABLE NUM KEYS
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
*/