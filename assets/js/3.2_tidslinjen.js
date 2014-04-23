$(document).ready(function() {
	var ctrl = $.superscrollorama();

	//var pan1 = TweenMax.to($('#stamp-1'), 2, {css: {right: '50%'}});
	var pan1Out = TweenMax.to($('#stamp-1'), 2, {css: {right: '150%'}});

	var pan2 = TweenMax.to($('#stamp-2'), 2, {css: {right: '50%'}});
	var pan2Out = TweenMax.to($('#stamp-2'), 2, {css: {right: '150%'}});

	var pan3 = TweenMax.to($('#stamp-3'), 2, {css: {right: '50%'}});
	var pan3Out = TweenMax.to($('#stamp-3'), 2, {css: {right: '150%'}});

	var pan4 = TweenMax.to($('#stamp-4'), 2, {css: {right: '50%'}});
	var pan4Out = TweenMax.to($('#stamp-4'), 2, {css: {right: '150%'}});

	var pan5 = TweenMax.to($('#stamp-5'), 2, {css: {right: '50%'}});
	var pan5Out = TweenMax.to($('#stamp-5'), 2, {css: {right: '150%'}});

	var pan6 = TweenMax.to($('#stamp-6'), 2, {css: {right: '50%'}});
	var pan6Out = TweenMax.to($('#stamp-6'), 2, {css: {right: '150%'}});

	var pan7 = TweenMax.to($('#stamp-7'), 2, {css: {right: '50%'}});
	//var pan7Out = TweenMax.to($('#stamp-7'), 2, {css: {right: '150%'}});

	var clouds1 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-2000px'}});
	var clouds2 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-4000px'}});
	var clouds3 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-6000px'}});
	var clouds4 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-8000px'}});
	var clouds5 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-10000px'}});
	var clouds6 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-12000px'}});

	var house1In = TweenMax.to($('#house-1'), 1, {css: {transform: 'translateY(-215px)'}});
	var house2In = TweenMax.to($('#house-2'), 1.2, {css: {transform: 'translateY(-215px)'}, delay: 0.2});
	var house3In = TweenMax.to($('#house-3'), 1.4, {css: {transform: 'translateY(-215px)'}, delay: 0.4});
	var dirtpileIn = TweenMax.to($('#dirtpile'), 1.6, {css: {transform: 'translateY(-185px)'}, delay: 0.6});

	var text1In = TweenMax.to($('#tl-text-1'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	var text2In = TweenMax.to($('#tl-text-2'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});


	// PART 3 
	var house4In = TweenMax.to($('#house-4'), 1.2, {css: {transform: 'translateY(-215px)'}, delay: 0.2});
	var house5In = TweenMax.to($('#house-5'), 1.6, {css: {transform: 'translateY(-188px)'}, delay: 0.6});
	var house6In = TweenMax.to($('#house-6'), 1.4, {css: {transform: 'translateY(-215px)'}, delay: 0.4});
	var house7In = TweenMax.to($('#house-7'), 1, {css: {transform: 'translateY(-215px)'}});

	var house8In = TweenMax.to($('#house-8'), 2.2, {css: {transform: 'translateY(-215px)'}, delay: 1.2});
	var house9In = TweenMax.to($('#house-9'), 2, {css: {transform: 'translateY(-215px)'}, delay: 1});
	var house10In = TweenMax.to($('#house-10'), 2.2, {css: {transform: 'translateY(-215px)'}, delay: 1.2});

	var text3In = TweenMax.to($('#tl-text-3'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	var text4In = TweenMax.to($('#tl-text-4'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});
	var text5In = TweenMax.to($('#tl-text-5'), 1.4, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.4});


	// PART 4
	var dirtBlack = TweenMax.to($('#dirt'), 2, {css: {backgroundColor: '#333'}, delay: 1});

	var outhouseIn = TweenMax.to($('#outhouse'), 1, {css: {transform: 'translateY(-215px)'}});
	var flies1In = TweenMax.to($('#flies-1'), 1, {css: {transform: 'translateY(-380px)'}});
	var flies2In = TweenMax.to($('#flies-2'), 1, {css: {transform: 'translateY(-290px)'}});

	var factoryIn = TweenMax.to($('#factory-1950'), 1.4, {css: {transform: 'translateY(-235px)'}, delay: 0.4});
	var factorySilo1In = TweenMax.to($('#factory-silo1'), 1.2, {css: {transform: 'translateY(-235px)'}, delay: 0.2});
	var factorySilo2In = TweenMax.to($('#factory-silo2'), 1, {css: {transform: 'translateY(-235px)'}});

	var text6In = TweenMax.to($('#tl-text-6'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	var text7In = TweenMax.to($('#tl-text-7'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});

	// PART 5
	var trashGlassIn = TweenMax.to($('#trash-glass'), 1, {css: {transform: 'translateY(-217px)'}});
	var trashMetalIn = TweenMax.to($('#trash-metal'), 1.2, {css: {transform: 'translateY(-217px)'}, delay: 0.2});
	var trashFoodIn = TweenMax.to($('#trash-food'), 1.4, {css: {transform: 'translateY(-216px)'}, delay: 0.4});

	var text8In = TweenMax.to($('#tl-text-8'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	var text9In = TweenMax.to($('#tl-text-9'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});

	// PART 6
	var dirtGreen = TweenMax.to($('#dirt'), 2, {css: {backgroundColor: '#54B171'}, delay: 1});

	var storeIn = TweenMax.to($('#foodstore'), 1, {css: {transform: 'translateY(-215px)'}});
	var restaurantIn = TweenMax.to($('#restaurant'), 1.2, {css: {transform: 'translateY(-215px)'}, delay: 0.2});
	var house11In = TweenMax.to($('#house-11'), 1.4, {css: {transform: 'translateY(-295px)'}, delay: 0.4});

	var bush1In = TweenMax.to($('#bush-1'), 1.2, {css: {transform: 'translateY(-217px)'}});
	var bush2In = TweenMax.to($('#bush-2'), 1, {css: {transform: 'translateY(-217px)'}});

	var text10In = TweenMax.to($('#tl-text-10'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});

	// PART 7
	

	var flagIn = TweenMax.to($('#flag'), 1, {css: {transform: 'translateY(-415px)'}, delay: 0.4});
	var fuelpumpIn = TweenMax.to($('#fuelpump'), 1, {css: {transform: 'translateY(-215px)'}});
	var lorryIn = TweenMax.to($('#lorry'), 1, {css: {transform: 'translateY(-217px)'}});
	var lorryExhaustIn = TweenMax.to($('#lorry-exhaust'), 1.2, {css: {transform: 'translateY(-235px)'}});
	var treesIn = TweenMax.to($('#trees'), 1.4, {css: {transform: 'translateY(-215px)'}});

	var text11In = TweenMax.to($('#tl-text-11'), 1, {css: {transform: 'translateY(-100px)', opacity: 1}});

	// TEMPORARY SPACER //
	// var spacer = TweenMax.to($('body'), 5, {css: {opacity: '1'}});
	// TEMPORARY SPACER //

	ctrl.pin($('#timeline'), 20000, {
		anim: (new TimelineLite())
			//.add(pan1)

			// PART 1

			// PART 2
			.add([pan1Out, pan2, clouds1])
			.add([house1In, house2In, house3In, dirtpileIn])
			.add([text1In, text2In])
			// PART 3
			.add([pan2Out, pan3, clouds2, dirtBlack])
			.add([house4In, house5In, house6In, house7In, house8In, house9In, house10In])
			.add([text3In, text4In, text5In])
			// PART 4
			.add([pan3Out, pan4, clouds3])
			.add([outhouseIn, flies1In, flies2In])
			.add([factoryIn, factorySilo1In, factorySilo2In])
			.add([text6In, text7In])
			// PART 5
			.add([pan4Out, pan5, clouds4, dirtGreen])
			.add([trashGlassIn, trashMetalIn, trashFoodIn])
			.add([text8In, text9In])
			// PART 6
			.add([pan5Out, pan6, clouds5])
			.add([storeIn, restaurantIn, house11In])
			.add([bush1In, bush2In])
			.add(text10In)
			// PART 7
			.add([pan6Out, pan7, clouds6])
			.add([flagIn, fuelpumpIn, lorryIn, lorryExhaustIn, treesIn])
			.add(text11In)


			//.add(pan7Out)
	});

});