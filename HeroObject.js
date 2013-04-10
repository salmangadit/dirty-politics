function heroObject()
{
    // The width and height of the sprites for our hero
    this.width = 32;
    this.height = 32;

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
		var wrapper = document.getElementById('canvasWrapper');
		wrapper.scrollTop = this.y - MAX_SCREEN_WIDTH/2 - 16;
		wrapper.scrollLeft = this.x - MAX_SCREEN_HEIGHT/2 - 16;
		context.font = "10px Consolas";
		context.fillText("In " + mapGen.currMapName,wrapper.scrollLeft + 5,wrapper.scrollTop + 10);
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
                    || (this.whichSprite != this.width * spriteInterface.left[0] && this.whichSprite != this.width * spriteInterface.left[1] 
                        && this.whichSprite != this.width * spriteInterface.left[2] && this.whichSprite != this.width * spriteInterface.left[3]))
                {
                    // The sprites for moving left are the 4th - 7th sprites in the image (0 based index)
                    //this.whichSprite = this.whichSprite == this.width * 2 ? this.width * 3 : this.width * 2;
                    if (this.whichSprite == this.width * 4)
                    {
                        this.whichSprite = this.width * 5;
                    } else if (this.whichSprite == this.width * 5) {
                        this.whichSprite = this.width * 6;
                    } else if (this.whichSprite == this.width * 6) {
                        this.whichSprite = this.width * 7;
                    } else {
                        this.whichSprite = this.width * 4;
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
                    || (this.whichSprite != this.width * spriteInterface.up[0] && this.whichSprite != this.width * spriteInterface.up[1] 
                        && this.whichSprite != this.width * spriteInterface.up[2] && this.whichSprite != this.width * spriteInterface.up[3]-1))
                {
                    if (this.whichSprite == this.width * 12)
                    {
                        this.whichSprite = this.width * 13;
                    } else if (this.whichSprite == this.width * 13) {
                        this.whichSprite = this.width * 14;
                    } else if (this.whichSprite == this.width * 14) {
                        this.whichSprite = this.width * 15 - 1;
                    } else {
                        this.whichSprite = this.width * 12;
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
                    || (this.whichSprite != this.width * spriteInterface.right[0] && this.whichSprite != this.width * spriteInterface.right[1] 
                        && this.whichSprite != this.width * spriteInterface.right[2] && this.whichSprite != this.width * spriteInterface.right[3]))
                {
                    if (this.whichSprite == this.width * 8)
                    {
                        this.whichSprite = this.width * 9;
                    } else if (this.whichSprite == this.width * 9) {
                        this.whichSprite = this.width * 10;
                    } else if (this.whichSprite == this.width * 10) {
                        this.whichSprite = this.width * 11;
                    } else {
                        this.whichSprite = this.width * 8;
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
                    || (this.whichSprite != this.width * spriteInterface.down[0] && this.whichSprite != this.width * spriteInterface.down[1] 
                        && this.whichSprite != this.width * spriteInterface.down[2] && this.whichSprite != this.width * spriteInterface.down[3]))
                {
                    if (this.whichSprite == this.width * 0)
                    {
                        this.whichSprite = this.width * 1;
                    } else if (this.whichSprite == this.width * 1) {
                        this.whichSprite = this.width * 2;
                    } else if (this.whichSprite == this.width * 2) {
                        this.whichSprite = this.width * 3;
                    } else {
                        this.whichSprite = this.width * 0;
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

                            mapGen.generate(name);
                        }
                        else{
                            mapGen.parentMapName = mapGen.currMapName;
                            mapGen.parentPosX = prevX;
                            mapGen.parentPosY = prevY;
                            mapGen.generate(scenery[iter].type);
                        }

                        //this.internalY = this.y;
                        this.collision = true;
                }
            }
        }


    };
};