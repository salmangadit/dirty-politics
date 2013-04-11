function MapGenerator(){
	this.tileSize = 0;
	this.baseColor = "";

	this.map = null;
	this.rows = 0;
	this.columns = 0;
	this.parentMapName = "";
	this.parentPosX = -1;
	this.parentPosY = -1;
	this.currMapName = "";

	this.generate = function(mapName){
		this.currMapName = mapName; 
		collidables = [];
		scenery = [];
		this.initGameBoard();
		this.initCanvas(mapName);
		this.initGameTiles();
	};

	this.initGameBoard = function() {
		gameObjects = new Array();

 		for (var obj in objects){
 			var index = objects[obj].id;
			// create a new game object to hold the details
			gameObjects[index] = new gameObject();
			gameObjects[index].width = parseInt(objects[obj].width);
			gameObjects[index].height = parseInt(objects[obj].height);
			gameObjects[index].imageSrc = objects[obj].src;
			gameObjects[index].type = objects[obj].type;
 		}
	};

	this.initCanvas = function(mapName) {
		this.initGrid(mapName);

		canvas = document.getElementById("mainCanvas");
		context = canvas.getContext("2d");

		baseCanvas = document.getElementById("baseCanvas");
		baseContext = baseCanvas.getContext("2d");

		messageCanvas = document.getElementById("messageCanvas");
		messageContext = messageCanvas.getContext("2d");

		// set the width and height of the canvas
		canvas.width = gameW;
		canvas.height = gameH;

		// set the width and height of the baseCanvas
		baseCanvas.width = gameW;
		baseCanvas.height = gameH;
		
		var wrapper = document.getElementById('canvasWrapper');

		messageCanvas.width = (gameW > wrapper.clientWidth ? wrapper.clientWidth : gameW);
		messageCanvas.height = (gameH > wrapper.clientHeight ? wrapper.clientHeight : gameH);
		
		baseContext.fillStyle = this.baseColor;

		// fill the entire baseContext with the color
		baseContext.fillRect(0, 0, gameW, gameH);
	};

	this.initGrid = function(mapName){
		this.map = maps[mapName];
		this.tileSize = parseInt(this.map.attributes.tileSize);
		gameW = parseInt(this.map.attributes.width) * this.tileSize;
		gameH = parseInt(this.map.attributes.height) * this.tileSize;
		this.baseColor = this.map.attributes.baseColor;
	};

	this.initGameTiles = function(mapName) {
		var collidableCount = 0;
		var enemyCount = 0;
		var sceneryCount = 0;
		var utilsCount = 0;

		//Load in grid rows
		for (var i=0; i<parseInt(this.map.attributes.height); i++){
			//Load row by row
			grid[i] = new Array();
			for (var j=0; j<this.map.grid[i].length; j++){
				var objIndex = this.map.grid[i][j];
				this.columns = this.map.grid[i].length;
				if (gameObjects[objIndex].type == "collidable") {
					grid[i][j] = 1;
				} else {
					grid[i][j] = 0;
				}

				if (gameObjects[objIndex].type == "collidable") {
					// Create a new static object
					collidables[collidableCount] = new staticObject();
					// load in the width and height
					collidables[collidableCount].width = gameObjects[objIndex].width;
					collidables[collidableCount].height = gameObjects[objIndex].height;
					// position it based upon where we are in the grid
					collidables[collidableCount].x = (j * this.tileSize) + 2;
					collidables[collidableCount].y = (i * this.tileSize) + 2;
					collidables[collidableCount].gridX = j;
					collidables[collidableCount].gridY = i;
					// set up the image to use the value loaded from the XML
					collidables[collidableCount].image = new Image();
					collidables[collidableCount].image.src = gameObjects[objIndex].imageSrc;
					// we are storing out the index of this object, to make sure we can
					// render it once it has loaded
					collidables[collidableCount].image.index = collidableCount;
					collidables[collidableCount].image.onload = function() {
						collidables[this.index].render();
					};
					collidableCount++;
				} else if (gameObjects[objIndex].type == "scenery") {
					// Create a new static object
					scenery[sceneryCount] = new staticObject();
					// load in the width and height
					scenery[sceneryCount].id = sceneryCount;
					scenery[sceneryCount].width = gameObjects[objIndex].width;
					scenery[sceneryCount].height = gameObjects[objIndex].height;
					// position it based upon where we are in the grid
					scenery[sceneryCount].x = j * this.tileSize;
					scenery[sceneryCount].y = i * this.tileSize;

					// set up the image to use the value loaded from the XML
					scenery[sceneryCount].image = new Image();
					scenery[sceneryCount].image.src = gameObjects[objIndex].imageSrc;
					// we are storing out the index of this object, to make sure we can
					// render it once it has loaded
					scenery[sceneryCount].image.index = sceneryCount;
					scenery[sceneryCount].image.onload = function() {
						scenery[this.index].render();
					};

					var sceneryType = "";
					switch(objIndex){
						case "H":
							sceneryType = "house";
							break;
						case "n": //media center
							sceneryType = "house";
							break;
						case "c": //church
							sceneryType = "church";
							break;
						case "s": //shopping mall
							sceneryType = "mall";
							break;
						case "a": //plane to cityA
							sceneryType = "cityA";
							break;
						case "b": //plane to cityB
							sceneryType = "cityB";
							break;
						case "d": //plane to cityC
							sceneryType = "cityC";
							break;
						case "e": //community center
							sceneryType = "cc";
							break;
						case "D":
							sceneryType = "door";
							break;
						default:
							break;
					}

					scenery[sceneryCount].type = sceneryType;
					sceneryCount++;

				} else if (gameObjects[objIndex].type == "utilities") {
					// Create a new static object
					utilities[utilsCount] = new staticObject();
					// load in the width and height
					utilities[utilsCount].id = utilsCount;
					utilities[utilsCount].width = gameObjects[objIndex].width;
					utilities[utilsCount].height = gameObjects[objIndex].height;
					// position it based upon where we are in the grid
					utilities[utilsCount].x = j * this.tileSize;
					utilities[utilsCount].y = i * this.tileSize;

					// set up the image to use the value loaded from the XML
					utilities[utilsCount].image = new Image();
					utilities[utilsCount].image.src = gameObjects[objIndex].imageSrc;
					// we are storing out the index of this object, to make sure we can
					// render it once it has loaded
					utilities[utilsCount].image.index = utilsCount;
					utilities[utilsCount].image.onload = function() {
						utilities[this.index].render();
					};

					utilsCount++;

				} else if (gameObjects[objIndex].type == "player") {
					hero = new heroObject(0);
					hero.width = gameObjects[objIndex].width;
					hero.height = gameObjects[objIndex].height;
					hero.x = j * this.tileSize;
					hero.y = i * this.tileSize;
					hero.gridX = hero.x / hero.width;
					hero.gridY = hero.y / hero.height;
					hero.image = new Image();
					// set it's image to the proper src URL
					hero.image.src = gameObjects[objIndex].imageSrc;
					// once the image has completed loading, render it to the screen
					hero.image.onload = function() {
						hero.render();
						//hero.render();
					};

					if ((this.parentPosX >= 0 || this.parentPosY >= 0)&&(this.currMapName.indexOf("city") != -1)){
						hero.x = this.parentPosX;
						hero.y = this.parentPosY;

						this.parentPosX = -1;
						this.parentPosY = -1;
					}
				}
			}
		}
		this.rows = grid.length;
	};
}