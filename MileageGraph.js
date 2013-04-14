function MileageGraph(){
	var dataPoints1 = [0,2,4.5,6.1,6.6,10,9,10,2,3.3,2.4];
	var dataPoints2 = [0,1,2.5,1,5,7,8,10,9,4,2,1.1];

	this.init = function(){
        hudCanvas = document.getElementById("hudCanvas");
        hudContext = hudCanvas.getContext("2d");
        hudCanvas.width = 450;
        hudCanvas.height = 100;

        this.drawGraph();
    }

    this.drawGraph = function(){
		var HORIZ_LOW = 140;
		var HORIZ_HIGH = 240;
		var VERT_HIGH = 0;
		var VERT_LOW = 100;
		var TIME_GAP = 2;
		//Draw axes
		hudContext.beginPath();
		hudContext.moveTo(HORIZ_LOW, VERT_HIGH);
		hudContext.lineTo(HORIZ_LOW, VERT_LOW);
		hudContext.stroke();

		hudContext.beginPath();
		hudContext.moveTo(HORIZ_LOW, VERT_LOW);
		hudContext.lineTo(HORIZ_HIGH, VERT_LOW);
		hudContext.stroke();

		//Plot graph 1
		var x_disp = (HORIZ_HIGH-HORIZ_LOW)/dataPoints1.length; 
		var y_disp = (VERT_LOW-VERT_HIGH)/10;

		hudContext.beginPath();
		hudContext.moveTo(HORIZ_LOW, VERT_LOW);
		for (var i =0; i < dataPoints1.length; i++){
			hudContext.strokeStyle="#FF0000";
			hudContext.lineTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints1[i]*y_disp));
			hudContext.stroke();
			hudContext.moveTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints1[i]*y_disp));
		}

		//Plot graph 2
		var x_disp = (HORIZ_HIGH-HORIZ_LOW)/dataPoints2.length; 
		var y_disp = (VERT_LOW-VERT_HIGH)/10;

		hudContext.beginPath();
		hudContext.moveTo(HORIZ_LOW, VERT_LOW);
		for (var i =0; i < dataPoints2.length; i++){
			hudContext.strokeStyle="#0000FF";
			hudContext.lineTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints2[i]*y_disp));
			hudContext.stroke();
			hudContext.moveTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints2[i]*y_disp));
		}
	}
}