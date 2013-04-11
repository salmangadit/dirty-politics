function HistBin(start, end){
	var abstractionLevel;

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
	this.watchesTV = 0;
	this.isSlut = 0;
	//put other traits here

	// Trait distribution functions
	this.gullibility = new NormalDist();

	// Mappers
	this.mapper = new Array();

	this.addToBin = function(object){
		//add the traits
		this.binHeight++;

		if (object.perception > this.binAverage){
			this.higherCount++;
		} else {
			this.lowerCount++;
		}

		//add to distribution function
		this.pushGullibility(object.gullibility);

		//find mapper
		this.updateMapper(object);
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
		return this.getValueWithConfidence(confidence);
	}

	this.getDecompressedGullibilities = function(confidence, numberOfValues){
		var gull = new Array();

		for (var i = 0; i<numberOfValues; i++){
			gull.push(this.getGullibilityValue(confidence));
		}

		return gull;
	}

	this.init = function(abstractionType){
		abstractionLevel = abstractionType;
		// Initialise mappers
		if (abstractionType == 2){
			this.mapper["neighbourhood1"] = 0;
			this.mapper["neighbourhood2"] = 0;
			this.mapper["church"] = 0;
			this.mapper["cc"] = 0;
			this.mapper["mall"] = 0;
			this.mapper["media"] = 0;
		} else {
			this.mapper["cityA"] = 0;
			this.mapper["cityB"] = 0;
			this.mapper["cityC"] = 0;
		}
	}

}