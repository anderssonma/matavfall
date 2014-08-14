var SB = {
	scoreTable: [],
	forceReflow: function() {
		this.$elList[0].offsetHeight;
	},

	pickWord: function(i) {
		if (this.undoInProgress || this.insertInProgress) {
			return false;
		}
		this.insertInProgress = true;

		this.scoreTable[this.currentSet + 1] = (i * 5);

		var $bigWord = $('#part-' + (this.currentSet + 1), this.$el);
		$bigWord.removeClass('in');
		this.$elList.removeClass('show');

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
			SB.$el.addClass('step-' + (SB.currentSet + 2));
			window.setTimeout(function() {
				$bigWord.removeClass('show');
				// SHOW CLOCK
				SB.currentSet++;
				SB.nextSentence(1);
			}, SB.timeouts.normal);
		}, SB.timeouts.fast);

	},
	populateChoices: function() {
		var htmlString = '';
		var listItems = this.wordChoices[this.currentSet];
		var scoreItems = this.scoreArray[this.currentSet];
		listItems.forEach(function(item, i) {
			htmlString = htmlString + '<li onclick="SB.pickWord(' + scoreItems[i] + ')">' + item + '</li>';
		});
		this.$elList.html(htmlString + '<li class="undo-button" onclick="SB.undo();"><img src="assets/img/pil_vanster.svg" width="20"></li>');
		this.forceReflow();
		this.$elList.addClass('show');
	},

	nextSentence: function(nextIndex) {

		if (this.currentSet === this.wordChoices.length) {
			// SHOW END SCREEN
			this.finalScore();
			return false;
		}

		var $elPart = $('#part-' + (this.currentSet + nextIndex), this.$el);
		$elPart.addClass('show');
		this.forceReflow();
		$elPart.addClass('in');

		window.setTimeout(function() {
			SB.populateChoices();
			SB.insertInProgress = false;
		}, SB.timeouts.fast);
		
	},

	undo: function() {
		if (this.currentSet === 0 || this.undoInProgress || this.insertInProgress) {
			return false;
		}
		this.undoInProgress = true;

		this.scoreTable[this.currentSet] = 0;
		var currentSet = this.currentSet + 1;

		this.$elList.removeClass('show');
		this.$el.removeClass('step-' + currentSet);
		$('#part-' + currentSet, this.$el).removeClass('in');
		window.setTimeout(function() {
			$('#part-' + currentSet, this.$el).removeClass('show');
			SB.nextSentence(0);
			SB.currentSet--;
			SB.undoInProgress = false;
		}, SB.timeouts.slow);

	},

	finalScore: function() {
		var maxScore = this.wordChoices.length * 15;
		var finalScore = 0;
		this.scoreTable.forEach(function(points) {
			finalScore += points;
		});

		var title, imageSrc, textVerdict, classVerdict;
		if (finalScore >= Math.floor(maxScore * 0.8)) { // 80% or more correct
			title = 'MILJÖHJÄLTE';
			imageSrc = 'jorden_glad_alt';
			textVerdict = 'En miljöhjälte både tänker rätt och gör rätt för en bättre miljö. Grattis! Fortsätt att tänka på hur du kan bidra till en bättre miljö, varje dag. Uppmuntra dina föräldrar att också bli miljöhjältar. Säg till din lärare att det är bra om ni alla tillsammans pratar om hur viktigt det är att välja ekologisk mat – hemma och i skolan.';
			classVerdict = 'final-good';
		} else if (finalScore >= Math.floor(maxScore * 0.4)) { // 40%-80% correct
			title = 'MILJÖTALANGEN';
			imageSrc = 'jorden_neutral_alt';
			textVerdict = 'En miljötalang tänker på miljön ibland, men inte alltid. Du kan med enkla medel bli en ”miljöhjälte”. Ta gärna hjälp av dina föräldrar. Be att de handlar mer ekologisk mat hemma. Hjälps åt att sortera avfall. Prata mer om hur ni alla, även mamma och pappa, kan förbättra miljön. Det får vi alla glädje av.';
			classVerdict = 'final-okay';
		} else {
			title = 'MILJÖBOVEN';
			imageSrc = 'jorden_dyster_alt';
			textVerdict = 'En miljöbov bryr sig inte om att tänka på miljön över huvud taget. Du kan med enkla medel bli en ”miljötalang”. Spara energi genom att inte duscha onödigt länge, stäng av telefon, dator, tv och lampor när de inte används. Och hjälp både dig själv och andra med att sortera avfallet hemma.';
			classVerdict = 'final-bad';
		}

		$('.certificate img', this.$el).attr('src', '/assets/img/' + imageSrc + '.svg');
		$('.certificate h2', this.$el).text(title);
		$('.certificate p', this.$el).text(textVerdict);
		window.setTimeout(function() {
			SB.$el.addClass(classVerdict);
		}, SB.timeouts.fast);

		localStorage.setItem('SMM_DAYBUILDER_TITLE', title);
		localStorage.setItem('SMM_DAYBUILDER_POINTS', finalScore);
		$('#diploma').trigger('rerender', ['story']);
	},

	restart: function() {
		var $titles = $('.buildarea p', this.$el),
				$choices = $('#sentence-choices', this.$el);

		this.$el.attr('class', 'daybuilder step-1');
		$titles.removeClass('in');
		$choices.removeClass('show');
		window.setTimeout(function() {
			$titles.removeClass('show');
			$choices.empty();
			SB.scoreTable.length = 0;
			SB.init();
		}, SB.timeouts.slow);
	},

	hideIntro: function(self) {
		var $introBG = $(self).parent().parent();
		$introBG.addClass('hide');
		window.setTimeout(function() {
			$introBG.addClass('remove');
		}, SB.timeouts.slower);
	},

	init: function() {
		//wordChoices.length = 2;
		this.insertInProgress = false;
		this.undoInProgress = false;
		this.wordChoices = wordChoices;
		this.scoreArray = scoreArray;
		this.currentSet = 0;
		this.$el = $('#daybuilder');
		this.$elList = $('#sentence-choices', this.$el);

		$('.buildarea #part-1', this.$el).addClass('show');
		this.forceReflow();
		$('.buildarea #part-1', this.$el).addClass('in');

		if (!Modernizr.csstransitions) {
			SB.timeouts = {
				fast: 100,
				normal: 200,
				slow: 300,
				slower: 400
			}
		} else {
			SB.timeouts = {
				fast: 250,
				normal: 500,
				slow: 750,
				slower: 1800
			}
		}

		this.populateChoices();
	}
};

$(document).ready(function() {
	SB.init();
});