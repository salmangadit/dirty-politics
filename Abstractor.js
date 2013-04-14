function Abstractor(){
	this.compressIntoSecondLevel = function(data){
		abstract2.compressData(data);
	} 

	this.compressIntoThirdLevel = function(data, city){
		abstract3.compressData(data, city);
	}

	this.decompressFromThirdLevel = function(location){
		abstract3.decompressFor(location);
	}

	this.decompressFromSecondLevel = function(location){
		return abstract2.decompressFor(location);
	}

	//First generation of abstractions
	var init = Initialize();
	abstract3.createHistogramFromData(init.dataSet);
	this.decompressFromThirdLevel("cityA");

	//Abstract 2 is now generated. Time to test one level lower.
	var dataSet = this.decompressFromSecondLevel("city");
}