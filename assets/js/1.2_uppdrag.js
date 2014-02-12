$(document).ready(function() {

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
			console.log(currentEl);
			if (currentEl.prev('input').length > 0) {
				currentEl.prev().prop('checked', true);
			} else {
				console.log($('#slideshow input:last-child'));
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