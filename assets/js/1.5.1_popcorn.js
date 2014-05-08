$(document).ready(function() {

	// PART 1
	// BAG EXPLOSION
	// ======
	var controller = $.superscrollorama();

	var textOut = TweenMax.to($('#waste-header, #waste-text-1'), 1.5, {css:{opacity: 0}, ease:Expo.easeIn});

	var matkasse1Out = TweenMax.to($('#matkasse-1'), 1, {css:{opacity: 0, transform: 'scale(0)'}, ease:Expo.easeIn});
	var matkasse2Out = TweenMax.to($('#matkasse-2'), 1.4, {delay: 0.4, css:{opacity: 0, transform: 'scale(0)'}, ease:Expo.easeIn});
	var matkasse4Out = TweenMax.to($('#matkasse-4'), 1.6, {delay: 0.6, css:{opacity: 0, transform: 'scale(0)'}, ease:Expo.easeIn});
	var matkasse5Out = TweenMax.to($('#matkasse-5'), 1.2, {delay: 0.2, css:{opacity: 0, transform: 'scale(0)'}, ease:Expo.easeIn});

	var matkasse3Grow = TweenMax.to($('#matkasse-3'), 1, {css:{transform: 'scale(3)', opacity: 0}, ease:Expo.easeIn});
	var matkasse3Out = TweenMax.to($('#matkasse-3'), 1, {css:{opacity: 0}, ease:Expo.easeIn});
	
	var explosionPart1 = TweenMax.to($('#explosion'), 1, {css:{transform: 'scale(4)', opacity: 1}, ease:Expo.easeIn});
	var explosionPart2 = TweenMax.to($('#explosion'), 1.5, {css:{opacity: 0}, ease:Expo.easeIn});

	var money = TweenMax.fromTo($('#money-2'), 0.1, {css:{transform: 'scale(0)',left: 300}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1) rotate(-20deg)', left: '+=400' ,top: '+=100' }, ease:Expo.easeOut});
	var money1 = TweenMax.fromTo($('#money-1'), 0.1, {css:{transform: 'scale(0)',left: 300}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1) rotate(-30deg)', left:'-=300',top: '-=300' }, ease:Expo.easeOut});
	var money2 = TweenMax.fromTo($('#money'), 0.1, {css:{transform: 'scale(0)',left: 300}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1) rotate(30deg)', left: '-=500',top: '+=100' }, ease:Expo.easeOut});
	var money3 = TweenMax.fromTo($('#money-3'), 0.1, {css:{transform: 'scale(0)',left: 300}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1) rotate(-80deg)', left: '+=500',top: '+=100' }, ease:Expo.easeOut});
	var money4 = TweenMax.fromTo($('#money-4'), 0.1, {css:{transform: 'scale(0)',left: 300}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1) rotate(10deg)', left: '+=50',top: '+=300' }, ease:Expo.easeOut});
	var money5 = TweenMax.fromTo($('#money-5'), 0.1, {css:{transform: 'scale(0)',left: 300}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1) rotate(10deg)', left: '-=450',top: '+=240' }, ease:Expo.easeOut});
	var money6 = TweenMax.fromTo($('#money-6'), 0.1, {css:{transform: 'scale(0)',left: 300}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1) rotate(-10deg)', left: '-=500',top: '+=100' }, ease:Expo.easeOut});
	
	var text2In = TweenMax.fromTo($('#waste-text-2'), 0.1, {css:{transform: 'scale(0)'}, immediateRender:true, ease:Expo.easeIn}, {css:{transform: 'scale(1)',top: '+=10' }, ease:Expo.easeOut});

	controller.pin($('#matkassar'), 4000, {
		anim: (new TimelineLite())
		//.add([del_1])
		.add([matkasse1Out, matkasse2Out, matkasse4Out, matkasse5Out, textOut])
		.add([explosionPart1, matkasse3Grow])
		.add([explosionPart2, matkasse3Out])
		.add([money, money1, money2, money3, money4, money5, money6, text2In] , '-=0.4'),
		onPin: function() {
			$('#matkassar').css('height','100%');
		}, 
		onUnpin: function() {
			$('#matkassar').css('height', $(window).height());
		}
	});



	// PART 2 
	// MONEY TO POPCORN
	// ======
	var scrollDuration = 100; 

	controller.addTween('#popcorn-1', TweenMax.fromTo($('#popcorn-1'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(1)'}, ease:Expo.easeOut}), scrollDuration, 100);
	controller.addTween('#money-popcorn-1', TweenMax.fromTo($('#money-popcorn-1'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, 100);
	
	controller.addTween('#popcorn-2', TweenMax.fromTo($('#popcorn-2'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(2) rotate(45deg)'}, ease:Expo.easeOut}), scrollDuration, 100);
	controller.addTween('#money-popcorn-2', TweenMax.fromTo($('#money-popcorn-2'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, 100);

	controller.addTween('#popcorn-3', TweenMax.fromTo($('#popcorn-3'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(2) rotate(10deg)'}, ease:Expo.easeOut}), scrollDuration);
	controller.addTween('#money-popcorn-3', TweenMax.fromTo($('#money-popcorn-3'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration);

	controller.addTween('#popcorn-4', TweenMax.fromTo($('#popcorn-4'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(1)'}, ease:Expo.easeOut}), scrollDuration);
	controller.addTween('#money-popcorn-4', TweenMax.fromTo($('#money-popcorn-4'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration);

	controller.addTween('#popcorn-5', TweenMax.fromTo($('#popcorn-5'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(2)'}, ease:Expo.easeOut}), 200, -150);
	controller.addTween('#money-popcorn-5', TweenMax.fromTo($('#money-popcorn-5'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), 200, -150);

	controller.addTween('#popcorn-6', TweenMax.fromTo($('#popcorn-6'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(2)'}, ease:Expo.easeOut}), scrollDuration, -50);
	controller.addTween('#money_popcorn-6', TweenMax.fromTo($('#money-popcorn-6'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, -50);

	controller.addTween('#popcorn-7', TweenMax.fromTo($('#popcorn-7'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(1)'}, ease:Expo.easeOut}), scrollDuration, 0);
	controller.addTween('#money-popcorn-7', TweenMax.fromTo($('#money-popcorn-7'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, 0);

	controller.addTween('#money-popcorn-8', TweenMax.fromTo($('#money-popcorn-8'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, 0);
	controller.addTween('#popcorn-8', TweenMax.fromTo($('#popcorn-8'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(1)'}, ease:Expo.easeOut}), scrollDuration, 0);

	controller.addTween('#money-popcorn-9', TweenMax.fromTo($('#money-popcorn-9'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, 0);
	controller.addTween('#popcorn-9', TweenMax.fromTo($('#popcorn-9'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(2) rotate(10deg)'}, ease:Expo.easeOut}), scrollDuration, 0);

	controller.addTween('#money-popcorn-10', TweenMax.fromTo($('#money-popcorn-10'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, 0);

	controller.addTween('#money-popcorn-11', TweenMax.fromTo($('#money-popcorn-11'), 0.6, {css:{opacity: 1}}, {css:{opacity: 0}, ease:Expo.easeOut}), scrollDuration, 0);
	controller.addTween('#popcorn-11', TweenMax.fromTo($('#popcorn-11'), 0.6, {css:{transform: 'scale(0)'}}, {css:{transform: 'scale(1)'}, ease:Expo.easeOut}), scrollDuration, 0);



	// PART 3
	// TICKET TO CINEMA
	// ======
	var avslut_controller = $.superscrollorama();
	var avslut_biljett = TweenMax.fromTo( $('#avslut-biljett'), 1, {css:{transform: 'scale(0)'}, immediateRender:true, ease:Quad.easeInOut}, {css:{ transform: 'scale(10) rotate(-110deg) translateX(100px)' }, ease:Quad.easeInOut});
	
	avslut_controller.pin($('#stor-biljett'), 4000, {
		anim: (new TimelineLite())
			.add(avslut_biljett)
	});

});