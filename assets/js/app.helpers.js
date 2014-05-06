// DISABLE ALL SCROLLING TEMPORARILY WITHOUT SETTING OVERFLOW:HIDDEN (WHICH BREAKS SCROLLORAMA)
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