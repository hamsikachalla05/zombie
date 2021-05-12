var bg,bgImg,bgGameOverImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg,zombieImg1;
var bullet, bulletImg,bulletsGroup;

var heart;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var score = 0;
var life = 3;
var bullets = 70;

var gameState = "fight"

var lose, winning, explosionSound;
 
function preload(){
  
  heart1Img = loadImage("assets/h1.png")
  heart2Img = loadImage("assets/h2.png")
  heart3Img = loadImage("assets/h3.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bulletImg = loadImage("assets/bullet.png");

  zombieImg = loadAnimation("assets/1.png","assets/2.png","assets/3.png","assets/4.png")
  
  bgImg = loadImage("assets/bg.jpeg")
  //bgGameOverImg=loadImage("assests/gameover.png");

  lose = loadSound("assets/lose.mp3")
  winning = loadSound("assets/win.mp3")
  explosionSound = loadSound("assets/explosion.mp3")

  
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  bg=createSprite(windowWidth/2,windowHeight/2);
  bg.addImage(bgImg);

  player=createSprite(windowWidth/3,windowHeight-100);
  player.addImage(shooterImg);
  player.scale=0.3;

  heart=createSprite(windowWidth-300,80)

  zombieGroup=new Group();
  bulletsGroup=new Group(); 

}

function draw() {
  background(0);

  if(gameState=="fight"){
console.log(life);
  //if zombie touches the player
     if(zombieGroup.isTouching(player)){
       
       for(var i=0; i<zombieGroup.length;i++){
         if(zombieGroup[i].isTouching(player)){
           zombieGroup[i].destroy();
         }
       }
       life=life-1;
     }
//if bullet touches the zombie
for(var i=0; i<zombieGroup.length;i++){
    if(bulletsGroup.isTouching(zombieGroup[i])){
     bulletsGroup.destroyEach();
     zombieGroup[i].destroy();
     score=score+1;
    }
  }
   //check lifes:
   if(life==3){
     heart.addImage(heart3Img);
     heart.scale=0.3
   }

   else if(life==2){
    heart.addImage(heart2Img);
   }

   else if(life==1){
     heart.addImage(heart1Img);
   }

   else if(life==0){
     gameState="end";
   }

  if(keyDown(UP_ARROW)){
    player.y=player.y-10;
  }

 if(keyDown(DOWN_ARROW)){
    player.y=player.y+10;
  }

  if(keyDown(LEFT_ARROW)){
    player.x=player.x-10;
  }

  if(keyDown(RIGHT_ARROW)){
    player.x=player.x+10;
  }

  spawnZombies();

if(keyWentDown("space")){
  player.addImage(shooter_shooting);
  spawnBullets();
}
else if(keyWentUp("space")){
  player.addImage(shooterImg);
  bullets=bullets-1;
}

if(bullets==0){
  gameState="end";
}
  }
  else{
    //this is game state end:
    heart.visible=false;
    zombieGroup.destroyEach();
    player.visible=false;
   // bg.addImage(bgGameOverImg);
  }
  
  drawSprites();
  fill("black");
  textSize(20);
text("score="+score,windowWidth-200,100);
text("bullets left="+bullets,windowWidth-200,75);

}

function spawnZombies()
{
  if(frameCount%100==0){
zombie=createSprite(windowWidth,random(windowHeight-600,windowHeight-50));
zombie.velocityX=-4;
zombie.addAnimation("adding",zombieImg);
zombie.lifetime=windowWidth;
zombieGroup.add(zombie);
zombie.scale=0.5;
  }
}

function spawnBullets(){
  bullet=createSprite(player.x ,player.y);
  bullet.velocityX=5;
  bullet.addImage(bulletImg);
  bullet.scale=0.2;
  bullet.lifetime=200;
  bulletsGroup.add(bullet)
  
}