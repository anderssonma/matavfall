$(document).ready(function() {

	var cinemaCtrl = $.superscrollorama(),
			cinemaVideo = document.getElementById('cinema-video'),
			cinemaPlayOverlay = document.getElementById('play-overlay'),
			cinemaMuteBtn = document.getElementById('mute-btn'),
			cinema = $('#cinema'),
			pauseVideo = function() {
				if (!cinemaVideo.paused) {
					cinemaVideo.pause();
					$(cinemaPlayOverlay).removeClass('hidden');
				}
			};

			// SEATS IN & OUT
	var row1In = TweenMax.to($('#row1'), 2, {css:{bottom: '+=200'}, ease: Back.easeOut, 
			onReverseComplete: function() {
				cinema.removeClass('lights-on search-on darken');
			}}),
			row2In = TweenMax.to($('#row2'), 2, {css:{bottom: '+=200'}, ease: Back.easeOut}),
			row1Out = TweenMax.to($('#row1'), 2, {css:{bottom: '-=200'}, ease: Back.easeIn,
				onStart: function() {
					cinema.addClass('animate-bg-blue');
				},
				onReverseComplete: function() {
					cinema.removeClass('animate-bg-blue');
				},
			}),
			row2Out = TweenMax.to($('#row2'), 2, {css:{bottom: '-=200'}, ease: Back.easeIn}),
			// SCREEN IN & OUT
			screenIn = TweenMax.to($('#interactive'), 3, {css:{top: 0}, ease: Back.easeOut, onComplete: function() {
				cinema.addClass('lights-on search-on darken');
				window.setTimeout(function() {
					cinema.removeClass('lights-on');
					window.setTimeout(function() {
						cinema.addClass('lights-on');
							window.setTimeout(function() {
								cinema.removeClass('lights-on');
								window.setTimeout(function() {
									cinema.addClass('lights-on');
									window.setTimeout(function() {
										cinema.removeClass('search-on');
									}, 3500);
								}, 1300);
							}, 1300);
					}, 1300);
				}, 1300);
			}}),
			screenOut = TweenMax.to($('#interactive'), 3, {css:{top: 700}, ease: Back.easeIn}),
			// CURTAINS IN & OUT - PAUSE THE VIDEO IF IT'S PLAYING ONCOMPLETE
			leftCurtainOut = TweenMax.to($('#curtain-left'), 5, {css:{left: -520}, ease:Back.easeIn}),
			rightCurtainOut = TweenMax.to($('#curtain-right'), 5, {css:{right: -520}, ease:Back.easeIn, onReverseComplete: pauseVideo}),
			leftCurtainIn = TweenMax.to($('#curtain-left'), 5, {css:{left: -100}, ease:Back.easeOut}),
			rightCurtainIn = TweenMax.to($('#curtain-right'), 5, {css:{right: -100}, ease:Back.easeOut, onComplete: function() {
				pauseVideo();
				cinema.removeClass('lights-on search-on darken');
			}});

	var scrollDirDown = true;
	var lastScrollTop = 0;
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
		if (st > lastScrollTop && !scrollDirDown){
			scrollDirDown = true;
		} else if (st < lastScrollTop && scrollDirDown) {
			scrollDirDown = false;
		}
		lastScrollTop = st;
	});

	cinemaCtrl.pin(cinema, 12000, {
		anim: (new TimelineLite())
			.add([row1In, row2In], '+=0.5', 'sequence')
			.add(screenIn)
			.add([leftCurtainOut, rightCurtainOut], '+=0.5','start')
			.add([leftCurtainIn, rightCurtainIn], '+=2.5', 'start')
			.add(screenOut)
			.add([row2Out, row1Out], '+=0.5', 'sequence'),
		onPin: function() {
			$('#fakta-kylskap').removeClass('blue');
		},
		onUnpin: function() {
			if (scrollDirDown) { // ONLY ADD IF WE'RE SCROLLING DOWNWARDS
				$('#fakta-kylskap').addClass('blue');
			}
		}
	});



	// REVERT TO START ON 'END'
	$(cinemaVideo).on('ended onended', function() {
		cinemaVideo.currentTime = 0.2;
		cinemaVideo.pause();
		$(cinemaPlayOverlay).removeClass('hidden');
	});

	// PLAY ON PLAY CLICK
	$(cinemaPlayOverlay).on('click', function() {
		if (cinemaVideo.paused) {
			cinemaVideo.play();
			$(cinemaPlayOverlay).addClass('hidden');
		} else {
			cinemaVideo.pause();
			$(cinemaPlayOverlay).removeClass('hidden');
		}
		return false;
	});

	$(cinemaMuteBtn).on('click', function() {
		if (cinemaVideo.paused) {
			return false;
		}

		if (cinemaVideo.muted) {
			cinemaVideo.muted = false;
			$(this).removeClass('muted');
		} else {
			cinemaVideo.muted = true;
			$(this).addClass('muted');
		}
	});

	if (typeof Modernizr.track === 'undefined') {
		captionator.captionify(null, null, {
			degubMode: true,
			appendCueCanvasTo: document.getElementById('cinema-movie'),
			sizeCuesByTextBoundingBox: true,
			cueBackgroundColour: [183,53,93,0.75]
		});
	}

});