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

    this.location;
    this.neighbourhood;

    // Menu items
    // Global
    this.globalMenu = ["item1", "item2"];

    // Special
    this.specialMenu = [];

    this.prevPerception = 0;
    
    // Change this to use the render height and width
    this.x;
    this.y;
    this.gridX = parseInt(this.x/this.width);
    this.gridY = parseInt(this.y/this.height);

    this.previousX;
    this.previousY;

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
    this.facingWhichDirection = "";

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

                                 //Decompress next room info
                                var dataToCompress = dataOnNPC;
                                var dataSet = abstractor.decompressFromSecondLevel("city");
                                abstractor.renderNPCsforDataSet(dataSet, name);

                                //Compress this room info back
                                abstractor.compressIntoSecondLevel(dataToCompress);

                                mapGen.generate(name);
                            } else if (scenery[iter].type == "cityA" || scenery[iter].type == "cityB" || scenery[iter].type == "cityC" ){
                                mapGen.parentMapName = mapGen.currMapName;
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
                                abstractor.renderNPCsforDataSet(dataSet, scenery[iter].type);

                                //Compress this room info back
                                abstractor.compressIntoThirdLevel(dataToCompress, mapGen.parentMapName);

                                mapGen.generate(scenery[iter].type);
                            }
                            else{
                                mapGen.parentMapName = mapGen.currMapName;
                                mapGen.parentPosX = prevX;
                                mapGen.parentPosY = prevY;

                                //Decompress next room info
                                var dataToCompress = dataOnNPC;
                                var dataSet = abstractor.decompressFromSecondLevel(scenery[iter].type);
                                abstractor.renderNPCsforDataSet(dataSet, scenery[iter].type);

                                //Compress this room info back
                                abstractor.compressIntoSecondLevel(dataToCompress);

                                mapGen.generate(scenery[iter].type);
                            }

                            //this.internalY = this.y;
                            this.collision = true;
                    }
                }
            }
        }


    };
};