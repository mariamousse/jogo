const World = Matter.World;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;

var player;
var shoot, shootGroup;
var buttonPressed = "space";
var timer = 0;
var timer2 = 0;
var timer3 = 0;
var score = 0.1;
var life = 200;
var vida_png;
var enemieGroup;
var world,engine;
var gameState = "play";
var nivel = 0;
var color;


function preload(){
vida_png = loadImage("coração.png");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  player = createSprite(200,200,50,50);
  player.shapeColor = "red";

  enemieGroup = new Group();
  shootGroup = new Group();
  color = [random(0,255),random(0,255), random(0,255)];
  
 
}

function draw() {
  background(0); 
  Engine.update(engine);
  
  if(gameState == "play"){
  timer += 1;
  timer2 += 1;
  timer3 += 1;

  if(timer > 350){
    timer = 350
  }
 
  if(timer3 > 50){
    timer3 = 50
  }
  //camera.position.y = player.y;

  if(score >= 200){
    nivel +=1;
    score = 0;
    color = [random(0,255), random(0,255), random(0,255)];
    life += 50;
  }
  if(keyDown("a")){
    player.x -= 5;
    buttonPressed = "a";
  }
  if(keyDown("s")){
    player.y += 5;
    buttonPressed = "s";
  }
  if(keyDown("d")){
    player.x += 5;
    buttonPressed = "d";
  }
  if(keyDown("w")){
    player.y -= 5;
    buttonPressed = "w";
  }
  var shoot1 = timer;
  var shoot2 = timer - 50; 
  var shoot3 = timer - 100; 
  var shoot4 = timer - 150; 
  var shoot5 = timer - 200; 
  var shoot6 = timer - 250;
  var shoot7 = timer - 300;
   if(shoot1 >= 50){
    shoot1 = 50; 
   }
   if(shoot2 > 50){
    shoot2 = 50; 
   }
   if(shoot2 <0){
    shoot2 = 0
   }
   if(shoot3 > 50){
    shoot3 = 50;
   }
   if(shoot3 <0){
    shoot3 = 0
   }
   if(shoot4 > 50){
    shoot4 = 50;
   }
   if(shoot4 <0){
    shoot4 = 0
   }
   if(shoot5 > 50){
    shoot5 = 50;
   }
   if(shoot5 <0){
    shoot5 = 0
   }
   if(shoot6 > 50){
    shoot6 = 50;
   }
   if(shoot6 <0){
    shoot6 = 0
   }
   if(shoot7 > 50){
    shoot7 = 50;
   }
   if(shoot7 <0){
    shoot7 = 0
   }
  // console.log(shoot1 + " " + shoot2 + " " + shoot3 + " "+ shoot4 + " " + shoot5 + " " + shoot6 + " " + shoot7 + " "+ timer);
  if(keyDown("k") && timer > 50){
    CreateShoot();
    timer -= 25;
  }
  if(timer2 > 100){
    for(var a=0; a<4; a++){
      var r = Math.round(random(1,4));
      if(r == 1){
        CreateEnemieD();
      }
      if(r == 2){
        CreateEnemieL();
      }
      if(r == 3){
        CreateEnemieR();
      }
      if(r == 4){
        CreateEnemieT();
      }
    }
    console.log("a");
    timer2 = 0;
  }
  if(timer3 >= 50 && keyDown("shift")){
    Dash();
    timer3 = 0;
  }


  shootGroup.overlap(enemieGroup, function(shoot, enemie){
    shoot.destroy(); 
    enemie.destroy();
    score += 25;
  }
  );
  enemieGroup.overlap(player, function(enemie, player){
    enemie.destroy();
    life -= 50;
  }
  );
  if(life > 200){
    life = 200;
  }
}
  fill("white");
  textSize(50);
  if(life < 0.2){
    gameState = "end";
    text("FIM DE JOGO", windowWidth/2 - 150, windowHeight/2) 
    player.destroy();
  }
  textSize(20);
  text("nivel " + nivel, 110, 160);
  text()
 // text("lifes: " + life, 100,120);
 image(vida_png, 50, 70, 50,50);
 rect(100, 80, 200.1, 20);
 rect(100, 120, 200.1, 20);
 rect(350, 80, 200.1, 20);
 rect(350, 115, 20, 25);
 rect(380, 115, 20, 25);
 rect(410, 115, 20, 25);
 rect(440, 115, 20, 25);
 rect(470, 115, 20, 25);
 rect(500, 115, 20, 25);
 rect(530, 115, 20, 25);
 fill("red");
 rect(100, 80, life + 0.1, 20);
 fill(color);
 rect(100, 120, score, 20);
 fill(20,200,255);
 rect(350, 80, timer3*4+0.1, 20);
 fill("gold");
 rect(350, 115, 20, shoot1/2 + 0.1);
 rect(380, 115, 20, shoot2/2 + 0.1);
 rect(410, 115, 20, shoot3/2 + 0.1);
 rect(440, 115, 20, shoot4/2 + 0.1);
 rect(470, 115, 20, shoot5/2 + 0.1);
 rect(500, 115, 20, shoot6/2 + 0.1);
 rect(530, 115, 20, shoot7/2 + 0.1);
 drawSprites();
 
}
function CreateShoot(){
  shoot = createSprite(player.x, player.y, 50, 20);
  shoot.shapeColor = "gold"
  if(buttonPressed == "a"){
    shoot.velocityX = -20;
  }
  if(buttonPressed == "s"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = 20;
  }
  if(buttonPressed == "d"){
    shoot.velocityX = 20;
  }
  if(buttonPressed == "w"){
    shoot.width = 20;
    shoot.height = 50;
    shoot.velocityY = -20;
  }
  shoot.lifetime = 200;
  shootGroup.add(shoot);

  
}
function Dash(){
  if(buttonPressed == "a"){
    player.x += -100;
  }
  if(buttonPressed == "s"){
    player.y += 200;
  }
  if(buttonPressed == "d"){
    player.x += 100;
  }
  if(buttonPressed == "w"){
    player.y += -100;
  }
}
function CreateEnemieR(){
 var enemie = createSprite(windowWidth + 100, random(windowHeight - 100, 100), );
 enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
 enemie.velocityX = -10;
 enemie.lifetime = 150;
 enemieGroup.add(enemie);
}
function CreateEnemieL(){
  var enemie = createSprite(-100, random(100, windowHeight -100), );
  enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
  enemie.velocityX = 10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieD(){
  var enemie = createSprite(random(windowWidth - 100, 100), windowHeight + 100);
  enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
  enemie.velocityY = -10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
function CreateEnemieT(){
  var enemie = createSprite(random(100, windowWidth -100), -100);
  enemie.shapeColor = [random(0,255), random(0,255), random(0,255)];
  enemie.velocityY = 10;
  enemie.lifetime = 150;
  enemieGroup.add(enemie);
}
