$(document).ready(function() {
	var ctrl = $.superscrollorama();



	// STAGE SWAPPER
	// =============
	// STAGE 1 IS VISIBLE ON START

	// STAGE 1 TO 2
	var pan1Out = TweenMax.to($('#stamp-1'), 2, {css: {right: '150%'},
		onComplete: function() { // SAVE PERF
			$('#stamp-1').removeClass('animate');
		},
		onReverseComplete: function() { // SAVE PERF
			$('#stamp-1').addClass('animate');
		}
	});
	var pan2 = TweenMax.to($('#stamp-2'), 2, {css: {right: '50%'}});

	// STAGE 2 TO 3
	var pan2Out = TweenMax.to($('#stamp-2'), 2, {css: {right: '150%'},
		onComplete: function() { // SAVE PERF
			$('#stamp-2').removeClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-2').addClass('animate');
		}
	});
	var pan3 = TweenMax.to($('#stamp-3'), 2, {css: {right: '50%'}});

	// STAGE 3 TO 4
	var pan3Out = TweenMax.to($('#stamp-3'), 2, {css: {right: '150%'},
		onComplete: function() { // SAVE PERF
			$('#stamp-3').removeClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-3').addClass('animate');
		}
	});
	var pan4 = TweenMax.to($('#stamp-4'), 2, {css: {right: '50%'}});

	// STAGE 4 TO 5
	var pan4Out = TweenMax.to($('#stamp-4'), 2, {css: {right: '150%'},
		onComplete: function() {
			$('#stamp-4').removeClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-4').addClass('animate');
		}
	});
	var pan5 = TweenMax.to($('#stamp-5'), 2, {css: {right: '50%'}});

	// STAGE 5 TO 6
	var pan5Out = TweenMax.to($('#stamp-5'), 2, {css: {right: '150%'},
		onComplete: function() {
			$('#stamp-5').removeClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-5').addClass('animate');
		}
	});
	var pan6 = TweenMax.to($('#stamp-6'), 2, {css: {right: '50%'}});

	// STAGE 6 TO 7
	var pan6Out = TweenMax.to($('#stamp-6'), 2, {css: {right: '150%'},
		onComplete: function() {
			$('#stamp-6').removeClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-6').addClass('animate');
		}
	});
	var pan7 = TweenMax.to($('#stamp-7'), 2, {css: {right: '50%'}});
	//var pan7Out = TweenMax.to($('#stamp-7'), 2, {css: {right: '150%'}});



	// PARALLAX BACKGROUNDS
	// ====================
	// CLOUDS
	var clouds1 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-15%'}});
	var clouds2 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-30%'}});
	var clouds3 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-45%'}});
	var clouds4 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-60%'}});
	var clouds5 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-75%'}});
	var clouds6 = TweenMax.to($('#bg-clouds'), 2, {css: {marginLeft: '-90%'}});


	// CITYSCAPE
	var silhouette1 = TweenMax.to($('#bg-silhouette'), 2, {css: {transform: 'translateX(-15%)'}});
	var silhouette2 = TweenMax.to($('#bg-silhouette'), 2, {css: {transform: 'translateX(-30%)'}});
	var silhouette3 = TweenMax.to($('#bg-silhouette'), 2, {css: {transform: 'translateX(-45%)'}});
	var silhouette4 = TweenMax.to($('#bg-silhouette'), 2, {css: {transform: 'translateX(-60%)'}});
	var silhouette5 = TweenMax.to($('#bg-silhouette'), 2, {css: {transform: 'translateX(-75%)'}});
	var silhouette6 = TweenMax.to($('#bg-silhouette'), 2, {css: {transform: 'translateX(-90%)'}});



	// STAGE CONSTRUCTIONS
	// ===================
	// PART 1 IS ALREADY VISIBLE ON START


	// PART 2
	var house1In = TweenMax.to($('#house-1'), 1, {css: {transform: 'translateY(-215px)'}});
	var house2In = TweenMax.to($('#house-2'), 1.2, {css: {transform: 'translateY(-215px)'}, delay: 0.2});
	var house3In = TweenMax.to($('#house-3'), 1.4, {css: {transform: 'translateY(-215px)'}, delay: 0.4});
	//var dirtpileIn = TweenMax.to($('#dirtpile'), 1.6, {css: {transform: 'translateY(-185px)'}, delay: 0.6});
	// var text1In = TweenMax.to($('#tl-text-1'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	// var text2In = TweenMax.to($('#tl-text-2'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});


	// PART 3 
	var house4In = TweenMax.to($('#house-4'), 1.2, {css: {transform: 'translateY(-215px)'}, delay: 0.2});
	var house5In = TweenMax.to($('#house-5'), 1.6, {css: {transform: 'translateY(-188px)'}, delay: 0.6});
	var house6In = TweenMax.to($('#house-6'), 1.4, {css: {transform: 'translateY(-215px)'}, delay: 0.4});
	var house7In = TweenMax.to($('#house-7'), 1, {css: {transform: 'translateY(-215px)'},
		onComplete: function() {
			$('#stamp-3').addClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-3').removeClass('animate');
		}
	});
	/*
	var house8In = TweenMax.to($('#house-8'), 2.2, {css: {transform: 'translateY(-215px)'}, delay: 1.2});
	var house9In = TweenMax.to($('#house-9'), 2, {css: {transform: 'translateY(-215px)'}, delay: 1});
	var house10In = TweenMax.to($('#house-10'), 2.2, {css: {transform: 'translateY(-215px)'}, delay: 1.2,
		onComplete: function() {
			$('#stamp-3').addClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-3').removeClass('animate');
		}
	});
	*/
	// var text3In = TweenMax.to($('#tl-text-3'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	// var text4In = TweenMax.to($('#tl-text-4'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});
	// var text5In = TweenMax.to($('#tl-text-5'), 1.4, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.4});


	// PART 4
	var dirtBlack = TweenMax.to($('#dirt'), 2, {css: {backgroundColor: '#333'}, delay: 1});
	var outhouseIn = TweenMax.to($('#outhouse'), 1, {css: {transform: 'translateY(-215px)'}});
	var flies1In = TweenMax.to($('#flies-1'), 1, {css: {bottom: '380px'}});
	var flies2In = TweenMax.to($('#flies-2'), 1, {css: {bottom: '290px'}});
	var factoryIn = TweenMax.to($('#factory-1950'), 1.4, {css: {transform: 'translateY(-345px)'}, delay: 0.4,
		onComplete: function() {
			$('#stamp-4').addClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-4').removeClass('animate');
		}
	});
	var factorySilo1In = TweenMax.to($('#factory-silo1'), 1.2, {css: {transform: 'translateY(-235px)'}, delay: 0.2});
	var factorySilo2In = TweenMax.to($('#factory-silo2'), 1, {css: {transform: 'translateY(-235px)'}});
	// var text6In = TweenMax.to($('#tl-text-6'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	// var text7In = TweenMax.to($('#tl-text-7'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});


	// PART 5
	var dirtGreen = TweenMax.to($('#dirt'), 2, {css: {backgroundColor: '#54B171'}, delay: 1,
		onComplete: function() {
			$('#stamp-5').addClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-5').removeClass('animate');
		}
	});
	/*
	var trashGlassIn = TweenMax.to($('#trash-glass'), 1, {css: {transform: 'translateY(-217px)'}});
	var trashMetalIn = TweenMax.to($('#trash-metal'), 1.2, {css: {transform: 'translateY(-217px)'}, delay: 0.2});
	var trashFoodIn = TweenMax.to($('#trash-food'), 1.4, {css: {transform: 'translateY(-216px)'}, delay: 0.4,
		onComplete: function() {
			$('#stamp-5').addClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-5').removeClass('animate');
		}
	});
	*/
	// var text8In = TweenMax.to($('#tl-text-8'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});
	// var text9In = TweenMax.to($('#tl-text-9'), 1.2, {css: {transform: 'translateY(-100px)', opacity: 1}, delay: 0.2});


	// PART 6
	var storeIn = TweenMax.to($('#foodstore'), 1, {css: {transform: 'translateY(-215px)'}});
	var restaurantIn = TweenMax.to($('#restaurant'), 1.2, {css: {transform: 'translateY(-215px)'}, delay: 0.2,
		onComplete: function() {
			$('#stamp-6').addClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-6').removeClass('animate');
		}
	});
	var house11In = TweenMax.to($('#house-11'), 1.4, {css: {transform: 'translateY(-295px)'}, delay: 0.4});
	var bush1In = TweenMax.to($('#bush-1'), 1.2, {css: {transform: 'translateY(-217px)'}});
	var bush2In = TweenMax.to($('#bush-2'), 1, {css: {transform: 'translateY(-217px)'}});
	// var text10In = TweenMax.to($('#tl-text-10'), 1, {css: {transform: 'translateY(100px)', opacity: 1}});


	// PART 7
	var flagIn = TweenMax.to($('#flag'), 1, {css: {transform: 'translateY(-415px)'}, delay: 0.4});
	var fuelpumpIn = TweenMax.to($('#fuelpump'), 1, {css: {transform: 'translateY(-215px)'}});
	var lorryIn = TweenMax.to($('#lorry'), 1, {css: {transform: 'translateY(-217px)'}});
	//var lorryExhaustIn = TweenMax.to($('#lorry-exhaust'), 1.2, {css: {transform: 'translateY(-235px)'}});
	var house12In = TweenMax.to($('#house-12'), 1.2, {css: {transform: 'translateY(-284px)'},
		onComplete: function() {
			$('#stamp-7').addClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-7').removeClass('animate');
		}
	});
	var treesIn = TweenMax.to($('#trees'), 1.4, {css: {transform: 'translateY(-215px)'}});
	// var text11In = TweenMax.to($('#tl-text-11'), 1, {css: {transform: 'translateY(-100px)', opacity: 1}});

	var dirtGreenReverse = TweenMax.to($('#dirt'), 2, {css: {backgroundColor: '#54B171'},
		// MAKE SURE THE GROUND IS GREEN ON REVERSE
		// ALSO ACTS AS A SPACER SO THAT WE CAN TOGGLE STAGE-7 ANIMATIONS LIKE THE REST
		onComplete: function() {
			$('#stamp-7').removeClass('animate');
		},
		onReverseComplete: function() {
			$('#stamp-7').addClass('animate');
		}
	});

	// TEMPORARY SPACER //
	// var spacer = TweenMax.to($('body'), 5, {css: {opacity: '1'}});
	// TEMPORARY SPACER //

	ctrl.pin($('#timeline'), 20000, {
		anim: (new TimelineLite())
			// PART 1 IS ALREADY VISIBLE ON START
			// PART 2
			.add([pan1Out, pan2, clouds1, silhouette1])
			.add([house1In, house2In, house3In]) //dirtpileIn])
			//.add([text1In, text2In])
			// PART 3
			.add([pan2Out, pan3, clouds2, silhouette2, dirtBlack])
			.add([house4In, house5In, house6In, house7In]) // house8In, house9In, house10In])
			//.add([text3In, text4In, text5In])
			// PART 4
			.add([pan3Out, pan4, clouds3, silhouette3], '+=2')
			.add([outhouseIn, flies1In, flies2In])
			.add([factoryIn, factorySilo1In, factorySilo2In])
			//.add([text6In, text7In])
			// PART 5
			.add([pan4Out, pan5, clouds4, silhouette4, dirtGreen])
			//.add([trashGlassIn, trashMetalIn, trashFoodIn])
			//.add([text8In, text9In])
			// PART 6
			.add([pan5Out, pan6, clouds5, silhouette5], '+=2')
			.add([storeIn, restaurantIn, house11In])
			.add([bush1In, bush2In])
			//.add(text10In)
			// PART 7
			.add([pan6Out, pan7, clouds6, silhouette6])
			.add([flagIn, fuelpumpIn, lorryIn, house12In, treesIn]) //, lorryExhaustIn])
			//.add(text11In)
			.add(dirtGreenReverse, '+=2')
	});

});