// sprite set holders
let enemies = [];
let lines = [];
let player;
let playerCarImgs = [];
let fireAnimation;

let bgImages = [];
let decorations = [];

// player default values
let playerX = 100;
let velocity = 3;

// counters
let counterOne = 0; //enemy spawn timer.
let inceptionPoint = 10;// enemy spawn time threshold
let counterTwo = 0;
let counterThree = 0;

// game core values
let difficulty = 0.5;
let lifeNum = 5;
let lives = [];
let score = 0;
// additional game control values
let season = 1;
let red = 11;
let green = 102;
let blue = 35
// JSON file holder variable
let data;


// image sets
let heartImg = [];
let playerImg;
let enemyImg;

// flags
let crash = Boolean;
let run = true;
let mainMenu = true;
let playerMoved = false;
let gameOver = false;



// function to generate new enemy sprite entities
function drawNewEnemy(){
    tempEnemy = {
        r: random(50,255),
        g: random(50,255),
        b: random(50,255),
        thisSprite: undefined,
        scored: false
    }
    tempSprite = createSprite(random(110, width - 110), -50, 20, 50)
    tempSprite.addImage(enemyImg,40,50);
    tempEnemy.thisSprite = tempSprite;
    enemyImg.resize(60,0);
    tempEnemy.thisSprite.rotation = 90;
    
    append(enemies, tempEnemy);
    
    // control used to set random spawn duration and reset counter
    inceptionPoint = random(60 - velocity * 2, 120);
    counterOne = 0;
}

// update the background dispay peramiters based on user selection
// recieves input from menu dropdown selector
function setSeason(){
    let item = sel.value();
    if(item == "Summer"){
        red = data.Seasons.Summer.r;
        green = data.Seasons.Summer.g;
        blue = data.Seasons.Summer.b;
        bgImage = bgImages[0];
    }
    if(item == "Autumn"){
        red = data.Seasons.Autumn.r;
        green = data.Seasons.Autumn.g;
        blue = data.Seasons.Autumn.b;
        bgImage = bgImages[1];
    }
    if(item == "Winter"){
        red = data.Seasons.Winter.r;
        green = data.Seasons.Winter.g;
        blue = data.Seasons.Winter.b;
        bgImage = bgImages[3];
    }
    if(item == "Spring"){
        red = data.Seasons.Spring.r;
        green = data.Seasons.Spring.g;
        blue = data.Seasons.Spring.b;
        bgImage = bgImages[2];
    }
    return
}

// generates new sprites and assigns img depending on the season setting
function drawScenery(){
        bgImage.resize(40,0);
    // for the first decoration sprite
    if(decorations.length == 0){
        tempSprite = createSprite(random(20, 80), -50, 50, 50);
        tempSprite.addImage(bgImage);
        tempSprite.setSpeed(velocity, 90)
        append(decorations, tempSprite);
        tempSprite = createSprite(random(width - 20, width - 80), -50, 50, 50);
        tempSprite.addImage(bgImage);
        tempSprite.setSpeed(velocity, 90)
        append(decorations, tempSprite);
    // for additional sprites
    }else{if(decorations[decorations.length-1].position.y > 10){
        tempSprite = createSprite(random(20, 80), -50, 50, 50);
        tempSprite.addImage(bgImage);
        tempSprite.setSpeed(velocity, 90)
        append(decorations, tempSprite);
        tempSprite = createSprite(random(width - 20, width - 80), -50, 50, 50);
        tempSprite.addImage(bgImage);
        tempSprite.setSpeed(velocity, 90)
        append(decorations, tempSprite);
        
    }
         }
    
    return
}

// generate the sprites to represent the plyer's lives.
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
    return
}

// handles user direction and speed imput events
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
// key-stroke listener. used to call the menu and play music
function keyManager(key){
    print('called', key);
    
    //call menu
    if(key == "m"){
        print('menu has been called');
        run = false;
        print(run);
    }
    //play music
    if(key == "p"){
        print('music has been called');
        menuSound.setVolume(0.3);
        menuSound.play();
    }
    return
}
//return to game. takes input from menu button
function returnToGame(){
    run = true
    return
}
// restarts the game and resets default core values. takes input from game-end screen.
function resetGame() {
    lifeNum = 5;
    playerMoved = false;
    score = 0;
    gameOver = false;
}

// core preload function. inherits from built in class.
function preload() {
    // enemy base image import
    enemyImg = loadImage("images/car004.png");
    
    // imports images for player vehicle. 
    for(i=0;i<9;i++){
        tempImg = loadImage("images/testing/tile00"+i+".png");
        append(playerCarImgs, tempImg);
    }
    playerImg = playerCarImgs[0];
    
    // imports collision animation image sequence
    fireAnimation = loadAnimation('images/fire/tile000.png', 'images/fire/tile031.png');
    
    // imports scenery images
    for(i=1; i< 5; i++){
        tempImg = loadImage("images/trees/tile00"+i+".png")
        tempImg.resize(50,0);
        append(bgImages, tempImg);
    }
    // load season data
    data = loadJSON("data.json");
    
    // load audio file
    soundFormats('mp3');
    menuSound = loadSound("audio/Surfing With the Alien.mp3");
}

