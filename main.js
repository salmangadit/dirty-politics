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


var parentMapName;
var abstractor;
var MAX_SCREEN_WIDTH = 480;
var MAX_SCREEN_HEIGHT = 480;


function init() {
	mapGen.generate("cityA");
	menu.init();
	graph.init();
	minimap.init();
	message.flash('Oh snap - this flashy HUD is the SHIZZ!');
    canvasPieTimer.init(100,"hudCanvas");

    abstractor = new Abstractor();


    var abstracthistogram=new DrawHistogram("debugCanvas");
    abstracthistogram.updatehistogram();

//    ruleEngine.executeRule("attendService", hero);

	//setInterval(gameLoop, screenUpdateTime);
	gameLoop();

	document.addEventListener('keydown', function(event) {
		/* check if the key being pressed is one of the arrow keys --
		*   37 =lEFT, 38=UP,39=RIGHT, 40=DOWN
		*   32=SPACE, 87=W(up),83=S(down) 69=E
		*/
		if ((event.keyCode < 41 && event.keyCode > 36)||event.keyCode == 32||event.keyCode==87||event.keyCode==83||event.keyCode==69 ) {
			// block the default browser action for the arrow keys
			event.preventDefault();

			// check to see if this key is already in the array
			// of keys being pressed, if not add it to the array
			//curKey = $.inArray(event.keyCode, hero.keys);
			if (hero.keys.indexOf(event.keyCode) == -1)
				//hero.keys.push(event.keyCode);
				hero.keys[0] = (event.keyCode);

            /*****************************************************
             * Added by renga for menu choices
             * Should be moved to main loop
             */
             if(event.keyCode==87){
                 // move the pointer up
                  menu.previousItem();
             }
   			 if(event.keyCode==83) {
                 // move the pointer down
             	menu.nextItem();
             }
            if(event.keyCode==32){

            for(var i=0;i<npc.length;i++)
            {
                //check the distance between player and npc,if at least 2 cells away then execute the action
                //if 2 npcs close to gether just choose one of the npc
              //Whichever is first on the list
                if(checkPlayerFromNpc(hero,npc[i])&&checkPlayerFacingNPC(hero,npc[i]) )
                    {
                        menu.clearMenu();
                        menu.addMenuItems(hero.globalMenu);
                        menu.drawMenu();
                        break;
                    }
            }
            }
            if(event.keyCode==69){

                menu.clearMenu();
                console.log("execute action");


                }


        }
	});

	document.addEventListener('keyup', function(event) {
		
		
		/* check if the key being pressed is one of the arrow keys --
        *   37 =lEFT, 38=UP,39=RIGHT, 40=DOWN
            *   32=SPACE, 87=W(up),83=S(down)*/
		if ((event.keyCode < 41 && event.keyCode > 36) ||event.keyCode == 32||event.keyCode==87||event.keyCode==83) {
			event.preventDefault();

			// check to see if this key is already in the array
			// of keys being pressed, if so remove it from the array
			//curKey = $.inArray(event.keyCode, hero.keys);
			if (hero.keys.indexOf(event.keyCode) > -1 && !hero.keepMoving) 
				hero.keys.splice(hero.keys.indexOf(event.keyCode), 1);


		}
	});
}
function checkPlayerFacingNPC(player,npc){
    if(player.facingWhichDirection=="up"&&npc.facingWhichDirection=="down")
    {return true;}
    else if(player.facingWhichDirection=="left"&&npc.facingWhichDirection=="right")
    {return true;}
    else if(player.facingWhichDirection=="right"&&npc.facingWhichDirection=="left")
    {return true;}
    else if(player.facingWhichDirection=="down"&&npc.facingWhichDirection=="up")
    {return true;}
    return false;
}
function checkPlayerFromNpc(player,npc) {
    var checkdistance=32*2;

    var x_p1 = npc.x;
    var y_p1 = npc.y;
    var x_p2 = player.x;
    var y_p2 = player.y;

    var distanceSquared = Math.pow((x_p1-x_p2),2) + Math.pow((y_p1-y_p2),2);

    var distance = Math.sqrt(distanceSquared);

    if(distance<=checkdistance)
        return true;
    else
        return false;
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
