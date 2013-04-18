function heroObject()
{
    // The width and height of the sprites for our hero
    this.width = 32;
    this.height = 32;
    this.type;

    // Traits - will only be useful for enemies
    this.perception = -10; //the alma mater of this game!
    this.gullibility = 0.5;

    this.isMale = true;
    this.isHonest = true;
    this.isPotStirrer = true;
    this.watchesTV = true;
    this.isReligious = true;
    this.isGay = true;
    this.isTraveler = true;
    this.isSlut = true;
	this.moveType = "idle";
	this.movedTo = "";

    this.location = "cityA";
    this.neighbourhood;

    // Menu items
    // Global
    this.globalMenu =  ["Say truths about opponent","Make up lies about opponent", "Make a promise"];

    // Special
    this.specialMenu = [];

    this.prevPerception = 0;
    
    // Change this to use the render height and width
    this.x;
    this.y;
    this.gridX = parseInt(this.x/this.width);
    this.gridY = parseInt(this.y/this.height);
	this.idleGrid = new Array(this.gridX, this.gridY);

    this.previousX;
    this.previousY;

    this.targetGrid = new Array(this.gridX,this.gridY);

    this.keys = new Array();
    this.lastRender = Date.now();
    this.animSpeed = 250;
    this.image;
    this.whichSprite = 0;
    this.moveSpeed = 4;
    this.collision = false;
    this.lastKeyChange = Date.now();
    this.destroyed = false;

    this.keepMoving = false;
    this.lastMovedDirection = 0;
    this.facingWhichDirection = "down";

    this.render = function()
    {
        context.drawImage(this.image, this.whichSprite, 0, this.width, this.height, Math.floor(this.x), Math.floor(this.y), this.width, this.height);
		if (this.type == "player"){
            var wrapper = document.getElementById('canvasWrapper');
    		wrapper.scrollTop = this.y - MAX_SCREEN_WIDTH/2 - 16;
    		wrapper.scrollLeft = this.x - MAX_SCREEN_HEIGHT/2 - 16;
        }
		// context.font = "10px Consolas";
		// context.fillText("In " + mapGen.currMapName,wrapper.scrollLeft + 5,wrapper.scrollTop + 10);
    };
    this.checkCollision = function(obj)
    {
        if ((this.x < (obj.x + obj.width - 1) && Math.floor(this.x + this.width - 1) > obj.x)
            && (this.y < (obj.y + obj.height - 1) && Math.floor(this.y + this.height - 1) > obj.y))
        {
            return true;
        }
    };
    this.update = function(elapsed)
    {
       // store out the current x and y coordinates
        var prevX = this.x;
        var prevY = this.y;

        if (this.x%32 != 0 || this.y%32 !=0){
            this.keepMoving = true;
        } else {
            this.keepMoving = false;
        }

        if (this.keepMoving){
            this.keys[0] = this.lastMovedDirection;
        }

        if (this.perception >= 10){
            this.perception = 9.99;
        } else if (this.perception <=-10){
            this.perception = -9.99;
        }

        if (this.type == "npc" && this.prevPerception != this.perception){
            if (this.perception < -2){
                if (this.isMale){
                    this.image.src = 'images/characters/redMan32x32.png';
                } else {
                    this.image.src = 'images/characters/redWoman32x32.png';
                }
            } else if (this.perception >= -2 && this.perception <= 2){
                if (this.isMale){
                    this.image.src = 'images/characters/greenMan32x32.png';
                } else {
                    this.image.src = 'images/characters/greenWoman32x32.png';
                }
            } else {
                if (this.isMale){
                    this.image.src = 'images/characters/blueMan32x32.png';
                } else {
                    this.image.src = 'images/characters/blueWoman32x32.png';
                }
            }
        }

        this.prevPerception = this.perception;

        // reset the collision property
        this.collision = false;

        var now = Date.now();
        // How long has it been since we last updated the sprite
        var delta = now - this.lastRender;

        // perform a switch statement on the last key pushed into the array
        // this allows us to always move the direction of the most recently pressed
        // key
        switch (this.keys[this.keys.length - 1])
        {
             case 37:
                    this.lastMovedDirection = 37;
                    this.x -= this.moveSpeed * 1;
                    //if (this.x%32 == 0){
                        this.gridX = parseInt(this.x/this.width);
                        if (this.x%32 != 0 || this.y%32 !=0){
                            this.keepMoving = true;
                        } else {
                            this.keepMoving = false;
                            if (this.keys.indexOf(37) > -1) 
                                this.keys.splice(hero.keys.indexOf(37), 1);
                        }

                // Check if the animation timer has elapsed or if we aren't using one of the
                // two valid sprites for this direction
                if (delta > this.animSpeed 
                    || (this.whichSprite != this.width * parseInt(spriteInterface.left[0]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.left[1]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.left[2])))
                {
                    // The sprites for moving left are the 4th - 7th sprites in the image (0 based index)
                    //this.whichSprite = this.whichSprite == this.width * 2 ? this.width * 3 : this.width * 2;
                    if (this.whichSprite == this.width * parseInt(spriteInterface.left[0]))
                    {
                        this.whichSprite =this.width * parseInt(spriteInterface.left[1]);
                    } else if (this.whichSprite == this.width * parseInt(spriteInterface.left[1])) {
                        this.whichSprite = this.width * parseInt(spriteInterface.left[2]);
                    } else {
                        this.whichSprite =this.width * parseInt(spriteInterface.left[0]);
                    } 

                    this.lastRender = now;
                    this.facingWhichDirection = "left";
                }
                break;
            case 38:
                // move the hero up on the screen
                    this.lastMovedDirection = 38;
                    this.y -= this.moveSpeed * 1;
                    this.gridY = parseInt(this.y/this.height);

                    if (this.x%32 != 0 || this.y%32 !=0){
                        this.keepMoving = true;
                    } else {
                        this.keepMoving = false;
                        if (this.keys.indexOf(38) > -1) 
                            this.keys.splice(hero.keys.indexOf(38), 1);
                    }
            
                // Check if the animation timer has elapsed or if we aren't using one of the
                // two valid sprites for this direction
                if (delta > this.animSpeed 
                    || (this.whichSprite != this.width * parseInt(spriteInterface.up[0]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.up[1]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.up[2])))
                {
                     if (this.whichSprite == this.width * parseInt(spriteInterface.up[0]))
                    {
                        this.whichSprite =this.width * parseInt(spriteInterface.up[1]);
                    } else if (this.whichSprite == this.width * parseInt(spriteInterface.up[1])) {
                        this.whichSprite = this.width * parseInt(spriteInterface.up[2]);
                    } else {
                        this.whichSprite =this.width * parseInt(spriteInterface.up[0]);
                    } 

                    this.lastRender = now;
                    this.facingWhichDirection = "up";
                }
                break;
            case 39:
                // move the hero right on the screen
                    this.lastMovedDirection = 39;
                    this.x += this.moveSpeed * 1;
                    this.gridX = parseInt(this.x/this.width);

                    if (this.x%32 != 0 || this.y%32 !=0){
                        this.keepMoving = true;
                    } else {
                        this.keepMoving = false;
                        if (this.keys.indexOf(39) > -1) 
                            this.keys.splice(hero.keys.indexOf(39), 1);
                    }

                // Check if the animation timer has elapsed or if we aren't using one of the
                // two valid sprites for this direction
                if (delta > this.animSpeed 
                    || (this.whichSprite != this.width * parseInt(spriteInterface.right[0]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.right[1]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.right[2])))
                {
                    if (this.whichSprite == this.width * parseInt(spriteInterface.right[0]))
                    {
                        this.whichSprite =this.width * parseInt(spriteInterface.right[1]);
                    } else if (this.whichSprite == this.width * parseInt(spriteInterface.right[1])) {
                        this.whichSprite = this.width * parseInt(spriteInterface.right[2]);
                    } else {
                        this.whichSprite =this.width * parseInt(spriteInterface.right[0]);
                    } 

                    this.lastRender = now;
                    this.facingWhichDirection = "right";
                }
                break;
            case 40:
                // move the hero down on the screen
                this.lastMovedDirection = 40;
                this.y += this.moveSpeed * 1;

                this.gridY = parseInt(this.y/this.height);
                if (this.x%32 != 0 || this.y%32 !=0){
                    this.keepMoving = true;
                } else {
                    this.keepMoving = false;
                    if (this.keys.indexOf(40) > -1) 
                        this.keys.splice(hero.keys.indexOf(40), 1);
                }

                // Check if the animation timer has elapsed or if we aren't using one of the
                // two valid sprites for this direction
                if (delta > this.animSpeed 
                    || (this.whichSprite != this.width * parseInt(spriteInterface.down[0]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.down[1]) 
                        && this.whichSprite != this.width * parseInt(spriteInterface.down[2])))
                {
                    if (this.whichSprite == this.width * parseInt(spriteInterface.down[0]))
                    {
                        this.whichSprite =this.width * parseInt(spriteInterface.down[1]);
                    } else if (this.whichSprite == this.width * parseInt(spriteInterface.down[1])) {
                        this.whichSprite = this.width * parseInt(spriteInterface.down[2]);
                    } else {
                        this.whichSprite =this.width * parseInt(spriteInterface.down[0]);
                    }

                    this.lastRender = now;
                    this.facingWhichDirection = "down";
                }
                break;
        }

         // This code handles wrapping the hero from the edge of the canvas
        if (this.x < 0)
        {
            this.x = 0;
            this.gridX = parseInt(this.x/this.width);
        }
        if (this.x >= gameW-this.width)
        {
            this.x = gameW-this.width;
            this.gridX = parseInt(this.x/this.width);
            // if (this.gridX > 32){
            //  this.gridX = 32;
            // }
        }
        if (this.y < 0)
        {
            this.y = 0;
            this.gridY = parseInt(this.y/this.height);
        }
        if (this.y >= gameH-this.height)
        {
            this.y = gameH-this.height;
            this.gridY = parseInt(this.y/this.height);
            
        }

        // loop through all of the rocks in the array
        // we use an for-in loop to go through the rocks in case
        // we later add some logic that can destroy static objects
        // a regular for loop could break with null values if that happens
        for (iter in collidables)
        {
            // if we already have a collision there's no need to continue
            // checking the other rocks
            if (this.collision)
            {
                break;
            }
            else
            {
                // check to see if we have a collision event with the
                // current rock
                if (this.checkCollision(collidables[iter]))
                {
                        // reset our x and y coordinates and set our collision property to true
                        this.x = prevX;
                        //this.internalX = this.x;
                        this.y = prevY;
                        //this.internalY = this.y;
                        this.collision = true;

                        if (this.x%32 != 0 || this.y%32 !=0){
                            this.keepMoving = true;
                        } else {
                            this.keepMoving = false;
                        }
						
                }
            }
        }

        if (this.type != "npc"){
            for (iter in scenery)
            {
                // if we already have a collision there's no need to continue
                // checking the other rocks
                if (this.collision)
                {
                    break;
                }
                else
                {
                    // check to see if we have a collision event with the
                    // current rock
                    if (this.checkCollision(scenery[iter]))
                    {
                            //Clear the map and generate new map
                            if (scenery[iter].type == "door"){
                                var name = mapGen.parentMapName;
                                mapGen.parentMapName = "";
                                parentMapName = "";

                                 //Decompress next room info
                                var dataToCompress = dataOnNPC
                                var persistenceQueueObject;

                                var existingIndex = checkPersistenceQueue(mapGen.currMapName, name, mapGen.parentPosX, mapGen.parentPosY);

                                if (existingIndex == -1){
                                    persistenceQueueObject = new PersistenceQueueObject();
                                } else {
                                    persistenceQueueObject = persistenceQueue[existingIndex];
                                }
                                persistenceQueueObject.npc = npc;
                                persistenceQueueObject.dataOnNPC = dataOnNPC;
                                persistenceQueueObject.timeStamp = new Date().getTime();
                                persistenceQueueObject.levelToCompressInto = 2;
                                persistenceQueueObject.location = mapGen.currMapName;
                                persistenceQueueObject.city = name;
                                persistenceQueueObject.parentPosX = mapGen.parentPosX;
                                persistenceQueueObject.parentPosY = mapGen.parentPosY;

                                persistenceQueue.push(persistenceQueueObject);

                                //Check persistence queue first if it has the info to decompress otherwise 
                                // freshly decompress
                                var index = checkPersistenceQueue("city", name, mapGen.parentPosX, mapGen.parentPosY);

                                if (index == -1){
                                    var dataSet = abstractor.decompressFromSecondLevel("city");
                                    abstractor.renderNPCsforDataSet(dataSet, name, false);
                                } else {
                                    abstractor.renderNPCsforDataSet(persistenceQueue[index].dataOnNPC, name, true, persistenceQueue[index].npc);
                                }
                                
                                //Compress this room info back
                                // abstractor.compressIntoSecondLevel(dataToCompress);

                                mapGen.generate(name);
                            } else if (scenery[iter].type == "cityA" || scenery[iter].type == "cityB" || scenery[iter].type == "cityC" ){
                                mapGen.parentMapName = mapGen.currMapName;
                                parentMapName =  "";
                                mapGen.parentPosX = prevX;
                                mapGen.parentPosY = prevY;

                                var atomicData = dataOnNPC;

                                //Compress street in
                                abstractor.compressIntoSecondLevel(atomicData);

                                //Decompress next room info
                                var dataToCompress = abstract2;
                                
                                abstractor.decompressFromThirdLevel(scenery[iter].type);

                                //Abstract 2 is now generated. Time to test one level lower.
                                var dataSet = abstractor.decompressFromSecondLevel("city");
                                abstractor.renderNPCsforDataSet(dataSet, scenery[iter].type,false);

                                //Compress this room info back
                                abstractor.compressIntoThirdLevel(dataToCompress, mapGen.parentMapName);

                                mapGen.generate(scenery[iter].type);
                            }
                            else{
                                mapGen.parentMapName = mapGen.currMapName;
                                parentMapName = mapGen.currMapName;
                                mapGen.parentPosX = prevX;
                                mapGen.parentPosY = prevY;

                                //Decompress next room info
                                var dataToCompress = dataOnNPC;
                                var persistenceQueueObject;

                                var existingIndex = checkPersistenceQueue("city", name, mapGen.parentPosX, mapGen.parentPosY);

                                if (existingIndex == -1){
                                    persistenceQueueObject = new PersistenceQueueObject();
                                } else {
                                    persistenceQueueObject = persistenceQueue[existingIndex];
                                }

                                persistenceQueueObject.npc = npc;
                                persistenceQueueObject.dataOnNPC = dataOnNPC;
                                persistenceQueueObject.timeStamp = new Date().getTime();
                                persistenceQueueObject.levelToCompressInto = 2;
                                persistenceQueueObject.location = "city";
                                persistenceQueueObject.city = mapGen.currMapName;
                                persistenceQueueObject.parentPosX = mapGen.parentPosX;
                                persistenceQueueObject.parentPosY = mapGen.parentPosY;
                                persistenceQueue.push(persistenceQueueObject);

                                //Check persistence queue first if it has the info to decompress otherwise 
                                // freshly decompress
                                var index = checkPersistenceQueue(scenery[iter].type, mapGen.currMapName, mapGen.parentPosX, mapGen.parentPosY);

                                if (index == -1){
                                    var dataSet = abstractor.decompressFromSecondLevel(scenery[iter].type);
                                    abstractor.renderNPCsforDataSet(dataSet, scenery[iter].type,false);
                                } else {
                                    abstractor.renderNPCsforDataSet(persistenceQueue[index].dataOnNPC, name, true, persistenceQueue[index].npc);
                                }
                                

                                //Compress this room info back
                                //abstractor.compressIntoSecondLevel(dataToCompress);

                                mapGen.generate(scenery[iter].type);
								for (curNPC in npc) {
									console.log("shifting");
									npc[curNPC].uncollide();
								}
                            }

                            //this.internalY = this.y;
                            this.collision = true;
                    }
                }
            }
        }
		if (this.type != "player") {
		    for (iter in scenery)
            {
                if (this.collision)
                {
                    break;
                }
                else
                {
                    if (this.checkCollision(scenery[iter]))
                    {
						if (scenery[iter].type != "cityA" && scenery[iter].type != "cityB" && scenery[iter].type != "cityC" && scenery[iter].type != "door") {
							this.movedTo = scenery[iter].type;
							npcMoved.push(this);
							var data = new DataObj();
							data.isHonest = this.isHonest;
							data.isPotStirrer = this.isPotStirrer;
							data.watchesTV = this.watchesTV;
							data.isReligious = this.isReligious;
							data.isGay = this.isGay;
							data.isTraveler = this.isTraveler;
							data.isSlut = this.isSlut;
							data.isMale = this.isMale;
							data.perception = this.perception;
							data.gullibility = this.gullibility;
							data.x = this.x;
							data.y = this.y;
							var index = abstract2.findBinForPerceptionValue(data.perception);
							abstract2.binsList[index].addToBin(data);
							this.destroyed = true;
						}
					}
				}
			}
		}
    };
	
	this.uncollide = function() {
		var error = 0;
		for (test in collidables)
		{
			// if we already have a collision there's no need to continue
			// checking the other rocks
			if (this.collision)
			{
				break;
			}
			else
			{
				// check to see if we have a collision event with the
				// current rock
				while (this.checkCollision(collidables[test]))
				{
					error++;
					this.collision = true;
					if (error > 300) {
						break;
					}
					if (this.type == "npc") {
						if (this.gridX < 10) {
							this.x++;
							this.gridX = parseInt(this.x/this.width);
							console.log("shifting1");
						}
						else if (this.gridX > 10) {
							this.x--;
							this.gridX = parseInt(this.x/this.width);
							console.log("shifting2");
						}
						else if (this.gridY < 10) {
							this.y++;
							this.gridY = parseInt(this.y/this.height);
							console.log("shifting3");
						}
						else if (this.gridY > 10) {
							this.y--;
							this.gridY = parseInt(this.y/this.height);
							console.log("shifting4");
						}
					}
				}
			}
		}
	}

    function checkPersistenceQueue(location, city, parentPosX, parentPosY){
        for (var i = 0; i< persistenceQueue.length; i++){
            if (persistenceQueue[i].location == location && persistenceQueue[i].city == city
                && persistenceQueue[i].parentPosX == parentPosX && persistenceQueue[i].parentPosY == parentPosY){
                return i;
            }
        }

        return -1;
    }
};