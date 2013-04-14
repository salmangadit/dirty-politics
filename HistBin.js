function HistBin(start, end, abstractionLevel){
	var abstractionLevel = abstractionLevel;

	// Properties
	this.binStart = start;
	this.binEnd = end;
	this.binSize = end - start;

	this.binHeight = 0;
	this.binAverage = (start + end)/2;

	// General ratios used for decompression
	this.higherCount = 0;

	// Trait ratios
	this.isHonest = 0;
	this.isPotStirrer = 0;
	this.watchesTV 	= 0;
	this.isReligious = 0;
	this.isGay = 0;
	this.isTraveler = 0;
	this.isSlut = 0;
	this.isMale = 0;

	// Trait distribution functions
	this.gullibility = new NormalDist();

	// Mappers
	this.mapper = new Array();

	this.init = function(){
		// Initialise mappers
		if (abstractionLevel == 2){
			this.mapper["house"] = 0;
			this.mapper["bar"] = 0;
			this.mapper["church"] = 0;
			this.mapper["cc"] = 0;
			this.mapper["mall"] = 0;
			this.mapper["mediastation"] = 0;
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

	this.mergeBin = function(bin, mapperPlace){
		if (bin.binAverage > this.binAverage){
			this.higherCount++;
		}

		this.isHonest = ((this.isHonest*this.binHeight)+(bin.isHonest*bin.binHeight))/(bin.binHeight+this.binHeight);
		this.isPotStirrer = ((this.isPotStirrer*this.binHeight)+(bin.isPotStirrer*bin.binHeight))/(bin.binHeight+this.binHeight);
		this.watchesTV = ((this.watchesTV*this.binHeight)+(bin.watchesTV*bin.binHeight))/(bin.binHeight+this.binHeight);
		this.isReligious = ((this.isReligious*this.binHeight)+(bin.isReligious*bin.binHeight))/(bin.binHeight+this.binHeight);
		this.isGay = ((this.isGay*this.binHeight)+(bin.isGay*bin.binHeight))/(bin.binHeight+this.binHeight);
		this.isTraveler = ((this.isTraveler*this.binHeight)+(bin.isTraveler*bin.binHeight))/(bin.binHeight+this.binHeight);
		this.isSlut = ((this.isSlut*this.binHeight)+(bin.isSlut*bin.binHeight))/(bin.binHeight+this.binHeight);
		this.isMale = ((this.isMale*this.binHeight)+(bin.isMale*bin.binHeight))/(bin.binHeight+this.binHeight);

		this.gullibility.mergeWithNormalDistr(bin.gullibility);

		for (var i in bin.mapper)
		{
		  this.mapper[mapperPlace] += bin.mapper[i];
		}

		this.binHeight += bin.binHeight;
	}

	this.addToBin = function(object){
		if (object.perception > this.binAverage){
			this.higherCount++;
		}

		//add the traits
		var currBinHeight = this.binHeight;
		if(object.isHonest) {
			this.isHonest = ((this.isHonest * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isPotStirrer) {
			this.isPotStirrer = ((this.isPotStirrer * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.watchesTV) {
			this.watchesTV = ((this.watchesTV * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isReligious) {
			this.isReligious = ((this.isReligious * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isGay) {
			this.isGay = ((this.isGay * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isTraveler) {
			this.isTraveler = ((this.isTraveler * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isSlut) {
			this.isSlut = ((this.isSlut * currBinHeight) + 1)/(currBinHeight +1);
		}
		if(object.isMale) {
			this.isMale = ((this.isMale * currBinHeight) + 1)/(currBinHeight +1);
		}

		//add to distribution function
		this.pushGullibility(object.gullibility);

		//find mapper
		this.updateMapper(object);

		//add the properties
		this.binHeight++;
	}

	this.updateMapper = function(object){
		this.mapper[object.location]++;
	}

	this.pushGullibility = function(gull){
		this.gullibility.distributionValues.push(gull);
	}

	this.getGullibilityValue = function(lower, higher){
		return this.gullibility.getProbabilisticValueInRange(lower, higher);
	}

	this.getDecompressedGullibilities = function(lower, higher, numberOfValues){
		var gull = new Array();

		for (var i = 0; i<numberOfValues; i++){
			gull.push(this.getGullibilityValue(lower, higher));
		}

		return gull;
	}

	this.init();
}