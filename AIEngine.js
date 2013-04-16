function AIEngine(){
	this.currentCity = "cityC";
	this.currentLocation;
	this.spawnAI = false;
	this.enemyLevelToPlayer = 1;

	var firstTenDays = ["cityC", "cityA", "cityB", "cityA", "cityC", "cityB", 
	"cityA", "cityC", "cityA", "cityC", "cityB", "cityA", "cityB", "cityA", "cityC", "cityB", 
	"cityA", "cityC", "cityA", "cityC"];

	var simpleActs = ["promise", "flirt", "breakBread", "boostEconomy", "slanderAdspot", "buyShopping", "buyDrinks"];

	var bigTickets = ["truth", "lie", "sleepWith", "attendService", "religiousAdspot", "gayRightsAdspot"];

	// Things to note about AI
	// First 10 days he is roaming around just chatting up people. Make sure this is possible all 3 abstracts
	// If he is in the same map as player, physically render and having chatting people up. Movements can be random.
	// Think for building entry also
	// Adspot flash on day 5 (all still rather random)
	this.run = function(){
		var halfDays = parseInt(2*(canvasPieTimer.timeElapsed/ canvasPieTimer.oneDay));

		if (halfDays < 20){
			var location = firstTenDays[halfDays];
			this.moveToLocation(location);

			// Do simple things in the first ten days

		}
	}




	this.initialiseAtPosition = function(x,y){
		enemy = new heroObject();
		enemy.width = 32;
		enemy.height = 32;
		enemy.x = x;
		enemy.y = y;
		enemy.gridX = enemy.x / enemy.width;
		enemy.gridY = enemy.y / enemy.height;
		enemy.image = new Image();
		// set it's image to the proper src URL
		enemy.image.src = 'images/characters/rival32x32.png';
		// once the image has completed loading, render it to the screen
		enemy.image.onload = function() {
			enemy.render();
			//enemy.render();
		};

		enemy.type = "enemy";
	}

	this.moveToLocation = function(location){
		//Check if player is there, if so, spawn.
		if ((location == parentMapName) || (hero.location == location)){
			//Spawn!
			this.spawnAI = true;

			if (location == parentMapName){
				this.enemyLevelToPlayer = 2;
			}
			if (hero.location == location){
				this.enemyLevelToPlayer = 1;
			}
		} else {
			this.enemyLevelToPlayer = 3;
		} 

		this.currentLocation = "city";
		this.currentCity = location;
	}


}