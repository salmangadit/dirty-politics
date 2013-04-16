// Engine takes in variables and modifies the perception
function RuleEngine(){
	this.rule;
	this.executeRule = function(rule, actionNPC){
		this.rule = rule;
		var ruleType = rules[rule].type;
		var probSuccess = rules[rule].probSuccess;

		if (ruleType == "direct"){
			this.direct(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, probSuccess);
		} else if (ruleType == "oneToOne"){
			this.oneToOne(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, probSuccess);
		} else if (ruleType == "neighbourhood"){
			this.neighbourhood(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, probSuccess);
		} else if (ruleType == "intraMap"){
			this.intraMap(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, probSuccess);
		}
	}

	//Executing a rule
	// 1. Check whether successful
	// 2. Find out choice of NPC's by following the traits and the specifics of the rule
	// 3. If successful, deltaPerception = effectSuccess * gullibility
	// 4. else deltaPerception =  effectFailure * gullibility

	//INTRA MAP: All characters on map meeting probability requirements feel effect
	this.intraMap = function(location, actionNPC, level, effectSuccess, effectFailure, probSuccess){
		var isSuccess;

        for (var i =0; i< npc.length; i++){
			if (probSuccess == "special"){
				switch (this.rule){
					case "boostEconomy": 
						if (npc[i].gullibility > 0.5){
							probSuccess = 0.7;
						} else {
							probSuccess = 0.2;
						}
						break;
					case "buyShopping": 
						if (npc[i].isHonest){
							probSuccess = 0.2;
						} else {
							probSuccess = 0.8;
						}
						break;
				}
			}
        	isSuccess = (Math.random() < probSuccess ? true: false);
        	
    		npc[i].perception += (isSuccess ? effectSuccess*npc[i].gullibility :
        			(effectFailure*npc[i].gullibility));
        
        }
	}

	// DIRECT: One point of spread direct to a certain type of trait or location? Depending on level effect varies
	this.direct = function(location, actionNPC, level, effectSuccess, effectFailure, probSuccess){
		var isSuccess;
		var abstractChosen = (level == 2) ? abstract2 : abstract3;
		var chosenLocation = (level == 2) ? location : "world";

		for (var i =0 ; i<abstractChosen.binsList.length; i++){
			var housesPerBin;
			if (chosenLocation == "world"){
				housesPerBin = (abstractChosen.binsList[i].binHeight);
			} else {
				housesPerBin = parseInt(abstractChosen.binsList[i].mapper[location]);
			}

			var gull = abstractChosen.binsList[i].getDecompressedGullibilities(0, 1, housesPerBin);
			for (var j = 0; j < housesPerBin; j++){
				//See if it hits a match for whoever is watching TV
				if (chosenLocation == "world"? Math.random() > abstractChosen.binsList[i].isReligious : 
					Math.random() > abstractChosen.binsList[i].watchesTV){
					continue;
				} else {
					var tv = Math.random() < abstractChosen.binsList[i].watchesTV? true:false;
					var relig = Math.random() < abstractChosen.binsList[i].isReligious? true:false;
					var gay = Math.random() < abstractChosen.binsList[i].isGay? true:false;
					if (probSuccess == "special"){
						switch (this.rule){
							case "slanderAdspot":
								if ((abstractor.getOpponentPerception() > abstractor.getPlayerPerception())
									&& tv){
									probSuccess = 0.5;
								} else if (tv){
									probSuccess = 0.7;
								} else {
									probSuccess = 0;
								}
								break;
							case "religiousAdspot":
								if (relig && tv){
									probSuccess = 0.8;
								} else if (tv){
									probSuccess = 0.6;
								} else {
									probSuccess = 0;
								}
								break;
							case "gayRightsAdspot":
								if (relig && tv){
									probSuccess = 0;
								} else if (gay && tv){
									probSuccess = 1;
								} else if (tv){
									probSuccess = 0.5;
								} else {
									probSuccess = 0;
								}
								break;
						}
					}
					//Apply perception shift with gullibilities and move them to appropriate bins
					isSuccess = (Math.random() < probSuccess ? true: false);
					var curr_perc = abstractChosen.binsList[i].binAverage;
					var deltaPerception = (isSuccess ? effectSuccess*gull[j] : (effectFailure*gull[j]));
					
					var new_perc = curr_perc + deltaPerception;

					var binIndex = abstractChosen.findBinForPerceptionValue(new_perc);

					if (binIndex != i){
						var data = new DataObj();

						// Trait ratios
						data.isHonest = (Math.random() < abstractChosen.binsList[i].isHonest ? true: false);
						data.isPotStirrer = (Math.random() < abstractChosen.binsList[i].isPotStirrer ? true: false);
						data.watchesTV = (Math.random() < abstractChosen.binsList[i].watchesTV ? true: false);
						data.isReligious = (Math.random() < abstractChosen.binsList[i].isReligious ? true: false);
						data.isGay = (Math.random() < abstractChosen.binsList[i].isGay ? true: false);
						data.isTraveler = (Math.random() < abstractChosen.binsList[i].isTraveler ? true: false);
						data.isSlut = (Math.random() < abstractChosen.binsList[i].isSlut ? true: false);
						data.isMale = (Math.random() < abstractChosen.binsList[i].isMale ? true: false);

						// Trait distribution functions
						data.gullibility = gull[j];
						data.perception= (Math.random()) + (abstractChosen.binsList[i].binEnd - 1);

						var divisionRatio = abstractChosen.binsList[i].higherCount / abstractChosen.binsList[i].binHeight;
						
						if (data.perception > abstractChosen.binsList[i].binAverage){
							abstractChosen.binsList[i].higherCount--;
						}

						data.location = location; 
						abstractChosen.binsList[i].binHeight--;
						abstractChosen.binsList[binIndex].addToBin(data);
					}
				}
			}
		}
	}

	// ONE TO ONE: Always on atomic level with direct interaction. Can later be mapped for NPC-NPC interaction
	this.oneToOne = function(location, actionNPC, level, effectSuccess, effectFailure, probSuccess){
		var isSuccess;

		//Check people around
		var peeps = new Array();

        for (curNPC in npc) {
            if (npc[curNPC].gridX == actionNPC.gridX && npc[curNPC].gridY == actionNPC.gridY){
                break;
            } else if ((npc[curNPC].gridX >= actionNPC.gridX-1 && npc[curNPC].gridX <= actionNPC.gridX+1) 
                && (npc[curNPC].gridY == actionNPC.gridY)){
                peeps.push(npc[curNPC]);
            } else if ((npc[curNPC].gridY >= actionNPC.gridY-1 && npc[curNPC].gridY <= actionNPC.gridY+1) 
                && (npc[curNPC].gridX == actionNPC.gridX)){
                peeps.push(npc[curNPC]);
            }
        }

        for (var i =0; i< peeps.length; i++){
        	var mileageDiff = abstractor.getPlayerPerception() - abstractor.getOpponentPerception();
			if (probSuccess == "special"){
				switch (this.rule){
					case "flirt": 
					case "sleepWith":
						if (mileageDiff > 2 && peeps[i].isSlut){
							probSuccess = 1;
						} else if (mileageDiff < 2 && peeps[i].isSlut){
							probSuccess = 0.8;
						} else if (mileageDiff > 2 && !peeps[i].isSlut){
							probSuccess = 0.3;
						} else {
							probSuccess = 0;
						}
						break;
				}
			}
        	isSuccess = (Math.random() < probSuccess ? true: false);

        	peeps[i].perception += (isSuccess ? effectSuccess*peeps[i].gullibility :
        			(effectFailure*peeps[i].gullibility));

        }		
	}

	// INTRA NEIGHBOURHOOD: Spreading in a radial direction within a neighbourhood of houses in a decreasing effect
	// Consider applying gaussian or exponential trends
	this.neighbourhood = function(location, actionNPC, level, effectSuccess, effectFailure, probSuccess){
		var isSuccess = (Math.random() < probSuccess ? true: false);
		var neighbourhoodRatio;

		if (actionNPC.location == "cityA" || actionNPC.location == "cityB" || actionNPC.location == "cityC"){
			neighbourhoodRatio = parseInt(rawData[actionNPC.location].neighbourhood1count)/parseInt(rawData[actionNPC.location].totalHouses);
		} else {
			neighbourhoodRatio = parseInt(rawData[parentMapName].neighbourhood1count)/parseInt(rawData[parentMapName].totalHouses);
		}

		for (var i =0 ; i<abstract2.binsList; i++){
			var housesPerBin = parseInt(abstract2.binsList[i].mapper["house"]*neighbourhoodRatio);

			var gull = abstract2.binsList[i].getDecompressedGullibilities(0, 1, housesPerBin);
			for (var j = 0; j < housesPerBin; j++){
				//Apply perception shift with gullibilities and move them to appropriate bins
				var curr_perc = abstract2.binsList[i].binAverage;
				var deltaPerception = (isSuccess ? effectSuccess*gull[j] : (effectFailure*gull[j]));
				
				var new_perc = curr_perc + deltaPerception;

				var binIndex = abstract2.findBinForPerceptionValue(new_perc);

				if (binIndex != i){
					var data = new DataObj();

					// Trait ratios
					data.isHonest = (Math.random() < abstract2.binsList[i].isHonest ? true: false);
					data.isPotStirrer = (Math.random() < abstract2.binsList[i].isPotStirrer ? true: false);
					data.watchesTV = (Math.random() < abstract2.binsList[i].watchesTV ? true: false);
					data.isReligious = (Math.random() < abstract2.binsList[i].isReligious ? true: false);
					data.isGay = (Math.random() < abstract2.binsList[i].isGay ? true: false);
					data.isTraveler = (Math.random() < abstract2.binsList[i].isTraveler ? true: false);
					data.isSlut = (Math.random() < abstract2.binsList[i].isSlut ? true: false);
					data.isMale = (Math.random() < abstract2.binsList[i].isMale ? true: false);

					// Trait distribution functions
					data.gullibility = gull[j];
					data.perception= (Math.random()) + (abstract2.binsList[i].binEnd - 1);

					var divisionRatio = abstract2.binsList[i].higherCount / abstract2.binsList[i].binHeight;
					
					if (data.perception > abstract2.binsList[i].binAverage){
						abstract2.binsList[i].higherCount--;
					}

					data.location = "house"; 
					abstract2.binsList[i].binHeight--;
					abstract2.binsList[binIndex].addToBin(data);
				}
			}
		}
	}
}