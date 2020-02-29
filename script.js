var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png"; 
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3"; 
score_audio.src = "audio/score.mp3";

var gap = 90;  //разница между верхним и нижным

var xPos = 10;
var yPos = 150;

var grav= 1.5;

var score=0;
var record = 0;

document.addEventListener("keydown", moveUp);

function moveUp(){
	yPos -= 30;
	fly.play();
}

var pipe=[];

pipe[0]= {
	x : cvs.width,
	y : 0
}

function draw(){

	ctx.fillStyle ="blue";
	ctx.font="24px Verdana";

	ctx.drawImage(bg, 0 , 0); 
	if(pipe.length>0){
		for(i=0; i<pipe.length; i++){

			if(pipe.length>0){
				ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
				ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y+pipeUp.height+gap);
			}
		
			pipe[i].x--;

			if(pipe[i].x==100){
				pipe.push({
					x : cvs.width,
					y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
				})
			}
			if(pipe.length>0){
				
				if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height
			 	|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)  || yPos + bird.height >= cvs.height - fg.height) {
					pipe.splice(0, pipe.length);
					xPos = 10;
					yPos = 150;
					score = 0;
				}
				 	
				if(pipe.length>0){
					if(pipe[i].x==10) {
					 	score_audio.play();
					 	score++;
					 	if(score>record) record=score;
					}
			 	}
		 	}
		}
	}
	else{
		pipe[0]= {
			x : cvs.width,
			y : 0
		}	
	}

	ctx.drawImage(fg, 0, cvs.height-fg.height);
	ctx.drawImage(bird, xPos, yPos);

	ctx.fillText("Score:" + score, 10, cvs.height-20);
	ctx.fillText("Record:" + record, 165, cvs.height-20);
	
	yPos += grav

	pipeBottom.onload = draw;

}