$(function() {
	$('#open-recipes').on('click', function() {
		$('.book-wrapper').addClass('open');
	});
	$('#close-book').on('click', function() {
		$('.book-wrapper').removeClass('open');
	});
});