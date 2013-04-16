// Engine takes in variables and modifies the perception
function RuleEngine(){

	this.executeRule = function(rule, actionNPC){
		var ruleType = rules[rule].type;

		if (rule == ruleType){
			this.direct(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, rules[rule].traitsArray, rules[rule].probSuccess);
		} else if (rule == ruleType){
			this.oneToOne(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, rules[rule].traitsArray, rules[rule].probSuccess);
		} else if (rule == ruleType){
			this.neighbourhood(rules[rule].location, actionNPC, rules[rule].level, 
				rules[rule].effectSuccess, rules[rule].effectFailure, rules[rule].traitsArray, rules[rule].probSuccess);
		}
	}

	//Executing a rule
	// 1. Check whether successful
	// 2. Find out choice of NPC's by following the traits and the specifics of the rule
	// 3. If successful, deltaPerception = effectSuccess * gullibility
	// 4. else deltaPerception =  effectFailure * gullibility

	// DIRECT: One point of spread direct to a certain type of trait or location? Depending on level effect varies
	this.direct = function(location, actionNPC, level, effectSuccess, effectFailure, traitsArray, probSuccess){
		var isSuccess = (Math.random() < probSuccess ? true: false);
		if (!isSuccess){
			return 99;
		} else {

		}
	}

	// ONE TO ONE: Always on atomic level with direct interaction. Can later be mapped for NPC-NPC interaction
	this.oneToOne = function(location, actionNPC, level, effectSuccess, effectFailure, traitsArray, probSuccess){
		var isSuccess = (Math.random() < probSuccess ? true: false);

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
	this.neighbourhood = function(location, actionNPC, level, effectSuccess, effectFailure, traitsArray, probSuccess){
		var isSuccess = (Math.random() < probSuccess ? true: false);
		if (!isSuccess){
			return 99;
		} else {
			
		}
	}
}