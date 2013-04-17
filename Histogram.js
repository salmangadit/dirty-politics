function Histogram(abstraction){
	this.binSize;
	this.binsList = new Array();
	this.abstractionLevel = abstraction;

	this.init = function(abstraction){
		if (abstraction == 3){
			this.binSize = 4;
		} else {
			this.binSize = 2;
		}

		for (var i=1; i<=(this.binSize == 4? 5 : 10); i++){
			var binStart = (this.binSize == 4? (4*i - 14):(2*i - 12));
			var binEnd = binStart + this.binSize;

			this.binsList.push(new HistBin(binStart, binEnd, abstraction));
		}
	}

	this.createHistogramFromData = function(data){
		for (var i=0; i<data.length; i++){
			if (data[i].perception > 10){
				data[i].perception = 9.9;
			}

			if (data[i].perception < -10){
				data[i].perception = -10;
			}

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
		var dataList = new Array();
		if (location =="cityA" || location =="cityB" || location =="cityC"){ //Level 3
			var newAbstract2 = new Histogram(2);

			var multiplier = 1;
			if (location == "cityA"){
				multiplier = parseInt(rawData["city_multiplier"]);
			}

			var locationNames = ["mall", "cc", "church", "bar", "mediastation"];
			var capacityMap = new Array()
			capacityMap[0] = [0, multiplier*parseInt(rawData["mall_capacity"])];
			capacityMap[1] = [0, multiplier*parseInt(rawData["cc_capacity"])];
			capacityMap[2] = [0, multiplier*parseInt(rawData["church_capacity"])];
			capacityMap[3] = [0, multiplier*parseInt(rawData["bar_capacity"])];
			capacityMap[4] = [0, multiplier*parseInt(rawData["mediastation_capacity"])];


			for (var i = 0; i < this.binsList.length; i++){
				 var objectsCountInBin = this.binsList[i].mapper[location];
				 var divisionRatio = this.binsList[i].higherCount / this.binsList[i].binHeight;
				 var higherBinNumber = objectsCountInBin - parseInt(divisionRatio*objectsCountInBin);
				 var end = this.binsList[i].binEnd;
				 var start = this.binsList[i].binStart;

				 var gull = this.binsList[i].getDecompressedGullibilities(0, 1, objectsCountInBin);

				 //Create objects by ratios
				 for (var j = 0; j < objectsCountInBin; j++){
				 	var data = new DataObj();
				 	//Perception
				 	if (j > higherBinNumber -1){
				 		data.perception = (Math.random() * 2) + (end - 2) ;
				 	} else {
				 		data.perception = (Math.random() * 2) + start;
				 	}

				 	//Gullibility
				 	data.gullibility = gull[j];

				 	//Boolean traits
				 	data.isHonest = (Math.random() < this.binsList[i].isHonest ? true: false);
					data.isPotStirrer = (Math.random() < this.binsList[i].isPotStirrer ? true:false);
					data.watchesTV = (Math.random() < this.binsList[i].watchesTV ? true: false);
					data.isReligious = (Math.random() < this.binsList[i].isReligious ? true: false);
					data.isGay = (Math.random() < this.binsList[i].isGay ? true: false);
					data.isTraveler = (Math.random() < this.binsList[i].isTraveler ? true: false);
					data.isSlut = (Math.random() < this.binsList[i].isSlut ? true: false);
					data.isMale = (Math.random() < this.binsList[i].isMale ? true: false);

					dataList.push(data);
				 }
				 this.binsList[i].mapper[location] = 0;
				 this.binsList[i].binHeight -= objectsCountInBin;
				 this.binsList[i].higherCount -= parseInt(divisionRatio*objectsCountInBin);
			}

			this.randomizeArray(dataList);
			var capacityIndex = 0;
			//Set locations for the data list
			for (var i = 0; i< dataList.length; i++){
				if ((capacityIndex <= 4) && (capacityMap[capacityIndex][0] >= capacityMap[capacityIndex][1])) {
					capacityIndex++;
				}

				if (capacityIndex <= 4){
					dataList[i].location = locationNames[capacityIndex];
					capacityMap[capacityIndex][0]++;
				} else {
					dataList[i].location = Math.random() < 0.5 ? "house": "city";
				}
			}

			newAbstract2.createHistogramFromData(dataList);
			abstract2 = newAbstract2;
		} else {
			for (var i = 0; i < this.binsList.length; i++){
				var objectsCountInBin = this.binsList[i].mapper[location];
				var divisionRatio = this.binsList[i].higherCount / this.binsList[i].binHeight;
				var higherBinNumber = objectsCountInBin - parseInt(divisionRatio*objectsCountInBin);
				var end = this.binsList[i].binEnd;
				var start = this.binsList[i].binStart;

				var gull = this.binsList[i].getDecompressedGullibilities(0, 1, objectsCountInBin);

				//Create objects by ratios
				for (var j = 0; j < objectsCountInBin; j++){
					var data = new DataObj();
					//Perception
					if (j > higherBinNumber -1){
						data.perception = (Math.random()) + (end - 1) ;
					} else {
						data.perception = (Math.random()) + start;
					}

					//Gullibility
					data.gullibility = gull[j];

					//Boolean traits
					data.isHonest = (Math.random() < this.binsList[i].isHonest ? true: false);
					data.isPotStirrer = (Math.random() < this.binsList[i].isPotStirrer ? true: false);
					data.watchesTV = (Math.random() < this.binsList[i].watchesTV ? true: false);
					data.isReligious = (Math.random() < this.binsList[i].isReligious ? true: false);
					data.isGay = (Math.random() < this.binsList[i].isGay ? true: false);
					data.isTraveler = (Math.random() < this.binsList[i].isTraveler ? true: false);
					data.isSlut = (Math.random() < this.binsList[i].isSlut ? true: false);
					data.isMale = (Math.random() < this.binsList[i].isMale ? true: false);

					data.location = location;

					dataList.push(data);
				}
				this.binsList[i].mapper[location] = 0;
				this.binsList[i].binHeight -= objectsCountInBin;
				this.binsList[i].higherCount -= parseInt(divisionRatio*objectsCountInBin);
			}
			
			if (location == "house"){
				// House has info for ALL the houses. Now it's time to randomise and select first x
				this.randomizeArray(dataList);
				var numberInHouse = Math.floor(Math.random()*4)+1;

				var addBackToBin = dataList.splice(numberInHouse, dataList.length-numberInHouse);
				this.compressData(addBackToBin);
			}

			return dataList;
		}
	}

	this.randomizeArray = function (array){
	  	var i = array.length, j, tempi, tempj;
	  	if ( i === 0 ) return false;
	  	while ( --i ) {
	  	   j = Math.floor( Math.random() * ( i + 1 ) );
	  	   tempi = array[i];
	  	   tempj = array[j];
	  	   array[i] = tempj;
	  	   array[j] = tempi;
	  	 }
	}

	this.compressData = function(data, city){
		if (this.abstractionLevel == 2){
			for (var i=0; i<data.length; i++){
				var binIndex = this.findBinForPerceptionValue(data[i].perception);
				this.binsList[binIndex].addToBin(data[i]);
			}
		} else {
			//For level 2 to 3 compression, it will be a histogram now, not data set
			//Merge bin with info given
			for (var i = 0; i< this.binsList.length; i++){
				this.binsList[i].mergeBin(data.binsList[i*2], city);
				this.binsList[i].mergeBin(data.binsList[(i*2)+1], city);
			}
		}
	}

	this.averagePlayerPerception = function(){
		if (this.abstractionLevel == 2){
			var perceptionSum = 0;
			perceptionSum += this.binsList[5].binHeight*1;
			perceptionSum += this.binsList[6].binHeight*3;
			perceptionSum += this.binsList[7].binHeight*5;
			perceptionSum += this.binsList[8].binHeight*7;
			perceptionSum += this.binsList[9].binHeight*9;

			return perceptionSum/(this.binsList[5].binHeight + this.binsList[6].binHeight +
				this.binsList[7].binHeight + this.binsList[8].binHeight + this.binsList[9].binHeight);
		} else {
			var perceptionSum = 0;
			perceptionSum += this.binsList[2].higherCount*1;
			perceptionSum += this.binsList[3].binHeight*4;
			perceptionSum += this.binsList[4].binHeight*8;

			return perceptionSum/(this.binsList[2].higherCount + 
				this.binsList[3].binHeight + this.binsList[4].binHeight);
		}
	}

	this.playerPerception = function(){
		if (this.abstractionLevel == 2){
			var perceptionSum = 0;
			perceptionSum += this.binsList[5].binHeight*1;
			perceptionSum += this.binsList[6].binHeight*3;
			perceptionSum += this.binsList[7].binHeight*5;
			perceptionSum += this.binsList[8].binHeight*7;
			perceptionSum += this.binsList[9].binHeight*9;

			return perceptionSum;
		} else {
			var perceptionSum = 0;
			perceptionSum += this.binsList[2].higherCount*1;
			perceptionSum += this.binsList[3].binHeight*4;
			perceptionSum += this.binsList[4].binHeight*8;

			return perceptionSum;
		}
	}

	this.averageOpponentPerception = function(){
		if (this.abstractionLevel == 2){
			var perceptionSum = 0;
			perceptionSum += this.binsList[0].binHeight*1;
			perceptionSum += this.binsList[1].binHeight*3;
			perceptionSum += this.binsList[2].binHeight*5;
			perceptionSum += this.binsList[3].binHeight*7;
			perceptionSum += this.binsList[4].binHeight*9;

			return perceptionSum/(this.binsList[0].binHeight + this.binsList[1].binHeight +
				this.binsList[2].binHeight + this.binsList[3].binHeight + this.binsList[4].binHeight);
		} else {
			var perceptionSum = 0;
			perceptionSum += (this.binsList[2].binHeight - this.binsList[2].higherCount);
			perceptionSum += this.binsList[0].binHeight*4;
			perceptionSum += this.binsList[1].binHeight*8;

			return perceptionSum/((this.binsList[2].binHeight - this.binsList[2].higherCount) + 
				this.binsList[0].binHeight + this.binsList[1].binHeight);
		}
	}

	this.opponentPerception = function(){
		if (this.abstractionLevel == 2){
			var perceptionSum = 0;
			perceptionSum += this.binsList[0].binHeight*1;
			perceptionSum += this.binsList[1].binHeight*3;
			perceptionSum += this.binsList[2].binHeight*5;
			perceptionSum += this.binsList[3].binHeight*7;
			perceptionSum += this.binsList[4].binHeight*9;

			return perceptionSum;
		} else {
			var perceptionSum = 0;
			perceptionSum += (this.binsList[2].binHeight - this.binsList[2].higherCount);
			perceptionSum += this.binsList[0].binHeight*4;
			perceptionSum += this.binsList[1].binHeight*8;

			return perceptionSum;
		}
	}

	this.findBinForPerceptionValue = function(perception){
		for (var i = 0; i< this.binsList.length; i++){
			if (this.binsList[i].fitsInBin(perception))
				return i;
		}
	}

	this.init(abstraction);
}