$(document).ready(function() {
	var ctrl = $.superscrollorama();

	var textIntroOut = TweenMax.to($('#text-intro'), 0.5, {css: {opacity: 0}});
	var textIntroBgOut = TweenMax.to($('#text-intro-bg'), 1, {css: {opacity: 0}});

	var straw1Out = TweenMax.to($('#straw-1'), 0.5, {
			css: {opacity: 0, marginTop: '+=200'}});
	var straw2Out = TweenMax.to($('#straw-2'), 0.5, {
			css: {opacity: 0, marginTop: '+=200'}});

	var crown1Out = TweenMax.to($('#crown-1'), 0.5, {
			css: {opacity: 0, marginTop: '-=200'}});
	var crown2Out = TweenMax.to($('#crown-2'), 0.5, {
			css: {opacity: 0, marginTop: '-=200'}});

	var text1In = TweenMax.to($('#text-1'), 0.5, {css: {opacity: 1}});
	var text1Out = TweenMax.to($('#text-1'), 0.5, {css: {opacity: 0}});

	var text2In = TweenMax.to($('#text-2'), 0.5, {css: {opacity: 1}});
	var text2Out = TweenMax.to($('#text-2'), 0.5, {css: {opacity: 0}});

	var corn1 = TweenMax.to($('#corn-1'), 0.5, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '-=30', marginTop: '-=30'},
				{marginLeft: '-=60', marginTop:'+=60'}, 
				{marginLeft: '-30px', marginTop: '-30px'}
			],
			autoRotate: 200
		}});
	var corn4 = TweenMax.to($('#corn-4'), 0.6, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '-=30', marginTop: '-=30'},
				{marginLeft: '-=60', marginTop:'+=60'}, 
				{marginLeft: '-80px', marginTop: '0px'}
			],
			autoRotate: 200
		}, delay: 0.1
	});
	var corn2 = TweenMax.to($('#corn-2'), 0.7, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '-=30', marginTop: '-=30'},
				{marginLeft: '-=60', marginTop:'+=60'}, 
				{marginLeft: '-40px', marginTop: '20px'}
			],
			autoRotate: 200
		}, delay: 0.2
	});

	var corn10 = TweenMax.to($('#corn-10'), 0.8, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '-=30', marginTop: '-=30'},
				{marginLeft: '-=60', marginTop:'+=60'}, 
				{marginLeft: '5px', marginTop: '12px'}
			],
			autoRotate: 200
		}, delay: 0.3
	});
	var corn3 = TweenMax.to($('#corn-3'), 0.9, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '-=100', marginTop:'+=60'}, 
				{marginLeft: '-=80', marginTop:'+=200'}, 
				{marginLeft: '-125px', marginTop: '0'}
			],
			autoRotate: 200
		}, delay: 0.4
	});
	var corn7 = TweenMax.to($('#corn-7'), 1, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '+=30', marginTop: '-=30'},
				{marginLeft: '+=100', marginTop:'+=60'}, 
				{marginLeft: '+=80', marginTop:'+=200'}, 
				{marginLeft: '-70px', marginTop: '60px'}
			],
			autoRotate: 200
		}, delay: 0.5
	});
	var corn8 = TweenMax.to($('#corn-8'), 1.1, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '-=30', marginTop: '-=30'},
				{marginLeft: '-=60', marginTop:'-=60'}, 
				{marginLeft: '10px', marginTop: '-50px'}
			],
			autoRotate: 200
		}, delay: 0.6
	});

	var corn5 = TweenMax.to($('#corn-5'), 1.2, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '+=30', marginTop: '-=30'},
				{marginLeft: '+=100', marginTop:'+=60'}, 
				{marginLeft: '+=80', marginTop:'+=200'}, 
				{marginLeft: '-30px', marginTop: '80px'}
			],
			autoRotate: 200
		}, delay: 0.7
	});
	var corn11 = TweenMax.to($('#corn-11'), 1.3, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '+=30', marginTop: '-=30'},
				{marginLeft: '+=100', marginTop:'+=60'}, 
				{marginLeft: '+=80', marginTop:'+=200'}, 
				{marginLeft: '40px', marginTop: '40px'}
			],
			autoRotate: 200
		}, delay: 0.8
	});
	var corn9 = TweenMax.to($('#corn-9'), 1.4, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '-=30', marginTop: '-=30'},
				{marginLeft: '-=120', marginTop:'-=60'}, 
				{marginLeft: '-=100', marginTop:'+=70'}, 
				{marginLeft: '-40px', marginTop: '-90px'}
			],
			autoRotate: 200
		}, delay: 0.9
	});

	var corn12 = TweenMax.to($('#corn-12'), 1.5, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '+=50', marginTop: '+=100'},
				{marginLeft: '+=50', marginTop:'+=260'}, 
				{marginLeft: '-=150', marginTop:'+=240'}, 
				{marginLeft: '-112px', marginTop: '55'}
			],
			autoRotate: 200
		}, delay: 1
	});
	var corn6 = TweenMax.to($('#corn-6'), 1.6, {
		bezier: {
			type: 'soft',
			values: [
				{marginLeft: '+=70', marginTop: '+=0'},
				{marginLeft: '+=140', marginTop:'+=30'}, 
				{marginLeft: '50', marginTop: '-30'}
			],
			autoRotate: 200
		}, delay: 1.1
	});

	var bgToGreen = TweenMax.to($('#bg-1'), 1, {css: {backgroundColor: '#62B987'}});

	var corn1Out = TweenMax.to($('#corn-1'), 1, {
		css: {left: '100%', marginTop: '-120px', rotation: 360}});
	var corn2Out = TweenMax.to($('#corn-2'), 1, {
		css: {left: '100%', marginTop: '-120px', rotation: -360}, delay: 0.05});
	var corn3Out = TweenMax.to($('#corn-3'), 1, {
		css: {left: '100%', marginTop: '-120px', rotation: 360}, delay: 0.1});
	var corn4Out = TweenMax.to($('#corn-4'), 1, {
		css: {left: '100%', marginTop: '-120px', rotation: -360}, delay: 0.15});
	var corn5Out = TweenMax.to($('#corn-5'), 0.7, {
		css: {left: '85%', marginTop: '-120px', rotation: 360}, delay: 0.2});
	var corn6Out = TweenMax.to($('#corn-6'), 1, {
		css: {left: '100%', marginTop: '-120px', rotation: -360}, delay: 0.25});
	var corn7Out = TweenMax.to($('#corn-7'), 0.6, {
		css: {left: '75%', marginTop: '-120px', rotation: 360}, delay: 0.3});
	var corn8Out = TweenMax.to($('#corn-8'), 1, {
		css: {left: '100%', marginTop: '-120px', rotation: -360}, delay: 0.35});
	var corn9Out = TweenMax.to($('#corn-9'), 1, {
		css: {left: '100%', marginTop: '-120px', rotation: 360}, delay: 0.4});
	var corn10Out = TweenMax.to($('#corn-10'), 0.6, {
		css: {left: '100%', marginTop: '-120px', rotation: -360}, delay: 0.35});
	var corn11Out = TweenMax.to($('#corn-11'), 0.55, {
		css: {left: '75%', marginTop: '-120px', rotation: 360}, delay: 0.25});
	var corn12Out = TweenMax.to($('#corn-12'), 0.5, {
		css: {left: '80%', marginTop: '-120px', rotation: -360}, delay: 0.25});

	var kamikazeHen = TweenMax.to($('#flying-hen'), 1, {
		css: {right: '50%'}, ease:Expo.easeOut,
			onComplete: function() {
				$('#foot').addClass('land');
				$('#corns, #flying-hen .bg').addClass('hide');
			}, delay: 0.5
	});

	var bgCollapse = TweenMax.to($('#bg-1'), 3, {css: {height: '0%'}});

	var scaleHen = TweenMax.to($('#flying-hen'), 1, {css: {transform: 'scale(0.565)', marginRight: -700},
		onReverseComplete: function() {
			$('#foot').removeClass('land');
			$('#corns, #flying-hen .bg').removeClass('hide');
		}
	});
	var hideFeathers = TweenMax.to($('#feathers'), 1, {css: {top: '80px', left: '100px', transform: 'scale(0.5)'}});


	// PART 2
	// ======
	// CHICKEN FARM

	var chickenFarm = TweenMax.to($('#chicken-farm'), 1, {css: {bottom: '50%'},
		onStart: function() {
			$('#foot').addClass('sit');
		},
		onReverseComplete: function() {
			$('#foot').removeClass('sit');
		}
	});
	var chickenFarmBG = TweenMax.to($('#chicken-farm-bg'), 1, {css: {bottom: '50%'}});
	var chickenEgg = TweenMax.to($('#chicken-egg'), 1, {css: {bottom: '50%'}});
	var chickenFloor = TweenMax.to($('#chicken-farm-floor'), 1, {css: {bottom: '0'}});

	var chickenLampIn = TweenMax.to($('#chicken-lamp'), 2, {css: {top: '-20%'}, ease:Expo.easeOut});

	var circle1 = TweenMax.to($('#circle-1'), 1, {css: {transform: 'scale(100)'}});
	var circle2 = TweenMax.to($('#circle-2'), 1.25, {css: {transform: 'scale(80)'}, delay: 0.25});

	var text3In = TweenMax.to($('#text-3'), 0.5, {css: {opacity: 1}});
	var text3Out = TweenMax.to($('#text-3'), 0.5, {css: {opacity: 0}});

	var chickenFarmOut = TweenMax.to($('#chicken-farm'), 1, {css: {bottom: '150%'}});
	var chickenFarmBGOut = TweenMax.to($('#chicken-farm-bg'), 1, {css: {bottom: '150%'}});
	var chickenLampOut = TweenMax.to($('#chicken-lamp'), 1, {css: {top: '-120%'}});
	var chickenFloorFull = TweenMax.to($('#chicken-farm-floor'), 1, {css: {height: '150%'}});
	var henOut = TweenMax.to($('#flying-hen'), 1, {css: {top: '-50%'}});

	var eggCarton = TweenMax.to($('#egg-carton'), 1, {css: {bottom: '50%'}});
	var eggCartonTop = TweenMax.to($('#egg-carton-top'), 1, {css: {top: '50%'}});
	var eggCartonLogo = TweenMax.to($('#egg-carton-logo'), 1, {css: {top: '50%'}});

	var text4In = TweenMax.to($('#text-4'), 0.5, {css: {opacity: 1}});
	var text4Out = TweenMax.to($('#text-4'), 0.5, {css: {opacity: 0}});

	var chickenFloorOut = TweenMax.to($('#chicken-farm-floor'), 1, {css: {bottom: '120%', height: '150%'},
		onStart: function() {
			$('#bg-2').addClass('blue');
		},
		onReverseComplete: function() {
			$('#bg-2').removeClass('blue');
		}
	});

	var eggCartonBg = TweenMax.to($('#egg-carton-bg'), 1, {css: {height: '118px'}});
	var eggCartonBgWiden = TweenMax.to($('#egg-carton-bg'), 1, {css: {width: '325px', marginLeft: '-162px'}});
	var eggCartonLogoLarge = TweenMax.to($('#egg-carton-logo'), 1, {css: {transform: 'scale(1.5) translateY(20px)'}});

	// PART 3
	// ==========
	// SKY - ROAD

	var truckBot = TweenMax.to($('#truck-bot'), 1, {css: {marginTop: '67px', opacity: 1}});
	var truckFront = TweenMax.to($('#truck-front'), 1, {css: {marginLeft: '170px', opacity: 1}});

	var cloud1 = TweenMax.to($('#cloud-1'), 1, {css: {bottom: '90%'}});
	var cloud2 = TweenMax.to($('#cloud-2'), 1, {css: {bottom: '70%'}});
	var cloud3 = TweenMax.to($('#cloud-3'), 1, {css: {bottom: '80%'}});

	var tarmac = TweenMax.to($('#tarmac'), 1, {css: {bottom: '-50%'}});
	var text5In = TweenMax.to($('#text-5'), 0.5, {css: {opacity: 1}});
	var text5Out = TweenMax.to($('#text-5'), 0.5, {css: {opacity: 0}});
	var exhaustIn = TweenMax.to($('#lorry-exhaust'), 1, {css: {opacity: '1'}});

	var cloudBox = TweenMax.to($('#cloud-box'), 3, {css: {left: '-100%'}, ease:Expo.easeInOut});
	var tarmacSilhouette = TweenMax.to($('#tarmac img'), 3, {css: {left: '-10%'}, ease:Expo.easeInOut});

	var signIn = TweenMax.to($('#sign'), 0.01, {css: {opacity: 1},
		onStart: function() {
			$('#chicken-egg, #transformer').addClass('hide');
			$('#sign').addClass('flip');
		},
		onReverseComplete: function() {
			$('#chicken-egg, #transformer').removeClass('hide');
			$('#sign').removeClass('flip');
		}
	});

	var carIn = TweenMax.to($('#car-box'), 2, {css: {left: '50%'}, ease:Expo.easeOut,
		onComplete: function() {
			$('#sign').removeClass('flip');
		}
	});

	var cloudBox2 = TweenMax.to($('#cloud-box'), 6, {css: {left: '-300%'},
		onReverseComplete: function() {
			$('#sign').addClass('flip');
		}
	});
	var tarmacSilhouette2 = TweenMax.to($('#tarmac img'), 6, {css: {left: '-50%'}});
	var text7Out = TweenMax.to($('#text-7'), 0.5, {css: {opacity: 0}});
	//var carBrake = TweenMax.to($('#car'), 6, {css: {left: '35%'}});

	var tarmacTransition = TweenMax.to($('#tarmac'), 1, {css: {bottom: '0', marginBottom: 0}});
	var cloud4Out = TweenMax.to($('#cloud-4'), 1, {css: {bottom: '150%'}});
	var cloud5Out = TweenMax.to($('#cloud-5'), 1, {css: {bottom: '150%'}});
	var cloud6Out = TweenMax.to($('#cloud-6'), 1, {css: {bottom: '150%'}});


	// PART 4
	// =============
	// CAR TO CARTON

	var wheel1 = TweenMax.to($('#wheel-1'), 1, {css: {top: '+=80px'}});
	var wheel2 = TweenMax.to($('#wheel-2'), 1.2, {css: {top: '+=80px'}, delay: 0.2});

	var eggCloud1 = TweenMax.to($('#eggcircle-1'), 1, {css: {top: '-=70px', left: '-=70px', width: '55px', height: '55px'}});
	var eggCloud2 = TweenMax.to($('#eggcircle-2'), 1.1, {css: {top: '+=10px', left: '-=70px', width: '55px', height: '55px'}, delay: 0.1});
	var eggCloud3 = TweenMax.to($('#eggcircle-3'), 1.2, {css: {top: '-=30px', left: '-=140px', width: '55px', height: '55px'}, delay: 0.2});
	var eggCloud4 = TweenMax.to($('#eggcircle-4'), 1.3, {css: {top: '+=70px', left: '-=56px', width: '55px', height: '55px'}, delay: 0.3});
	var eggCloud5 = TweenMax.to($('#eggcircle-5'), 1.4, {css: {top: '+=70px', left: '-=86px', width: '55px', height: '55px'}, delay: 0.4});
	var eggCloud6 = TweenMax.to($('#eggcircle-6'), 1.5, {css: {top: '-=150px', left: '+=0px', width: '55px', height: '55px'}, delay: 0.5});
	var eggCloud7 = TweenMax.to($('#eggcircle-7'), 1.6, {css: {top: '-=215px', left: '+=40px', width: '55px', height: '55px'}, delay: 0.6});
	var eggCloud8 = TweenMax.to($('#eggcircle-8'), 1.7, {css: {top: '-=134px', left: '-=104px', width: '55px', height: '55px'}, delay: 0.7});

	var carBg1 = TweenMax.to($('#car-bg'), 1, {css: {left: 0}});


	var carBg2 = TweenMax.to($('#car-bg'), 1, {css: {bottom: '25px'}});
	var carBg3 = TweenMax.to($('#car-bg'), 1, {css: {width: '100%'}});

	var carBgEggs = TweenMax.to($('#egg-holder'), 1, {css: {opacity: '1'}});
	var carBg4 = TweenMax.to($('#car-bg'), 1, {css: {backgroundColor: '#E4E2D8', borderRadius: '20px'}});
	var carOut = TweenMax.to($('#car'), 1, {css: {opacity: 0},

		onStart: function() {
			$('#car-box').addClass('egg-mode');
		},
		onReverseComplete: function() {
			$('#car-box').removeClass('egg-mode');
		}
	});

	var carBgExpand = TweenMax.to($('#car-bg'), 1, {css: {width: '305px', bottom: '-11px', margin: '-7px 0px 0px -31px'}});
	var carCenter = TweenMax.to($('#car-box'), 1, {css: {marginTop: '-60px'}});

	var wheel1Carton = TweenMax.to($('#wheel-1'), 1, {css: {top: '-2px', left: '-18px'}});
	var wheel2Carton = TweenMax.to($('#wheel-2'), 1.2, {css: {top: '58px', left: '222px'}, delay: 0.2});

	var eggCloud1In = TweenMax.to($('#eggcircle-1'), 1, {css: {top: '58px', left: '154px'}});
	var eggCloud2In = TweenMax.to($('#eggcircle-2'), 1.1, {css: {top: '-2px', left: '94px'}, delay: 0.1});
	var eggCloud3In = TweenMax.to($('#eggcircle-3'), 1.2, {css: {top: '-2px', left: '34px'}, delay: 0.2});
	var eggCloud4In = TweenMax.to($('#eggcircle-4'), 1.3, {css: {top: '58px', left: '34px'}, delay: 0.3});
	var eggCloud5In = TweenMax.to($('#eggcircle-5'), 1.4, {css: {top: '-2px', left: '214px'}, delay: 0.4});
	var eggCloud6In = TweenMax.to($('#eggcircle-6'), 1.5, {css: {top: '58px', left: '94px'}, delay: 0.5});
	var eggCloud7In = TweenMax.to($('#eggcircle-7'), 1.6, {css: {top: '-2px', left: '154px'}, delay: 0.6});
	var eggCloud8In = TweenMax.to($('#eggcircle-8'), 1.7, {css: {top: '58px', left: '-26px'}, delay: 0.7});

	var text8In = TweenMax.to($('#text-8'), 0.5, {css: {opacity: 1}});
	var text8Out = TweenMax.to($('#text-8'), 0.5, {css: {opacity: 0}});

	var handIn = TweenMax.to($('#hand'), 1, {css: {right: '50%'},
		onStart: function() {
			$('#egg-boil').addClass('active');
			$('#bg-2').removeClass('blue');
		},
		onReverseComplete: function() {
			$('#egg-boil').removeClass('active');
			$('#bg-2').addClass('blue');
		}
	});

	var carBoxOut = TweenMax.to($('#car-box'), 1, {css: {top: '-50%'},
		onStart: function() {
			$('#eggcircle-6').addClass('hide');
		},
		onReverseComplete: function() {
			$('#eggcircle-6').removeClass('hide');
		}
	});
	var tarmacOut = TweenMax.to($('#tarmac'), 1, {css: {bottom: '100%'}});
	/*
	var eggCenter = TweenMax.to($('#egg-boil'), 1, {css: {marginTop: '-=4px'}});
	var handCenter = TweenMax.to($('#hand'), 1, {css: {marginTop: '-=2px'}});
	*/

	// PART 5
	// ======
	// STOVE

	var stoveIn = TweenMax.to($('#stove'), 1, {css: {bottom: '50%'}});
	var saucepanIn = TweenMax.to($('#saucepan'), 1, {css: {right: '50%'}});

	var handOut = TweenMax.to($('#hand'), 1, {css: {right: '-100%'}});
	var eggDrop = TweenMax.to($('#egg-boil'), 1.2, {css: {transform: 'scale(0.5)'}, delay: 0.2});

	var eggSplode = TweenMax.to($('#egg-boil'), 1, {css: {transform: 'scale(1)'}});
	var eggSplodeInner = TweenMax.to($('#egg-boil-inner'), 1, {css: {backgroundColor: '#F9EB27'}});
	var eggSplodeInnerBg = TweenMax.to($('#egg-boil-bg'), 1, {css: {backgroundColor: '#F3D424'}});
	var eggWhite = TweenMax.to($('#egg-white'), 1, {css: {transform: 'scale(1)', opacity: 0.3}});

	var eggWhiteCook = TweenMax.to($('#egg-white'), 2, {css: {opacity: 1}});

	var spatulaIn = TweenMax.to($('#spatula'), 2, {css: {top: '50%', left: '50%'}});

	var eggToss = TweenMax.to($('#egg-boil'), 2, {css: {transform: 'scale(2) rotateX(180deg)', marginTop: '-=40px'}});
	var eggTossYolk = TweenMax.to($('#egg-boil-inner'), 1, {css: {transform: 'translateY(-10px)'}});
	//var eggWhiteToss = TweenMax.to($('#egg-white'), 2, {css: {transform: 'scale(2) rotateX(180deg)'}});

	var eggTossBack = TweenMax.to($('#egg-boil'), 2, {css: {transform: 'scale(1) rotateX(360deg)', marginTop: '+=40px'}});
	var eggTossYolkBack = TweenMax.to($('#egg-boil-inner'), 1, {css: {transform: 'translateY(0)'}});
	//var eggWhiteTossBack = TweenMax.to($('#egg-white'), 2, {css: {transform: 'scale(1) rotateX(360deg)'}});

	var stoveOut = TweenMax.to($('#stove'), 1, {css: {bottom: '150%'}, delay: 1});
	var saucepanOut = TweenMax.to($('#saucepan'), 1, {css: {top: '-50%'}, delay: 1});
	var spatulaToss = TweenMax.to($('#spatula'), 1, {css: {transform: 'scale(1.5)'}});
	var spatulaOut = TweenMax.to($('#spatula'), 1, {css: {top: '-50%'}, delay: 1});


	// PART 6
	// ===========
	// TIME TO EAT

	var bg2Collapse = TweenMax.to($('#bg-2'), 1, {css: {height: 0}});
	var plateIn = TweenMax.to($('#plate'), 1, {css: {bottom: '50%'}});

	var eatEgg = TweenMax.to($('#egg-cover'), 1, {css: {opacity: '1'}});

	var plateUp = TweenMax.to($('#plate'), 1, {css: {bottom: '65%', transform: 'scale(0.75)'}});
	var eggUp = TweenMax.to($('#egg-boil'), 1, {css: {top: '35%', transform: 'scale(0.75)', marginTop: '-10px'}});
	var eggCoverUp = TweenMax.to($('#egg-cover'), 1, {css: {top: '35%', transform: 'scale(0.75)', marginLeft: '-8px'}});

	var text9In = TweenMax.to($('#text-9'), 0.5, {css: {opacity: 1}});
	var text9Spacer = TweenMax.to($('#text-9'), 3, {css: {opacity: 1}});

	ctrl.pin($('#eggs'), 50000, {
		anim: (new TimelineLite())
			// INTRO
			.add(textIntroOut, '+=2')
			.add(textIntroBgOut)
			// PART 1
			.add([straw1Out, crown1Out])
			.add([straw2Out, crown2Out], '-=0.25')
			.add(text1In)
			.add(text1Out, '+=2')
			.add([corn1, corn4, corn2, corn10, corn3, corn7, corn8, corn5, corn11, corn9, corn12, corn6])
			.add(text2In)
			.add(text2Out, '+=2')
			.add(bgToGreen, '+=2')
			.add([corn1Out, corn2Out, corn3Out, corn4Out, corn5Out, corn6Out, corn7Out, corn8Out, corn9Out, corn10Out, corn11Out, corn12Out, kamikazeHen])
			.add([scaleHen, hideFeathers])
			.add(bgCollapse)
			// PART 2
			.add([chickenFarm, chickenFarmBG, chickenEgg, chickenFloor])
			.add(text3In)
			.add(chickenLampIn)
			.add([circle1, circle2])
			.add(text3Out)
			.add([chickenFarmOut, chickenFarmBGOut, chickenLampOut, chickenFloorFull, henOut])
			.add(eggCarton)
			.add(text4In)
			.add(text4Out, '+=2')
			.add([eggCartonTop, eggCartonLogo])
			.add(chickenFloorOut)
			.add(eggCartonBg)
			.add(eggCartonBgWiden)
			.add(eggCartonLogoLarge)
			// PART 3
			.add(truckBot)
			.add(truckFront)
			.add([cloud1, cloud2, cloud3, tarmac])
			.add(text5In)
			.add([cloudBox, tarmacSilhouette, exhaustIn], '+=2')
			.add(text5Out)
			.add(signIn)
			.add(carIn, '+=1')
			.add([cloudBox2, tarmacSilhouette2], '+=1')
			.add(text7Out)
			.add([tarmacTransition, cloud4Out, cloud5Out, cloud6Out])
			// PART 4
			.add([wheel1, wheel2, carBg1])
			.add(carBg2)
			.add(carBg3)
			.add([carOut, eggCloud1, eggCloud2, eggCloud3, eggCloud4, eggCloud5, eggCloud6, eggCloud7, eggCloud8])
			.add([carBg4, carBgExpand, carCenter])
			.add(carBgEggs)
			.add([wheel1Carton, wheel2Carton, eggCloud1In, eggCloud2In, eggCloud3In, eggCloud4In, eggCloud5In, eggCloud6In, eggCloud7In, eggCloud8In])
			.add(text8In)
			.add(text8Out, '+=2')
			.add(handIn)
			.add([carBoxOut, tarmacOut]) //, eggCenter, handCenter])
			// PART 5
			.add(stoveIn)
			.add(saucepanIn)
			.add([handOut, eggDrop])
			.add([eggSplode, eggSplodeInner, eggSplodeInnerBg, eggWhite])
			.add(eggWhiteCook)
			.add(spatulaIn)
			// PART 6
			.add([eggToss, eggTossYolk, stoveOut, saucepanOut, spatulaToss, spatulaOut])
			.add([eggTossBack, eggTossYolkBack, bg2Collapse, plateIn])
			.add(eatEgg)
			.add([plateUp, eggUp, eggCoverUp])
			.add(text9In)
			.add(text9Spacer)
	});

});