function MenuGenerator(){
		var xPos = 120;
		var yPos = 30;

		var currItemNum = 1;
		var menuMax;
		var itemsStored;
		
	this.init = function(){
		menuCanvas = document.getElementById("menuCanvas");
		menuContext = menuCanvas.getContext("2d");
		menuCanvas.width = 300;
		menuCanvas.height = 400;

		menuContext.font = "30px Consolas";
		menuContext.fillText("Menu",xPos,yPos);
		yPos += 40;

		var items = ["item 1", "item 2"];
		this.drawMenu(items);

		this.nextItem();
		this.previousItem();
		this.clearMenu();
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