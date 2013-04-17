/**
 * Created with JetBrains WebStorm.
 * User: renga
 * Date: 4/16/13
 * Time: 1:13 PM
 * To change this template use File | Settings | File Templates.
 */

function DrawHistogram(canvasname) {

    var histCanvas = document.getElementById(canvasname);
    // Ensure that the element is available within the DOM
    this.data = new Array(5);
    this.data[0] = "2,200";
    this.data[1] = "3,120";
    this.data[2] = "4,80";
    this.data[3] = "7,230";
    this.data[4] = "8,345";

    this.canvasWidth=histCanvas.width;
    this.canvasHeight=histCanvas.height;
    histCanvas.style.border = "none";
    this.context = histCanvas.getContext('2d');
        // Bar chart data

this.updatehistogram=function()
    {
        // clear the entire chart to redraw the charts
        this.context.clearRect ( 0 , 0 , this.canvasWidth , this.canvasHeight );
        this.drawBarChart(40, (this.canvasHeight -20), 30);

    }

this.clearhistogram=function()
{
    this.context.clearRect ( 0 , 0 , this.canvasWidth , this.canvasHeight );
}

// drawBarChart - draws a bar chart with the specified data
this.drawBarChart=function( startX, chartHeight, markDataIncrementsIn) {

    /********************************************************
     * Setup and Title
     */
    // set line width of this context to draw the 2 axis
    this.context.lineWidth = "1.0";
    var startY = 380;
    //draw Y axis

    //draw X axis
    drawLine(this.context, startX, startY, 570, startY);
    this.context.lineWidth = "0.0";
    // write the title of the bar chart Abstract 2
    this.context.textAlign = "center";
    this.context.fillStyle = "8EE630";
    this.context.font = 'italic 20pt Comic Sans';

    this.context.fillText("Abstraction-2", 100,20, 80);
    this.context.fillStyle = "FF5B03";

    // write the title of the bar chart Abstract 2
    this.context.fillText("Abstraction-3", 400,20, 80);
    //reset the font size for the labels
    this.context.font = 'Bold 7pt Comic Sans';

    /****HISTOGRAM FOR ABSTRACTION-3*/

    var maxValue = 0,binStart,binEnd,binSize,binHeight,tempBinHeight;
    var multiplier=6;

    for (var i=0; i<abstract2.binsList.length; i++) {
            //extract all the values of the histogram
            binStart=abstract2.binsList[i].binStart;
            binEnd=abstract2.binsList[i].binEnd;
            binSize= abstract2.binsList[i].binSize;
            binHeight=abstract2.binsList[i].binHeight;
            //store the maximum height of the entire of histogram
            tempBinHeight=binHeight;
            if (tempBinHeight>maxValue) maxValue = tempBinHeight;
        this.context.fillStyle = "1853F5";
        //drawRectangle(context, startX + (i * barWidth) + i, (chartHeight - height), barWidth, height, true);
        drawRectangle(this.context, startX + (i * binSize*multiplier) + i, (chartHeight - tempBinHeight*multiplier), binSize*multiplier, tempBinHeight*multiplier, true);
        this.context.textAlign = "left";
        this.context.fillStyle = "#000";
        this.context.fillText(binStart, startX + (i * binSize*multiplier) + i, chartHeight+10 , 200);

    }
    this.context.font = 'Bold 7pt Comic Sans'
// Add some data markers to the y-axis
    var numMarkers = abstract2.binsList.length;
    this.context.textAlign = "right";
    this.context.fillStyle = "#000";
    var markerValue = 0;
    for (var i=0; i<numMarkers; i++) {
        this.context.fillText( abstract2.binsList[i].binHeight,  startX+10+ (i * binSize*multiplier) + i, (chartHeight - abstract2.binsList[i].binHeight*multiplier)-3, 50);
        markerValue += markDataIncrementsIn;
    }
       /****HISTOGRAM FOR ABSTRACTION-3*/

    startX= startX+300;
    multiplier=4;

    for (var i=0; i<abstract3.binsList.length; i++) {
        //extract all the values of the histogram
        binStart=abstract3.binsList[i].binStart;
        binEnd=abstract3.binsList[i].binEnd;
        binSize= abstract3.binsList[i].binSize;
        binHeight=abstract3.binsList[i].binHeight;
        //store the maximum height of the entire of histogram
        tempBinHeight=binHeight;
        if (tempBinHeight>maxValue) maxValue = tempBinHeight;
        this.context.fillStyle="E6308E"
        //drawRectangle(context, startX + (i * barWidth) + i, (chartHeight - height), barWidth, height, true);
        drawRectangle(this.context, startX + (i * binSize*multiplier) + i, (chartHeight - tempBinHeight*multiplier), binSize*multiplier, tempBinHeight*multiplier, true);
        this.context.textAlign = "left";
        this.context.fillStyle = "#000";
        this.context.fillText(binStart, startX + (i * binSize*multiplier) + i, chartHeight+10 , 200);

    }

         this.context.font = 'Bold 7pt Comic Sans'
        // Add some data markers to the y-axis
        var numMarkers = abstract3.binsList.length;
        this.context.textAlign = "right";
        this.context.fillStyle = "#000";
        var markerValue = 0;
        for (var i=0; i<numMarkers; i++) {

        this.context.fillText( abstract3.binsList[i].binHeight,  startX+10+ (i * binSize*multiplier) + i, (chartHeight - abstract3.binsList[i].binHeight*multiplier)-3, 50);
        markerValue += markDataIncrementsIn;
          }

}

// drawLine - draws a line on a canvas context from the start point to the end point
function drawLine(contextO, startx, starty, endx, endy) {
    contextO.beginPath();
    contextO.moveTo(startx, starty);
    contextO.lineTo(endx, endy);
    contextO.closePath();
    contextO.stroke();
}

// drawRectanle - draws a rectangle on a canvas context using the dimensions specified
function drawRectangle(contextO, x, y, w, h, fill) {
    contextO.beginPath();
    contextO.rect(x, y, w, h);
    contextO.closePath();
    contextO.stroke();
    if (fill) contextO.fill();
}

}
