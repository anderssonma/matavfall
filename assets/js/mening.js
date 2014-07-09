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


var SB = {
	score: 0,
	forceReflow: function() {
		this.elList.offsetHeight;
	},

	insertInProgress: false,
	pickWord: function(i) {
		if (this.undoInProgress || this.insertInProgress) {
			return false;
		}
		this.insertInProgress = true;

		this.score = this.score + i;
		console.log(this.score);

		var bigWord = document.getElementById('part-' + (this.currentSet + 1));
		bigWord.classList.remove('in');
		this.elList.classList.remove('show');

		/*
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
		*/
		window.setTimeout(function() {
			$('.daybuilder').addClass('step-' + (SB.currentSet + 2));
			window.setTimeout(function() {
				bigWord.classList.remove('show');
				// SHOW CLOCK
				SB.currentSet++;
				SB.nextSentence();
			}, 1250);
		}, 250);

	},
	populateChoices: function() {
		var htmlString = '';
		var listItems = this.wordChoices[this.currentSet];
		listItems.forEach(function(item, i) {
			htmlString = htmlString + '<li onclick="SB.pickWord(' + i + ')">' + item + '</li>';
		});
		this.elList.innerHTML = htmlString + '<li class="undo-button" onclick="SB.undo();">&larr;</li>';
		this.forceReflow();
		this.elList.classList.add('show');
	},

	nextSentence: function() {

		if (this.currentSet === this.wordChoices.length) {
			// SHOW END SCREEN
			this.finalScore();
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

	finalScore: function() {
		$('.daybuilder').addClass('final');
		var maxScore = this.wordChoices.length * 3;
		if (this.score >= Math.floor(maxScore * 0.8)) { // 80% or more correct
			// HJÄLTE
		} else if (this.score >= Math.floor(maxScore * 0.4)) { // 40%-80% correct
			// NEUTRAL
		} else {
			// SKURK
		}
	},

	init: function() {
		wordChoices.length = 2;
		this.wordChoices = wordChoices;
		this.currentSet = 0;
		this.elList = document.getElementById('sentence-choices');
		this.populateChoices();
	}
};

$(document).ready(function() {
	SB.init();
});