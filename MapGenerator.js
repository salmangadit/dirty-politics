function MapGenerator(){
	initGameBoard();

	//Current map properties
	this.gameW = 800;
	this.gameH = 600;
	this.tileSize = 0;
	this.baseColor = "";

	this.map = null;
	this.rows = 0;
	this.columns = 0;

	// array to hold all of the collidable objects we have
	var collidables = new Array();
	// array to hold all the non-collidable objects we have
	var scenery = new Array();

	this.generate = function(mapName){
		initCanvas(mapName);
		initGameTiles();
	}

	function initGameBoard() {
		curItem = null;
		gameObjects = new Array();

		for (var i = 0; i<objects.length; i++) {
			var index = objects[i].id;
			// create a new game object to hold the details
			gameObjects[index] = new gameObject();
			gameObjects[index].width = parseInt(objects[i].width);
			gameObjects[index].height = parseInt(objects[i].height);
			gameObjects[index].imageSrc = objects[i].src;
			gameObjects[index].type = objects[i].type;
		}
	}

	function initCanvas(mapName) {
		initGrid(mapName);

		canvas = document.getElementById("mainCanvas");
		context = canvas.getContext("2d");

		baseCanvas = document.getElementById("baseCanvas");
		baseContext = baseCanvas.getContext("2d");
		
		// set the width and height of the canvas
		canvas.width = this.gameW;
		canvas.height = this.gameH;

		// set the width and height of the baseCanvas
		baseCanvas.width = this.gameW;
		baseCanvas.height = this.gameH;
		
		baseContext.fillStyle = baseColor;

		// fill the entire baseContext with the color
		baseContext.fillRect(0, 0, this.gameW, this.gameH);
	}	

	function initGrid(mapName){
		map = maps[mapName];
		this.tileSize = parseInt(map.attributes.tileSize);
		this.gameW = parseInt(map.attributes.width) * this.tileSize;
		this.gameH = parseInt(map.attributes.height) * this.tileSize;
		this.baseColor = map.attributes.baseColor;
	}

	function initGameTiles(mapName) {

		var collidableCount = 0;
		var enemyCount = 0;
		var sceneryCount = 0;

		//Load in grid rows
		for (var i=0; i<map.grid.length; i++){
			//Load row by row
			grid[i] = new Array();
			for (var j=0; j<map.grid[j].length; j++){
				var objIndex = map.grid[j];
				this.columns = map.grid[j].length;
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
					collidables[collidableCount].x = (j * tileSize) + 2;
					collidables[collidableCount].y = (i * tileSize) + 2;
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
					scenery[sceneryCount].x = j * tileSize;
					scenery[sceneryCount].y = i * tileSize;

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
					//0 is for mainCharacter
					hero = new heroObject();
					hero.width = gameObjects[objIndex].width;
					hero.height = gameObjects[objIndex].height;
					hero.x = j * tileSize;
					hero.y = i * tileSize;
					hero.gridX = hero.x / hero.width;
					hero.gridY = hero.y / hero.height;
					hero.image = new Image();
					// set it's image to the proper src URL
					hero.image.src = gameObjects[objIndex].imageSrc;
					// once the image has completed loading, render it to the screen
					hero.image.onload = function() {
						hero.render();
					};
				}
			}
		}
	}
}