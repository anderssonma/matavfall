var SB = {
	scoreTable: [],
	forceReflow: function() {
		this.$elList[0].offsetHeight;
	},

	insertInProgress: false,
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
			}, 500);
		}, 250);

	},
	populateChoices: function() {
		var htmlString = '';
		var listItems = this.wordChoices[this.currentSet];
		listItems.forEach(function(item, i) {
			htmlString = htmlString + '<li onclick="SB.pickWord(' + i + ')">' + item + '</li>';
		});
		this.$elList.html(htmlString + '<li class="undo-button" onclick="SB.undo();">&larr;</li>');
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

		this.$elList.removeClass('show');
		this.$el.removeClass('step-' + currentSet);
		$('#part-' + currentSet, this.$el).removeClass('in');
		window.setTimeout(function() {
			$('#part-' + currentSet, this.$el).removeClass('show');
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

		var title, imageSrc, textVerdict, classVerdict;
		if (finalScore >= Math.floor(maxScore * 0.8)) { // 80% or more correct
			title = 'MILJÖKÄMPEN';
			imageSrc = 'jorden_glad';
			textVerdict = 'Ett miljöhelgon både tänker rätt och gör rätt för en bättre miljö. Grattis! Fortsätt att tänka på hur du kan bidra till en bättre miljö, varje dag. Uppmana dina föräldrar att också bli miljöhelgon. Säg till din lärare att det är bra om ni alla tillsammans pratar om hur viktigt det är att välja ekologisk mat – hemma och i skolan.';
			classVerdict = 'final-good';
		} else if (finalScore >= Math.floor(maxScore * 0.4)) { // 40%-80% correct
			title = 'MILJÖTALANGEN';
			imageSrc = 'jorden_neutral';
			textVerdict = 'En miljötalang tänker på miljön ibland, men inte alltid. Du kan med enkla medel bli ett ”miljöhelgon”. Ta gärna hjälp av dina föräldrar. Be att de handlar mer ekologisk mat hemma. Hjälps åt att sortera avfall. Prata mer om hur ni alla, även mamma och pappa, kan förbättra miljön. Det får vi alla glädje av.';
			classVerdict = 'final-okay';
		} else {
			title = 'MILJÖBOVEN';
			imageSrc = 'jorden_dyster';
			textVerdict = 'En miljöbov bryr sig inte om att tänka på miljön över huvud taget. Du kan med enkla medel bli en ”miljötalang”. Spara energi genom att inte duscha onödigt länge, stäng av telefon, dator, tv och lampor när de inte används. Och hjälp både dig själv och andra med att sortera avfallet hemma.';
			classVerdict = 'final-bad';
		}

		$('.diploma img', this.$el).attr('src', '/assets/img/' + imageSrc + '.svg');
		$('.diploma h2', this.$el).text(title);
		$('.diploma p', this.$el).text(textVerdict);
		window.setTimeout(function() {
			SB.$el.addClass(classVerdict);
		}, 250);

		localStorage.setItem('SMM_DAYBUILDER_TITLE', title);
		localStorage.setItem('SMM_DAYBUILDER_POINTS', finalScore);
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
		}, 500);
	},

	init: function() {
		//wordChoices.length = 2;
		this.wordChoices = wordChoices;
		this.currentSet = 0;
		this.$el = $('#daybuilder');
		this.$elList = $('#sentence-choices', this.$el);

		$('.buildarea #part-1', this.$el).addClass('show');
		this.forceReflow();
		$('.buildarea #part-1', this.$el).addClass('in');
		this.populateChoices();
	}
};

$(document).ready(function() {
	SB.init();
});