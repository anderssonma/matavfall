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
	var matavfallspase_container = TweenMax.to($('#matavfallspase-container'), 1, {css:{width: 300, marginTop: '-=50px'}, ease:Expo.easeIn}, scrollDuration);

	var bil = TweenMax.to($('#bil-bla'), 1.2,
		{css:{opacity: 1},
		onComplete: function(){
			$('#gas-to-food #skylt-10').css('display', 'block');
		}, onReverseComplete: function(){
			$('#gas-to-food #skylt-10').css('display', 'none');
		}, ease:Expo.easeIn}, scrollDuration);

	var bil_scale = TweenMax.to($('#bil-bla'), 1.2, {css:{transform: 'scale(.4)'}, ease:Expo.easeIn}, scrollDuration);
	var matavfallspase_container_img_opacity = TweenMax.to($('#matavfallspase-container img'), .5, {css:{opacity: 0}, ease:Expo.easeIn}, scrollDuration);
	var bil_bla_aker = TweenMax.to($('#bil-bla'), 2, {css: {position: 'fixed' ,marginTop: - (windowHeightSplit + 100), marginLeft:-60}, ease:Expo.easeInOut}, scrollDuration , 250);
	var vag = TweenMax.to($('#vag'), 1.2, {css:{opacity: 1}, ease:Expo.easeIn}, scrollDuration);

	controller.addTween("#text-godsel", TweenMax.to($('#biogasgodsel_tank'), 10, {css: {top: '2460px' }, ease:Expo.easeInOut}), 1400);
	controller.addTween('#vete-holder-1', TweenMax.fromTo($('#vete-holder-1 , #vete-holder-2 , #vete-holder-3,  #vete-holder-4,  #vete-holder-5'), 1, {css: {opacity: 1, transform: 'rotateX(-100deg)' }},  {css: {opacity: 1, transform: 'rotateX(0deg)' }, ease:Bounce.easeOut}), scrollDuration, 50 );
	controller.addTween('#fralla-1', TweenMax.fromTo($('#fralla-1'), 2, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(-10deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration, -100 );
	controller.addTween('#fralla-2', TweenMax.fromTo($('#fralla-2'), 2, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(25deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration ,-100);
	controller.addTween('#fralla-3', TweenMax.fromTo($('#fralla-3'), 1, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(10deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration, -100 );
	controller.addTween('#fralla-4', TweenMax.fromTo($('#fralla-4'), 1, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(-15deg) scale(1)' }, ease:Bounce.easeOut}), scrollDuration, -100 );
	controller.addTween('#vete-holder-6', TweenMax.to($('#vete-holder-6'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));
	controller.addTween('#vete-holder-7', TweenMax.to($('#vete-holder-7'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));
	controller.addTween('#vete-holder-8', TweenMax.to($('#vete-holder-8'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));
	controller.addTween('#vete-holder-9', TweenMax.to($('#vete-holder-9'), .5, {css: {opacity: 0 }, ease:Expo.easeInOut}));

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

	controller.pin($('#home-container'), 1500, {
		anim: (new TimelineLite())
		.add([hus_1, stroke, bil_bort, hus_blir_storre]),
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

//secktion EL

	controller.addTween('#brodrost', TweenMax.fromTo($('#brodrost'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( -10deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#dammsugare', TweenMax.fromTo($('#dammsugare'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 20deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#elvisp', TweenMax.fromTo($('#elvisp'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 10deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#kaffekokare', TweenMax.fromTo($('#kaffekokare'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 0deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#PC', TweenMax.fromTo($('#PC'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 0deg)'}, ease:Bounce.easeOut}),scrollDuration);
	controller.addTween('#xbox', TweenMax.fromTo($('#xbox'), .8, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( -10deg)'}, ease:Bounce.easeOut}), scrollDuration);
	controller.addTween('#TV', TweenMax.fromTo($('#TV'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 12deg)'}, ease:Bounce.easeOut}),scrollDuration);

//secktion Sverige
	var sverige_mat_1 = TweenMax.to($('#sverige-container #matavfallspase-1'), .5, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_2 = TweenMax.to($('#sverige-container #matavfallspase-2'), .6, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_3 = TweenMax.to($('#sverige-container #matavfallspase-3'), .7, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_4 = TweenMax.to($('#sverige-container #matavfallspase-4'), .8, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_5 = TweenMax.to($('#sverige-container #matavfallspase-5'), .9, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_6 = TweenMax.to($('#sverige-container #matavfallspase-6'), 1, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_7 = TweenMax.to($('#sverige-container #matavfallspase-7'), .5, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_8 = TweenMax.to($('#sverige-container #matavfallspase-8'), .6, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var sverige_mat_9 = TweenMax.to($('#sverige-container #matavfallspase-9'), .8, {css:{transform: 'scale(1)'}, ease:Expo.easeInOut}, scrollDuration)
	var ta_bort_mat = TweenMax.to($('#sverige-container #matavfallspase-9, #sverige-container #matavfallspase-8 '), .1, {css:{opacity: 0}, ease:Expo.easeInOut}, scrollDuration)
	var bilar = TweenMax.to($('#sverige-container #bilar-container'), 2, {css:{marginLeft: 0}, ease:Expo.easeInOut}, 500)
	var bullar = TweenMax.to($('#sverige-container #bullar-container'), 2, {css:{opacity: 1}, ease:Expo.easeInOut}, scrollDuration)
	var fralla_5 = TweenMax.fromTo($('#fralla-5, #fralla-10, #fralla-14, #fralla-16, #fralla-21, #fralla-30'), .6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 10deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_6 = TweenMax.fromTo($('#fralla-6, #fralla-11'), .6, {css:{transform: 'scale(0) rotate(-15deg)'}}, {css:{transform: 'scale(1) rotate( -40deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_7 = TweenMax.fromTo($('#fralla-7, #fralla-17, #fralla-12, #fralla-23'), .6, {css:{transform: 'scale(0) rotate(-15deg)'}}, {css:{transform: 'scale(1.3) rotate( -60deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_8 = TweenMax.fromTo($('#fralla-8, #fralla-20, #fralla-24'), .6, {css:{transform: 'scale(0) rotate(-15deg)'}}, {css:{transform: 'scale(1.1) rotate( 20deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_9 = TweenMax.fromTo($('#fralla-9, #fralla-13, #fralla-18, #fralla-32'), .6, {css:{transform: 'scale(0) rotate(-15deg)'}}, {css:{transform: 'scale(1) rotate( -5deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_10 = TweenMax.fromTo($('#fralla-15'), .6, {css:{transform: 'scale(0) rotate(-15deg)'}}, {css:{transform: 'scale(1) rotate( 45deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_11 = TweenMax.fromTo($('#fralla-19, #fralla-22, #fralla-25, #fralla-26, #fralla-27, #fralla-28, #fralla-29, #fralla-31'), .6, {css:{transform: 'scale(0) rotate(-15deg)'}}, {css:{transform: 'scale(1) rotate( 95deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_12 = TweenMax.fromTo($('#fralla-21'), .6, {css:{transform: 'scale(0) rotate(-15deg)'}}, {css:{transform: 'scale(1) rotate( 173deg)'}, ease:Bounce.easeOut},scrollDuration)
	var fralla_text = TweenMax.fromTo($('#fakta2-2 #sverige-container #bullar-container #text h2'), 1, {css:{fontSize:20, opacity: 0}}, {css:{fontSize:100, opacity: 1}, ease:Expo.easeOut},scrollDuration)
	controller.pin($('#sverige-container'), 1500, {
		anim: (new TimelineLite())
		.add([sverige_mat_1,sverige_mat_2,sverige_mat_3,sverige_mat_4,sverige_mat_5,sverige_mat_6,sverige_mat_7,sverige_mat_8,sverige_mat_9])
		.add(bilar)
		.add(bullar)
		.add([fralla_5, fralla_6, fralla_7, fralla_8, fralla_9, fralla_10, fralla_11, fralla_12])
		.add([ta_bort_mat, fralla_text]),
		onPin: function() {
			$('#sverige-container').css('height','100%');
		},
		onUnpin: function() {
			$('#sverige-container').css('height', windowHeight);
		}
		});
	});
