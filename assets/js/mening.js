// CLASSLIST POLYFILL
(function () {

if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

var prototype = Array.prototype,
    push = prototype.push,
    splice = prototype.splice,
    join = prototype.join;

function DOMTokenList(el) {
  this.el = el;
  // The className needs to be trimmed and split on whitespace
  // to retrieve a list of classes.
  var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
  for (var i = 0; i < classes.length; i++) {
    push.call(this, classes[i]);
  }
};

DOMTokenList.prototype = {
  add: function(token) {
    if(this.contains(token)) return;
    push.call(this, token);
    this.el.className = this.toString();
  },
  contains: function(token) {
    return this.el.className.indexOf(token) != -1;
  },
  item: function(index) {
    return this[index] || null;
  },
  remove: function(token) {
    if (!this.contains(token)) return;
    for (var i = 0; i < this.length; i++) {
      if (this[i] == token) break;
    }
    splice.call(this, i, 1);
    this.el.className = this.toString();
  },
  toString: function() {
    return join.call(this, ' ');
  },
  toggle: function(token) {
    if (!this.contains(token)) {
      this.add(token);
    } else {
      this.remove(token);
    }

    return this.contains(token);
  }
};

window.DOMTokenList = DOMTokenList;

function defineElementGetter (obj, prop, getter) {
    if (Object.defineProperty) {
        Object.defineProperty(obj, prop,{
            get : getter
        });
    } else {
        obj.__defineGetter__(prop, getter);
    }
}

defineElementGetter(Element.prototype, 'classList', function () {
  return new DOMTokenList(this);
});

})();

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



var SB = {

	forceReflow: function() {
		this.elList.offsetHeight;
	},

	insertInProgress: false,
	pickWord: function(i) {
		if (this.undoInProgress || this.insertInProgress) {
			return false;
		}
		this.insertInProgress = true;

		this.elList.classList.remove('show');
		var choice = this.wordChoices[this.currentSet][i];
		var item = document.getElementById('part-' + (this.currentSet + 1));

		window.setTimeout(function() {
			var spanClass = 'part-' + (SB.currentSet + 1) + '-span';
			item.innerHTML = item.innerHTML.replace(/…/g, '') + ' <span id="' + spanClass + '">' + choice.replace(/…/g, '') + '</span>';
			SB.forceReflow();
			//$('#part-1 span').addClass('show');
			document.getElementById(spanClass).classList.add('show');
			$('body').addClass('part-2');
			window.setTimeout(function() {
				SB.currentSet++;
				SB.nextSentence();
			}, 1500)
		}, 250);
		
	},
	populateChoices: function() {
		var htmlString = '';
		var listItems = this.wordChoices[this.currentSet];
		listItems.forEach(function(item, i) {
			htmlString = htmlString + '<li onclick="SB.pickWord(' + i + ')">' + item + '</li>';
		});
		if (this.currentSet > 0) {
			htmlString = htmlString + '<li class="undo-button" onclick="SB.undo();">ÅNGRA SENASTE</li>';
		}
		this.elList.innerHTML = htmlString;
		this.forceReflow();
		this.elList.classList.add('show');
	},

	nextSentence: function() {

		if (this.currentSet === this.wordChoices.length) {
			// SHOW END SCREEN
			return false;
		}

		var el = document.getElementById('part-' + (this.currentSet + 1));
		el.classList.add('show');
		this.forceReflow();
		el.classList.add('in');

		window.setTimeout(function() {
			SB.populateChoices();
			SB.insertInProgress = false;
		}, 250);
		
	},

	undoInProgress: false,
	undo: function() {
		if (this.currentSet === 0 || this.undoInProgress || this.insertInProgress) {
			return false;
		}
		this.undoInProgress = true;

		this.elList.classList.remove('show');
		var el = document.getElementById('part-' + (this.currentSet + 1));
		var prevEl = document.getElementById('part-' + this.currentSet);
		el.classList.remove('in');

		window.setTimeout(function() {
			el.classList.remove('show');
			var prevChoice = prevEl.getElementsByTagName('span')[0];
			prevChoice.classList.remove('show');
			window.setTimeout(function() {
				prevChoice.parentNode.removeChild(prevChoice);
				SB.currentSet--;
				SB.populateChoices();
				SB.undoInProgress = false;
			}, 750);
		}, 750);
	},

	init: function() {
		this.wordChoices = wordChoices;
		this.currentSet = 0;
		this.elList = document.getElementById('sentence-choices');
		this.populateChoices();
	}
};

$(document).ready(function() {
	SB.init();
});