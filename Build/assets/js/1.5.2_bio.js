$(document).ready(function() {

	// SMOOTH SCROLL IN WINDOWS TOO
	// $('html').niceScroll();
	var cinemaCtrl = $.superscrollorama();
	var cinemaVideo = document.getElementById('video');
	var cinemaPlayBtn = $('#play-btn');
	var pauseVideo = function() {
		if (!cinemaVideo.paused) {
			cinemaVideo.pause();
			cinemaPlayBtn.show();
		}
	};

			// SEATS IN & OUT
	var row1In = TweenMax.to($('#row1'), 2, {css:{bottom: '+=200'}, ease: Back.easeOut}),
			row2In = TweenMax.to($('#row2'), 2, {css:{bottom: '+=200'}, ease: Back.easeOut}),
			row1Out = TweenMax.to($('#row1'), 2, {css:{bottom: '-=200'}, ease: Back.easeIn}),
			row2Out = TweenMax.to($('#row2'), 2, {css:{bottom: '-=200'}, ease: Back.easeIn}),
			// SCREEN IN & OUT
			screenIn = TweenMax.to($('#interactive'), 3, {css:{top: 0}, ease: Back.easeOut}),
			screenOut = TweenMax.to($('#interactive'), 3, {css:{top: 700}, ease: Back.easeIn}),
			// CURTAINS IN & OUT - PAUSE THE VIDEO IF IT'S PLAYING ONCOMPLETE
  		leftCurtainOut = TweenMax.to($('#curtain-left'), 5, {css:{left: -520}, ease:Back.easeIn}),
  		rightCurtainOut = TweenMax.to($('#curtain-right'), 5, {css:{right: -520}, ease:Back.easeIn, onReverseComplete: pauseVideo}),
  		leftCurtainIn = TweenMax.to($('#curtain-left'), 5, {css:{left: -100}, ease:Back.easeOut}),
  		rightCurtainIn = TweenMax.to($('#curtain-right'), 5, {css:{right: -100}, ease:Back.easeOut, onComplete: pauseVideo}),
			// READ MORE IN & OUT
  		signIn = TweenMax.to($('#sign'), 2, {css:{bottom: 40}, ease: Expo.easeOut}),
  		signOut = TweenMax.to($('#sign'), 2, {css:{bottom: -200}, ease: Expo.easeIn});

	cinemaCtrl.pin($('#cinema'), 12000, {
		anim: (new TimelineLite())
			.add([row1In, row2In], '+=0.5', 'sequence')
			.add(screenIn)
			.add([leftCurtainOut, rightCurtainOut], '+=0.5','start')
			.add(signIn, '+=1')
			.add(signOut, '+=5')
			.add([leftCurtainIn, rightCurtainIn], '+=0.5', 'start')
			.add(screenOut)
			.add([row2Out, row1Out], '+=0.5', 'sequence'),
		onPin: console.log('Pin'),
		onUnpin: console.log('unpin')
	});

	// PAUSE VIDEO ON VIDEO CLICK
	$('#video').on('click', function() {
		if (!cinemaVideo.paused) {
			cinemaVideo.pause();
			cinemaPlayBtn.fadeIn(250);
		}
	});
	// PLAY ON PLAY CLICK
	cinemaPlayBtn.on('click', function() {
		if (cinemaVideo.paused) {
			cinemaVideo.play();
			$(this).fadeOut(250);
		}
	});

});