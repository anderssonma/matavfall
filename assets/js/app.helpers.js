var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


// LOAD CSS & JS ASYNCHRONOUSLY
var ResourceLoader = function(type, url, callback) {

	var el, doc = document;

	switch(type) {
		case 'js':
			el = doc.createElement('script');
			if (callback) {
				if (document.addEventListener) {
					el.addEventListener('load', function (e) { callback(e); }, false);
				} else {
					el.attachEvent('onload', function (e) { callback(e); });
				}
			}
			el.src = url;
			doc.getElementsByTagName('body')[0].appendChild(el);
			break;
		case 'css':
			el = doc.createElement('link');
			if (callback) {
				if (document.addEventListener) {
					el.addEventListener('load', function (e) { callback(e); }, false);
				} else {
					el.attachEvent('onload', function (e) { callback(e); });
				}
			}
			el.href= url;
			el.rel='stylesheet';
			doc.getElementsByTagName('head')[0].appendChild(el);
			break;
		default:
			return;
	}
	
};


// GET PROPER EL OFFSET
var getOffset = function(el) {
	var _x = 0;
	var _y = 0;
	while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return {top: _y, left: _x};
};


// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
// left: 37, up: 38, right: 39, down: 40,
var scrollDisabler = {
	keys: [32, 33, 34, 35, 36, 37, 38, 39, 40],
	preventDefault: function(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;	
	},
	keydown: function(e) {
		for (var i = scrollDisabler.keys.length; i--;) {
			if (e.keyCode === scrollDisabler.keys[i]) {
				this.preventDefault(e);
				return;
			}
		}
	},
	wheel: function(e) {
		scrollDisabler.preventDefault(e);
	},
	disable: function() {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', scrollDisabler.wheel, false);
		}
		window.onmousewheel = document.onmousewheel = scrollDisabler.wheel;
		document.onkeydown = this.keydown;
	},
	reenable: function() {
		if (window.removeEventListener) {
				window.removeEventListener('DOMMouseScroll', scrollDisabler.wheel, false);
		}
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;	
	}
};


var transitionEndEventName = function() {
	var i,
			undefined,
			el = document.createElement('div'),
			transitions = {
				'transition':'transitionend',
				'OTransition':'otransitionend',	// oTransitionEnd in very old Opera
				'MozTransition':'transitionend',
				'WebkitTransition':'webkitTransitionEnd'
			};

	for (i in transitions) {
		if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
			return transitions[i];
		}
	}
};