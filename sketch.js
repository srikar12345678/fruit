var PLAY=1;
var END=0;
var gameState=1;
var sword;
  var fruitsGroup,EnemysGroup;
var gameOver1;
var score=0;









function preload(){
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  monster=loadAnimation("alien1.png","alien2.png");
   gameOver1=loadImage("gameover.png");
  swordImage=loadImage("sword.png");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3")

  gameOverSound=loadSound("gameover.mp3");
  
  
  
  
 
}
function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitsGroup=createGroup();
  enemyGroup=createGroup();
  
}



function draw(){
  background("lightblue");
  
  if(gameState===PLAY){
    fruits();
    Enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
     if(fruitsGroup.isTouching(sword)){
      fruitsGroup.destroyEach();
       knifeSwooshSound.play();
      score=score+2;
    }
     else {
       if(enemyGroup.isTouching(sword)) {   
      gameState = END;
         gameOverSound.play();
    
      fruitsGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitsGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
      sword.addImage(gameOver1);
      sword.scale=1.5;
      sword.x=300;
      sword.y=300;
     }
    }
  }
  
  text("Score: " +score,500,50)
drawSprites();
}


function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    
    
    if(r===1){
      fruit.addImage(fruit1);
    }
    else if(r===2){
      fruit.addImage(fruit2);
    }
    else if(r===3){
      fruit.addImage(fruit3);
    }
    else {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitsGroup.add(fruit);
    
   
}
    if(World.frameCount%80===0){ 
    position=Math.round(random(1,2));
       
        
     
    if(position===1){
  fruit.x=400;
  fruit.velocityX=-(7+score/4);
}
else{
  if (position===2){
    fruit.velocityX=(7+score/4);
  }
}
 }
} 





function Enemy(){
  if(World.frameCount%200===0){
    monster1=createSprite(400,200,20,20);
    monster1.addAnimation("moving", monster);
    monster1.y=Math.round(random(100,300));
    monster1.velocityX=-(8+score/10);
    monster1.setLifetime=50;
    
    enemyGroup.add(monster1);
  }
}