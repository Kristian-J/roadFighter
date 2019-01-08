enemies = [];
let player;
let playerX = 100;
roadImgs = [];
lines = [];
velocity = 3;
let counterOne = 0;
let counterTwo;
let inceptionPoint = 10;
let difficulty = 0.3;
let lifeNum = 3;
let lives = [];
let score = 0;
let heartImg = [];
let playerImg;
let seasons = {
    summer: {
        r: 200,
        g: 200,
        b: 100
    },
    winter:{
        r: 250,
        g: 250,
        b: 255
    }, 
}


function drawNewEnemy(){
//    newEnemy = createSprite(random(50, width - 50), -50, 20, 50);
//    newEnemy.setSpeed(1+ velocity, 90);
    tempEnemy = {
        r: random(50,255),
        g: random(50,255),
        b: random(50,255),
        thisSprite: undefined
    }
    
    print(tempEnemy.r, tempEnemy.g, tempEnemy.b);
    tempSprite = createSprite(random(110, width - 110), -50, 20, 50)
    tempSprite.addImage(enemyImg,40,50);
    tempEnemy.thisSprite = tempSprite;
    enemyImg.resize(60,0);
    tempEnemy.thisSprite.rotation = 90;
    
    append(enemies, tempEnemy);
    
    inceptionPoint = random(30, 120);
    counterOne = 0;
    print('enemy created');
}
function drawScenery(){
    return
}
function drawLives(){
    let pos = 50;
    for(i=0; i< 10; i++){
        let temp = createSprite(pos, height - 20, 50, 50);
        temp.addAnimation('run', 'images/heart/tile000.png',  'images/heart/tile007.png' )
        temp.scale = 0.4;
//        temp.tint('red');
        append(lives, temp);
        pos += 50;
    }
    print(lives[0]);
    return
}

//this function is called to update the movement speed of enemy sprites.
//uses global velocity variable to calculate sprite speed.
function updateSpeed(){
        for(i = 0; i< enemies.length; i++){
            enemies[i].setSpeed(1+ velocity, 90)
            print('updated')
        }
}

function positionManager(){
    if(keyIsDown(RIGHT_ARROW)){
        if(playerX < width - 50){playerX += (0 + velocity * 0.6)}
        print("RIGHT");
    }
    if(keyIsDown(LEFT_ARROW)){
        if(playerX >  50){playerX -=  (0 + velocity * 0.6)}
        print("RIGHT");
    }
    if(keyIsDown(UP_ARROW)){
        if(velocity < 8){velocity += 0.1;}
    }
    if(keyIsDown(DOWN_ARROW)){
        if(velocity > 0 ){velocity -= 0.1;}
    }
//    print("velocity = " + velocity);
}
function keyManager(key){
    print('called', key);
    
    return
}

//this method will be used to determin if a point is in trasition zone.
function isInTransition(){
    return
}
function preload() {
    playerImg = loadImage("images/testing/tilea002.png");
    enemyImg = loadImage("images/car004.png");
    print(playerImg);
//    sequenceAnimation = loadAnimation('images/heart/tile000.png', 'images/heart/tile007.png');
}
function setup() {
  // put setup code here
    angleMode(DEGREES);
    print(velocity)
    createCanvas(550, 750);
    playerX = width/2;
    var localCount = 0;
    
    for(p = -30; p < height + 50; p+= 50){
        lines[localCount] = createSprite(width /2, p, 2, 25);
        lines[localCount].setSpeed(velocity, 90);
        lines[localCount].shapeColor = 'yellow';
        localCount++;
    }
    
    player = createSprite(playerX, height-100, 20, 40);
//    player.addImage("images/car002.png", 35,50);
    playerImg.resize(40,0);
//    player.rotation = -90;
    player.addImage(playerImg,50,40);
    drawLives();
}

function draw() {
  // put drawing code here
    positionManager();
    if(keyIsPressed){keyManager(key)}
    
    counterOne += velocity * difficulty + 1;
    if(counterOne > inceptionPoint){
//        for(i = 0; i<lines.length; i++){
//            print(lines[i].position.y);
//        }
        drawNewEnemy();
    }
//    updateSpeed();
    print(enemies.length)
    for(i = 0; i< enemies.length; i++){
        enemies[i].thisSprite.setSpeed(1+ velocity, 90)
        if(enemies[i].thisSprite.position.y > height + 100){enemies.splice(i, 1); print('removed');}
//        print('updated')
    }
    
    player.position.x = playerX;
    
    for(i = 0; i<lines.length; i++){
        lines[i].setSpeed(velocity, 90);
//        print(lines[i].position.y);
        if(lines[i].position.y > height + 68) {
            lines[i].position.y = -30
        }
    }
    background(100);
    fill(200, 200, 100);
    rect(0, 0, 100, height);
    rect(width - 100, 0, 100, height);
    rectMode(CENTER);
//    drawSprites();
    for(i=0; i<enemies.length; i++){
        tint(enemies[i].r,enemies[i].b,enemies[i].b,)
        drawSprite(enemies[i].thisSprite);
    }
    tint(255, 255, 255);
    drawSprite(player);
    print("lives = "+ lifeNum);
    for(i=0; i<lifeNum;i++){
        drawSprite(lives[i]);
    }
    fill('orange');
    stroke("black");
    score += 0.5 + velocity/2;
    textStyle(BOLD);
    textSize(20);
    text("score: " + round(score), 10, 20);
    
}