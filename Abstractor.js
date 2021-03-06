/**********************************************************************************************************************
Done by Salman Gadit 	(U095146E)
		Tan Sheng Di	(U095155N)
************************************************************************************************************************/

function Abstractor(){
	this.getPlayerPerception = function(){
		var a3 = abstract3.averagePlayerPerception();
		var a2 = abstract2.averagePlayerPerception();

		var a1sum = 0;
		var a1count = 0;
		for (var i =0; i< dataOnNPC.length; i++){
			if (dataOnNPC[i].perception > 2){
				a1sum += dataOnNPC[i].perception;
				a1count++;
			}
		}

		var a1 = a1sum/a1count;

		return (a1+a2+a3)/3;
	}

	this.getPlayerVotes = function(){
		var a3 = abstract3.playerPerception();
		var a2 = abstract2.playerPerception();

		var a1sum = 0;
		var a1count = 0;
		for (var i =0; i< dataOnNPC.length; i++){
			if (dataOnNPC[i].perception > 2){
				a1sum += dataOnNPC[i].perception;
				a1count++;
			}
		}

		var a1 = a1sum;

		return (a1+a2+a3);
	}

	this.getOpponentPerception = function(){
		var a3 = abstract3.averageOpponentPerception();	
		var a2 = abstract2.averagePlayerPerception();

		var a1sum = 0;
		var a1count = 0;
		for (var i =0; i< dataOnNPC.length; i++){
			if (dataOnNPC[i].perception < -2){
				a1sum += (-1*dataOnNPC[i].perception);
				a1count++;
			}
		}

		var a1 = a1sum/a1count;
		return (a1+a2+a3)/3;
	}

	this.getOpponentVotes = function(){
		var a3 = abstract3.opponentPerception();	
		var a2 = abstract2.opponentPerception();

		var a1sum = 0;
		var a1count = 0;
		for (var i =0; i< dataOnNPC.length; i++){
			if (dataOnNPC[i].perception < -2){
				a1sum += (-1*dataOnNPC[i].perception);
			}
		}

		var a1 = a1sum;
		return (a1+a2+a3);
	}

	this.compressIntoSecondLevel = function(data){
		abstract2.compressData(data);
	} 

	this.compressIntoThirdLevel = function(data, city){
		abstract3.compressData(data, city);
	}

	this.decompressFromThirdLevel = function(location){
		abstract3.decompressFor(location);
	}

	this.decompressFromSecondLevel = function(location){
		return abstract2.decompressFor(location);
	}

	this.renderNPCsforDataSet = function(data, location, persistent, npcInfo){
		var specialDone = false;
		if (persistent){
			npc = [];
			dataOnNPC = data;

			for (var i =0; i < npcInfo.length; i++){
				npc[i] = npcInfo[i];
			}

		} else {
			npc = [];
			dataOnNPC = data;

			var locationsArray = new Array();

			for (var i=0; i<parseInt(maps[location].attributes.height); i++){
				for (var j=0; j<parseInt(maps[location].attributes.width); j++){
					if ((gameObjects[maps[location].grid[i][j]].type != "scenery") &&
					 (gameObjects[maps[location].grid[i][j]].type != "collidable")){
						locationsArray.push([i,j]);
					}
				}
			}

			for (var i =0; i < data.length; i++){
				npc[i] = new heroObject();

				var pos = Math.floor((Math.random()*locationsArray.length));
						
				npc[i].width = 32;
				npc[i].height = 32;
				npc[i].x = (typeof(npc.x) != "undefined"? npc.x : locationsArray[pos][0] * 32);
				npc[i].y = (typeof(npc.y) != "undefined"? npc.y : locationsArray[pos][1] * 32);
				dataOnNPC[i].x = npc[i].x;
				dataOnNPC[i].y = npc[i].y;
				npc[i].gridX = npc[i].x / npc[i].width;
				npc[i].gridY = npc[i].y / npc[i].height;
				npc[i].idleGrid[0] = npc[i].gridX;
				npc[i].idleGrid[1] = npc[i].gridY;
				var objs = {X: npc[i].gridX, Y:npc[i].gridY, ind:i};
				npcIndex[i] = objs;
				npc[i].targetGrid = new Array(npc[i].gridX, npc[i].gridY);

				locationsArray.splice(pos, 1);

				npc[i].image = new Image();
				if (data[i].perception > 2){
					if (data[i].isMale){
						npc[i].image.src = 'images/characters/redMan32x32.png';
					} else {
						npc[i].image.src = 'images/characters/redWoman32x32.png';
					}
				} else if (data[i].perception > -2 && data[i].perception < 2){
					if (data[i].isMale){
						npc[i].image.src = 'images/characters/greenMan32x32.png';
					} else {
						npc[i].image.src = 'images/characters/greenWoman32x32.png';
					}
				} else {
					if (data[i].isMale){
						npc[i].image.src = 'images/characters/blueMan32x32.png';
					} else {
						npc[i].image.src = 'images/characters/blueWoman32x32.png';
					}
				}

				//push traits
				npc[i].perception = data[i].perception;
				npc[i].gullibility = data[i].gullibility;

			   	npc[i].isMale = data[i].isMale;
			   	npc[i].isHonest = data[i].isHonest;
			   	npc[i].isPotStirrer = data[i].isPotStirrer;
			   	npc[i].watchesTV = data[i].watchesTV;
			   	npc[i].isReligious = data[i].isReligious;
			   	npc[i].isGay = data[i].isGay;
			   	npc[i].isTraveler = data[i].isTraveler;
			   	npc[i].isSlut = data[i].isSlut;

			   	npc[i].location = data[i].location;
			   	npc[i].neighbourhood = data[i].neighbourhood;
				
				npc[i].image.index = i;
				npc[i].image.onload = function() {
					npc[this.index].render();
				};

				npc[i].type = "npc";

				//Populate special menu
				if (!specialDone){
					if (this.getSpecialMenu(npc[i], location)){
						specialDone = true;
					}
				}

			}
			npcIndex.sort(compareX);
			npcIndex.sort(compareY);
		}
	}

	

	this.getSpecialMenu = function(thenpc, location){
		var finishedSpecial = false;
		if (location == "house" && !(thenpc.isMale)){
			thenpc.specialMenu.push(rules["flirt"].title);
			thenpc.specialMenu.push(rules["sleepWith"].title);
		} else if (location == "mall"){
			thenpc.specialMenu.push(rules["buyShopping"].title);
		} else if (!finishedSpecial){
			switch (location){
				case "church":
					var idx = thenpc.image.index;
					npc[idx].image = new Image();
					npc[idx].image.index = idx;
					npc[idx].image.src = 'images/characters/specialNPC32x32.png';
					npc[idx].specialMenu.push(rules["attendService"].title);
					npc[idx].specialMenu.push(rules["breakBread"].title);
					npc[idx].image.onload = function() {
						npc[this.index].render();
					};
					npc[idx].type = "special";
					break;
					break;
				case "cc":
					var idx = thenpc.image.index;
					npc[idx].image = new Image();
					npc[idx].image.index = idx;
					npc[idx].image.src = 'images/characters/specialNPC32x32.png';
					npc[idx].specialMenu.push(rules["boostEconomy"].title);
					npc[idx].image.onload = function() {
						npc[this.index].render();
					};
					npc[idx].type = "special";
					break;
				case "bar":
					var idx = thenpc.image.index;
					npc[idx].image = new Image();
					npc[idx].image.index = idx;
					npc[idx].image.src = 'images/characters/specialNPC32x32.png';
					npc[idx].specialMenu.push(rules["buyDrinks"].title);
					npc[idx].image.onload = function() {
						npc[this.index].render();
					};
					npc[idx].type = "special";
					break;
				case "mediastation":
					var idx = thenpc.image.index;
					npc[idx].image = new Image();
					npc[idx].image.index = idx;
					npc[idx].image.src = 'images/characters/specialNPC32x32.png';
					npc[idx].specialMenu.push(rules["slanderAdspot"].title);
					npc[idx].specialMenu.push(rules["religiousAdspot"].title);
					npc[idx].specialMenu.push(rules["gayRightsAdspot"].title);
					npc[idx].image.onload = function() {
						npc[this.index].render();
					};
					npc[idx].type = "special";
					break;
				default:
					break;
			}

			finishedSpecial = true;
		}

		return finishedSpecial;
	}

	//First generation of abstractions
	var init = new Initialize();
	abstract3.createHistogramFromData(init.dataSet);
	this.decompressFromThirdLevel("cityA");

	//Abstract 2 is now generated. Time to test one level lower.
	var dataSet = this.decompressFromSecondLevel("city");
	this.renderNPCsforDataSet(dataSet, "cityA", false);
}