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