$(function() {
	var factoryCtrl = $.superscrollorama();

	factoryCtrl.addTween('#zoomb-1', TweenMax.from($('#zoomb-1'), 2, {css:{opacity: 0, right: '-=200'}}), 200, -160);
	factoryCtrl.addTween('#text1', TweenMax.to($('#text1'), 2, {css:{opacity: 1, left: '+=200'}}), 200);
	factoryCtrl.addTween('#text2', TweenMax.to($('#text2'), 2, {css:{opacity: 1, left: '+=200'}}), 200);
	factoryCtrl.addTween('#text3', TweenMax.to($('#text3'), 1, {css:{opacity: 1, left: '+=200'}}), 200, false);
	factoryCtrl.addTween('#text4', TweenMax.to($('#text4'), 1, {css:{opacity: 1, right: '+=200'}}), 200, false);

	var vidArray = [
		document.getElementById('end-video1'),
		document.getElementById('end-video2'),
		document.getElementById('end-video3')
	];

	factoryCtrl.addTween('#pipe-nutrients', TweenMax.to($('#pipe-nutrients'), 2, {css:{height: 270}}), 400, -100);
	factoryCtrl.addTween('#pipe-gas', TweenMax.to($('#pipe-gas'), 2, {css:{height: 270}}), 400, -100);
	factoryCtrl.addTween('#wire', TweenMax.to($('#wire'), 2, {css:{height: 1410},
		onComplete: function() {
			vidArray.forEach(function(video) {
				video.play();
			});
		},
		onReverseComplete: function() {
			vidArray.forEach(function(video) { 
				video.pause();
				video.currentTime = 0;
			});
		}
	}), 1350, 200);


	var SimpleSlider = {

		nextSlide: function() {
			var currentEl = $('#slideshow input:checked');
			currentEl.prop('checked', false);
			if (currentEl.next('input').length > 0) {
				currentEl.next().prop('checked', true);
			} else {
				$('#slideshow input:first-of-type').prop('checked', true);
			}
		},
		prevSlide: function() {
			var currentEl = $('#slideshow input:checked');
			currentEl.prop('checked', false);
			if (currentEl.prev('input').length > 0) {
				currentEl.prev().prop('checked', true);
			} else {
				$('#slideshow input:last-of-type').prop('checked', true);
			}
		},

		setup: function() {
			$('#slideshow #nav-next').on('click', function() {
				SimpleSlider.nextSlide();
			});
			$('#slideshow #nav-prev').on('click', function() {
				SimpleSlider.prevSlide();
			});
		}
	};
	SimpleSlider.setup();
});