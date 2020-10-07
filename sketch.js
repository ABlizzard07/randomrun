var stage = 0;
var form;
var playerName, player, edgeTop;
var countFrames = 0;
var a = 0, b = 0, c = 0, d = 0;
var upimg, downimg, leftimg, rightimg;
var heartimg, lavaimg, safeimg;
var health = 200;
var healGroup;
var missileGroup, safeGroup;
var lavaGroup, lavastart;
var detonationTime = 100;
var safeStart, safeTime = 100;
var soil, star;
var score = 0, score1;
var restartbutton;

function preload(){
  upimg = loadImage("up.png");
  downimg = loadImage("down.png");
  leftimg = loadImage("left.png");
  rightimg = loadImage("right.png");
  heartimg = loadImage("heart.png");
  lavaimg = loadImage("lava.png");
  safeimg = loadImage("safe.png");
  soil = loadImage("bg.jpeg");
  star = loadImage("star.png");
}

function setup(){
  createCanvas(1800,1000);

  form = new Form();

  missileGroup = new Group();
  healGroup = new Group();
  lavaGroup = new Group();
  safeGroup = new Group();

  player = createSprite(900,500,50,50);
  player.visible = false;
  player.addImage(star);
  player.scale = 0.5;

  edgeTop = createSprite(900,300,1800,20);
  edgeTop.visible = false;
}

function draw(){
  background(soil); 
  edges = createEdgeSprites();
  form.display();

  drawSprites();
  text(mouseX+", "+mouseY,mouseX,mouseY);
  textAlign(CENTER);
  textSize(36);

  if(player.isTouching(healGroup)){
    if(health < 171){
      health += 30;
    }
    else if(health >= 171){
      health = 200;
    }
    healGroup.destroyEach();
  }

  if(stage == 1){
    player.visible = true;
    fill("lime");
    text("Hello "+playerName+"! Use WASD to Move the Player!",900,250);
    text("Health = "+health,900,125);
    text("Score: "+score1,400,100);
    countFrames += 1;
    score += 0.25;
    score1 = Math.round(score);

    if(health <= 0){
      stage = 2;
    }

    enemies();
    friendlies();
  }

  if(stage == 2){
    fill("lime");
    textSize(100);
    text("GAME OVER",900,400);
    player.visible = false;
    
    restartbutton = createButton();
    restartbutton.position(900,600);
    restartbutton.mousePressed(stage = 1);
  }

  if(lavastart == 1){
    detonationTime -= 1;

    if(detonationTime == 0){
      lavastart = 0;
      detonationTime = 100;
    }
  }

  player.bounceOff(edges[0]);
  player.bounceOff(edges[1]);
  player.bounceOff(edgeTop);
  player.bounceOff(edges[3]);

}

function keyPressed(){
  if(stage == 1){

  if(keyCode === 65){
   player.velocityX = -6;
   player.velocityY = 0;
  }

  if(keyCode === 68){
   player.velocityX = 6;
   player.velocityY = 0;
  }

  if(keyCode === 83){
   player.velocityY = 6;
   player.velocityX = 0;
  }

  if(keyCode === 87){
   player.velocityY = -6;
   player.velocityX = 0;
  }

 }
}

function enemies(){
  if(countFrames == 150){
    var basicmissile = createSprite(player.x,300,20,50);
    basicmissile.addImage(downimg);
    missileGroup.add(basicmissile);
    missileGroup.setVelocityYEach(5);
  }
  if(countFrames % 135 == 0 && countFrames > 135){

      var missilestart = Math.round(random(1,4));
      switch(missilestart){

      case 1: missiletop = createSprite(random(500,1300),360,20,50);
      a = a + countFrames/220;
      missiletop.velocityY = a + 10;
      missileGroup.add(missiletop);
      missiletop.lifetime = (-a)/2;
      missiletop.addImage(downimg);
      break;

      case 2: missilebottom = createSprite(random(500,1300),940,20,50);
      b = b + countFrames/220;
      missilebottom.velocityY = -b - 10;
      missileGroup.add(missilebottom);
      missilebottom.lifetime = b/2;
      missilebottom.addImage(upimg);
      break;

      case 3: missileleft = createSprite(60,random(500,800),50,20);
      c = c + countFrames/220;
      missileleft.velocityX = c + 10;
      missileGroup.add(missileleft);
      missileleft.lifetime = -c;
      missileleft.addImage(rightimg);
      break;

      case 4: missileright = createSprite(1740,random(500,800),50,20);
      d = d + countFrames/220;
      missileright.velocityX = -d - 10;
      missileGroup.add(missileright);
      missileright.lifetime = d;
      missileright.addImage(leftimg);
      }
    }

    if(countFrames % 200 == 0 && countFrames != 0 && lavastart != 1){
      lava = createSprite(player.x,player.y,10,10);
      lavastart = 1;
      lavaGroup.add(lava)
      lava.addImage(lavaimg);
    }
    
  if(countFrames % 550 == 0 && countFrames != 0){
    safezone = createSprite(random(500,1300),random(500,700),70,70);
    safeGroup.add(safezone);
    safezone.addImage(safeimg);
  } 

  if(missileGroup.isTouching(player)){
    health -= 40;
    missileGroup.destroyEach();
  }
  if(detonationTime < 20){
    if(player.isTouching(lavaGroup)){
      health -= 70;
    } 
    lavaGroup.destroyEach();
  }
}

function friendlies(){
   var heal; 
   if(countFrames % 310 == 0 && countFrames > 310){
      heal = createSprite(random(500,1300),random(500,800),10,10);
      healGroup.add(heal);
      heal.addImage(heartimg);
      heal.scale = 0.5;
   }
}