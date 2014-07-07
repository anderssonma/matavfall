DPLM = {};

// DATA SCHEME:
// SMM (Smart med Mat) _ TYPE (e.g. GAME, QUIZ-1, PRES) _ KEY (e.g. HIGHSCORE, CORRECT-ANSWERS) 

DPLM.paintGameData = function() {
	console.log('RE-RENDER GAMES DATA');
	var textScore = localStorage.getItem('SMM_GAME_HIGHSCORE') || 0;
	var textTime = localStorage.getItem('SMM_GAME_TIME') || 0;
	var textRecipes = localStorage.getItem('SMM_GAME_RECIPES') || 0;
	if (textScore === 0 || textTime === 0) {
		// PAINT GREY CIRCLE
		return false;
	}

	textTime = Math.round(textTime / 1000); // TO SECONDS
	console.log('S: ' + textScore +  ' || T: ' + textTime + ' || R: ' + textRecipes);
};

DPLM.paintStoryData = function() {
	console.log('RE-RENDER STORY DATA');
};

DPLM.paintPresData = function() {
	console.log('RE-RENDER PRESENTATION DATA');
};

DPLM.paintQuizData = function(which) {
	console.log(which);
	switch (which) {
		case 'quiz-1':
			// SET QUIZ 1 OPTIONS LIKE TOP/LEFT & # CORRECT ANSWERS
			console.log('RE-RENDER QUIZ 1');
			break;
		case 'quiz-2':
			// SET QUIZ 2 OPTIONS LIKE TOP/LEFT & # CORRECT ANSWERS
			console.log('RE-RENDER QUIZ 2');
			break;
		case 'quiz-3':
			// SET QUIZ 3 OPTIONS LIKE TOP/LEFT & # CORRECT ANSWERS
			console.log('RE-RENDER QUIZ 3');
			break;
	}
};

$(document).ready(function() {
	$('#diploma').on('rerender', function(e, source) {
		var type = source.split('-')[0];
		console.log(type);
		switch (type) {
			case 'game':
				DPLM.paintGameData();
				break;
			case 'story':
				DPLM.paintStoryData();
				break;
			case 'pres':
				DPLM.paintPresData();
				break;
			case 'quiz':
				DPLM.paintQuizData(source);
				break;
		}
	});

	$('#diploma').trigger('rerender', ['game']);
});