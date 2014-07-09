// scrollDisabler.disable(); // DISABLE SCROLL RIGHT AWAY!
// DISABLE WHILE DEBUGGING

var ELEM = {
	setup: function() {
		this.body = $('body');
		this.nav = $('#nav');
		this.navItems = $('#nav li');
		this.loader = $('#loader');
		this.content = $('#content');
	}
};

var WORLD = {
	changeBackground: function() {
		$(this.el).removeClass(function (index, css) {
			return (css.match (/\bpage-\S+/g) || []).join(' ');
		}).addClass('page-' + PAGER.currentPage + '-active');

		if (!Modernizr.csstransitions) {
			window.setTimeout(function() {
				scrollDisabler.reenable();
				ELEM.nav.removeClass('disabled');
			}, 0); // DEBUG: 0, LIVE: 500
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
			var transitionEnd = transitionEndEventName();
			this.el.addEventListener(transitionEnd, function(e) {
				if (e.target.className === 'page-wrapper' && !PAGER.initialLoad) {
					scrollDisabler.reenable();
					ELEM.nav.removeClass('disabled');
				}
			}, true);
		}
	}
};

var PAGER = {
	currentPage: 1,
	initialLoad: true,
	insertPage: function() {
		window.setTimeout(function() { // TOO FAST LOCALLY OTHERWISE ;)
			CSSHandler.load(); // (ASYNC) CALLS -> HTMLHandler.load() :: CALLS -> JSHandler.start()
		}, 0); // DEBUG: 0, LIVE: 500
	},
	removePage: function() {
		ELEM.loader.removeClass('disabled');
		window.setTimeout(function() {
			ELEM.loader.removeClass('hide');
		}, 0);
		HTMLHandler.remove();
		CSSHandler.remove();
	},
	loadPage: function(pageNum) {
		this.progressText.innerHTML = '0%';
		scrollDisabler.disable();
		ELEM.body.removeClass('scroll').scrollTop(0);
		this.removePage();
		this.currentPage = pageNum;
		this.setLoadCount();
		this.insertPage();
	},
	pageReady: function() { // GIVE THE PAGE SOME BREATHING ROOM
		window.setTimeout(function() {
			ELEM.body.addClass('scroll');
			WORLD.changeBackground();
			window.setTimeout(function() {
				ELEM.loader.addClass('hide');
				window.setTimeout(function() {
					ELEM.loader.addClass('disabled');
				}, 400);
			}, 0); // DEBUG: 0, LIVE: 1000
		}, 0); // DEBUG: 0, LIVE: 1000
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
			ELEM.nav.addClass('disabled');
			ELEM.navItems.removeClass('active');
			$(item).addClass('active');
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
				self.setupBinds(); // WAIT 1 CYCLE, OR IT WILL TRIGGER TWICE ON LOAD
			}, 0);
		}
		$('#nav-page' + this.currentPage).addClass('active');
		this.setLoadCount();
		this.progressText.innerHTML = '0%';

		var transitionEnd = transitionEndEventName();
		$('#welcome .mask-alt').on(transitionEnd, function() {
			$('#welcome').hide();
			scrollDisabler.reenable();
			ELEM.nav.removeClass('disabled');
			PAGER.initialLoad = false;
		});
		$('#welcome .circle').on('click', function() {
			$('#welcome .circle').off('click');
			$('#pager').addClass('out');
		});

		window.setTimeout(function() {
			PAGER.insertPage();
		}, 0); // DEBUG: 0, LIVE: 1000
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
		var self = this;
		$.get(this.files[PAGER.currentPage - 1], function(data) {
			ELEM.content.append(data);
			self.done();
		});
	},
	remove: function() {
		ELEM.content.empty();
	},
};

