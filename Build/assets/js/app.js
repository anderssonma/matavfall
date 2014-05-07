var scrollDisabler = new UserScrollDisabler();

var WORLD = {
	changeBackground: function() {
		$(this.el).removeClass(function (index, css) {
			return (css.match (/\bpage-\S+/g) || []).join(' ');
		}).addClass('page-' + PAGER.currentPage + '-active');

		if (!Modernizr.csstransitions) {
			window.setTimeout(function() {
				scrollDisabler.reenable();
				$('.nav').removeClass('disabled');
			}, 500);
		}
	},
	setup: function() {
		this.el = document.getElementById('pager');
		this.pages = [
			document.getElementById('page-1'),
			document.getElementById('page-2'),
			document.getElementById('page-3')
		];

		if (Modernizr.csstransitions) {
			this.el.addEventListener('transitionend', function(e) {
				if (e.target.className === 'page-wrapper') {
					scrollDisabler.reenable();
					$('.nav').removeClass('disabled');
				}
			}, true);
		}
	}
};
WORLD.setup();


var PAGER = {
	currentPage: 1,
	insertPage: function() {
		// THIS ONE IS ASYNCHRONOUS, HANDLERS HAVE TO CALL EACH OTHER UPON COMPLETION
		window.setTimeout(function() { // TOO FAST LOCALLY OTHERWISE ;)
			CSSHandler.load(); // CALLS -> HTMLHandler.load() :: CALLS -> JSHandler.start()
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
	loadPage: function(pageNum) {
		this.progressText.innerHTML = '0%';
		//$('.loader').show();
		scrollDisabler.disable();
		$('body').removeClass('scroll').scrollTop(0);
		this.removePage();
		this.currentPage = pageNum;
		this.setLoadCount();
		this.insertPage();
	},
	pageReady: function() {
		//window.location.hash = '#' + PAGER.currentPage;
		window.setTimeout(function() {
			$('body').addClass('scroll');
			WORLD.changeBackground();
			window.setTimeout(function() {
				$('.loader').hide();
			}, 1000);
		}, 1000);

		/* BONUS TODO: SCROLL TO PREVIOUS SPOT
		// ==========
		// GET SAVED SCROLL POS IF IT EXISTS
		var prevPos = 0;
		var savedPos = localStorage.getItem('scrollpos_3');
		if (supportsLocalStorage() && savedPos !== null) {
			prevPos = savedPos;
		} */
	},
	setLoadCount: function() {
		this.filesLoaded = 0;
		this.filesToLoad = CSSHandler.files[this.currentPage].length + 1; // +1 HTML FILE PER PAGE
	},
	updateLoadProgress: function() {
		this.filesLoaded++;
		this.progressText.innerHTML = Math.round(((this.filesLoaded / this.filesToLoad).toFixed(2)) * 100) + '%';
	},
	updateNavigation: function(pageNum, item) {
		if (this.currentPage != pageNum) {
			window.location.hash = '#' + pageNum;
			$('.nav li').removeClass('active');
			$(item).addClass('active');
			$('.nav').addClass('disabled');
		}
	},
	setupBinds: function() {
		window.addEventListener('hashchange', function() {
			PAGER.loadPage(location.hash.slice(1) || '/');
		}, false);
		document.getElementById('nav-page1').addEventListener('click', function() { PAGER.updateNavigation(1, this); });
		document.getElementById('nav-page2').addEventListener('click', function() { PAGER.updateNavigation(2, this); });
		document.getElementById('nav-page3').addEventListener('click', function() { PAGER.updateNavigation(3, this); });
	},
	init: function() {
		this.progressText = document.getElementById('progress-text');
		if (window.location.hash) {
			this.currentPage = location.hash.slice(1) || '/';
			this.setupBinds();
		} else {
			var self = this;
			window.location.hash = '#' + 1;
			window.setTimeout(function() {
				self.setupBinds();
			}, 0);
		}
		$('#nav-page' + this.currentPage).addClass('active');
		this.setLoadCount();
		this.progressText.innerHTML = '0%';
		window.setTimeout(function() {
			PAGER.insertPage();
		}, 1000);
	}
};


// HTML LOADER
// ===========
var HTMLHandler = {
	files: [
		'ben1.html',
		'ben2.html',
		'ben3.html'
	],
	done: function() {
		PAGER.updateLoadProgress();
		PAGER.pageReady();
	},
	load: function() {
		$.get(this.files[PAGER.currentPage - 1], function(data) {
			$('#content').append(data);
			HTMLHandler.done();
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
	done: function() {
		window.setTimeout(function() { // TOO FAST LOCALLY OTHERWISE ;)
			HTMLHandler.load();
		}, 500);
	},
	completedFile: function() {
		PAGER.updateLoadProgress();
		this.count = this.count - 1;
		if (this.count === 0) {
			this.done();
		}
	},
	load: function() {
		var data = this.files[PAGER.currentPage];
		this.count = data.length;
		data.forEach(function(item) { // IE9+
			ResourceLoader('css', item, function() {
				CSSHandler.completedFile();
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

window.addEventListener('DOMContentLoaded', function() {
	PAGER.init();
});

/*
$(function() {
	PAGER.init();
	// console.log(localStorage.getItem('scrollpos_3'));
});

window.addEventListener('onbeforeunload', function() {
	// SAVE THE SCROLL POS ON EXIT/RELOAD || TODO: TRY TO RESTORE IT LATER
	localStorage.setItem('scrollpos_3', $(document).scrollTop());
});
*/