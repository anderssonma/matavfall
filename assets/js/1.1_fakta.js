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


//onComplete: function(){$('#basket').addClass('addFruits1');}, onReverseComplete: function(){$('#basket').removeClass('addFruits1');}),
var windowHeightSplit;

$(document).ready(function() {
 	windowHeightSplit = $(window).height() / 2;
	$('#stage-1').css('height', windowHeightSplit * 2);

	var kycklingklubba = getOffset( document.getElementById('kycklingklubba')).top - windowHeightSplit;
	var bananskal = getOffset( document.getElementById('bananskal')).top - windowHeightSplit;
	var appelskrutt = getOffset( document.getElementById('appelskrutt')).top - windowHeightSplit;
	var fiskben = getOffset( document.getElementById('fiskben')).top - windowHeightSplit;
	var grapefrukt = getOffset( document.getElementById('grapefrukt')).top - windowHeightSplit;
	var pasta = getOffset (document.getElementById('pasta')).top - windowHeightSplit;
	var ostmacka = getOffset (document.getElementById('ostmacka')).top - windowHeightSplit;
	var aggskal = getOffset( document.getElementById('aggskal')).top - windowHeightSplit; 
	var pasta = getOffset( document.getElementById('pasta')).top - windowHeightSplit;
	var mussla = getOffset( document.getElementById('mussla')).top - windowHeightSplit; 

	var drain_paper = getOffset( document.getElementById('drain-paper')).top - windowHeightSplit; 

	var tomathalva = getOffset( document.getElementById('tomathalva')).top - windowHeightSplit;
	var rakskal = getOffset( document.getElementById('rakskal')).top - windowHeightSplit;
	var vaskskrapa_fylld = getOffset( document.getElementById('vaskskrapa-fylld')).top - windowHeightSplit; 

	var widthOffset = $(window).width() / 2 + 100;

	var controller = $.superscrollorama();
	var scrollDuration = 500; 

	controller.addTween(kycklingklubba, TweenMax.to($('#kycklingklubba'), 2 , {bezier:{curviness:1, values:[ {x:'-=300', y:'0'}, {x:'-330', y:'+=400'}], autoRotate:233}, onComplete: function(){$('#basket').addClass('addFruits0');}, ease:Power4.easeIn}) , scrollDuration , 0);
	controller.addTween(kycklingklubba, TweenMax.to($('#kycklingklubba'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 250);
	controller.addTween(kycklingklubba, TweenMax.to($('#kycklingklubba'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits0');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(bananskal, TweenMax.to($('#bananskal'), 2 , {bezier:{curviness:1, values:[ {x:'+=280', y:'0'}, {x:'400', y:'+=400'}], autoRotate:true}, onComplete: function(){$('#basket').addClass('addFruits1');}, ease:Power3.easeIn}) , scrollDuration , 0);
	controller.addTween(bananskal, TweenMax.to($('#bananskal'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 200);
	controller.addTween(bananskal, TweenMax.to($('#bananskal'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits1');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(fiskben, TweenMax.to($('#fiskben'), 2 , {bezier:{curviness:1, values:[ {x:'-=300', y:'0'}, {x:'-530', y:'+=400'}], autoRotate:180}, onComplete: function(){$('#basket').addClass('addFruits2');}, ease:Power4.easeIn}), scrollDuration , -50);
	controller.addTween(fiskben, TweenMax.to($('#fiskben'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 150);
	controller.addTween(fiskben, TweenMax.to($('#fiskben'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits2');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(appelskrutt, TweenMax.to($('#appelskrutt'), 2 , {bezier:{curviness:1, values:[ {x:'-=200', y:'0'}, {x:'-230', y:'+=400'}], autoRotate:180}, onComplete: function(){$('#basket').addClass('addFruits3');}, ease:Power4.easeIn}) , scrollDuration , -50);
	controller.addTween(appelskrutt, TweenMax.to($('#appelskrutt'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 150);
	controller.addTween(appelskrutt, TweenMax.to($('#appelskrutt'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits3');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(grapefrukt, TweenMax.to($('#grapefrukt'), 2 , {bezier:{curviness:1, values:[ {x:'-=500', y:'0'}, {x:'-680', y:'+=350'}], autoRotate:180}, onComplete: function(){$('#basket').addClass('addFruits4');}, ease:Power4.easeIn}) , scrollDuration , -50);
	controller.addTween(grapefrukt, TweenMax.to($('#grapefrukt'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 250);
	controller.addTween(grapefrukt, TweenMax.to($('#grapefrukt'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits4');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(pasta, TweenMax.to($('#pasta'), 2 , {bezier:{curviness:1, values:[ {x:'+=500', y:'0'}, {x:'800', y:'+=500'}], autoRotate:true,}, onComplete: function(){$('#basket').addClass('addFruits5');}, ease:Power3.easeIn}) , scrollDuration , 0);
	controller.addTween(pasta, TweenMax.to($('#pasta'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 200);
	controller.addTween(pasta, TweenMax.to($('#pasta'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits5');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(ostmacka, TweenMax.to($('#ostmacka'), 2 , {bezier:{curviness:1, values:[ {x:'+=180', y:'0'}, {x:'300', y:'+=400'}], autoRotate:true}, onComplete: function(){$('#basket').addClass('addFruits6');}, ease:Power3.easeIn}) , scrollDuration , 0);
	controller.addTween(ostmacka, TweenMax.to($('#ostmacka'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 200);
	controller.addTween(ostmacka, TweenMax.to($('#ostmacka'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits6');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(aggskal, TweenMax.to($('#aggskal'), 2 , {bezier:{curviness:1, values:[ {x:'-=300', y:'0'}, {x:'-400', y:'+=400'}], autoRotate:180}, ease:Power4.easeIn}) , scrollDuration , -50);
	controller.addTween(aggskal, TweenMax.to($('#aggskal'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 200);

	controller.addTween(mussla, TweenMax.to($('#mussla'), 2 , {bezier:{curviness:1, values:[ {x:'-=300', y:'0'}, {x:'-400', y:'+=400'}], autoRotate:180}, onComplete: function(){$('#basket').addClass('addFruits7');}, ease:Power4.easeIn}) , scrollDuration , -50);
	controller.addTween(mussla, TweenMax.to($('#mussla'), 3, {css: {opacity:0}, ease:Expo.easeInOut}), scrollDuration , 120);
	controller.addTween(mussla, TweenMax.to($('#mussla'), .1, {css: {}, onReverseComplete: function(){$('#basket').removeClass('addFruits7');}, ease:Expo.easeInOut}), scrollDuration , 500);

	controller.addTween(drain_paper, TweenMax.to($('#drain-paper'), .1, {onComplete: function(){$('#basket').addClass('hello');}, ease:Expo.easeInOut}), scrollDuration , -600);
	controller.addTween(drain_paper, TweenMax.to($('#drain-paper'), .1, {onReverseComplete: function(){$('#basket').removeClass('hello');}, ease:Expo.easeInOut}), scrollDuration , 100);

	controller.addTween(vaskskrapa_fylld, TweenMax.to($('#vaskskrapa-fylld'), 1 , {css:{right:	'+=' + (widthOffset - 300)}, ease:Power4.easeIn}) , scrollDuration, -400);


	var bananfluga = TweenMax.to($('#bananfluga, #bananfluga-1, #bananfluga-2, #bananfluga-3, #bananfluga-4, #bananfluga-5'), 1, {css:{opacity: 1}, ease:Expo.easeOut});
	var handplocka_step_1 = TweenMax.to($('#hand-plocka'), 5, {css:{right:	'+=' + widthOffset}, ease:Expo.easeOut});
	var basket_1 = TweenMax.to($('#basket-1'), 1, {css:{display:'none'}, ease:Expo.easeOut});
	var basket_vikt = TweenMax.to($('#basket-vikt'), 5, {css:{left: '+=' + widthOffset}, ease:Expo.easeOut});
	var basket_vikt_1 = TweenMax.to($('#basket-vikt'), 5, {css:{opacity: 1}, ease:Expo.easeOut});
	var handplocka_step_3 = TweenMax.to($('#hallare'), 3, {css:{top:'+=800', opacity: 0}, ease:Expo.easeIn});
	var handplocka_step_4 = TweenMax.to($('#hand-plocka'), 5, {css:{right: '-968'}, ease:Expo.easeOut});
	var handplocka_step_5 = TweenMax.to($('#hallare-bak'), 3, {css:{top:'+=800', opacity: 0}, ease:Expo.easeIn});

	controller.pin($('#stage-1'), 3000, {
		anim: (new TimelineLite())
		.add(bananfluga)
		.add(handplocka_step_1)
		.add([handplocka_step_3, basket_1, basket_vikt_1, handplocka_step_5])
		.add([basket_vikt, handplocka_step_4]),
		onPin: function() {
			$('#stage-1').addClass('active-stage');
			$('#basket').hide();
		},
		onUnpin: function() {
			$('#stage-1').removeClass('active-stage');
			$('#basket').show();
		}
	});

	var basketIsFixed = false; // DONT WANT TO REPEATEDLY UPDATE INLINE STYLES
	var $window = $(window); // CACHE WINDOW
	$window.on('scroll', function() {
		var pixelsFromTop = $window.scrollTop();
		if (pixelsFromTop > 10 && pixelsFromTop < 5000 && !basketIsFixed) {
			$("#basket").css({ "position": "fixed", "top": windowHeightSplit - 131, "opacity": "1",	"left":"50%", "margin-left":"-85px"}); 
			basketIsFixed = true;
		}
		if (pixelsFromTop > 5000 && basketIsFixed || pixelsFromTop < 10 && basketIsFixed) {
			$("#basket").css("position", "relative" ); 
			basketIsFixed = false;
		}
	});
	$window.trigger('scroll'); // TRIGGER ONCE TO MAKE SURE BASKET IS VISIBLE

});