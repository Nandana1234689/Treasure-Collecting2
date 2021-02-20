var path,girl,cash,diamonds,jwellery,sword;
var pathImg,girlImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gamestate = "play" 
var gameOver,gi
var replay,ri
var ball,bi
var hitsound,jumpsound,bgmusic

function preload(){
  girlImg         = loadAnimation("girl.png");
  gi             =loadAnimation("gameOver.png");
  pathImg        = loadImage("backgroung2.jpg")
  cashImg        = loadImage("cash.png");
  diamondsImg    = loadImage("diamonds.png");
  jwelleryImg    = loadImage("jwell.png");
  swordImg       = loadImage("sword.png");
  ri             = loadImage("replay.png")
  bi             = loadImage("ball-removebg-preview.png")
  bgmusic        = loadSound("bensound.mp3")
  hitsound       = loadSound("download (1).mp3")
  jumpsound      = loadSound("download.mp3")
  
  cashG          =new Group();
  diamondsG      =new Group();
  jwelleryG      =new Group();
  swordGroup     =new Group();
  ballG          =new Group();
}

function setup(){
createCanvas(500,500);

 path=createSprite(200,280,10,100);
 path.addImage(pathImg);
  
 girl = createSprite(100,130,20,20);
 girl.addAnimation("SahilRunning",girlImg);
 girl.scale=0.14;

 gameover =createSprite(270,250,20,50)
 gameover.addAnimation("running",gi)
 gameover.scale=0.5
 gameover.visible=false
 replay =createSprite(270,318,20,50)
 replay.addImage(ri)
 replay.scale=0.4
 replay.visible=false

}

function draw() {
background(0);

 if(gamestate == "play"){
                           
              
                          girl.y = World.mouseY;
   
                          edges= createEdgeSprites();
                          girl.collide(edges);
                     
                    if(path.x < 10 ){
                          path.x = 500;
                          path.velocityX = -(3 + frameCount/900)
                          bgmusic.play()
                          
                    }
   
                    if (cashG.isTouching(girl)) {
                       cashG.destroyEach();
                       treasureCollection+= 50;
                       jumpsound.play()
                   }
                    if (ballG.isTouching(girl)) {
                       ballG.destroyEach();
                       treasureCollection-= 10;
                       jumpsound.play()
                   }                    
                   else if (diamondsG.isTouching(girl)) {
                            diamondsG.destroyEach();
                            treasureCollection+= 50;
                            jumpsound.play()
                  }
                   else if(jwelleryG.isTouching(girl)) {
                           jwelleryG.destroyEach();
                           treasureCollection+= 50;
                           jumpsound.play()
                 }
  
                   else if(swordGroup.isTouching(girl)) {
                           swordGroup.destroyEach();
                           girl.destroy()
                           jwelleryG.destroyEach()
                           diamondsG.destroyEach();
                           cashG.destroyEach();
                           ballG.destroyEach();
                           gamestate = "end"
                           hitsound.play()
                     
                  }
                          path.velocityX = -4;
                          createCash();
                          createDiamonds();
                          createJwellery();
                          createSword();
                          createBall()         

                  }
  
if(gamestate == "end" ){
   
                                path.velocityX=0
                                cashG.setVelocityXEach(0)
                                diamondsG.setVelocityXEach(0)
                                jwelleryG.setVelocityXEach(0)
                                ballG.setVelocityXEach(0)
                                gameover.visible=true
                                replay.visible=true
                                 bgmusic.stop()
                   if(mousePressedOver(replay)){
                      gamestate="restart"
                   }
                   }

if(gamestate == "restart"){
                          girl=createSprite(100,130,20,20)
                          girl.addAnimation("SahilRunning",girlImg);
                          girl.scale=0.14;
                          treasureCollection = 0;
                      text("Treasure: "+ treasureCollection,200,30);
                          gameover.visible=false
                          replay.visible=false
                          gamestate="play"
                   }

 
drawSprites();
 textSize(20);
 fill(255);
 text("Treasure: "+ treasureCollection,200,30);

                   }

function createCash() {
      if (World.frameCount % 80 == 0) {
      cash = createSprite(500,180,50,50);
      cash.y = Math.round(random(240,400))
      cash.velocityX = -(3 + frameCount/900)
      cash.addImage(cashImg);
      cash.scale=0.13;
      cash.lifetime = 100;
      cashG.add(cash);
      }
}

function createDiamonds() {
      if (World.frameCount % 80 == 0) {
      var diamonds = createSprite(460,280,20,50);
      diamonds.y = Math.round(random(200,450))
      diamonds.velocityX = -(3 + frameCount/400)
      diamonds.addImage(diamondsImg);
      diamonds.scale=0.03;
      diamonds.lifetime = 150;
      diamondsG.add(diamonds);
      }
}

function createJwellery() {
      if (World.frameCount % 80 == 0) {
      var jwellery = createSprite(Math.round(random(60, 450)), 300, 100); 
      jwellery.velocityX = -(3 + frameCount/900)
      jwellery.addImage(jwelleryImg);
      jwellery.scale=0.13;
      jwellery.lifetime = 150;
      jwelleryG.add(jwellery);
      }
}

function createSword(){
      if (World.frameCount % 150 == 0) {
      var sword = createSprite(450,350,50,20)
      sword.y = Math.round(random(230,450),10, 10);
      sword.velocityX = -(3 + frameCount/900)
      sword.addImage(swordImg);
      sword.scale=0.1;
      sword.lifetime = 150;
      swordGroup.add(sword);
      }
}

function createBall(){
      if (World.frameCount % 170 == 0) {
      var ball = createSprite(580,460,30,20)
      ball.x = Math.round(random(430,270),10, 10);
      ball.velocityX = -(4 + frameCount/1000)
      ball.addImage(bi);
      ball.scale=0.15;
      ball.depth=girl.depth
      girl.depth=girl.depth+1
      ball.lifetime = 150;
      ballG.add(ball);
      }  
  
  
  
  
  
  
}