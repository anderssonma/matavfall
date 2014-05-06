$(document).ready(function() {

	$('#intro-btn').on('click', function() {
		$('.start').addClass('out');
		window.setTimeout(function() {
			$('html').removeClass('intro-up');
		}, 2000);
	});
	
});