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
var windowHeight;

$(document).ready(function() {
 	windowHeight = $(window).height() / 2;
	$('#stage-1').css('height', windowHeight * 2);


var kycklingklubba = getOffset( document.getElementById('kycklingklubba')).top - windowHeight;
var bananskal = getOffset( document.getElementById('bananskal')).top - windowHeight;
var appelskrutt = getOffset( document.getElementById('appelskrutt')).top - windowHeight;
var fiskben = getOffset( document.getElementById('fiskben')).top - windowHeight;
var grapefrukt = getOffset( document.getElementById('grapefrukt')).top - windowHeight;
var pasta = getOffset (document.getElementById('pasta')).top - windowHeight;
var ostmacka = getOffset (document.getElementById('ostmacka')).top - windowHeight;
var aggskal = getOffset( document.getElementById('aggskal')).top - windowHeight; 
var pasta = getOffset( document.getElementById('pasta')).top - windowHeight;
var mussla = getOffset( document.getElementById('mussla')).top - windowHeight; 

var tomathalva = getOffset( document.getElementById('tomathalva')).top - windowHeight;
var rakskal = getOffset( document.getElementById('rakskal')).top - windowHeight; 

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

	var widthOffset = $(window).width() / 2 + 100;

	var handplocka_step_1 = TweenMax.to($('#hand-plocka'), 5, {css:{right:  '+=' + widthOffset}, ease:Expo.easeOut});
	var handplocka_step_2 = TweenMax.to($('#basket-1'), 5, {css:{left: '+=' + widthOffset}, ease:Expo.easeOut});
	var handplocka_step_3 = TweenMax.to($('#hallare'), 3, {css:{top:'+=800', opacity: 0}, ease:Expo.easeIn});
	var handplocka_step_4 = TweenMax.to($('#hand-plocka'), 5, {css:{right: '-968' }, ease:Expo.easeOut});
	var handplocka_step_5 = TweenMax.to($('#hallare-bak'), 3, {css:{top:'+=800', opacity: 0}, ease:Expo.easeIn});

	controller.pin($('#stage-1'), 3000, {
		anim: (new TimelineLite())
		.add(handplocka_step_1)
		.add([handplocka_step_3, handplocka_step_5])
		.add([handplocka_step_2, handplocka_step_4]),
		onPin: function() {
			$('#stage-1').addClass('active-stage');
			$('#basket').hide();
		},
		onUnpin: function() {
			$('#stage-1').removeClass('active-stage');
			$('#basket').show();
		}
	});
});


$(window).scroll(function() {
    if ($(this).scrollTop() > 150) { 
       $("#basket").css({ "position": "fixed", "top": windowHeight - 131, "opacity": "1",  "left":"50%", "margin-left":"-85px"}); 
    } 
    if ($(this).scrollTop() > 5000) { 
       $("#basket").css("position", "relative" ); 
    }
});
