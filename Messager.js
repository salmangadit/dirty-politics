/**********************************************************************************************************************
Done by Salman Gadit 	(U095146E)
************************************************************************************************************************/

function Messager(){
	var HOLD_TIME = 1500;
	var startTime;
	var intervalId;
	var TIME_INTERVAL = 200;
	var messageToFlash;

	this.flash = function(message){
		startTime = Date.now();
		messageToFlash = message;
		var id = window.setInterval( function() {
			flashBox((Date.now()-startTime)/TIME_INTERVAL);
		}, TIME_INTERVAL );

		intervalId = id;
		return id;
	};
	
	function flashBox(width){
		var addedWidth = HOLD_TIME/TIME_INTERVAL;
		if (width <= 5){
			messageContext.beginPath();
      		messageContext.rect(0, MAX_SCREEN_HEIGHT/4, (MAX_SCREEN_WIDTH * width)/4, MAX_SCREEN_HEIGHT/2);
      		messageContext.fillStyle = 'black';
      		messageContext.fill();
		} else if (width >= 5 + addedWidth){
			messageContext.beginPath();
      		messageContext.clearRect(0, MAX_SCREEN_HEIGHT/4, MAX_SCREEN_WIDTH * (width- (5+addedWidth))/4, MAX_SCREEN_HEIGHT/2);
		} else if (width > 5 && width < (5 + addedWidth)){
			messageContext.font = '20px Consolas';
      		messageContext.fillStyle = 'white';
      		wrapText(messageContext, messageToFlash, 10, MAX_SCREEN_HEIGHT/2,  MAX_SCREEN_WIDTH, 22);

		} else if (width > 5 + addedWidth + 5){
			//switch off
			window.clearInterval(intervalId);
		}
	}

	function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if(testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }
}	



