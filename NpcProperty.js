/**********************************************************************************************************************
Done by 	Renga Swarmy	(A0073676)
************************************************************************************************************************/
function NpcProperty(canvasname){

    var npcPropertyCanvas = document.getElementById(canvasname);

    npcPropertyCanvas.width=gameW;
    npcPropertyCanvas.height=gameH;

    this.canvasWidth=npcPropertyCanvas.width=gameW;
    this.canvasHeight=npcPropertyCanvas.height=gameH;
 //   npcPropertyCanvas.style.border = "none";

    this.context = npcPropertyCanvas.getContext('2d');

    this.clearwriteNPCProperties=function(){
        this.context.clearRect ( 0 , 0 , this.canvasWidth , this.canvasHeight );
    }
    this.writeNPCProperties=function(npc){
         var characterX = npc.x+10;
         var characterY = npc.y < npc.height ? (npc.y + npc.height) : (npc.y - npc.height);

        if(npc.isSlut)
            this.writeText("isSlut:True",characterX,characterY,"black");
        if(!npc.isSlut)
            this.writeText("isSlut:False",characterX,characterY,"black");

        characterY= characterY-10;
        if(npc.isTraveler)
            this.writeText("isTraveler:True",characterX,characterY,"black");
        if(!npc.isTraveler)
            this.writeText("isTraveler:False",characterX,characterY,"black");
        characterY= characterY-10;

        if(npc.isGay)
            this.writeText("isGay:True",characterX,characterY,"black");
        if(!npc.isGay)
            this.writeText("isGay:False",characterX,characterY,"black");

        characterY= characterY-10;
        if(npc.isReligious)
            this.writeText("isReligious:True",characterX,characterY,"black");
        if(!npc.isReligious)
            this.writeText("isReligious:False",characterX,characterY,"black");

        characterY= characterY-10;
        if(npc.watchesTV)
            this.writeText("watchsTv:True",characterX,characterY,"black");
        if(!npc.watchesTV)
            this.writeText("watchsTv:False",characterX,characterY,"black");

        characterY= characterY-10;
        if(npc.isPotStirrer)
            this.writeText("isPostStirrer:True",characterX,characterY,"black");
        if(!npc.isPotStirrer)
            this.writeText("isPostStirrer:False",characterX,characterY,"black");
        characterY= characterY-10;
        if( npc.isHonest)
         this.writeText("isHonest:True",characterX,characterY,"black");
         if(!npc.isHonest)
         this.writeText("isHonest:False",characterX,characterY,"black");

    }
    this.writeText = function (myString, x,y,color) {
        this.context.fillStyle = color;
        this.context.font = "bold 10px Arial";
        this.context.fillText(myString, x,y);
    }


}