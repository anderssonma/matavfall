function supports_local_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e){
    return false;
  }
}

console.log(supports_local_storage())

$(document).ready(function() {

	$('#intro-btn').on('click', function() {
		$('.start').addClass('out');
		window.setTimeout(function() {
			$('html').removeClass('intro-up');
		}, 2000);
	});
	
});