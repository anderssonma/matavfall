$(document).ready(function() {
	var ctrl = $.superscrollorama();

	var pan = TweenMax.to($('#timeline-bg'), 5, {css: {transform: 'translateX(-8000px)'}

	});
	// TEMPORARY SPACER //
	// var spacer = TweenMax.to($('body'), 5, {css: {opacity: '1'}});
	// TEMPORARY SPACER //

	ctrl.pin($('#timeline'), 32000, {
		anim: (new TimelineLite())
			// PART 1
			.add(pan)
	});

});