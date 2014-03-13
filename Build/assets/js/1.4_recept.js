$(function() {
	$('#open-recipes').on('click', function() {
		$('.book-wrapper').addClass('open');
	});
	$('#close-book').on('click', function() {
		$('.book-wrapper').removeClass('open');
	});

	var recipeTabs = {
		activeItem: 1,
		init: function() {
			$('#recipe-list .recipe-item').on('click', function() { // HIDE OLD ITEM FIRST
				$('#recipe-list, #recipe-box').find("[data-id='" + recipeTabs.activeItem + "']").removeClass('active');
				var self = this;
				window.setTimeout(function() { // THEN SHOW NEW AFTER X MS
					recipeTabs.activeItem = $(self).data('id');
					$('#recipe-list, #recipe-box').find("[data-id='" + recipeTabs.activeItem + "']").addClass('active');
				}, 350);
			});
		}
	};
	recipeTabs.init();
});