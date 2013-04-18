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

var persistenceQueue = new Array();

var gameObjects = null;
var hero = null;
var enemy = null;
var collidables = new Array();
var scenery = new Array();
var utilities = new Array();
var npc = new Array();
var dataOnNPC;
var npcIndex = new Array();
var npcMoved = new Array();
var npcFollowers = 0;
var groupup = 1;
var currentday = 0;

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
var ruleEngine = new RuleEngine();
var aiEngine = new AIEngine();
var abstracthistogram;
var npcproperty;
var DaysPassed = 0;

var parentMapName;
var abstractor;
var MAX_SCREEN_WIDTH = 480;
var MAX_SCREEN_HEIGHT = 480;
var debug=false;

function init() {
	mapGen.generate("cityA");
	menu.init();
	graph.init();
	minimap.init();
	message.flash('Oh snap - this flashy HUD is the SHIZZ!');
    canvasPieTimer.init(100,"hudCanvas");

    abstractor = new Abstractor();
    abstracthistogram=new DrawHistogram("debugCanvas");
    npcproperty=new NpcProperty("npcPropertyCanvas");

    //    ruleEngine.executeRule("attendService", hero);
    // var abstracthistogram=new DrawHistogram("debugCanvas");
    // abstracthistogram.updatehistogram();

    //ruleEngine.executeRule("attendService", hero);

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
                        menu.addMenuItems(npc[i].globalMenu);
                        menu.addMenuItems(npc[i].specialMenu); 
                        menu.drawMenu();
                        break;
                    }
            }
            }
            if(event.keyCode==69){
                var selectedItem = menu.selectItem();

              	for (var i in rules){
              		if (rules[i].title == selectedItem){
              			ruleEngine.executeRule(i, hero, 1);
                          canvasPieTimer.addtime(rules[i].cost);
              		}
              	}

              	menu.clearMenu();

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

function checkPersistenceQueue(){
	var now = new Date().getTime();
	for (var i=0; i<persistenceQueue.length; i++){
		if ((now - persistenceQueue[i].timeStamp) > 10000){
			//Compress and pop
			if (persistenceQueue[i].levelToCompressInto == 2){
				abstractor.compressIntoSecondLevel(persistenceQueue[i].npc);
			} else {
				abstractor.compressIntoThirdLevel(persistenceQueue[i].npc, persistenceQueue[i].parentMapName);
			}

			persistenceQueue.splice(i,1);
			i--;
		}
	}
}

function gameLoop() {
	// To get the frame rate
	requestAnimFrame(gameLoop);
    if(debug){
        abstracthistogram.updatehistogram();
        npcproperty. clearwriteNPCProperties();
        for(var i=0;i<npc.length;i++){  npcproperty.writeNPCProperties(npc[i]);}
    }

	//aiEngine.run();

	var now = Date.now();
	// calculate how long as passed since our last iteration
	var elapsed = now - lastUpdate;
	graph.update();

	canvas.width = gameW;
	canvas.height = gameH;
	var path = new Array();
	// Update the hero based upon how long it took for the game loop
	hero.update(elapsed / screenUpdateTime);
	hero.render();
	minimap.renderloc();
	
	perceptionCanvas.width = gameW;
	perceptionCanvas.height = gameH;
    
    checkPersistenceQueue();

    var index = 0;
	npcFollowers = 0;
	for (curNPC in npc) {
		if (npc[curNPC].destroyed) {
			// Update the player learning that enemy has been destroyed
			npc.splice(curNPC, 1);
		} else {
			var tempGrid = new Array();

			for (var x = 0; x < mapGen.columns; x++){
				tempGrid[x] = new Array();
				for (var y = 0; y < mapGen.rows; y++ ){
					tempGrid[x][y] = grid[y][x];
				}
			}

			for (var i =0; i<npc.length; i++){
				if (npc[curNPC] != npc[i]){
					tempGrid[npc[i].gridY][npc[i].gridX] = 1;
				}
			}

			//if ((npc[curNPC].gridX != npc[curNPC].targetGrid[0]) && (npc[curNPC].gridY != npc[curNPC].targetGrid[1])){
			// //tempGrid[hero.gridY][hero.gridX] = 1;
			path[index] = a_star(new Array(npc[curNPC].gridX, npc[curNPC].gridY),
				npc[curNPC].targetGrid, tempGrid, mapGen.rows, mapGen.columns, false);

			// 	// //path[index] = a_star(new Array(npc[curNPC].gridX, npc[curNPC].gridY), npc[curNPC].targetGrid, tempGrid, columns, rows, false);

				var nextPoint = path[index][1];

				if (nextPoint) {
					if (nextPoint.x > npc[curNPC].gridX && !npc[curNPC].keepMoving) {
						npc[curNPC].keys[0] = 39;
						npc[curNPC].lastKeyChange = Date.now();
					} else if (nextPoint.x < npc[curNPC].gridX && !npc[curNPC].keepMoving) {
						npc[curNPC].keys[0] = 37;
						npc[curNPC].lastKeyChange = Date.now();
					} else if (nextPoint.y > npc[curNPC].gridY && !npc[curNPC].keepMoving) {
						npc[curNPC].keys[0] = 40;
						npc[curNPC].lastKeyChange = Date.now();
					} else if (nextPoint.y < npc[curNPC].gridY && !npc[curNPC].keepMoving) {
						npc[curNPC].keys[0] = 38;
						npc[curNPC].lastKeyChange = Date.now();
					}
				}

				if (path[index].length == 2){
					npc[curNPC].keys.splice(0, 1);
				}
			//}
			
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
		
		if ((npc[curNPC].gridX >= (hero.gridX-2)) && (npc[curNPC].gridX <= (hero.gridX+2)) && (npc[curNPC].gridY >= (hero.gridY-2)) && (npc[curNPC].gridY <= (hero.gridY+2))){
			if (npc[curNPC].perception >= 5) {
				npc[curNPC].moveType = "follow";
				npc[curNPC].targetGrid[0] = hero.gridX + npcFollowers;
				npc[curNPC].targetGrid[1] = hero.gridY + npcFollowers;
			}
			npcFollowers++;
		}

		//unused movement stuff
		//if(npc[curNPC].moveType === "idle") {
			//npc[curNPC].targetGrid[0] = npc[curNPC].idleGrid[0] + 1;
			//npc[curNPC].targetGrid[1] = npc[curNPC].idleGrid[1] + 1;
			//npc[curNPC].gridX++ ;
			//npc[curNPC].gridY++ ;
		//}
		// if(groupup != 0) {
			// groupup++
			// npc[curNPC].targetGrid[0] = ;
			// if (groupup == npc.length-30) {
				// groupup = 0;

			// }
			
		// }
		// if (curNPC < 20) {
			// npc[curNPC].targetGrid[0] = npc[parseInt(curNPC)+10].idleGrid[0];
			// npc[curNPC].targetGrid[1] = npc[parseInt(curNPC)+10].idleGrid[1];
		// }
		// index++;
	}
	
	if (currentday != DaysPassed) {
		npcIndex.length = 0;
		currentday = DaysPassed;
		for (curNPC in npc) {
			var objs = {X: npc[curNPC].gridX, Y:npc[curNPC].gridY, ind:curNPC};
			npcIndex[curNPC] = objs;
			npcIndex.sort(compareX);
			npcIndex.sort(compareY);
		}
	}
	for (var n = 0; n < npc.length-2; n=n+2) {
		if (typeof npc[npcIndex[n].ind] === 'undefined') {
		}
		else if (npc[npcIndex[n].ind].moveType == "idle") {
			npc[npcIndex[n].ind].targetGrid[0] = npc[npcIndex[n+1].ind].gridX;
			npc[npcIndex[n].ind].targetGrid[1] = npc[npcIndex[n+1].ind].gridY;
		}
	}
	if (enemy != null){
		var tempGrid = new Array();
		var path;
		for (var x = 0; x < mapGen.columns; x++){
			tempGrid[x] = new Array();
			for (var y = 0; y < mapGen.rows; y++ ){
				tempGrid[x][y] = grid[y][x];
			}
		}

		for (var i =0; i<npc.length; i++){
			tempGrid[npc[i].gridY][npc[i].gridX] = 1;
		}

		// //tempGrid[hero.gridY][hero.gridX] = 1;
		path = a_star(new Array(enemy.gridX, enemy.gridY),
			enemy.targetGrid, tempGrid, mapGen.columns, mapGen.rows, false);

		// //path[index] = a_star(new Array(npc[curNPC].gridX, npc[curNPC].gridY), npc[curNPC].targetGrid, tempGrid, mapGen.rows, mapGen.columns, false);

		var nextPoint = path[1];

		if (nextPoint) {
			if (nextPoint.x > enemy.gridX && !enemy.keepMoving) {
				npc[curNPC].keys[0] = 39;
				npc[curNPC].lastKeyChange = Date.now();
			} else if (nextPoint.x < enemy.gridX && !enemy.keepMoving) {
				npc[curNPC].keys[0] = 37;
				npc[curNPC].lastKeyChange = Date.now();
			} else if (nextPoint.y > enemy.gridY && !enemy.keepMoving) {
				npc[curNPC].keys[0] = 40;
				npc[curNPC].lastKeyChange = Date.now();
			} else if (nextPoint.y < enemy.gridY && !enemy.keepMoving) {
				npc[curNPC].keys[0] = 38;
				npc[curNPC].lastKeyChange = Date.now();
			}
		}

		if (path.length == 2){
			enemy.keys.splice(0, 1);
		}
		enemy.update(elapsed / screenUpdateTime);
		enemy.render();
	}

	lastUpdate = now;
}


function debugFunction(){
   if(debug==true)

   {  debug=false;
       npcproperty. clearwriteNPCProperties();
       abstracthistogram.clearhistogram();
   }
    else
   {debug=true;}
}

function compareX(a,b) {
	if (a.X < b.X)
		return -1;
	if (a.X > b.X)
		return 1;
	return 0;
}

function compareY(a,b) {
	if (a.Y < b.Y)
		return -1;
	if (a.Y > b.Y)
		return 1;
	return 0;
}

function gathertoplayer() {
	var peeps = new Array();

	for (curNPC in npc) {
		if ((npc[curNPC].gridX >= (hero.gridX-3)) && (npc[curNPC].gridX <= (hero.gridX+3)) && (npc[curNPC].gridY >= (hero.gridY-3)) && (npc[curNPC].gridY <= (hero.gridY+3))){
			peeps.push(npc[curNPC]);
			npc[curNPC].moveType = "gather";
		} 
	}
	
	for (var i=0; i<peeps.length; i++) {
		if (peeps[i].moveType == "gather") {
			var posx = 0;
			var posy = 0;
			if (i%2 == 0) {
				posx = parseInt(i/2);
				posy = parseInt(i/2)
			} 
			else {
				posx = parseInt(-i/2);
				posy = parseInt(-i/2);
			}
			peeps[i].targetGrid[0] = parseInt(hero.gridX) + posx;
			peeps[i].targetGrid[1] = parseInt(hero.gridY) + posy;
		}
	}
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
