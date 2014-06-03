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

// DISABLE ALL SCROLLING TEMPORARILY WITHOUT SETTING OVERFLOW:HIDDEN (WHICH BREAKS SCROLLORAMA)
var UserScrollDisabler = function() {
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	// left: 37, up: 38, right: 39, down: 40
	this.scrollEventKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
	this.$window = $(window);
	this.$document = $(document);
};

UserScrollDisabler.prototype = {
	disable: function() {
		var self = this;
		self.$window.on("mousewheel.UserScrollDisabler DOMMouseScroll.UserScrollDisabler", this._handleWheel);
		self.$document.on("mousewheel.UserScrollDisabler touchmove.UserScrollDisabler", this._handleWheel);
		self.$document.on("keydown.UserScrollDisabler", function(event) {
			self._handleKeydown.call(self, event);
		});
	},
	reenable: function() {
		this.$window.off(".UserScrollDisabler");
		this.$document.off(".UserScrollDisabler");
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


// TEST FOR LOCALSTORAGE SUPPORT
var supportsLocalStorage = function(){
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch(e) {
		return false;
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