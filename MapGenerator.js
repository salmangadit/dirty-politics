function MapGenerator(){
	this.tileSize = 0;
	this.baseColor = "";

	this.map = null;
	this.rows = 0;
	this.columns = 0;

	this.generate = function(mapName){
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
		
		// set the width and height of the canvas
		canvas.width = gameW;
		canvas.height = gameH;

		// set the width and height of the baseCanvas
		baseCanvas.width = gameW;
		baseCanvas.height = gameH;
		
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
					sceneryCount++;
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
				}
			}
		}
		this.rows = grid.length;
	};
}