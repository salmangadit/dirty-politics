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
var hudCanvas;
var hudContext;
var perceptionCanvas;
var perceptionContext;
var perceptionImage;

var gameObjects = null;
var hero = null
var collidables = new Array();
var scenery = new Array();
var utilities = new Array();
var npc = new Array();
var dataOnNPC;

var abstract3 = new Histogram(3);
var abstract2 = new Histogram(2);

var gameW;
var gameH;
var cityname;

var debugMode = false;
var grid = new Array();
var lastUpdate = null;

var mapGen = new MapGenerator();
var menu = new MenuGenerator();
var message = new Messager();
var graph = new MileageGraph();
var minimap = new MiniMap();
var abstractor;

var MAX_SCREEN_WIDTH = 480;
var MAX_SCREEN_HEIGHT = 480;

function init() {
	mapGen.generate("cityA");
	var items =  ["item1", "item2"];
	menu.init();
	menu.addMenuItems(items);
	menu.drawMenu();
	graph.init();
	minimap.init();
	message.flash('Oh snap - this flashy HUD is the SHIZZ!');
    canvasPieTimer.init(100,"hudCanvas");

    abstractor = new Abstractor();

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
	// To get the frame rate
	requestAnimFrame(gameLoop);

	var now = Date.now();
	// calculate how long as passed since our last iteration
	var elapsed = now - lastUpdate;
	graph.update();

	canvas.width = gameW;
	canvas.height = gameH;

	// Update the hero based upon how long it took for the game loop
	hero.update(elapsed / screenUpdateTime);
	hero.render();
	minimap.renderloc();
	
	perceptionCanvas.width = gameW;
	perceptionCanvas.height = gameH;

	var index = 0;	
	for (curNPC in npc) {
		if (npc[curNPC].destroyed) {
			// Update the player learning that enemy has been destroyed
			npc.splice(curNPC, 1);
		} else {
			// //testing out of the targetGrid system
			// var tempGrid = new Array();

			// for (var x = 0; x < rows; x++){
			// 	tempGrid[x] = new Array();
			// 	for (var y = 0; y < columns; y++ ){
			// 		tempGrid[x][y] = grid[x][y];
			// 	}
			// }

			// for (var i =0; i<npc.length; i++){
			// 	if (npc[curNPC] != npc[i]){
			// 		tempGrid[npc[i].gridY][npc[i].gridX] = 1;
			// 	}
			// }

			// for (var i = 0; i < ladies.length; i++) {
			// 		tempGrid[ladies[i].gridY][ladies[i].gridX] = 1;
			// }

			// //tempGrid[hero.gridY][hero.gridX] = 1;
			// path[index] = a_star(new Array(npc[curNPC].gridX, npc[curNPC].gridY),
			// npc[curNPC].targetGrid, tempGrid, columns, rows, false);

			// //path[index] = a_star(new Array(npc[curNPC].gridX, npc[curNPC].gridY), npc[curNPC].targetGrid, tempGrid, columns, rows, false);

			// var nextPoint = path[index][1];

			// if (nextPoint) {
			// 	if (nextPoint.x > npc[curNPC].gridX && !npc[curNPC].keepMoving) {
			// 		npc[curNPC].keys[0] = 39;
			// 		npc[curNPC].lastKeyChange = Date.now();
			// 	} else if (nextPoint.x < npc[curNPC].gridX && !npc[curNPC].keepMoving) {
			// 		npc[curNPC].keys[0] = 37;
			// 		npc[curNPC].lastKeyChange = Date.now();
			// 	} else if (nextPoint.y > npc[curNPC].gridY && !npc[curNPC].keepMoving) {
			// 		npc[curNPC].keys[0] = 40;
			// 		npc[curNPC].lastKeyChange = Date.now();
			// 	} else if (nextPoint.y < npc[curNPC].gridY && !npc[curNPC].keepMoving) {
			// 		npc[curNPC].keys[0] = 38;
			// 		npc[curNPC].lastKeyChange = Date.now();
			// 	}
			// }

			// if (path[index].length == 2){
			// 	npc[curNPC].keys.splice(0, 1);
			// }
			
			// Update the enemy based upon how long it took for the game loop
			npc[curNPC].update(elapsed / screenUpdateTime);

		// draw the enemy to the screen again
		}
		
		if(npc[curNPC] != null){
			npc[curNPC].render();
			var perc_x = npc[curNPC].x;
			var perc_y = npc[curNPC].y < npc[curNPC].height ? (npc[curNPC].y + npc[curNPC].height) : (npc[curNPC].y - npc[curNPC].height);
			perceptionContext.drawImage(perceptionImage, perc_x, perc_y);
			perceptionContext.fillStyle = 'white'
			perceptionContext.font = "10px Consolas";
        	perceptionContext.fillText(Math.round(npc[curNPC].perception*10)/10,perc_x+7,perc_y+15);
		}

		index++;
	}

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
