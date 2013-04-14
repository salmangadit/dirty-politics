function Debugger(){
	var HORIZ_LOW = 140;
	var HORIZ_HIGH = 240;
	var VERT_HIGH = 0;
	var VERT_LOW = 100;

	if (debugMode){
		hudContext.beginPath();
		hudContext.moveTo(HORIZ_LOW, VERT_HIGH);
		hudContext.lineTo(HORIZ_LOW, VERT_LOW);
		hudContext.stroke();

		hudContext.beginPath();
		hudContext.moveTo(HORIZ_LOW, VERT_LOW);
		hudContext.lineTo(HORIZ_HIGH, VERT_LOW);
		hudContext.stroke();
	}
}