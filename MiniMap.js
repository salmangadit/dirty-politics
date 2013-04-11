function MiniMap(){
	var CITYA_WIDTH = 50;
	var CITYA_HEIGHT = 100;
	var CITYB_WIDTH = 50;
	var CITYB_HEIGHT = 40;
	var CITYC_WIDTH = 50;
	var CITYC_HEIGHT = 60;

	var IMG_START_X = 280;
	var IMG_START_Y = 0;

	var cityARatio = "10:1"
	var cityBRatio = "1:10"
	var cityCRatio = "2:5"

	this.init = function(){
        hudCanvas = document.getElementById("hudCanvas");
        hudCanvas = hudCanvas.getContext("2d");
        // hudCanvas.width = 300;
        // hudCanvas.height = 600;

        this.drawMap();
    }

    this.drawMap = function(item){
		loadImages(0);
	}

	function loadImages(number){
		if (number == 0){
			drawRatioImages(cityARatio, 'images/cityAblue.png', 'images/cityAred.png', CITYA_WIDTH, CITYA_HEIGHT, IMG_START_X, IMG_START_Y, number);

		} else if (number == 1){
			drawRatioImages(cityBRatio, 'images/cityBblue.png', 'images/cityBred.png', CITYB_WIDTH, CITYB_HEIGHT, IMG_START_X + CITYA_WIDTH, IMG_START_Y, number);

		} else {
			drawRatioImages(cityCRatio, 'images/cityCblue.png', 'images/cityCred.png', CITYC_WIDTH, CITYC_HEIGHT, IMG_START_X + CITYA_WIDTH, IMG_START_Y + CITYB_HEIGHT, number);
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
			hudCanvas.drawImage(cityAblue, 0, 0, blueLimit*cityWidth, cityHeight, startX, startY,blueLimit*cityWidth, cityHeight);

			cityAred.src = redSrc;
			cityAred.onload = function() {
				hudCanvas.drawImage(cityAred, blueLimit*cityWidth, 0, redLimit*cityWidth, cityHeight,startX+blueLimit*cityWidth, startY, redLimit*cityWidth, cityHeight);
				loadImages(++number);
			};
		};
	}
}