// core setup function. inherits from built in class.
function setup() {
  // put setup code here
    angleMode(DEGREES);
    
    // creates canvas as a DOM Element
    thisCanvas = createCanvas(550, 750);
    
    // generates road center lines as sprites.
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
    player.addImage(playerImg,50,40);
    
    // call to create player lives entities array
    drawLives();
    // creates fire sprite to be used in collision event handling
    fire = createSprite( -100, 100, 20,20);
    fire.addAnimation("run",fireAnimation);
    
    // hotkey notes for player
    guideDiv = createP("Press 'm' for menu. Press 'p' to play music");
    // create menu
    mainDiv = createDiv();
    menuHeading = createElement("h2","MENU");
    menuHeading.parent(mainDiv);
    
    // season selection menu implementation
    seasonsDiv = createDiv().parent(mainDiv);
    createElement("h3","Choose a season").parent(seasonsDiv);
    sel = createSelect();
    sel.parent(seasonsDiv);
    sel.option("Summer");
    sel.option("Autumn");
    sel.option("Winter");
    sel.option("Spring");
    sel.changed(setSeason);
    bgImage = bgImages[0];
    
    //car selection implementation. incomplete and not used in this version
    carsSelection = createDiv().parent(mainDiv);
    createElement("h3","Choose your Car").parent(carsSelection);
    
    // return to game button 
    ret = createDiv().parent(mainDiv);
    retBtn = createButton("Play").parent(ret);
    retBtn.mousePressed(returnToGame);
    
    // game over menu page
    gameOverDiv = createDiv();
    message = createElement("h2","GameOver").parent(gameOverDiv);
    message = createElement("h3","You Lose").parent(gameOverDiv);
    message = createElement("h4","Your score was: " + score).parent(gameOverDiv);
    resetBtn = createButton("Restart Game").parent(gameOverDiv);
    resetBtn.mousePressed(resetGame);
    gameOverDiv.hide();
}

// core draw funtion. inherits from built in class
function draw() {
  // put drawing code here
    // calls the listener functions
    positionManager();
    if(keyIsPressed){keyManager(key)}
    
    // calls the scenerey generator function
    drawScenery();
    
    // new enemy managment and function call
    counterOne += velocity * difficulty + 1;
    if(counterOne > inceptionPoint){
        drawNewEnemy();
    }
    
    // set enemy speed based on player velocity
    for(i = 0; i< enemies.length; i++){
        enemies[i].thisSprite.setSpeed(1+ velocity, 90)
        // remove enemies once off the screen
        if(enemies[i].thisSprite.position.y > height + 100){
            enemies.splice(i, 1); 
        }
    }
    
    // update the player position
    player.position.x = playerX;
    
    //draw background
    background(100);
    
    // update road lines as required
    for(i = 0; i<lines.length; i++){
        lines[i].setSpeed(velocity, 90);
        if(lines[i].position.y > height + 68) {
            lines[i].position.y = -30;
        }
        drawSprite(lines[i]);
    }
    
    // draw scenery
    fill(red, green, blue);
    rect(0, 0, 100, height);
    rect(width - 100, 0, 100, height);
    rectMode(CENTER);
    
    for(i = 0; i<decorations.length; i++){
        decorations[i].setSpeed(velocity, 90);
//        print(decorations[i].position.y);
//        print(decorations[i]);
        if(decorations[i].position.y > height + 68) {
            decorations.splice(i, 1);
        }
        drawSprite(decorations[i]);
    }
    
//    drawScenery();
    
    // draw enemies;
    for(i=0; i<enemies.length; i++){
        tint(enemies[i].r,enemies[i].b,enemies[i].b,)
        drawSprite(enemies[i].thisSprite);
        // add bonus score if player gets close to enemies
        if(!enemies[i].scored && playerMoved == true){
            if(enemies[i].thisSprite.position.y > player.position.y && abs(enemies[i].thisSprite.position.x - player.position.x) < 48){
                print("TRUE");
                enemies[i].scored = true;
                score += 20
            }
        if(enemies[i].thisSprite.position.y > height - 50){enemies[i].scored = true}
        }
    }
    
    if(gameOver == true){
        mainDiv.hide();
        thisCanvas.hide();
        gameOverDiv.show();
    }else{
        if(run == true){
            mainDiv.hide();
            thisCanvas.show();
            guideDiv.show();
                if(playerMoved){
            score += (0.5 + velocity) * 0.02;
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
                    fire.position.x = -100; fire.position.y = 100;
                    player.visible = true;
        //            print('>>>>RESET<<<<<');
                }else{
                    player.visible = false;
                    fire.position.x = player.position.x; 
                    fire.position.y = player.position.y - 25
                }
            }else{
                for(i=0; i<enemies.length; i++){
                    if(player.overlap(enemies[i].thisSprite) && playerMoved){
                        if(dist(enemies[i].thisSprite.position.x, enemies[i].thisSprite.position.y, player.position.x, player.position.y) < 52){
                            // action taken on collision event
                            print(crash, 'collision detected');
                            player.addAnimation('run',fireAnimation);
                            // speed reset
                            velocity = 0;
                            // event flaged
                            crash = true;
                            // lives adjusted
                            lifeNum -= 1;
                            if(lifeNum == 0){gameOver = true}
                            // enemy removed
                            enemies.splice(i, 1);
                            print('lives updated')
                        }
                    }
                }

            }
        }else{
            mainDiv.show();
            guideDiv.hide();
            thisCanvas.hide();
        }
        
    }
    
    
    //draw player
    tint(255, 255, 255);
    
    drawSprite(player);
    drawSprite(fire);
    
    // draw player HUD
    for(i=0; i<lifeNum;i++){
        drawSprite(lives[i]);
    }
    fill('orange');
    stroke("black");
    textStyle(BOLD);
    textSize(20);
    text("score: " + round(score), 10, 20);
    // end draw player HUD
    
}