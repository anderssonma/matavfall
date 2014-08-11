$(document).ready(function() {

	var controller = $.superscrollorama();

	var hand1In = TweenMax.to($('#hand'), 2, {css:{left: '50%'}, ease:Expo.easeOut});
	var waste1In = TweenMax.to($('#wastebag'), 2, {css:{left: '50%'}, ease:Expo.easeOut});

	var hand1Out = TweenMax.to($('#hand'), 2, {css:{left: '-1530px'}, ease:Expo.easeIn});
	var waste1Drop = TweenMax.to($('#wastebag'), 2, {css:{top: '50%', transform: 'scale(0.35)'}, ease:Expo.easeIn});

	var caskBox = TweenMax.to($('#matavfallstunna-container'), 2, {css:{bottom: '50%'}, ease:Expo.easeOut});
	var caskLid = TweenMax.to($('#matavfallstunna-lock'), 1, {css:{transform: 'rotate(50deg)'}, ease:Expo.easeOut});
	var caskBoxSmall = TweenMax.to($('#matavfallstunna-container'), 2, {css:{transform: 'scale(0.25)', marginLeft: '-300px', marginBottom: '-95px'}, ease:Expo.easeOut});
	var caskLidClose = TweenMax.to($('#matavfallstunna-lock'), 2, {css:{transform: 'rotate(-40deg)'}, ease:Expo.easeOut});

	var wasteBagOut = TweenMax.to($('#wastebag'), 0, {css:{display: 'none'}, ease:Expo.easeOut, delay: 2});

	var house1In = TweenMax.to($('#house-1'), 2, {css:{top: '50%', opacity: 1}, ease:Expo.easeOut});
	var roadIn = TweenMax.to($('#road-bio'), 2, {css:{opacity: '1', top: '-100px'}, ease:Expo.easeOut});

	var truckIn = TweenMax.to($('#waste-truck'), 2, {css:{top: '50%'}, ease:Expo.easeOut});
	var truckLidIn = TweenMax.to($('#waste-truck-lid'), 2, {css:{top: '50%'}, ease:Expo.easeOut});
	var text2In = TweenMax.to($('#text-twoboxes'), 2, {css:{top: '50%', opacity: 1}, ease:Expo.easeOut});

	var truckLidOff = TweenMax.to($('#waste-truck-lid'), 2, {css:{opacity: 0}, ease:Expo.easeOut});

	// PART X: DRIVE
	// =============
	var moveRoad = TweenMax.to($('#road-bio'), 4, {css:{ top: '-190%'}, ease:Expo.easeInOut});
	var house1Out = TweenMax.to($('#house-1'), 2, {css:{top: '-50%'}, ease:Expo.easeIn});
	var caskBoxOut = TweenMax.to($('#matavfallstunna-container'), 2, {css:{bottom: '150%'}, ease:Expo.easeIn});
	var text2Out = TweenMax.to($('#text-twoboxes'), 2, {css:{top: '-50%'}, ease:Expo.easeIn});
	var firsIn = TweenMax.to($('#road-firs'), 2, {css:{bottom: '20%'}, delay: 2, ease:Expo.easeOut});
	var cowIn = TweenMax.to($('#road-cow'), 2, {css:{bottom: '60%'}, delay: 1.8, ease:Expo.easeOut});
	var cowTextIn = TweenMax.to($('#text-cow'), 2, {css:{bottom: '70%', opacity: 1}, delay: 1.9, ease:Expo.easeOut});
	var factoryIn = TweenMax.to($('#bio-factory'), 2, {css:{bottom: 0}, delay: 2.2, ease:Expo.easeOut});

	var cowFart1 = TweenMax.to($('#gascloud-1'), 2, {css:{top: '5px', left: '152px', transform: 'scale(1)'}, ease:Expo.easeOut});
	var cowFart2 = TweenMax.to($('#gascloud-2'), 2, {css:{top: '50px', left: '160px', transform: 'scale(1)'}, delay: 0.25, ease:Expo.easeOut});
	var cowFart3 = TweenMax.to($('#gascloud-3'), 2, {css:{top: '12px', left: '215px', transform: 'scale(1)'}, delay: 0.5, ease:Expo.easeOut});

	var truckOut = TweenMax.to($('#waste-truck'), 4, {css:{top: '100%'}, ease:Expo.easeOut});

	controller.pin($('#truck-road'), 4000, {
		anim: (new TimelineLite())
			.add([hand1In, waste1In])
			.add([hand1Out, waste1Drop, caskBox, caskLid, wasteBagOut])
			.add([caskBoxSmall, caskLidClose, house1In, roadIn])
			.add([truckIn, truckLidIn, text2In])
			.add(truckLidOff)
			// PART X: DRIVE
			.add([moveRoad, house1Out, caskBoxOut, text2Out, firsIn, cowIn, cowTextIn, cowFart1, factoryIn])
			.add([cowFart1, cowFart2, cowFart3])
			.add([truckOut])
	});

});