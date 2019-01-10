// sprite set holders
let enemies = [];
let lines = [];
let player;
let playerCarImgs = [];

// player default values
let playerX = 100;
let velocity = 3;

// counters
let counterOne = 0; //enemy spawn timer.
let inceptionPoint = 10;// enemy spawn time threshold
let counterTwo = 0;

// game core values
let difficulty = 0.3;
let lifeNum = 3;
let lives = [];
let score = 0;
// additional game control values
let season = 1;


// image sets
let heartImg = [];
let playerImg;
let enemyImg;

// flags
let crash = Boolean;
let run = Boolean;
let mainMenu = true;
let playerMoved = false;

// background control perams
let seasons = [
     {
        name: 'Summer',
        r: 11,
        g: 102,
        b: 35
    },
    {
        name: 'Winter',
        r: 220,
        g: 230,
        b: 255
    }, 
    {
        name: 'Spring',
        r: 0,
        g: 168,
        b: 107
    }, 
    {
        name: 'Autumn',
        r: 200,
        g: 200,
        b: 100
    } 
]

// redundent variables 
let roadImgs = [];

function drawNewEnemy(){
//    newEnemy = createSprite(random(50, width - 50), -50, 20, 50);
//    newEnemy.setSpeed(1+ velocity, 90);
    tempEnemy = {
        r: random(50,255),
        g: random(50,255),
        b: random(50,255),
        thisSprite: undefined,
        scored: false
    }
    
//    print(tempEnemy.r, tempEnemy.g, tempEnemy.b);
    tempSprite = createSprite(random(110, width - 110), -50, 20, 50)
    tempSprite.addImage(enemyImg,40,50);
    tempEnemy.thisSprite = tempSprite;
    enemyImg.resize(60,0);
    tempEnemy.thisSprite.rotation = 90;
    
    append(enemies, tempEnemy);
    
    inceptionPoint = random(60 - velocity * 2, 120);
    counterOne = 0;
//    print('enemy created');
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
//    print(lives[0]);
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
        if(playerX < width - 120){playerX += (0 + velocity * 0.6)}
        if(!playerMoved){
            playerMoved = true
        }
    }
    if(keyIsDown(LEFT_ARROW)){
        if(playerX >  120){playerX -=  (0 + velocity * 0.6)}
        if(!playerMoved){
            playerMoved = true
        }
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
    
    //call menu
    if(key == "m"){
        print('menu has been called');
        run = false;
        print(run);
    }
    
    return
}

//this method will be used to determin if a point is in trasition zone.
function isInTransition(){
    return
}

function preload() {
    enemyImg = loadImage("images/car004.png");
    for(i=0;i<9;i++){
        tempImg = loadImage("images/testing/tile00"+i+".png");
        append(playerCarImgs, tempImg);
    }
    playerImg = playerCarImgs[0];
    print(playerCarImgs.length);
//    sequenceAnimation = loadAnimation('images/heart/tile000.png', 'images/heart/tile007.png');
}

function setup() {
  // put setup code here
    angleMode(DEGREES);
//    print(velocity);
    thisCanvas = createCanvas(550, 750);
    
    var localCount = 0;
    for(p = -30; p < height + 50; p+= 50){
        lines[localCount] = createSprite(width /2, p, 2, 25);
        lines[localCount].setSpeed(velocity, 90);
        lines[localCount].shapeColor = 'yellow';
        localCount++;
    }
    
    // create player entity
    playerX = width/2;
    player = createSprite(playerX, height-100, 20, 40);
    playerImg.resize(40,0);
//    player.rotation = -90;
    player.addImage(playerImg,50,40);
    drawLives();
    
    // create menu
    mainDiv = createDiv();
    menuHeading = createElement("h2","MENU");
    menuHeading.parent(mainDiv);
    seasonsDiv = createDiv();
    createElement("h3","Choose a season").parent(seasonsDiv);
    btn1 = createButton("Summer").parent(seasonsDiv);
    btn2 = createButton("Autumn").parent(seasonsDiv);
    btn3 = createButton("Winter").parent(seasonsDiv);
    btn4 = createButton("Spring").parent(seasonsDiv);
    carsSelection = createDiv();
    createElement("h3","Choose your Car").parent(carsSelection);
    
    
    
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
    
    for(i = 0; i< enemies.length; i++){
        enemies[i].thisSprite.setSpeed(1+ velocity, 90)
        if(enemies[i].thisSprite.position.y > height + 100){
            enemies.splice(i, 1); 
//            print('removed');
        }
//        print('updated')
    }
    
    // update the player position
    player.position.x = playerX;
    
    //draw background
    background(100);
    
    //draw road lines
    for(i = 0; i<lines.length; i++){
        lines[i].setSpeed(velocity, 90);
//        print(lines[i].position.y);
        if(lines[i].position.y > height + 68) {
            lines[i].position.y = -30;
        }
        drawSprite(lines[i]);
//        print(lines[lines.length-1].position.y);
    }
    
    // draw scenery
    let red = seasons[season].r
    let green = seasons[season].g
    let blue = seasons[season].b
    fill(seasons[season].r,seasons[season].g, seasons[season].b);
    rect(0, 0, 100, height);
    rect(width - 100, 0, 100, height);
    rectMode(CENTER);
//    drawScenery();
    
    // draw enemies;
    for(i=0; i<enemies.length; i++){
        tint(enemies[i].r,enemies[i].b,enemies[i].b,)
        drawSprite(enemies[i].thisSprite);
        // add bonus score if player gets close to enemies
        if(!enemies[i].scored){
            if(enemies[i].thisSprite.position.y > player.position.y && abs(enemies[i].thisSprite.position.x - player.position.x) < 48){
                print("TRUE");
                enemies[i].scored = true;
                score += 20
            }
        if(enemies[i].thisSprite.position.y > height - 50){enemies[i].scored = true}
        }
    }
    
    // collision detection
    if(crash == true){
//        print('crashed -- ', counterTwo);
        counterTwo += 1 + velocity;
        playerMoved = false;
//        player.tint = 255,255,255, 50;
//        print(player);
        if(counterTwo > 180){
            crash = false;
            counterTwo = 0;
//            print('>>>>RESET<<<<<');
        }
    }else{
        for(i=0; i<enemies.length; i++){
            if(player.overlap(enemies[i].thisSprite) && playerMoved){
                if(dist(enemies[i].thisSprite.position.x, enemies[i].thisSprite.position.y, player.position.x, player.position.y) < 52){
                    print(crash, 'collision detected');
                    velocity = 0;
                    crash = true;
                    lifeNum -= 1;
                    print('lives updated')
//                    playerMoved = false;
                }
            }
        }
        
    }
    
    //draw player
    tint(255, 255, 255);
    
    drawSprite(player);
    
    // draw player HUD
    for(i=0; i<lifeNum;i++){
        drawSprite(lives[i]);
    }
    fill('orange');
    stroke("black");
        if(playerMoved){
    score += (0.5 + velocity) * 0.02;
        }
    textStyle(BOLD);
    textSize(20);
    text("score: " + round(score), 10, 20);
    // end draw player HUD
    
}