var FPS = 30;
var screenUpdateTime = 1000/FPS;

var canvas;
var context;
var baseCanvas;
var baseContext;
var menuCanvas;
var menuContext;
var messageCanvas;
var messageContext;
var locationCanvas;
var locationContext;

var gameObjects = null;
var hero = null
var collidables = new Array();
var scenery = new Array();
var utilities = new Array();

var gameW;
var gameH;

var debugMode = false;
var grid = new Array();
var lastUpdate = null;

var mapGen = new MapGenerator();
var menu = new MenuGenerator();
var message = new Messager();
var graph = new MileageGraph();
var minimap = new MiniMap();

var MAX_SCREEN_WIDTH = 480;
var MAX_SCREEN_HEIGHT = 480;

function init() {
	mapGen.generate("cityA");
	menu.init();
	graph.init();
	minimap.init();

	message.flash('Oh snap - this flashy HUD is the SHIZZ!');
    canvasPieTimer.init(100,"hudCanvas");


	setInterval(gameLoop, screenUpdateTime);
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
	// To get the frame rate
	requestAnimFrame(gameLoop);

	var now = Date.now();
	// calculate how long as passed since our last iteration
	var elapsed = now - lastUpdate;

	canvas.width = gameW;
	canvas.height = gameH;

	// Update the hero based upon how long it took for the game loop
	hero.update(elapsed / screenUpdateTime);
	hero.render();
	lastUpdate = now;
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
