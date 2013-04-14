function RuleEngine(){

	this.executeRule = function(rule, location, level, effectSuccess, effectFailure, traitsArray, probSuccess){
		if (rule == "direct"){
			this.direct(location, level, effectSuccess, effectFailure, traitsArray, probSuccess);
		} else if (rule == "oneToOne"){
			this.oneToOne(location, level, effectSuccess, effectFailure, traitsArray, probSuccess);
		} else if (rule == "neighbourhood"){
			this.neighbourhood(location, level, effectSuccess, effectFailure, traitsArray, probSuccess);
		}
	}

	this.direct = function(location, level, effectSuccess, effectFailure, traitsArray, probSuccess){
		
	}

	this.oneToOne = function(location, level, effectSuccess, effectFailure, traitsArray, probSuccess){

	}

	this.neighbourhood = function(location, level, effectSuccess, effectFailure, traitsArray, probSuccess){

	}
}