function Initialize(){
	//Generates primary data set for game
	var TOTAL_PEOPLE = parseInt(rawData["house_capacity"])*(parseInt(rawData["cityA"].totalHouses) 
		+ parseInt(rawData["cityB"].totalHouses) + parseInt(rawData["cityC"].totalHouses));

	this.dataSet = new Array();

	var perceptionDistribution = new NormalDist();
	perceptionDistribution.mean = 0;
	perceptionDistribution.variance = 3.33;

	var gullibilityDistribution = new NormalDist();
	gullibilityDistribution.mean = 0.5;
	gullibilityDistribution.variance = 0.33;

	this.generateData();

	this.generateData = function(){
		for (var i = 0; i< TOTAL_PEOPLE; i++){
			var data = new DataObj();
			// Trait ratios
			data.isHonest = (Math.random() < 0.5 ? true: false);
			data.isPotStirrer = (Math.random() < 0.5 ? true: false);
			data.watchesTV = (Math.random() < 0.5 ? true: false);
			data.isReligious = (Math.random() < 0.5 ? true: false);
			data.isGay = (Math.random() < 0.5 ? true: false);
			data.isTraveler: = (Math.random() < 0.5 ? true: false);
			data.isSlut = (Math.random() < 0.5 ? true: false);
			data.isMale = (Math.random() < 0.5 ? true: false);

			// Trait distribution functions
			data.gullibility= gullibilityDistribution.getProbabilisticValueInRange(0,1);
			data.perception = perceptionDistribution.getProbabilisticValueInRange(-10,10);

			data.location = getlocation(i);

			dataSet.push(data);
		}
	}

	function getlocation(val){
		if (i<parseInt(rawData["cityA"].totalHouses)*parseInt(rawData["house_capacity"])){
			return "cityA";
		} else if (i < (parseInt(rawData["cityA"].totalHouses)+parseInt(rawData["cityB"].totalHouses))
				* parseInt(rawData["house_capacity"])){
			return "cityB";
		} else {
			return "cityC";
		}
	}
}