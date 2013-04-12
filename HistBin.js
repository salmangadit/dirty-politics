function HistBin(start, end, abstractionLevel){
	var abstractionLevel = abstractionLevel;

	// Properties
	this.binStart = start;
	this.binEnd = end;
	this.binSize = end - start;

	this.binHeight = 0;
	this.binAverage = (start + end)/2;

	// General ratios used for decompression
	this.higherCount;
	this.lowerCount;

	// Trait ratios
	this.isHonest = 0;
	this.isPotStirrer = 0;
	this.watchesTV = 0;
	this.isReligious = 0;
	this.isGay = 0;
	this.isTraveler: = 0;
	this.isSlut = 0;
	this.isMale = 0;

	// Trait distribution functions
	this.gullibility = new NormalDist();

	// Mappers
	this.mapper = new Array();

	this.init();

	this.init = function(){
		// Initialise mappers
		if (abstractionType == 2){
			this.mapper["neighbourhood1"] = 0;
			this.mapper["neighbourhood2"] = 0;
			this.mapper["church"] = 0;
			this.mapper["cc"] = 0;
			this.mapper["mall"] = 0;
			this.mapper["media"] = 0;
			this.mapper["city"] = 0;
		} else {
			this.mapper["cityA"] = 0;
			this.mapper["cityB"] = 0;
			this.mapper["cityC"] = 0;
		}
	}

	this.fitsInBin = function(perception){
		if (perception >= this.binStart && perception < this.binEnd){
			return true;
		}

		return false;
	}	

	this.addToBin = function(object){
		if (object.perception > this.binAverage){
			this.higherCount++;
		} else {
			this.lowerCount++;
		}

		//add the traits
		var currBinHeight = this.binHeight;
		if(object.isHonest) {
			this.binsList[binIndex].isHonest = ((this.binsList[binIndex].isHonest * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isPotStirrer) {
			this.binsList[binIndex].isPotStirrer = ((this.binsList[binIndex].isPotStirrer * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.watchesTV) {
			this.binsList[binIndex].watchesTV = ((this.binsList[binIndex].watchesTV * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isReligious) {
			this.binsList[binIndex].isReligious = ((this.binsList[binIndex].isReligious * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isGay) {
			this.binsList[binIndex].isGay = ((this.binsList[binIndex].isGay * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isTraveler) {
			this.binsList[binIndex].isTraveler = ((this.binsList[binIndex].isTraveler * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isSlut) {
			this.binsList[binIndex].isSlut = ((this.binsList[binIndex].isSlut * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isMale) {
			this.binsList[binIndex].isMale = ((this.binsList[binIndex].isMale * currBinHeight) + 1)/(currBinHeight +1);
		}

		//add to distribution function
		this.pushGullibility(object.gullibility);

		//find mapper
		this.updateMapper(object);

		//add the properties
		this.binHeight++;
	}

	this.updateMapper = function(object){
		if (abstractionLevel == 2){
			if (object.location == "house"){
				if (object.neighbourhood == "A" || object.neighbourhood == "C" || object.neighbourhood == "E"){
					mapper["neighbourhood1"]++;
				} else if (object.neighbourhood == "B" || object.neighbourhood == "D"){
					mapper["neighbourhood2"]++;
				}
			} else {
				mapper[object.location]++;
			}
		} else {
			mapper[object.citizenOf]++;
		}
	}

	this.pushGullibility = function(gull){
		this.gullibility.distributionValues.push(gull);
	}

	this.getGullibilityValue = function(confidence){
		return this.gullibility.getValueWithConfidence(confidence);
	}

	this.getDecompressedGullibilities = function(confidence, numberOfValues){
		var gull = new Array();

		for (var i = 0; i<numberOfValues; i++){
			gull.push(this.getGullibilityValue(confidence));
		}

		return gull;
	}
}