// CSS LOADER
// ==========
var CSSHandler = {
	files: {
		1: [
			'/assets/css/1.1_fakta.css',
			'/assets/css/uppdrag.css',
			'/assets/css/1.2_uppdrag.css',
			'/assets/css/1.3_spel.css',
			'/assets/css/1.4_recept.css',
			'/assets/css/1.5.1_popcorn.css',
			'/assets/css/1.5.2_bio.css',
			'/assets/css/1.5.3_kylskap.css',
			'/assets/css/quiz.css',
			'/assets/css/1.6_quiz.slides.css',
			'/assets/css/diplom.css'
		],
		2: [
			'/assets/css/2.1.1_vag.css',
			'/assets/css/2.1.2_fabrik.css',
			'/assets/css/uppdrag.css',
			'/assets/css/2.2_uppdrag.css',
			'/assets/css/2.3_fakta.css',
			'/assets/css/quiz.css',
			'/assets/css/2.4_quiz.slides.css',
			'/assets/css/2.5_wordbuilder.css',
			'/assets/css/diplom.css'
		],
		3: [ 
			'/assets/css/3.1_agg.css',
			'/assets/css/uppdrag.css',
			'/assets/css/3.2_uppdrag.css',
			'/assets/css/3.3_tidslinjen.css',
			'/assets/css/quiz.css',
			'/assets/css/3.4_quiz.slides.css',
			'/assets/css/3.5_presentation.css',
			'/assets/css/diplom.css'
		]
	},
	done: function() {
		window.setTimeout(function() { // TOO FAST LOCALLY OTHERWISE ;)
			HTMLHandler.load();
		}, 0); // DEBUG: 0, LIVE: 500
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

/*
var INTROMSG = {
	HTML5Storage: false,
	createDateString: function() {
		var today = new Date();
		return today.getDate() + (today.getMonth() + 1) + today.getFullYear();
	},
	getLastVisit: function() {
		return localStorage.getItem('lastVisit');
	},
	setLastVisit: function() {
		localStorage.setItem('lastVisit', this.createDateString());
	},
	isFirstVisit: function() {
		return localStorage.getItem('lastVisit') === null ? true : false;
	},
	close: function() {
		// SET THE LAST VISIT ON OVERLAY CLOSE
		// THEN WE KNOW THAT THE USER HAVE AT LEAST SEEN IT ONCE
		this.setLastVisit();
	},

	init: function() {

		this.HTML5Storage = (supportsLocalStorage()) ? true : false;
		if (supportsLocalStorage()) {
			//alert(this.isFirstVisit());
			if (!this.isFirstVisit()) {
				this.close();
			} else {

				
				//$('#welcome').fadeIn();
				//this.setLastVisit();
				if (this.getLastVisit() + 10 < this.createDateString()) {
					// FIRST VISIT IN 10 DAYS, SHOW OVERLAY?
				} else {
					// HIDE OVERLAY
					// this.close();
				}
			}
		} else {
			// COOKIES?
		}
	}
};
*/


// START LOADING
// =============

$(document).ready(function() {

	if (!isMobile.any() && document.addEventListener) {
		ELEM.setup();
		WORLD.setup();
		PAGER.init();
	} else {
		ELEM.setup();
		console.log('MOBILE');
		ELEM.loader.addClass('hide');
		window.setTimeout(function() {
			ELEM.loader.addClass('disabled');
		}, 400);
		$('#pager').addClass('page-1-active');
		$.get('mobile.html', function(data) {
			ELEM.content.append(data);
			ResourceLoader('css', '/assets/css/mobile.css', function() {
				// DONE CALLBACK
			});
		});
	}

	var topIsAnimating = true;
	$(window).on('scroll', function(e) {
		var sTop = $(this).scrollTop();
		var wHeight = $(window).height();
		if (topIsAnimating && sTop > wHeight) { // STOP TOP ANIM
			$('#pager').removeClass('pager-animate');
			topIsAnimating = false;
			if (PAGER.initialLoad) {
				PAGER.initialLoad = false;
				scrollDisabler.reenable();
				$('#welcome .circle').trigger('click');
			}
		} else if (!topIsAnimating && sTop < wHeight) { // RESTART TOP ANIM
			$('#pager').addClass('pager-animate');
			topIsAnimating = true;
		}
	});

});

/*
$(function() {
	PAGER.init();
	// console.log(localStorage.getItem('scrollpos_3'));
});

var saveScrollPos = function() {
	// BONUS TODO: SCROLL TO PREVIOUS SPOT && GET SAVED SCROLL POS IF IT EXISTS
	var prevPos = 0;
	var savedPos = localStorage.getItem('scrollpos_3');
	if (supportsLocalStorage() && savedPos !== null) {
		prevPos = savedPos;
	}
}

window.addEventListener('onbeforeunload', function() {
	// SAVE THE SCROLL POS ON EXIT/RELOAD || TODO: TRY TO RESTORE IT LATER
	localStorage.setItem('scrollpos_3', $(document).scrollTop());
});
*/