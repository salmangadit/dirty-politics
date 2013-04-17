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

	var halfDays = 0;

	var ratioDays = 0;
	var latestDone = 0;
	var ratio = 4;

	// Things to note about AI
	// First 10 days he is roaming around just chatting up people. Make sure this is possible all 3 abstracts
	// If he is in the same map as player, physically render and having chatting people up. Movements can be random.
	// Think for building entry also
	// Adspot flash on day 5 (all still rather random)
	this.run = function(){
		halfDays = parseInt(2*(canvasPieTimer.timeElapsed/ canvasPieTimer.oneDay));
		ratioDays = parseInt(ratio*(canvasPieTimer.timeElapsed/ canvasPieTimer.oneDay));

		if (halfDays < 20){
			var location = firstTenDays[halfDays];
			this.moveToLocation(location);

			var probableEvent = Math.floor(Math.random()*simpleActs.length);
			// Do simple things in the first ten days
			ruleEngine.executeRule(simpleActs[probableEvent], enemy, this.enemyLevelToPlayer);

			// Check for day 5 and put adspot
			if (halfDays == 10){
				message.flash('Opponent ran a slander campaign against you!');
				ruleEngine.executeRule("slanderAdspot", enemy, this.enemyLevelToPlayer);
			}
		} 

		if (ratioDays > latestDone){
			var playerStateRatio = (-1*abstractor.getPlayerPerception())/abstractor.getOpponentPerception();

			if (playerStateRatio > .75) {
				var probableEvent = Math.floor(Math.random()*bigTickets.length);
				var action = bigTickets[probableEvent];
				ratio = 8;
				message.flash(rules[action].message);
				ruleEngine.executeRule(action, enemy, this.enemyLevelToPlayer);

			} else if (playerStateRatio > .5){
				var eventType = Math.random() < .75? 1 : 2;
				var probableEvent = Math.floor(Math.random()*(eventType == 1? bigTickets.length : simpleActs.length));
				var action = eventType == 1? bigTickets[probableEvent] : simpleActs[probableEvent];
				ratio = 4;
				if (eventType==1){
					message.flash(rules[action].message);
				}
				ruleEngine.executeRule(action, enemy, this.enemyLevelToPlayer);


			} else if (playerStateRatio >.25){
				var eventType = Math.random() < .5? 1 : 2;
				var probableEvent = Math.floor(Math.random()*(eventType == 1? bigTickets.length : simpleActs.length));
				var action = eventType == 1? bigTickets[probableEvent] : simpleActs[probableEvent];
				ratio = 4;
				if (eventType==1){
					message.flash(rules[action].message);
				}
				ruleEngine.executeRule(action, enemy, this.enemyLevelToPlayer);
			} else {
				var eventType = Math.random() < .25? 1 : 2;
				var probableEvent = Math.floor(Math.random()*(eventType == 1? bigTickets.length : simpleActs.length));
				var action = eventType == 1? bigTickets[probableEvent] : simpleActs[probableEvent];
				ratio = 2;
				if (eventType==1){
					message.flash(rules[action].message);
				}
				ruleEngine.executeRule(action, enemy, this.enemyLevelToPlayer);
			}

			latestDone = ratioDays;
		}
	}

	this.initialiseAtPosition = function(x,y){
		enemy.x = x;
		enemy.y = y;
		enemy.gridX = enemy.x / enemy.width;
		enemy.gridY = enemy.y / enemy.height;
		enemy.type = "enemy";
		enemy.render();
	}

	this.init = function(){
		enemy = new heroObject();
		enemy.width = 32;
		enemy.height = 32;
		enemy.image = new Image();
		// set it's image to the proper src URL
		enemy.image.src = 'images/characters/rival32x32.png';
		// once the image has completed loading, render it to the screen
		enemy.image.onload = function() {
			//enemy.render();
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

	this.init();


}