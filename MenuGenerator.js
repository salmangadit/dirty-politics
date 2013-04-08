function MenuGenerator(){
	this.init = function(){
		menuCanvas = document.getElementById("menuCanvas");
		menuContext = menuCanvas.getContext("2d");
		menuCanvas.width = 400;
		menuCanvas.height = 100;

		var xPos = 0;
		var yPos = 0;
		menuContext.font="30px Consolas";
		menuContext.fillText("Menu",300,0);
	}
}