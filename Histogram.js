function Histogram(abstraction){
	this.binSize;
	this.binsList = new Array();
	this.abstractionLevel = abstraction;

	this.init(abstraction);

	this.init = function(abstraction){
		if (abstraction == 3){
			this.binSize == 4;
		} else {
			this.binSize == 2;
		}

		for (var i=1; i<=(this.binSize == 4? 5 : 10); i++){
			var binStart = (this.binSize == 4? (4*i - 14):(2*i - 12));
			var binEnd = binStart + this.binSize;

			this.binsList.push(new HistBin(binStart, binEnd));
		}
	}

	this.createHistogramFromData = function(data){
		for (var i=0; i<data.length; i++){
			var binIndex = this.findBinForPerceptionValue(data[i].perception);
			this.binsList[binIndex].addToBin(data[i]);
		}
	}

	/*
	 * For decompression:
	 * Find location:
	 * Entering House:
	 * - Decompression Street -> House
	 * - This is a level 2 to 1 decompression
	 * - Go through all neighbourhood mappings in each bin, and extract the perception data bin by bin
	 * - use global neighbourhood counts (or from bins) to find ratio in one house
	 * - Using the extracted data create the objects and spawn
	 * Entering other building:
	 * - Same as above, but mapping is now  for the individual building, making it kind of easier
	 * Entering city from building:
	 * - This is still a level 2 to 1 decompression
	 * - We decompress the relevant data for the street by looking at the "city" mapping
	 * - Create the NPC's and distribute them randomly (unless memory management rules applied)
	 * Entering city from city:
	 * - This is a level 3 to 2 decompression
	 * - We decompress data mapped for the respective city, generate the relevant level 1 based on that
	 */ 
	this.decompressFor = function(location){
		if (location =="cityA" || location =="cityB" || location =="cityC"){

		} else if (location == "house"){

		} else {

		}
	}

	this.compressData = function(data){
		for (var i=0; i<data.length; i++){
			var binIndex = this.findBinForPerceptionValue(data[i].perception);
			this.binsList[binIndex].addToBin(data[i]);
		}
	}

	this.findBinForPerceptionValue = function(perception){
		for (var i = 0; i< this.binsList.length; i++){
			if (this.binsList[i].fitsInBin(perception))
				return i;
		}
	}
}