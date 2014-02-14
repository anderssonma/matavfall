$(document).ready(function() {

	var controller = $.superscrollorama();

	var scrollDuration = 200; 
	
	controller.addTween('#intro-fridge', TweenMax.to($('#intro-fridge'), .1, { onComplete: function(){$('#tarmometer-container').addClass('active');}, onReverseComplete: function(){$('#tarmometer-container').removeClass('active');},  ease:Expo.easeInOut}), scrollDuration , -200);


	controller.addTween('#text-block-1', TweenMax.to($('#text-block-1'), 2, {css:{opacity: 0}, ease:Power3.easeOut}), scrollDuration, 100);
	controller.addTween('#text-block-1', TweenMax.to($('#text-block-1'), .1, {css: {}, onComplete: function(){$('#stroke').addClass('step-1'), $('#cirkel').addClass('step-1');}, onReverseComplete: function(){$('#stroke').removeClass('step-1'), $('#cirkel').removeClass('step-1');} , ease:Expo.easeInOut}), scrollDuration , 100);

	controller.addTween('#text-block-2', TweenMax.to($('#text-block-2'), 2, {css:{opacity: 0}, ease:Power3.easeOut}), scrollDuration, 100);
	controller.addTween('#text-block-2', TweenMax.to($('#text-block-2'), .1, {css: {}, onComplete: function(){$('#stroke').addClass('step-2');}, onReverseComplete: function(){$('#stroke').removeClass('step-2');}, ease:Expo.easeInOut}), scrollDuration , 100);

	controller.addTween('#text-block-3', TweenMax.to($('#text-block-3'), 2, {css:{opacity: 0}, ease:Power3.easeOut}), scrollDuration, 100);
	controller.addTween('#text-block-3', TweenMax.to($('#text-block-3'), .1, {css: {}, onComplete: function(){$('#stroke').addClass('step-3');}, onReverseComplete: function(){$('#stroke').removeClass('step-3');}, ease:Expo.easeInOut}), scrollDuration , 100);

	controller.addTween('#text-block-4', TweenMax.to($('#text-block-4'), 2, {css:{opacity: 0}, ease:Power3.easeOut}), scrollDuration, 100);
	controller.addTween('#text-block-4', TweenMax.to($('#text-block-4'), .1, {css: {}, onComplete: function(){$('#stroke').addClass('step-4');}, onReverseComplete: function(){$('#stroke').removeClass('step-4');}, ease:Expo.easeInOut}), scrollDuration , 100);

	controller.addTween('#fryspase-kotlett', TweenMax.fromTo( $('#fryspase-kotlett'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(-70deg)' }, ease:Quad.easeInOut}), scrollDuration , -100);
	controller.addTween('#fryspase-rakor', TweenMax.fromTo( $('#fryspase-rakor'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(-170deg)' }, ease:Quad.easeInOut}) , scrollDuration , -100);

	controller.addTween('#mjolk', TweenMax.fromTo( $('#mjolk'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}), scrollDuration , -100);
	controller.addTween('#korv', TweenMax.fromTo( $('#korv'), .25, {css:{opacity:1, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(-170deg)' }, ease:Quad.easeInOut}) , scrollDuration , -100);
	controller.addTween('#morot', TweenMax.fromTo( $('#morot'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}) , scrollDuration , -100);
	controller.addTween('#fisk-hel', TweenMax.fromTo( $('#fisk-hel'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(-20deg)' }, ease:Quad.easeInOut}) , scrollDuration , -100);
	
	controller.addTween('#rodlok', TweenMax.fromTo( $('#rodlok'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(20deg)' }, ease:Quad.easeInOut}), scrollDuration , -200);
	controller.addTween('#creme-fraiche', TweenMax.fromTo( $('#creme-fraiche'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}), scrollDuration , -250);
	controller.addTween('#apple', TweenMax.fromTo( $('#apple'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}), scrollDuration , -200);
	controller.addTween('#kotlett', TweenMax.fromTo( $('#kotlett'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}), scrollDuration , -200);
	
	controller.addTween('#lime', TweenMax.fromTo( $('#lime'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}), scrollDuration , -100);
	controller.addTween('#avokado', TweenMax.fromTo( $('#avokado'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}), scrollDuration , -50);
	controller.addTween('#aubergine', TweenMax.fromTo( $('#aubergine'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(70deg)' }, ease:Quad.easeInOut}) , scrollDuration , -50);

	controller.addTween('#banan', TweenMax.fromTo( $('#banan'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(50deg)' }, ease:Quad.easeInOut}), scrollDuration , -150);
	controller.addTween('#citron', TweenMax.fromTo( $('#citron'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, ease:Quad.easeInOut}), scrollDuration , -150);
	controller.addTween('#gurka', TweenMax.fromTo( $('#gurka'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1) rotate(40deg)' }, ease:Quad.easeInOut}) , scrollDuration , -150);
	controller.addTween('#tomat', TweenMax.fromTo( $('#tomat'), .25, {css:{opacity:0, transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{opacity:1, transform: 'scale(1)' }, onComplete: function(){$('#tarmometer-container').removeClass('active');}, ease:Quad.easeInOut}) , scrollDuration , -150);
	controller.addTween('#tomat', TweenMax.to($('#tomat'), .1, { onReverseComplete: function(){$('#tarmometer-container').addClass('active');},  ease:Expo.easeInOut}), scrollDuration , 300);
});