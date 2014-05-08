$(document).ready(function() {

 	var windowHeightSplit = $(window).height() / 2;
	$('#stage-2').css('height', windowHeightSplit * 2);

	var widthOffset = $(window).width() / 2 + 100;

	var controller = $.superscrollorama();
	var scrollDuration = 500; 
	
	var handplocka_step_1 = TweenMax.to($('#hand-plocka'), 5, {css:{left: '+=' + widthOffset}, ease:Expo.easeOut});
	var basket_vikt = TweenMax.to($('#basket-vikt'), 5, {css:{left: '+=' + widthOffset}, ease:Expo.easeOut});
	var matavfallstunna_container = TweenMax.fromTo($('#matavfallstunna-container'), 5, {css:{left: (widthOffset - 200) , top: $(window).height()}, immediateRender:true, ease:Expo.easeIn}, {css:{top: (windowHeightSplit - 300)}, ease:Expo.easeOut});
	var matavfallstunna_lock = TweenMax.to($('#matavfallstunna-lock'), 6, {css:{transform: 'rotate(50deg)'}, ease:Power3.easeOut});
	
	var handplocka_step_2 = TweenMax.to($('#hand-plocka'), 5, {css:{left: '-1521'}, ease:Expo.easeOut});
	var basket_vikt_1 = TweenMax.to($('#basket-vikt'), 1, {css:{opacity: 0}, ease:Expo.easeOut});

	var matavfallstunna_lock_1 = TweenMax.to($('#matavfallstunna-lock'), 3, {css:{transform: 'rotate(-42deg)', top: - 40}, ease:Power3.easeOut});
	var matavfallstunna = TweenMax.to($('#matavfallstunna'), 6, {css:{top : 10}, ease:Expo.easeOut});

	var matavfallstunna_container_1 = TweenMax.to($('#matavfallstunna-container'), 5, {css:{left: 250, width: 60, top:'+=290', marginTop:0}, ease:Expo.easeOut});
	var avfallsbil = TweenMax.to($('#avfallsbil'), 5, {css:{left: '+=' + (widthOffset + 150) }, ease:Expo.easeOut});
	
	var matavfallstunna_container_2 = TweenMax.to($('#matavfallstunna-container'), 6, {css:{transform: 'rotate(50deg)', left: '+=40'}, ease:Power3.easeOut});
	var matavfallstunna_lock_2 = TweenMax.to($('#matavfallstunna-lock'), 6, {css:{transform: 'rotate(50deg)'}, ease:Power3.easeOut});

	var matavfallstunna_container_3 = TweenMax.to($('#matavfallstunna-container'), 6, {css:{transform: 'rotate(-20deg)', left: '-=300', opacity: 0 }, ease:Power3.easeOut});
	var avfallsbil_1 = TweenMax.to($('#avfallsbil'), 5, {css:{top: 220, width: '-=300', left: 240}, ease:Expo.easeOut});
	var vagbana = TweenMax.to($('#vagbana-container'), 5, {css:{opacity: 1}, ease:Expo.easeOut});
	var avfallsbil_2 = TweenMax.to($('#avfallsbil'), 5, {css:{left: '+=840'}, ease:Expo.easeOut});
	var avfallsbil_3 = TweenMax.to($('#avfallsbil'), 10, {bezier:{curviness:1, values:[{x:'+=0', y:'+=0'}, {x:'+=250', y:'+=70'} , {x:'+=250', y:'+=400'} , {x:'-=350', y:'+=490'}] , autoRotate:0}, ease: Linear.ease});
	var avfallsbil_4 = TweenMax.to($('#avfallsbil'), 10, {bezier:{curviness:1, values:[{x:'+=0', y:'+=0'}, {x:'-=250', y:'+=40'} , {x:'-=250', y:'+=200'} , {x:'+=50', y:'+=260'},  {x:'+=140', y:'+=460'}, {x:'+=140', y:'+=650'}] , autoRotate:0}, ease: Linear.ease});
	var avfallsbil_5 = TweenMax.to($('#avfallsbil'), 1, {css:{opacity: 0}, ease:Expo.easeOut});
	
	var vagbana_flytta_up = TweenMax.to($('#vagbana-container'), 5, {css:{top:'-=500'}, ease:Expo.easeOut});
	var avfallsbil_flytta_up = TweenMax.to($('#avfallsbil'), 5, {css:{top:'-=500'}, ease:Expo.easeOut});
	var vagbana_flytta_up_1 = TweenMax.to($('#vagbana-container'), 5, {css:{top:'-=500'}, ease:Expo.easeOut});
	var avfallsbil_flytta_up_1 = TweenMax.to($('#avfallsbil'), 5, {css:{top:'-=500'}, ease:Expo.easeOut});
	var forbehandlingsandlagning = TweenMax.to($('#forbehandlingsandlagning'), 5, {css:{transform: 'scale(7)'}, ease:Power3.easeOut});
	
	var del_1 = TweenMax.fromTo($('#fakta2-1 .del-1'), 1, {css:{opacity: 0,left: (widthOffset)}, immediateRender:true, ease:Expo.easeIn}, {css:{opacity: 1 }, ease:Expo.easeOut});
	var del_1_1 = TweenMax.to($('#fakta2-1 .del-1'), 1, {css:{opacity: 0}, ease:Expo.easeOut});

	var del_2 = TweenMax.fromTo($('#fakta2-1 .del-2'), 1, {css:{opacity: 0,left: (widthOffset)}, immediateRender:true, ease:Expo.easeIn}, {css:{opacity: 1 }, ease:Expo.easeOut});
	var del_2_1 = TweenMax.to($('#fakta2-1 .del-2'), 1, {css:{opacity: 0}, ease:Expo.easeOut});

	controller.pin($('#stage-2'), 4500, {
		anim: (new TimelineLite())
			.add([handplocka_step_1, basket_vikt])
			.add([matavfallstunna_container, matavfallstunna_lock])
			.add([handplocka_step_2])
			.add(del_1)
			.add([matavfallstunna_container_1 , matavfallstunna_lock_1, matavfallstunna, basket_vikt_1])
			.add([avfallsbil, matavfallstunna_container_2, matavfallstunna_lock_2, del_1_1, del_2 ])
			.add([avfallsbil_1, matavfallstunna_container_3, vagbana, del_2_1])
			.add([avfallsbil_2])
			.add([avfallsbil_3])
			.add([avfallsbil_flytta_up, vagbana_flytta_up])
			.add([avfallsbil_4])
			.add([avfallsbil_flytta_up_1, vagbana_flytta_up_1])
			.add(avfallsbil_5)
			.add(forbehandlingsandlagning)
	});

});