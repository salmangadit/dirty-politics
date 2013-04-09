function MenuGenerator(){
	var xPos = 120;
	var yPos = 30;

	var currItemNum = 1;
	var menuMax;
	var itemsStored;

	var dataPoints1 = [0,2,4.5,6.1,6.6,10,9,10,2,3.3,2.4];
	var dataPoints2 = [0,1,2.5,1,5,7,8,10,9,4,2,1.1];

	this.init = function(){
		menuCanvas = document.getElementById("menuCanvas");
		menuContext = menuCanvas.getContext("2d");
		menuCanvas.width = 300;
		menuCanvas.height = 600;

		menuContext.font = "30px Consolas";
		menuContext.fillText("Menu",xPos,yPos);
		yPos += 40;

		var items = ["item 1", "item 2"];
		this.drawMenu(items);

		this.drawGraph();
		this.drawMap();
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

	this.drawMap = function(item){
		loadImages(0);
	}

	function loadImages(number){
		var CITYA_WIDTH = 50;
		var CITYA_HEIGHT = 100;
		var CITYB_WIDTH = 50;
		var CITYB_HEIGHT = 40;
		var CITYC_WIDTH = 50;
		var CITYC_HEIGHT = 60;

		var IMG_START_X = 50;
		var IMG_START_Y = 400;

		var cityARatio = "10:1"
		var cityBRatio = "1:10"
		var cityCRatio = "2:5"

		if (number == 0){
			drawRatioImages(cityARatio, 'images/cityAblue.png', 'images/cityAred.png', CITYA_WIDTH, CITYA_HEIGHT, 50, 400, number);

		} else if (number == 1){
			drawRatioImages(cityBRatio, 'images/cityBblue.png', 'images/cityBred.png', CITYB_WIDTH, CITYB_HEIGHT, 50 + CITYA_WIDTH, 400, number);

		} else {
			drawRatioImages(cityCRatio, 'images/cityCblue.png', 'images/cityCred.png', CITYC_WIDTH, CITYC_HEIGHT, 50 + CITYA_WIDTH, 400 + CITYB_HEIGHT, number);
		}
	}
	function drawRatioImages(ratio, blueSrc, redSrc, cityWidth, cityHeight, startX, startY, number){
		var cityAblue = new Image();
		var cityAred = new Image();
		ratio = ratio.split(':');
		blueLimit = parseInt(ratio[0])/(parseInt(ratio[0])+parseInt(ratio[1]));
		redLimit = parseInt(ratio[1])/(parseInt(ratio[0])+parseInt(ratio[1]));
		cityAblue.src = blueSrc;
		cityAblue.onload = function() {
			menuContext.drawImage(cityAblue, 0, 0, blueLimit*cityWidth, cityHeight, startX, startY,blueLimit*cityWidth, cityHeight);

			cityAred.src = redSrc;
			cityAred.onload = function() {
				menuContext.drawImage(cityAred, blueLimit*cityWidth, 0, redLimit*cityWidth, cityHeight,startX+blueLimit*cityWidth, startY, redLimit*cityWidth, cityHeight);
				loadImages(++number);
			};
		};
	}

	this.drawMenuItem = function(item){
		xPos = 50;
		menuContext.font = "18px Consolas";
		menuContext.fillText(item,xPos,yPos);
		yPos += 20;
	}

	this.drawMenu = function(items){
		menuMax = items.length;
		itemsStored = items;
		for (var i=0; i<items.length; i++){
			this.drawMenuItem(items[i]);
		}
		this.drawMenuItemPointer();
	}

	this.drawMenuItemPointer = function(){

		menuContext.beginPath();
		menuContext.arc(25, 45 + (currItemNum * 20), 5, 0, 2 * Math.PI, false);
		menuContext.fillStyle = 'green';
		menuContext.fill();
		menuContext.lineWidth = 2;
		menuContext.strokeStyle = '#000000';
		menuContext.stroke();
	}

	this.clearMenuItemPointer = function(){
		menuContext.beginPath();
		menuContext.arc(25, 45 + (currItemNum * 20), 7, 0, 2 * Math.PI, false);
		menuContext.fillStyle = 'white';
		menuContext.fill();
	}

	this.nextItem = function(){
		if (currItemNum < menuMax){
			this.clearMenuItemPointer();
			currItemNum++;
			this.drawMenuItemPointer();
		}
	}

	this.previousItem = function(){
		if (currItemNum > 1){
			this.clearMenuItemPointer();
			currItemNum--;
			this.drawMenuItemPointer();
		}
	}

	this.clearMenu = function(){
		xPos = 120;
		yPos = 30;
		menuCanvas.width = 300;
		menuCanvas.height = 400;

		menuContext.font = "30px Consolas";
		menuContext.fillText("Menu",xPos,yPos);
	}
}