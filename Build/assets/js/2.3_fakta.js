var getOffset = function(el) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
};

$(document).ready(function() {

	var controller = $.superscrollorama();
	var scrollDuration = 100;
	var windowHeightSplit = $(window).height() / 2;

	// TOGGLE CAR FIXED/HIDDEN
	var hus1 = document.getElementById('hus-1');
	var carIsVisible = true;
	var fixedCar = $('#bil-bla');
	var houseBox = $('#hus-box');
	$(window).on('scroll', function() { 
		var elOffTop = hus1.getBoundingClientRect().top;
		if (carIsVisible && elOffTop < 100) {
			fixedCar.css('display', 'none');
			houseBox.addClass('lights');
			carIsVisible = false;
		} else if (!carIsVisible && elOffTop > 100) {
			fixedCar.css('display', 'block');
			houseBox.removeClass('lights');
			carIsVisible = true;
		}
	});

	var matavfallspase_container_img = TweenMax.to($('#matavfallspase-container img'), 1, {css:{width: 100}, ease:Expo.easeIn}, scrollDuration);
	var matavfallspase_container = TweenMax.to($('#matavfallspase-container'), 1, {css:{width: 300, marginTop: '+=20px'}, ease:Expo.easeIn}, scrollDuration);

	var bil = TweenMax.to($('#bil-bla'), 1.2,
		{css:{opacity: 1},
		onComplete: function(){
			$('#gas-to-food #skylt-10').css('display', 'block');
		}, onReverseComplete: function(){
			$('#gas-to-food #skylt-10').css('display', 'none');
		}, ease:Expo.easeIn}, scrollDuration);

	var text1Out = TweenMax.to($('#fakta2-2 #text-1'), 1, {css: {opacity: 0}, ease:Expo.easeInOut}, scrollDuration);

	var bil_scale = TweenMax.to($('#bil-bla'), 1.2, {css:{transform: 'scale(.4)'}, ease:Expo.easeIn}, scrollDuration);
	var matavfallspase_container_img_opacity = TweenMax.to($('#matavfallspase-container img'), 0.5, {css:{opacity: 0}, ease:Expo.easeIn}, scrollDuration);
	var bil_bla_aker = TweenMax.to($('#bil-bla'), 2, {css: {position: 'fixed' ,marginTop: - (windowHeightSplit + 100), marginLeft:-60}, ease:Expo.easeInOut}, scrollDuration , 250);
	var vag = TweenMax.to($('#vag'), 1.2, {css:{opacity: 1}, ease:Expo.easeIn}, scrollDuration);

	controller.addTween("#text-godsel", TweenMax.to($('#biogasgodsel_tank'), 10, {css: {top: '2460px', opacity: 0}, ease:Expo.easeInOut}), 1400);
	
	controller.addTween('#vete-holder-1', TweenMax.fromTo($('#vete-holder-1'), 1, {css: {opacity: 1, transform: 'rotateX(-100deg)' }},  {css: {opacity: 1, transform: 'rotateX(0deg)' }, ease:Back.easeOut}), scrollDuration, 50 );
	controller.addTween('#vete-holder-2', TweenMax.fromTo($('#vete-holder-2'), 1, {css: {opacity: 1, transform: 'rotateX(-100deg)' }},  {css: {opacity: 1, transform: 'rotateX(0deg)' }, ease:Back.easeOut}), scrollDuration, 50 );
	controller.addTween('#vete-holder-3', TweenMax.fromTo($('#vete-holder-3, #vete-holder-4, #vete-holder-5'), 1, {css: {opacity: 1, transform: 'rotateX(-100deg)' }},  {css: {opacity: 1, transform: 'rotateX(0deg)' }, ease:Back.easeOut}), scrollDuration, 50 );

	controller.addTween('#fralla-1', TweenMax.fromTo($('#fralla-1'), 1, {css: { transform: 'rotate(200deg) scale(0)'}}, {css: {transform: 'rotate(-10deg) scale(0.8)' }, ease:Back.easeOut}), scrollDuration, -100 );
	controller.addTween('#fralla-2', TweenMax.fromTo($('#fralla-2'), 1, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(25deg) scale(0.8)' }, ease:Back.easeOut}), scrollDuration ,-100);
	controller.addTween('#fralla-3', TweenMax.fromTo($('#fralla-3'), 1, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(10deg) scale(0.8)' }, ease:Back.easeOut}), scrollDuration, -100 );
	controller.addTween('#fralla-4', TweenMax.fromTo($('#fralla-4'), 1, {css: { transform: 'rotate(200deg) scale(0)'}},  {css: {transform: 'rotate(-15deg) scale(0.8)' }, ease:Back.easeOut}), scrollDuration, -100 );
	// CHANGE BG TO GREEN
	controller.addTween('#fralla-4', TweenMax.to($('#gas-to-food-container'), 0.5, {css: {backgroundColor: '#51B07A'}}), scrollDuration, -100);
	controller.addTween('#vete-holder-6', TweenMax.to($('#vete-holder-6'), 0.5, {css: {opacity: 0 }, ease:Expo.easeInOut}));
	controller.addTween('#vete-holder-7', TweenMax.to($('#vete-holder-7'), 0.5, {css: {opacity: 0 }, ease:Expo.easeInOut}));
	controller.addTween('#vete-holder-8', TweenMax.to($('#vete-holder-8'), 0.5, {css: {opacity: 0 }, ease:Expo.easeInOut}));
	controller.addTween('#vete-holder-9', TweenMax.to($('#vete-holder-9'), 0.5, {css: {opacity: 0 }, ease:Expo.easeInOut}));

	controller.pin($('#matavfallspasar'), 1500, {
		anim: (new TimelineLite())
			.add(text1Out)
			.add([matavfallspase_container_img, bil, matavfallspase_container])
			.add([matavfallspase_container_img_opacity, bil_scale, bil_bla_aker, vag])
		});

	//sektion EL
	controller.addTween('#brodrost', TweenMax.fromTo($('#brodrost'), 0.6, {css:{transform: 'scale(0) rotate(75deg)'}}, {css:{transform: 'scale(1) rotate( -10deg)'}, ease:Back.easeOut}),scrollDuration);
	controller.addTween('#dammsugare', TweenMax.fromTo($('#dammsugare'), 0.6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 20deg)'}, ease:Back.easeOut}),scrollDuration);
	controller.addTween('#elvisp', TweenMax.fromTo($('#elvisp'), 0.6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 10deg)'}, ease:Back.easeOut}),scrollDuration);
	controller.addTween('#kaffekokare', TweenMax.fromTo($('#kaffekokare'), 0.6, {css:{transform: 'scale(0) rotate(75deg)'}}, {css:{transform: 'scale(1) rotate( 0deg)'}, ease:Back.easeOut}),scrollDuration);
	controller.addTween('#PC', TweenMax.fromTo($('#PC'), 0.6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 0deg)'}, ease:Back.easeOut}),scrollDuration);
	controller.addTween('#big-text', TweenMax.fromTo($('#big-text'), 0.6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 0deg)'}, ease:Back.easeOut}),scrollDuration);
	controller.addTween('#xbox', TweenMax.fromTo($('#xbox'), 0.8, {css:{transform: 'scale(0) rotate(75deg)'}}, {css:{transform: 'scale(1) rotate( -10deg)'}, ease:Back.easeOut}), scrollDuration);
	controller.addTween('#TV', TweenMax.fromTo($('#TV'), 0.6, {css:{transform: 'scale(0) rotate(-75deg)'}}, {css:{transform: 'scale(1) rotate( 12deg)'}, ease:Back.easeOut}),scrollDuration);

	//sektion Sverige
	var sverige_mat_1 = TweenMax.to($('#sverige-container #matavfallspase-1'), 0.5, {css:{transform: 'scale(0.6)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_2 = TweenMax.to($('#sverige-container #matavfallspase-2'), 0.6, {css:{transform: 'scale(0.5)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_3 = TweenMax.to($('#sverige-container #matavfallspase-3'), 0.7, {css:{transform: 'scale(0.6)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_4 = TweenMax.to($('#sverige-container #matavfallspase-4'), 0.8, {css:{transform: 'scale(0.3)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_5 = TweenMax.to($('#sverige-container #matavfallspase-5'), 0.9, {css:{transform: 'scale(0.4)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_6 = TweenMax.to($('#sverige-container #matavfallspase-6'), 1, {css:{transform: 'scale(0.7)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_7 = TweenMax.to($('#sverige-container #matavfallspase-7'), 0.5, {css:{transform: 'scale(0.6)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_8 = TweenMax.to($('#sverige-container #matavfallspase-8'), 0.6, {css:{transform: 'scale(0.4)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_9 = TweenMax.to($('#sverige-container #matavfallspase-9'), 0.8, {css:{transform: 'scale(0.6)', opacity:1}, ease:Expo.easeInOut}, scrollDuration);

	var sverige_out = TweenMax.to($('#sverige-container #sverige'), 1, {css:{transform: 'scale(0)', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_1_out = TweenMax.to($('#sverige-container #matavfallspase-1'), 0.5, {css:{transform: 'scale(0)', marginLeft: '-90px', marginTop: '-40px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_2_out = TweenMax.to($('#sverige-container #matavfallspase-2'), 0.6, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_3_out = TweenMax.to($('#sverige-container #matavfallspase-3'), 0.7, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_4_out = TweenMax.to($('#sverige-container #matavfallspase-4'), 0.6, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_5_out = TweenMax.to($('#sverige-container #matavfallspase-5'), 0.7, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_6_out = TweenMax.to($('#sverige-container #matavfallspase-6'), 0.5, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_7_out = TweenMax.to($('#sverige-container #matavfallspase-7'), 0.5, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_8_out = TweenMax.to($('#sverige-container #matavfallspase-8'), 0.8, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);
	var sverige_mat_9_out = TweenMax.to($('#sverige-container #matavfallspase-9'), 0.8, {css:{transform: 'scale(0)', marginLeft: '-110px', marginTop: '-110px', opacity: 0}, ease:Expo.easeInOut}, scrollDuration);

	var sverige_text_out = TweenMax.to($('#sverige-container #text'), 0.5, {css:{opacity: 0}, ease:Expo.easeInOut, delay: 0.25}, scrollDuration);

	var bil1_in = TweenMax.to($('#sverige-container #bil-ovan-1'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut}, scrollDuration);
	var bil2_in = TweenMax.to($('#sverige-container #bil-ovan-2'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.3}, scrollDuration);
	var bil3_in = TweenMax.to($('#sverige-container #bil-ovan-3'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.2}, scrollDuration);
	var bil4_in = TweenMax.to($('#sverige-container #bil-ovan-4'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.5}, scrollDuration);
	var bil5_in = TweenMax.to($('#sverige-container #bil-ovan-5'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.4}, scrollDuration);
	var bil6_in = TweenMax.to($('#sverige-container #bil-ovan-6'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.6}, scrollDuration);
	var bil7_in = TweenMax.to($('#sverige-container #bil-ovan-7'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.7}, scrollDuration);
	var bil8_in = TweenMax.to($('#sverige-container #bil-ovan-8'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.8}, scrollDuration);
	var bil9_in = TweenMax.to($('#sverige-container #bil-ovan-9'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 1}, scrollDuration);
	var bil10_in = TweenMax.to($('#sverige-container #bil-ovan-10'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 0.9}, scrollDuration);
	var bil11_in = TweenMax.to($('#sverige-container #bil-ovan-11'), 1, {css:{bottom: '50%'}, ease:Expo.easeInOut, delay: 1.1}, scrollDuration);

	var text_bilar_in = TweenMax.to($('#sverige-container #text-bilar'), 1.5, {css:{opacity: 1}, delay: 0.5, ease:Expo.easeInOut, delay: 0.5}, scrollDuration);
	var text_bilar_out = TweenMax.to($('#sverige-container #text-bilar'), 1.5, {css:{opacity: 0}, delay: 0.5, ease:Expo.easeInOut, delay: 0.5}, scrollDuration);

	var bil1_out = TweenMax.to($('#sverige-container #bil-ovan-1'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 1.1}, scrollDuration);
	var bil2_out = TweenMax.to($('#sverige-container #bil-ovan-2'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 1}, scrollDuration);
	var bil3_out = TweenMax.to($('#sverige-container #bil-ovan-3'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.9}, scrollDuration);
	var bil4_out = TweenMax.to($('#sverige-container #bil-ovan-4'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.8}, scrollDuration);
	var bil5_out = TweenMax.to($('#sverige-container #bil-ovan-5'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.7}, scrollDuration);
	var bil6_out = TweenMax.to($('#sverige-container #bil-ovan-6'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.6}, scrollDuration);
	var bil7_out = TweenMax.to($('#sverige-container #bil-ovan-7'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.4}, scrollDuration);
	var bil8_out = TweenMax.to($('#sverige-container #bil-ovan-8'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.5}, scrollDuration);
	var bil9_out = TweenMax.to($('#sverige-container #bil-ovan-9'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.3}, scrollDuration);
	var bil10_out = TweenMax.to($('#sverige-container #bil-ovan-10'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut, delay: 0.2}, scrollDuration);
	var bil11_out = TweenMax.to($('#sverige-container #bil-ovan-11'), 1, {css:{bottom: '200%'}, ease:Expo.easeInOut}, scrollDuration);

	var text_bullar_in = TweenMax.to($('#sverige-container #text-brod'), 2, {css:{opacity: 1}, delay: 1, ease:Expo.easeInOut, delay: 0.5}, scrollDuration);

	var fralla_5 = TweenMax.to($('#fralla-5'), 1.1, {delay: 0.1, css: {marginTop: '-=200px', marginLeft: '-=200px', transform: 'rotate(125deg) scale(1)', opacity: 1}, ease: Expo.easeIn});
	var fralla_6 = TweenMax.to($('#fralla-6'), 1.1, {delay: 0.1, css: {marginTop: '-=180px', marginLeft: '+=200px', transform: 'rotate(-45deg) scale(1.2)', opacity: 1}, ease: Expo.easeIn});
	var fralla_7 = TweenMax.to($('#fralla-7'), 1.1, {delay: 0.1, css: {marginTop: '-=160px', transform: 'rotate(-170deg) scale(0.9)', opacity: 1}, ease: Expo.easeIn});

	var fralla_8 = TweenMax.to($('#fralla-8'), 1, {delay: 0.2, css: {marginTop: '+=200px', marginLeft: '+=100px', transform: 'rotate(-170deg) scale(0.9)', opacity: 1}, ease: Expo.easeIn});
	var fralla_9 = TweenMax.to($('#fralla-9'), 0.4, {delay: 0.8, css: {marginTop: '+=160px', marginLeft: '-=50px', transform: 'rotate(230deg) scale(1.1)', opacity: 1}, ease: Expo.easeIn});
	var fralla_10 = TweenMax.to($('#fralla-10'), 1, {delay: 0.2, css: {marginTop: '+=40px', marginLeft: '-=150px', transform: 'rotate(20deg) scale(1.2)', opacity: 1}, ease: Expo.easeIn});

	var fralla_11 = TweenMax.to($('#fralla-11'), 1, {delay: 0.2, css: {marginTop: '-=90px', marginLeft: '-=100px', transform: 'rotate(-80deg) scale(0.6)', opacity: 1}, ease: Expo.easeIn});
	var fralla_12 = TweenMax.to($('#fralla-12'), 0.6, {delay: 0.6, css: {marginTop: '-=90px', marginLeft: '-=240px', transform: 'rotate(30deg) scale(0.75)', opacity: 1}, ease: Expo.easeIn});
	var fralla_13 = TweenMax.to($('#fralla-13'), 1.1, {delay: 0.1, css: {marginTop: '+=160px', marginLeft: '+=220px', transform: 'rotate(-30deg) scale(0.8)', opacity: 1}, ease: Expo.easeIn});

	var fralla_14 = TweenMax.to($('#fralla-14'), 1.1, {delay: 0.1, css: {marginTop: '+=280px', marginLeft: '+=20px', transform: 'rotate(150deg) scale(0.8)', opacity: 1}, ease: Expo.easeIn});
	var fralla_15 = TweenMax.to($('#fralla-15'), 1.2, {css: {marginTop: '-=120px', marginLeft: '+=110px', transform: 'rotate(150deg) scale(0.8)', opacity: 1}, ease: Expo.easeIn});
	var fralla_16 = TweenMax.to($('#fralla-16'), 1.2, {css: {marginTop: '+=210px', marginLeft: '-=210px', transform: 'rotate(-130deg) scale(0.9)', opacity: 1}, ease: Expo.easeIn});

	var frallhog_1 = TweenMax.to($('#frallhog-1'), 1, {delay: 0.2, css:{opacity: 1, marginTop: '-400px', marginLeft: '-130px', transform: 'rotate(178deg) scale(1)'}, ease: Expo.easeIn});
	var frallhog_2 = TweenMax.to($('#frallhog-2'), 1.2, {css:{opacity: 1, marginTop: '0px', marginLeft: '-370px', transform: 'rotate(-65deg) scale(1)'}, ease: Expo.easeIn});
	var frallhog_3 = TweenMax.to($('#frallhog-3'), 0.9, {delay: 0.3, css:{opacity: 1, marginTop: '260px', marginLeft: '-190px', transform: 'rotate(100deg) scale(1)'}, ease: Expo.easeIn});

	var text_bullar_spacer = TweenMax.to($('#sverige-container #text-brod'), 2, {css:{opacity: 1}, delay: 1, ease:Expo.easeInOut, delay: 0.5}, scrollDuration);

	controller.pin($('#sverige-container'), 3000, {
		anim: (new TimelineLite())
			.add([sverige_mat_1,sverige_mat_2,sverige_mat_3,sverige_mat_4,sverige_mat_5,sverige_mat_6,sverige_mat_7,sverige_mat_8,sverige_mat_9])
			.add([sverige_out, sverige_mat_1_out, sverige_mat_2_out, sverige_mat_3_out, sverige_mat_4_out, sverige_mat_5_out, sverige_mat_6_out, sverige_mat_7_out, sverige_mat_8_out, sverige_mat_9_out, sverige_text_out])
			.add([bil1_in, bil2_in, bil3_in, bil4_in, bil5_in, bil6_in, bil7_in, bil8_in, bil9_in, bil10_in, bil11_in, text_bilar_in], '-=1')
			.add([bil1_out, bil2_out, bil3_out, bil4_out, bil5_out, bil6_out, bil7_out, bil8_out, bil9_out, bil10_out, bil11_out, text_bilar_out, text_bullar_in], '+=4')
			.add([fralla_5, fralla_6, fralla_7, fralla_8, fralla_9, fralla_10, fralla_11, fralla_12, fralla_13, fralla_14, fralla_15, fralla_16, frallhog_1, frallhog_2, frallhog_3], '-=1')
			.add(text_bullar_spacer)
		});

});
