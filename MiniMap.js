/**********************************************************************************************************************
Done by Salman Gadit 	(U095146E)
		Tan Sheng Di	(U095155N)
************************************************************************************************************************/

function MiniMap(){
	var CITYA_WIDTH = 50;
	var CITYA_HEIGHT = 100;
	var CITYB_WIDTH = 50;
	var CITYB_HEIGHT = 40;
	var CITYC_WIDTH = 50;
	var CITYC_HEIGHT = 60;

	var IMG_START_X = 280;
	var IMG_START_Y = 0;

	//var total = abstractor.getPlayerVotes()+abstractor.getOpponentVotes();

	var cityARatio = "10:1";
	var cityBRatio = "1:10";
	var cityCRatio = "2:5";

	this.init = function(){
        hudCanvas = document.getElementById("hudCanvas");
        hudContext = hudCanvas.getContext("2d");
        // hudCanvas.width = 300;
        // hudCanvas.height = 600;

        this.drawMap();
    }

    this.drawMap = function(item){
		loadImages(0);
	}
	
	this.typeloc = function() {
	    maplocCanvas = document.getElementById("maplocCanvas");
        maplocContext = maplocCanvas.getContext("2d");
		maplocContext.fillStyle = "black"
		if (mapGen.currMapName.substr(0,4) == "city") {
			cityname = mapGen.currMapName;
		}
		maplocContext.clearRect(0, 0, 200, 200);
		maplocContext.font = "15px Consolas";
		if (mapGen.currMapName == cityname) {
			maplocContext.fillText("In " + cityname + " - " + "Streets",20,120);
		} 
		else {
			maplocContext.fillText("In " + cityname + " - " + mapGen.currMapName,20,120);
		}
	}
	
	this.renderloc = function() {
		var renderx;
		var rendery;
		maplocContext.clearRect(0, 0, 150, 110);
		switch (cityname) {
			case "cityA":
				renderx = (hero.x/1408 * 32) + 25;
				rendery = (hero.y/928 * 25) + 45;
				maplocContext.fillStyle = "green";
				maplocContext.fillRect(renderx, rendery, 10, 10);
				maplocContext.strokeRect(renderx, rendery, 10, 10);
				break;
			case "cityB":
				renderx = (hero.x/1408 * 30) + 70;
				rendery = (hero.y/928 * 25) + 20;
				maplocContext.fillStyle = "green";
				maplocContext.fillRect(renderx, rendery, 10, 10);
				maplocContext.strokeRect(renderx, rendery, 10, 10);
				break;
			case "cityC":
				renderx = (hero.x/1408 * 28) + 70;
				rendery = (hero.y/928 * 25) + 45;
				maplocContext.fillStyle = "green";
				maplocContext.fillRect(renderx, rendery, 10, 10);
				maplocContext.strokeRect(renderx, rendery, 10, 10);
				break;
			default:
				renderx = (hero.x/1408 * 35) + 25;
				rendery = (hero.y/928 * 25) + 45;
				maplocContext.fillStyle = "green";
				maplocContext.fillRect(renderx, rendery, 10, 10);
				maplocContext.strokeRect(renderx, rendery, 10, 10);
			
		}

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
			hudContext.drawImage(cityAblue, 0, 0, blueLimit*cityWidth, cityHeight, startX, startY,blueLimit*cityWidth, cityHeight);

			cityAred.src = redSrc;
			cityAred.onload = function() {
				hudContext.drawImage(cityAred, blueLimit*cityWidth, 0, redLimit*cityWidth, cityHeight,startX+blueLimit*cityWidth, startY, redLimit*cityWidth, cityHeight);
				loadImages(++number);
			};
		};
	}
}