var FPS = 30;
var screenUpdateTime = 1000/FPS;

var canvas;
var context;
var baseCanvas;
var baseContext;

var gameObjects = null;

var debugMode = false;
var grid = new Array();

function init() {

	//setInterval(gameLoop, screenUpdateTime);
	gameLoop();

	document.addEventListener('keydown', function(event) {
		
		// check if the key being pressed is one of the arrow keys -- 
		// 80 is the p key (punch), 75 is k (kick), 82 is r (rescue)
		if ((event.keyCode < 41 && event.keyCode > 36) || event.keyCode == 80 || 
			event.keyCode == 75 || event.keyCode == 82 || event.keyCode == 68 || 
			event.keyCode == 79	|| event.keyCode == 67) {
			// block the default browser action for the arrow keys
			event.preventDefault();

			// check to see if this key is already in the array
			// of keys being pressed, if not add it to the array
			//curKey = $.inArray(event.keyCode, hero.keys);
			if (hero.keys.indexOf(event.keyCode) == -1)
				//hero.keys.push(event.keyCode);
				hero.keys[0] = (event.keyCode);
		}
	});

	document.addEventListener('keyup', function(event) {
		
		
		// check if the key being pressed is one of the arrow keys -- 
		// 80 is the p key (punch), 75 is k (kick), 82 is r (rescue)
		if ((event.keyCode < 41 && event.keyCode > 36) || event.keyCode == 80 || event.keyCode == 75 || event.keyCode == 82 || event.keyCode == 68) {
			event.preventDefault();

			// check to see if this key is already in the array
			// of keys being pressed, if so remove it from the array
			//curKey = $.inArray(event.keyCode, hero.keys);
			if (hero.keys.indexOf(event.keyCode) > -1 && !hero.keepMoving) 
				hero.keys.splice(hero.keys.indexOf(event.keyCode), 1);
		}
	});
}

function gameLoop() {
	//gameOverContext.clearRect(0,0,gameOverCanvas.width, gameOverCanvas.height);
	// To get the frame rate
	requestAnimFrame(gameLoop);
	canvas.width = gameW;
	canvas.height = gameH;
}

// For the windows request animation frame thing
window.requestAnimFrame = (function(){

	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 30);
			};
})();


// For the rendering, but how to call this function?

/*
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }
    if(!window.requestAnimationFrame)
        window.requestAnimationFrame = 
    		function(callback, element) {
            	var currTime = new Date().getTime();
            	var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            	var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              		timeToCall);
            	lastTime = currTime + timeToCall;
            	return id;
    		};

    if(!window.cancelAnimationFrame)
        window.cancelAnimationFrame = 
    		function(id) {
            	clearTimeout(id);
        	};
}());
*/
