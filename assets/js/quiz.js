/* ======================
==  QUIZ 1.6 - SIDA 1  ==
==  MATAVFALLS-SAJTEN  ==
======================= */

//var slides = [];
var Quiz = {

	// DEBUG METHOD
	// ============
	// REMOVE LATER
	/* REMOVE CALLS
	checkProgress: function() {
		console.log('R: ' + this.activeSlide.remaining + '\n' + 'E: ' + this.activeSlide.errors.length);
		if (this.activeSlide.remaining <= 0 && this.activeSlide.errors.length === 0) {
			console.log('CORRECT');
		}
	}, */

	//firstItem: true,

	checkValidity: function(id, target) {
		if (typeof target === 'undefined' && this.activeSlide.validItems.indexOf(id) >= 0) { // IF MULTIPLE TARGETS AND CORRECT
			this.activeSlide.remaining = this.activeSlide.remaining - 1;
		} else if (typeof target !== 'undefined' && target.data('target')) { // IF SINGLE TARGET AND CORRECT MATCH
			this.activeSlide.remaining = this.activeSlide.remaining - 1;
		} else { // IF IT'S A MISS
			this.activeSlide.errors.push(id);
		}

		/*
		if (this.firstItem) {
			this.startTime = new Date();
			this.firstItem = false;
		}
		*/
	},

	setupDroppable: function() {
		$(this.elSlide + ' .quiz-target').each(function(i, el) {
			// GET THE TARGET(S) AND THEIR OFFSETS
			var target = $(el);
			var targetOffsetX = target.position().left;
			var targetOffsetY = target.position().top + (target.height() / 2);
			target.droppable({
				hoverClass: 'valid',
				drop: function(e, ui) {
					// GET THE DROPPED ELEMENT
					var item = $(ui.draggable['0']);
					// CHECK IF IT'S CORRECT OR NOT
					if (!Quiz.activeSlide.isTargetMultiple) {
						Quiz.checkValidity(parseInt(item.data('id'), 10));
					} else {
						Quiz.checkValidity(parseInt(item.data('id'), 10), target);
					}
					item.removeClass('rotated');
					item.animate({
						// CENTER IT IN THE BIN...
						top: targetOffsetY - (item.height() / 2) + 8, // + 8 BECAUSE OF TOP BORDER 8PX
						left: targetOffsetX - (item.width() / 2)
					}, function() {
						window.setTimeout(function() {
							// THEN SPIN/SCALE IT DOWN AND REMOVE, ADD TO THE LIST
							item.addClass('vanish');
							// APPEND IT TO THE SIDEBAR LIST SO IT CAN BE REMOVED BY THE USER
							var label = (Quiz.activeSlide.isTargetMultiple === true ? target.data('item') : item.data('item'));
							$(Quiz.elQuiz + ' .in-trash').append('<li class="hide">' + label + '<span data-id="' + item.data('id') + '" onclick="Quiz.resetQuizItem(this)"><i>+</i></span></li>');
							window.setTimeout(function() {
								item.css({display: 'none'});
								$(Quiz.elQuiz + ' .in-trash li').removeClass('hide');
							}, 500);
						}, 0);
					});
				}
			});
		});
	},

	setupDraggable: function() {
		$(this.elSlide + ' .draggable').draggable({
			cursor: 'move',
			revert: 'invalid'
		});
	},

	removeInteractables: function() {
		$(this.elSlide + ' .quiz-target').droppable('destroy');
		$(this.elSlide + ' .draggable').draggable('destroy');
	},

	setupInteractables: function() {
		this.setupDroppable();
		this.setupDraggable();
	},

	reevaluateStatus: function(id) {
		// CHECK IF THE REMOVED ITEM-ID MATCHES ONE IN THE ERRORS ARRAY
		var errorIndex = this.activeSlide.errors.indexOf(id);
		if (errorIndex >= 0) { // IF IT DOES, THEN SPLICE IT AWAY,
			this.activeSlide.errors.splice(errorIndex, 1);
		} else { // OTHERWISE, IF A CORRECT ANSWER GETS RESET, INCREMENT REMAINING BY 1
			this.activeSlide.remaining = this.activeSlide.remaining + 1;
		}
	},

	resetQuizItem: function(el) {
		var itemId = $(el).data('id');
		this.reevaluateStatus(parseInt(itemId, 10));
		$(this.elSlide + ' .draggable').each(function(i, el) {
			var elem = $(el);
			if (elem.data('id') === itemId) { // REMOVE THE EL'S LI AND RESET INLINE STYLES/CLASSES
				if (elem.data('rotated') !== undefined) {
					elem.addClass('rotated');
				}
				elem.removeAttr('style');
				elem.removeClass('vanish');
			}
		});
		$(el).parent().remove();
	},

	nextQuestion: function() {
		// SETUP ACTIVE SLIDE
		this.activeSlide = null;
		this.activeSlide = this.slides[this.nextSlide];
		this.activeSlide.errors = [];
		this.activeSlide.remaining = this.slides[this.nextSlide].validItems.length;
		// SETUP SHORTHANDS
		this.elSlide = '#slide-' + this.activeSlide.id;
		this.elQuiz = '#quiz-' + this.activeSlide.id;
		// SETUP INTERACTABLES
		this.setupInteractables();
	},

	checkQuestionStatus: function() {
		var pushScore = { // SAVE SCORE
			question: this.activeSlide.question,
			remaining: this.activeSlide.remaining,
			errors: this.activeSlide.errors.length
		};
		this.score[this.activeSlide.id] = pushScore;

		if (this.nextSlide === this.slides.length - 2) {
			$('#submit').text('AVSLUTA'); // CHANGE TEXT ON LAST Q'S SUBMIT LABEL
		}

		if (this.nextSlide >= this.slides.length - 1) {
			this.makeSummaryScreen();
		} else {
			this.nextSlide++;
			this.nextQuestion();
		}
	},

	answerQuestion: function() {
		/*
		if (this.firstItem) {
			this.startTime = new Date();
			this.firstItem = false;
		}
		*/
		// GO TO THE NEXT QUESTION
		var nextQ = this.activeSlide.id + 1;
		$(this.elQuiz + ', ' + this.elSlide).addClass('quiz-out');
		window.setTimeout(function() {
			$('#quiz-' + nextQ + ', #slide-' + nextQ).addClass('quiz-in');
		}, 350);
		// PERSIST AND THEN DESTROY PREVIOUS Q
		this.removeInteractables();
		this.checkQuestionStatus();
	},

	makeSummaryScreen: function() {
		var correctAnswers = 0;
		var errorsArray = [];

		// DEBUGGING
		// var missedScore = 0;
		// var errorsScore = 0;
		
		// LOOP THROUGH EVERY QUESTION AND PRINT OUT ANY ERRORS
		for (var i = 0; i < this.score.length; i++) {
			if (this.score[i].remaining === 0) {
				$('#quiz-errors').append('<h4>' + (i + 1) + ': ' + this.score[i].question + '</h4>');
				$('#quiz-errors').append('<p>' + this.slides[i].getCorrectAnswer() + '</p>');
				correctAnswers++;
			} else if (this.score[i].remaining > 0 || this.score[i].errors > 0) {
				// IN CASE WE WANT TO DISPLAY THE ERRORS
				errorsArray.push(this.score[i]);
			}

		// DEBUGGING
		// missedScore = missedScore + this.score[i].remaining;
		// errorsScore = errorsScore + this.score[i].errors;
		}

		// ONLY SAVE IF NEW HIGHSCORE
		var oldHighScore = parseInt(localStorage.getItem('SMM_QUIZ_' + PAGER.currentPage + '_CORRECT') || 0, 10);
		if (oldHighScore === 0 || correctAnswers > oldHighScore) {
			localStorage.setItem('SMM_QUIZ_' + PAGER.currentPage + '_TOTALQ', this.slides.length);
			localStorage.setItem('SMM_QUIZ_' + PAGER.currentPage + '_CORRECT', correctAnswers);
			$('#diploma').trigger('rerender', ['quiz-1']);
		}

		// DEBUGGING
		// console.log('\n' + ':: QUIZ SUMMARY');
		// console.log('TOTAL MISSES: ' + missedScore);
		// console.log('TOTAL ERRORS: ' + errorsScore);
		
		// PRINT SCORE MESSAGE AND # OF STARS
		if (correctAnswers === this.slides.length) {
			$('#quiz-stars').addClass('three-stars');
			$('#quiz-answers').html('Du lyckades svara rätt på alla frågor. <span class="subheader">Bra jobbat, proffset!</span>');
			$('#quiz-errors h3').text('Dina korrekta svar:');
		} else if (correctAnswers > 4) {
			$('#quiz-stars').addClass('two-stars');
			$('#quiz-answers').html('Du lyckades svara rätt på ' + correctAnswers + ' av ' + this.slides.length + ' frågor. <span class="subheader">En gång till så blir det full pott!</span>');
			$('#quiz-errors h3').text('Dina korrekta svar:');
		} else if (correctAnswers > 0) {
			$('#quiz-stars').addClass('one-star');
			$('#quiz-answers').html('Du lyckades svara rätt på ' + correctAnswers + ' av ' + this.slides.length + ' frågor. <span class="subheader">Bättre lycka nästa gång!</span>');
			$('#quiz-errors h3').text('Dina korrekta svar:');
		} else {
			$('#quiz-answers').html('Du lyckades tyvärr inte svara rätt på en enda fråga. <span class="subheader">Läs igenom texten igen och försök sedan en gång till.</span>');
			$('#quiz-errors h3').text('Inga korrekta svar :(');
		}
		// $('#quiz-elapsed').text('DIN TID: ' + ((new Date() - this.startTime) / 1000).toFixed(1) + ' sekunder');
		$('#submit').addClass('disabled');
		// WAIT FOR THE LAST QUIZ TO FADE OUT
		window.setTimeout(function() {
			$('#slide-recap').addClass('quiz-in');
			$('#quiz-end').addClass('quiz-in');
		}, 350);
	},

	restart: function() {
		this.slides.length = 0;
		// this.firstItem = true;
		// delete this.startTime;
		// RESET TEXT
		$('#submit').text('NÄSTA FRÅGA');
		// TRY TO PREVENT LAGGY TRANSITION
		window.setTimeout(function() {
			// REMOVE ALL ADDED CLASSES
			$('#quiz-slides .quiz-slide, #quiz-sidebar .quiz-page').removeClass('quiz-in quiz-out');
			$('#quiz-slides .vanish').removeAttr('style').removeClass('vanish');
			$('#slide-recap').removeClass('quiz-in');
			$('#quiz-end').removeClass('quiz-in');
			// REMOVE ALL ADDED ELEMENTS
			$('#quiz-errors h4, #quiz-errors p').remove();
			$('#quiz-sidebar .in-trash').empty();
		}, 0);
		// A LITTLE WAIT BEFORE WE RESTART AND FADE IN
		window.setTimeout(function() {
			$('#quiz-stars').removeClass().addClass('quiz-stars');
			$('#quiz-' + 0 + ', #slide-' + 0).addClass('quiz-in');
			$('#submit').removeClass('disabled');
			Quiz.init();
			Quiz.nextQuestion();
		}, 350);

	},

	getDataItems: function(el, title) {
		return $.map(el.data(title).toString().replace(/ /g, '').split(','), function(value) {
			return parseInt(value, 10);
		});
	},

	init: function() {
		// "GLOBALS"
		this.slides = [];
		this.nextSlide = 0;
		this.activeSlide = {};
		this.score = [];
		$('#quiz-sidebar .quiz-page').each(function(i, el) {
			var elem = $(el);
			Quiz.slides.push({ // CONSTRUCT SLIDES ARRAY FROM DATA-VARS
				id: parseInt(elem.attr('id').toString().replace(/quiz-/, ''), 10),
				isTargetMultiple: (elem.data('multitarget').toString() === 'true'), // MAKE SURE ITS A BOOLEAN
				question: $('.' + el.id + ' h3').text(),
				validItems: Quiz.getDataItems(elem, 'valid'),
				invalidItems: Quiz.getDataItems(elem, 'invalid'),
				getCorrectAnswer: function() {
					var thisSlide = '#slide-' + this.id;
					if (!this.isTargetMultiple) {
						// GET ALL THE VALID ITEMS AND CONCATENATE THEM
						var allImages = $(thisSlide + ' .draggable').get();
						var answerArr = [];
						for (var i = 0; i < this.validItems.length; i++) {
							answerArr.push($(allImages[i]).data('item'));
						}
						var replacement = ' och';
						answerArr = answerArr.join(', ').toLowerCase();
						answerArr = answerArr.replace(/,([^,]*)$/,replacement+'$1');
						return answerArr;
					} else {
						var index = parseInt(this.validItems.join(), 10) + 1; // NTH-CHILD ISN'T ZERO-BASED SO ADD 1
						var answerString = $(thisSlide + ' div:nth-child(' + index + ')').data('item');
						return answerString.replace(/\d\. /, '');
					}
				}
			});
		});
		//this.nextQuestion();
	},

	firstSlide: function(self) {
		$(self).parent().addClass('start');
		this.nextQuestion();
		// $(this.elSlide).addClass('quiz-in');
	},

	setupEvents: function() {
		$('#submit').on('click', function() {
			Quiz.answerQuestion();
		});
		$('#restart').on('click', function() {
			Quiz.restart();
		});
		$('#quiz-start button').on('click', function() {
			Quiz.firstSlide(this);
			$('#quiz-start button').off('click');
		});
	},

	checkPreviousData: function() {
		var oldHighScore = parseInt(localStorage.getItem('SMM_QUIZ_' + PAGER.currentPage + '_CORRECT') || 0, 10);
		console.log(oldHighScore);
		if (oldHighScore === 0) {
			return false;
		}

		var starClass;
		if (oldHighScore === this.slides.length) {
			// GOLD!
			starClass = 'three-stars';
		} else if (oldHighScore > 4) {
			// SILVER
			starClass = 'two-stars';
		} else {
			// BRONZE
			starClass = 'one-star';
		}
		$('#quiz-start').addClass('active');
		$('#quiz-saved-stars').addClass(starClass);
		$('#quiz-saved-stars h5').text(oldHighScore + ' / ' + this.slides.length + ' RÄTT');

	},

	startQuiz: function() {
		
		this.setupEvents(); // WE ONLY WANT TO SETUP THE HANDLERS ONCE
		this.init();
		this.checkPreviousData();
	}

};


$(document).ready(function() {
	window.setTimeout(function() {
		Quiz.startQuiz();
	}, 0);
});