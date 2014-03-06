function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}


$(document).ready(function() {

	var controller = $.superscrollorama();
	var scrollDuration = 100; 
	var width = $(window).width();
	var widthOffset = $(window).width() / 2;
	var windowHeight = $(window).height();
	var windowHeightSplit = $(window).height() / 2;



	var matavfallspase_container_img = TweenMax.to($('#matavfallspase-container img'), 1, {css:{width: 100}, ease:Expo.easeIn}, scrollDuration);
	var matavfallspase_container = TweenMax.to($('#matavfallspase-container'), 1, {css:{width: 300}, ease:Expo.easeIn}, scrollDuration);
	var bil = TweenMax.to($('#bil-bla'), 1.2, {css:{opacity: 1}, ease:Expo.easeIn}, scrollDuration);
	var bil_scale = TweenMax.to($('#bil-bla'), 1.2, {css:{transform: 'scale(.4)'}, ease:Expo.easeIn}, scrollDuration);
	var matavfallspase_container_img_opacity = TweenMax.to($('#matavfallspase-container img'), .5, {css:{opacity: 0}, ease:Expo.easeIn}, scrollDuration);
	var bil_bla_aker = TweenMax.to($('#bil-bla'), 2, {css: {position: 'fixed' ,marginTop: - (windowHeightSplit + 100), marginLeft:-49}, ease:Expo.easeInOut}, scrollDuration , 250);
	var vag = TweenMax.to($('#vag'), 1.2, {css:{opacity: 1}, ease:Expo.easeIn}, scrollDuration);	

	controller.addTween(2200, TweenMax.to($('#biogasgodsel_tank'), 10, {css: {top: '+=2400' }, ease:Expo.easeInOut}), 1400);
	controller.addTween('#vete-holder-1', TweenMax.fromTo($('#vete-holder-1 , #vete-holder-2 , #vete-holder-3,  #vete-holder-4,  #vete-holder-5'), 1, {css: {opacity: 1, transform: 'rotateX(-100deg)' }},  {css: {opacity: 1, transform: 'rotateX(0deg)' }, ease:Bounce.easeOut}), scrollDuration, 50 );

	controller.addTween('#fralla-1', TweenMax.fromTo($('#fralla-1'), 2, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(-10deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration, -100 );
	controller.addTween('#fralla-2', TweenMax.fromTo($('#fralla-2'), 2, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(25deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration ,-100);
	controller.addTween('#fralla-3', TweenMax.fromTo($('#fralla-3'), 1, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(10deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration, -100 );
	controller.addTween('#fralla-4', TweenMax.fromTo($('#fralla-4'), 1, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(-15deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration, -100 );
	controller.addTween('#vete-holder-6', TweenMax.to($('#vete-holder-6'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));	
	controller.addTween('#vete-holder-7', TweenMax.to($('#vete-holder-7'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));	
	controller.addTween('#vete-holder-8', TweenMax.to($('#vete-holder-8'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));	
	controller.addTween('#vete-holder-9', TweenMax.to($('#vete-holder-9'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));	

	
	

	//controller.addTween('#hus-3', TweenMax.to($('#hus-3'), 3, {css: {background: '#fcea0d' }, ease:Expo.easeInOut}), scrollDuration, 300);	
	
	
	controller.pin($('#matavfallspasar'), 1500, {
		anim: (new TimelineLite())
		.add([matavfallspase_container_img, bil, matavfallspase_container])
		.add([matavfallspase_container_img_opacity, bil_scale, bil_bla_aker, vag]),
		
		onPin: function() {
			$('#matavfallspasar').css('height','100%');
			
		}, 
		onUnpin: function() {
			$('#matavfallspasar').css('height', windowHeight);
		}
		});

	var hus_1 = TweenMax.to($('#hus-1,#hus-2,#hus-3,#hus-4,#hus-5'), 1, {css:{background: '#fcea0d'}, ease:Expo.easeIn}, scrollDuration);
	var stroke = TweenMax.to($('#stroke, #cirkel'), .1, {css:{background: '#E74D3C'}, ease:Expo.easeIn}, 0, 0);
	var bil_bort = TweenMax.to($('#bil-bla'), 1, {css:{display: 'none'}, ease:Expo.easeIn}, 0, 0);
	var hus_blir_storre = TweenMax.to($('#hus-3'), 1, {css:{transform: 'scale(10)'}, ease:Expo.easeIn}, scrollDuration);
	
	//var hus_fonster = TweenMax.to($('#hus-3'), 3, {css:{background: 'transparent'}, ease:Expo.easeIn}, 0, 0);

	
	
	controller.pin($('#home-container'), 1500, {
		anim: (new TimelineLite())
		.add([hus_1, stroke, bil_bort, hus_blir_storre]),
	//	.add(hus_blir_storre),
		onPin: function() {
			$('#home-container').css('height','100%');
			$('#stroke').css('height','100px');
			$('#home-container').css('zIndex','100');
		}, 
		onUnpin: function() {
			$('#home-container').css('height', windowHeight);
			$('#stroke').css('height','10px');
			$('#home-container').css('zIndex','0');
			}
		});

//secktion 
	controller.addTween('#brodrost', TweenMax.fromTo($('#brodrost'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( -10deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#dammsugare', TweenMax.fromTo($('#dammsugare'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 20deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#elvisp', TweenMax.fromTo($('#elvisp'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 10deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#kaffekokare', TweenMax.fromTo($('#kaffekokare'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 0deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#PC', TweenMax.fromTo($('#PC'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 0deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#X-box', TweenMax.fromTo($('#X-box'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( -10deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#TV', TweenMax.fromTo($('#TV'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 12deg)'}, ease:Bounce.easeOut}),scrollDuration);
	
	/*var dammsugare = getOffset( document.getElementById('dammsugare')).top - windowHeightSplit;
	var elvisp = getOffset( document.getElementById('elvisp')).top - windowHeightSplit;
	var kaffekokare = getOffset( document.getElementById('kaffekokare')).top - windowHeightSplit;
	var PC = getOffset( document.getElementById('PC')).top - windowHeightSplit;
	var X_box = getOffset( document.getElementById('X-box')).top - windowHeightSplit;
	var TV = getOffset( document.getElementById('TV')).top - windowHeightSplit;*/


	});