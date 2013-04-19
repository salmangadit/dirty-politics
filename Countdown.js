/**********************************************************************************************************************
Done by 	Renga Swarmy	(A0073676)
************************************************************************************************************************/

var canvasPieTimer = {

    // int: the canvas size (also used for circle radius and positioning)
    canvasSize : null,

    // object: the html canvas area
    canvas : null,

    // object : the interval between pie fills
    canvasInterval : null,

    // int : the time between updates (in milliseconds)
    timeInterval : 72000,

    // int : the time elapsed, (when it gets to timeLimit it triggers a refresh)
    timeElapsed : 0,

    // int : the timeLimit on which to trigger a refresh
    // Total number of days
    //3600000=1 hr in real time ,The player plays the game for 1 hour
    //60 days=3600000
    // 1day =72000
    totalDays:60,

    timeLimit : 1800000,

    oneDay:0,

    oneHour:0,

    oneMinute:0,

    prayStartTime:0,

    prayEndTime:0,

    newDay:true,

    pray:false,
    // angle to start the wedge from
    startAngle : -Math.PI/2,

    // int (float) : size of wedge to add each time
    wedgeSize : null,

    // string : the colours with which to fill the pie
    fillColour : "red",
    bgColour : "green",

    numberofDaysPassed:0,
    /*
     * start the process
     */
    init: function(canvasSize, canvasId){

        // not fully supported in IE as yet, so don't proceed on this occasion...
        if(window.attachEvent) {
            return false;
        }

        //
        this.oneDay=this.timeLimit/this.totalDays;

        this.oneHour=this.oneDay/24;

        this.oneMinute=this.oneHour/60;

        this.prayStartTime=11*this.oneHour;

        this.prayEndTime=13*this.oneHour;

        // set the canvas size for the object - used again later
        this.canvasSize = canvasSize;

        // Create a canvas element
        this.canvas = this.createCanvas(canvasId, this.canvasSize);

        this.wedgeSize = (this.timeInterval / this.timeLimit) * Math.PI * 2;

        // update the timer every x of a second
        this.canvasInterval = setInterval('canvasPieTimer.updatePie()', this.oneHour);
    },
    /*
     * create a canvas element of specific size
     */
    createCanvas: function(id, canvasSize) {

        // create the canvas
        var canvas = document.getElementById("hudCanvas");
        canvas.id = id;
        // canvas.width = canvasSize;
        // canvas.height = canvasSize;

        canvas.style.border = "none";
        // get the size of the outer circle
        var drawX = drawY = radius = this.canvasSize / 2;

        // draw the outer circle
        var draw = canvas.getContext("2d");


        draw.globalAlpha = 1;
        draw.beginPath();
        draw.arc(drawX, drawY, radius, 0, Math.PI*2, true);
        draw.fillStyle = this.bgColour;
        draw.fill();

        draw.fillStyle = 'black';
        draw.font = "30px Consolas";
        draw.fillText(this.totalDays,25,50);
        draw.fillStyle = 'black';
        draw.font = "10px Consolas";
        draw.fillText("Days to election",15,60);

        return canvas;
    },
    /*
     * Update the pie with the current time elapsed
     */
    updatePie: function() {

        if(this.timeElapsed >= (this.timeLimit))
        {
            this.gameOver();
        }


        // point(s) to start the drawing, half the canvas size
        var drawX = drawY = radius = this.canvasSize / 2;

        // Calculate the end angle

        this.timeElapsed = this.timeElapsed + this.oneHour;

        if(this.timeElapsed%this.prayStartTime==0)
        {this.pray=true;}

        if(this.timeElapsed%this.prayEndTime==0)
        {this.pray=false;}


            this.wedgeSize = (this.timeElapsed / this.timeLimit) * Math.PI * 2;
            var endAngle = this.startAngle + this.wedgeSize;

            var draw = this.canvas.getContext("2d");
            draw.clearRect(0,0,100,100);
            draw.beginPath();
            draw.moveTo(drawX,drawY);
            draw.arc(drawX, drawY, radius, this.startAngle, endAngle, false);
            draw.closePath();
            draw.fillStyle = this.fillColour;
            draw.fill();

            draw.fillStyle = 'black';
            draw.font = "30px Consolas";
            this.numberofDaysPassed =Math.round((this.totalDays-(this.timeElapsed/ this.oneDay)));
            draw.fillText(this.numberofDaysPassed ,25,50);
            draw.fillStyle = 'black';
            draw.font = "10px Consolas";
            draw.fillText("Days to election",15,60);
			DaysPassed = this.numberofDaysPassed;

    },
    addtime:function(howmuch){
       console.log(howmuch);
       switch(howmuch)
       {
           case 15:this.timeElapsed=Math.round(this.timeElapsed+(this.oneMinute*15));
                    break;
           case 10: this.timeElapsed= Math.round(this.timeElapsed+(this.oneMinute*10));
                    break;
           case 120:console.log(this.timeElapsed);
                    this.timeElapsed=Math.round(this.timeElapsed+(this.oneHour*2));
                    console.log(this.timeElapsed);
                     break;
           case 30:  this.timeElapsed=Math.round(this.timeElapsed+(this.oneMinute*30));
                    break;
           case 60:  this.timeElapsed= Math.round(this.timeElapsed+(this.oneMinute*60));
                    break;
           case 180: this.timeElapsed= Math.round(this.timeElapsed+(this.oneHour*3));
                    break;

       }

    },


    isPrayTime:function(){
        return  this.pray;
    },
    gameOver: function(){
        alert('Game Over');
    }
}