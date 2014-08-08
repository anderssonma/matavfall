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
// scrollDisabler.disable(); FOR PRODUCTION!

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



// POINTER EVENTS POLYFILL
/*
 * Pointer Events Polyfill: Adds support for the style attribute "pointer-events: none" to browsers without this feature (namely, IE).
 * (c) 2013, Kent Mewhort, licensed under BSD. See LICENSE.txt for details.
 */

// constructor
function PointerEventsPolyfill(options){
    // set defaults
    this.options = {
        selector: '*',
        mouseEvents: ['click','dblclick','mousedown','mouseup'],
        usePolyfillIf: function(){
            if(navigator.appName == 'Microsoft Internet Explorer')
            {
                var agent = navigator.userAgent;
                if (agent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/) != null){
                    var version = parseFloat( RegExp.$1 );
                    if(version < 11)
                      return true;
                }
            }
            return false;
        }
    };
    if(options){
        var obj = this;
        $.each(options, function(k,v){
          obj.options[k] = v;
        });
    }

    if(this.options.usePolyfillIf())
      this.register_mouse_events();
}

// singleton initializer
PointerEventsPolyfill.initialize = function(options){
    if(PointerEventsPolyfill.singleton == null)
      PointerEventsPolyfill.singleton = new PointerEventsPolyfill(options);
    return PointerEventsPolyfill.singleton;
};

// handle mouse events w/ support for pointer-events: none
PointerEventsPolyfill.prototype.register_mouse_events = function(){
    // register on all elements (and all future elements) matching the selector
    $(document).on(this.options.mouseEvents.join(" "), this.options.selector, function(e){
       if($(this).css('pointer-events') == 'none'){
             // peak at the element below
             var origDisplayAttribute = $(this).css('display');
             $(this).css('display','none');

             var underneathElem = document.elementFromPoint(e.clientX, e.clientY);

            if(origDisplayAttribute)
                $(this)
                    .css('display', origDisplayAttribute);
            else
                $(this).css('display','');

             // fire the mouse event on the element below
            e.target = underneathElem;
            $(underneathElem).trigger(e);

            return false;
        }
        return true;
    });
};
