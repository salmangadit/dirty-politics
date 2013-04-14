function NormalDist(){
	this.distributionValues = new Array();
	this.mean;
	this.variance;


	this.mergeWithNormalDistr = function(dist){
		if ((typeof(dist.mean) == "undefined"))
			dist.mean = 0.5;
		if ((typeof(dist.variance) == "undefined"))
			dist.variance = 0.33;
		
		this.mean = (this.mean + dist.mean)/2;
		this.variance = Math.sqrt(((this.variance*this.variance) +(dist.variance*dist.variance))/4);
		this.distributionValues = this.distributionValues.concat(dist.distributionValues);
	}

	// Confidence should be in percentage
	this.getValueWithConfidence = function(confidence){
		var range = this.getConfidenceIntervalValues(confidence);
		var value = Math.random() * (range[1] - range[0]) + range[0];

		return value.toFixed(2);
	}

	this.getProbabilisticValueInRange = function(lower,higher){
		var range = this.getProbabilityRange(lower, higher);
		var value = Math.random() * (range[1] - range[0]) + range[0];

		var returnVal = this.getValueByProbability(value);

		return returnVal;
	}

	this.getProbabilityRange = function(lower, higher){
		var lowerProb = this.getProbabilityByValue(lower);
		var higherProb = this.getProbabilityByValue(higher);

		return new Array (lowerProb, higherProb);
	}

	this.getConfidenceIntervalValues = function(ci){
		var range = (100 - ci)/2;
		var lower = this.getValueByProbability(range/100);
		var higher = this.getValueByProbability((1 - range)/100);

		return new Array(lower, higher);
	}

	this.getValueByProbability = function(p){
		if ((typeof(this.mean) == "undefined"))
			this.mean = this.getMean();

		if ((typeof(this.variance) == "undefined"))
			this.variance = Math.sqrt(this.getVarianceSquared());

		var inverse_erf = this.getInverseERF(2*p - 1);
		return this.mean + this.variance*Math.sqrt(2)*inverse_erf;
	}

	this.getProbabilityByValue = function(x){
		if ((typeof(this.mean) == "undefined"))
			this.mean = this.getMean();

		if ((typeof(this.variance) == "undefined"))
			this.variance = Math.sqrt(this.getVarianceSquared());

		var erf = this.getERF((x-this.mean)/(this.variance*Math.sqrt(2)));

		return (1+erf)/2;
	}

	this.getMean = function(){
		if (this.distributionValues.length == 0)
			return null;

		var sum = 0;
		for (var i = 0; i<this.distributionValues.length; i++){
			sum += this.distributionValues[i];
		}

		return (sum/this.distributionValues.length);
	}

	this.getVarianceSquared = function(){
		if (this.distributionValues.length == 0)
			return null;

		var sum = 0;
		for (var i = 0; i<this.distributionValues.length; i++){
			sum += Math.pow((this.distributionValues[i]-this.mean),2);
		}

		if (this.distributionValues.length <2){
			return 0;
		} else if (this.distributionValues.length < 30){
			return sum/(this.distributionValues.length - 1);
		}

		return sum/(this.distributionValues.length);
	}

	this.getERF = function(x){
		var z;
        const ERF_A = 0.147; 
        var the_sign_of_x;
        if(0==x) {
            the_sign_of_x = 0;
            return 0;
        } else if(x>0){
            the_sign_of_x = 1;
        } else {
            the_sign_of_x = -1;
        }

        var one_plus_axsqrd = 1 + ERF_A * x * x;
        var four_ovr_pi_etc = 4/Math.PI + ERF_A * x * x;
        var ratio = four_ovr_pi_etc / one_plus_axsqrd;
        ratio *= x * -x;
        var expofun = Math.exp(ratio);
        var radical = Math.sqrt(1-expofun);
        z = radical * the_sign_of_x;
        return z;
	}

	this.getInverseERF = function(x){
		var z;

        const ERF_A = 0.147; 
        var the_sign_of_x;
        if(0==x) {
            the_sign_of_x = 0;
            return 0;
        } else if(x>0){
            the_sign_of_x = 1;
        } else {
            the_sign_of_x = -1;
        }

        var two_by_pi_a = 2/(Math.PI * ERF_A);
        var ln_one_minus_x_squared_by_two = Math.log(1-(x*x))/2;
        var ln_one_minus_x_squared_by_a = Math.log(1-(x*x))/ERF_A;

        var root_of_above = Math.sqrt(Math.pow((two_by_pi_a+ln_one_minus_x_squared_by_two),2)-ln_one_minus_x_squared_by_a);
        var radical = Math.sqrt(root_of_above-(two_by_pi_a+ln_one_minus_x_squared_by_two));
        z = radical * the_sign_of_x;

        return z;
	}
}