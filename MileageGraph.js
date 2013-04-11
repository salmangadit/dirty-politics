function MileageGraph(){
	var dataPoints1 = [0,2,4.5,6.1,6.6,10,9,10,2,3.3,2.4];
	var dataPoints2 = [0,1,2.5,1,5,7,8,10,9,4,2,1.1];

	this.init = function(){
        menuCanvas = document.getElementById("menuCanvas");
        menuContext = menuCanvas.getContext("2d");
        //menuCanvas.width = 300;
        //menuCanvas.height = 600;

        this.drawGraph();
    }

    this.drawGraph = function(){
		var HORIZ_LOW = 50;
		var HORIZ_HIGH = 250;
		var VERT_HIGH = 150;
		var VERT_LOW = 350;
		var TIME_GAP = 2;
		//Draw axes
		menuContext.beginPath();
		menuContext.moveTo(HORIZ_LOW, VERT_HIGH);
		menuContext.lineTo(HORIZ_LOW, VERT_LOW);
		menuContext.stroke();

		menuContext.beginPath();
		menuContext.moveTo(HORIZ_LOW, VERT_LOW);
		menuContext.lineTo(HORIZ_HIGH, VERT_LOW);
		menuContext.stroke();

		//Plot graph 1
		var x_disp = (HORIZ_HIGH-HORIZ_LOW)/dataPoints1.length; 
		var y_disp = (VERT_LOW-VERT_HIGH)/10;

		menuContext.beginPath();
		menuContext.moveTo(HORIZ_LOW, VERT_LOW);
		for (var i =0; i < dataPoints1.length; i++){
			menuContext.strokeStyle="#FF0000";
			menuContext.lineTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints1[i]*y_disp));
			menuContext.stroke();
			menuContext.moveTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints1[i]*y_disp));
		}

		//Plot graph 2
		var x_disp = (HORIZ_HIGH-HORIZ_LOW)/dataPoints2.length; 
		var y_disp = (VERT_LOW-VERT_HIGH)/10;

		menuContext.beginPath();
		menuContext.moveTo(HORIZ_LOW, VERT_LOW);
		for (var i =0; i < dataPoints2.length; i++){
			menuContext.strokeStyle="#0000FF";
			menuContext.lineTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints2[i]*y_disp));
			menuContext.stroke();
			menuContext.moveTo(HORIZ_LOW + x_disp*(i+1), VERT_LOW-(dataPoints2[i]*y_disp));
		}
	}
}