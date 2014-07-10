// CLASSLIST POLYFILL
/*
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
*/

var SB = {
	score: 0,
	scoreTable: [],
	forceReflow: function() {
		this.elList.offsetHeight;
	},

	insertInProgress: false,
	pickWord: function(i) {
		if (this.undoInProgress || this.insertInProgress) {
			return false;
		}
		this.insertInProgress = true;

		this.scoreTable[this.currentSet + 1] = (i * 5);

		var bigWord = $('#part-' + (this.currentSet + 1));
		bigWord.removeClass('in');
		$(this.elList).removeClass('show');

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
				bigWord.removeClass('show');
				// SHOW CLOCK
				SB.currentSet++;
				SB.nextSentence(1);
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
		$(this.elList).addClass('show');
	},

	nextSentence: function(nextIndex) {

		if (this.currentSet === this.wordChoices.length) {
			// SHOW END SCREEN
			this.finalScore();
			return false;
		}

		var el = $('#part-' + (this.currentSet + nextIndex));
		el.addClass('show');
		this.forceReflow();
		el.addClass('in');

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

		this.scoreTable[this.currentSet] = 0;
		var currentSet = this.currentSet + 1;

		$(this.elList).removeClass('show');
		$('#daybuilder').removeClass('step-' + currentSet);
		$('#daybuilder #part-' + currentSet).removeClass('in');
		window.setTimeout(function() {
			$('#daybuilder #part-' + currentSet).removeClass('show');
			SB.nextSentence(0);
			SB.currentSet--;
			SB.undoInProgress = false;
		}, 750);

	},

	finalScore: function() {
		var maxScore = this.wordChoices.length * 15;
		var finalScore = 0;
		this.scoreTable.forEach(function(points) {
			finalScore += points;
		});

		var title, imageSrc, textVerdict;
		if (finalScore >= Math.floor(maxScore * 0.8)) { // 80% or more correct
			title = 'MILJÖKÄMPEN';
			imageSrc = 'jordglob_bra';
			textVerdict = 'BRA JOBB'
		} else if (finalScore >= Math.floor(maxScore * 0.4)) { // 40%-80% correct
			title = 'MILJÖTALANGEN';
			imageSrc = 'jordglob_neutral';
			textVerdict = 'LAGOM JOBB';
		} else {
			title = 'MILJÖBOVEN';
			imageSrc = 'jordglob_dalig';
			textVerdict = 'DÅLIGT JOBB';
		}

		// SET FINAL IMAGE
		// SET FINAL TITLE
		// SET FINAL TEXT VERDICT
		// THEN SHOW
		$('.daybuilder').addClass('final');

		localStorage.setItem('SMM_DAYBUILDER_TITLE', title);
		localStorage.setItem('SMM_DAYBUILDER_POINTS', finalScore);
	},

	init: function() {
		//wordChoices.length = 2;
		this.wordChoices = wordChoices;
		this.currentSet = 0;
		this.elList = document.getElementById('sentence-choices');
		this.populateChoices();
	}
};

$(document).ready(function() {
	SB.init();
});