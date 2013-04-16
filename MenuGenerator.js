function MenuGenerator(){
	var xPos = 120;
	var yPos = 30;

	var currItemNum = 1;
	var menuMax = 0;
	var itemsStored = new Array();

	this.init = function(){
        menuCanvas = document.getElementById("menuCanvas");
        menuContext = menuCanvas.getContext("2d");
        menuCanvas.width = 300;
        menuCanvas.height = 200;

    }

    this.addMenuItems = function(items){
    	menuMax += items.length;
    	for (var i=0; i<items.length; i++){
			itemsStored.push(items[i]);
		}
    }

	this.drawMenuItem = function(item){

		menuContext.font = "18px Consolas";
		menuContext.fillText(item,xPos,yPos);
		yPos += 20;
	}

	this.drawMenu = function(){
        menuContext.font = "20px Comic Sans";
        menuContext.fillText("Menu",xPos,yPos);
        xPos = 50;
        yPos += 40;
		for (var i=0; i<itemsStored.length; i++){
			this.drawMenuItem(itemsStored[i]);
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
		menuCanvas.height = 200;

		itemsStored = [];
	}
}