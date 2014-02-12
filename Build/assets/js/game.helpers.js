// HELP PAUSE THE GAME ON TAB SWITCH ETC
// =====================================
var HELPER = {};

var hidden, visibilityChange; 
if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support 
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.mozHidden !== 'undefined') {
  hidden = 'mozHidden';
  visibilityChange = 'mozvisibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

HELPER.handleVisibilityChange = function() {
  if (document[hidden]) {
    GAME.pauseGame();
    $('#pause-toggle').text('SPELA');
  } else {
    // DONT WANNA UNPAUSE AUTOMATICALLY
    // GAME.resumeGame();
  }
};

HELPER.supportsLocalStorage = function() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
};