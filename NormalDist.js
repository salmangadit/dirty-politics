function NormalDist(){
	this.distributionValues = new Array();
	this.mean;
	this.variance;

	this.getValueWithConfidence = function(confidence){
		var range = this.getConfidenceIntervalValues(confidence);
		var value = Math.random() * (range[1] - range[0]) + range[0];

		return value.toFixed(2);
	}
	this.getConfidenceIntervalValues = function(ci){
		var range = (100 - ci)/2;
		var lower = this.getValueByProbability(range/100);
		var higher = this.getValueByProbability((1 - range)/100);

		return new Array(lower, higher);
	}

	this.getValueByProbability = function(p){
		this.mean = this.getMean();
		this.variance = Math.sqrt(this.getVarianceSquared());

		var inverse_erf = this.getInverseERF(2*p - 1);
		return this.mean + this.variance*Math.sqrt(2)*inverse_erf;
	}

	this.getProbabilityByValue = function(x){
		this.mean = this.getMean();
		this.variance = Math.sqrt(this.getVarianceSquared());

		var erf = this.getERF((x-this.mean)/(this.variance*Math.sqrt(2)));

		return (1+erf)/2;
	}

	this.getMean = function(){
		if (distributionValues.length == 0)
			return null;

		var sum = 0;
		for (var i = 0; i<distributionValues.length; i++){
			sum += distributionValues[i];
		}

		return (sum/distributionValues.length);
	}

	this.getVarianceSquared = function(){
		if (distributionValues.length == 0)
			return null;

		var sum = 0;
		for (var i = 0; i<distributionValues.length; i++){
			sum += Math.pow((distributionValues[i]-this.mean),2);
		}

		if (distributionValues.length <2){
			return 0;
		} else if (distributionValues.length < 30){
			return sum/(distributionValues.length - 1);
		}

		return sum/(distributionValues.length);
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