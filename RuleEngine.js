// Engine takes in variables and modifies the perception
function RuleEngine(){

	this.executeRule = function(rule, actionNPC){
		var ruleType = rules[rule].type;
		var probSuccess = rules[rule].probSuccess;

		if (rule == ruleType){
			this.direct(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, probSuccess);
		} else if (rule == ruleType){
			this.oneToOne(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, probSuccess);
		} else if (rule == ruleType){
			this.neighbourhood(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, probSuccess);
		}
	}

	//Executing a rule
	// 1. Check whether successful
	// 2. Find out choice of NPC's by following the traits and the specifics of the rule
	// 3. If successful, deltaPerception = effectSuccess * gullibility
	// 4. else deltaPerception =  effectFailure * gullibility

	// DIRECT: One point of spread direct to a certain type of trait or location? Depending on level effect varies
	this.direct = function(location, actionNPC, level, effectSuccess, effectFailure, probSuccess){
		var isSuccess = (Math.random() < probSuccess ? true: false);
		if (!isSuccess){
			return 99;
		} else {

		}
	}

	// ONE TO ONE: Always on atomic level with direct interaction. Can later be mapped for NPC-NPC interaction
	this.oneToOne = function(location, actionNPC, level, effectSuccess, effectFailure, probSuccess){
		var isSuccess;

		//Check people around
		var peeps = new Array();

        for (curNPC in npc) {
            if (npc[curNPC].gridX == this.gridX && npc[curNPC].gridY == this.gridY){
                break;
            } else if ((npc[curNPC].gridX == this.gridX-1 || npc[curNPC].gridX == this.gridX+1) 
                && (npc[curNPC].gridY == this.gridY)){
                peeps.add(npc[curNPC]);
            } else if ((npc[curNPC].gridY == this.gridY-1 || npc[curNPC].gridY == this.gridY+1) 
                && (npc[curNPC].gridX == this.gridX)){
                peeps.add(npc[curNPC]);
            }
        }

        for (var i =0; i< peeps.length; i++){
        	var mileageDiff = abstractor.getPlayerPerception() - abstractor.getOpponentPerception();
			if (probSuccess == "special"){
				switch (rule){
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
        	if (traitsArray.length == 0){
        		peeps[i].perception += (isSuccess ? effectSuccess*peeps[i].gullibility :
        			(-1*effectFailure*peeps[i].gullibility));
        	} else {
        		var resultBool = true;

        		for (var j = 0; j<traitsArray.length; j++){
        			resultBool = resultBool && (peeps[i][traitsArray[j]]);
        		}

        		if (resultBool){
        			peeps[i].perception += (isSuccess ? effectSuccess*peeps[i].gullibility :
        			(-1*effectFailure*peeps[i].gullibility));
        		}
        	}
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
				var deltaPerception = (isSuccess ? effectSuccess*gull[j] : (-1*effectFailure*gull[j]));
				
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