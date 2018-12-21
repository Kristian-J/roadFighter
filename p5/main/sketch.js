enemies = [];
player = undefined;
roadImgs = [];
lines = [];
velocity = 0;

function drawNewEnemy(){
    newEnemy = createSprite(random(width), -50, 20, 50);
    newEnemy.setSpeed(1+ velocity, 90)
    }
function setup() {
  // put setup code here
    createCanvas(550, 750);
    var localCount = 0
    
    for(p = -30; p < height + 50; p+= 50){
        lines[localCount] = createSprite(width /2, p, 2, 25);
        lines[localCount].setSpeed(velocity, 90);
        lines[localCount].shapeColor = 'yellow'
        localCount++;
        
    }
    
    enemies[0] = createSprite(random(width), -50, 20, 50)
    enemies[0].setSpeed(1+ velocity, 90)
    
    
    
}

function draw() {
  // put drawing code here
    for(i = 0; i<lines.length; i++){
//        print(lines[i].position.y);
        if(lines[i].position.y > height + 68) {
            lines[i].position.y = -30
        }
    }
    background(100)
    rectMode(CENTER)
    drawSprites();
    fill('yellow')
//    rect( 275, 10, 5, 20);
//    rect( 275, 60, 5, 20);
//    rect( 275, 110, 5, 20);
//    rect( 275, 160, 5, 20);
//    rect( 275, 210, 5, 20);
//    rect( 275, 260, 5, 20);
//    rect( 275, 310, 5, 20);
//    rect( 275, 360, 5, 20);
//    rect( 275, 410, 5, 20);
//    rect( 275, 460, 5, 20);
//    rect( 275, 510, 5, 20);
//    rect( 275, 560, 5, 20);
//    rect( 275, 610, 5, 20);
//    rect( 275, 660, 5, 20);
//    rect( 275, 710, 5, 20);
//    rect( 275, 760, 5, 20);
    fill('blue');
    rect(200,700, 30, 50);
    fill('red')
    ellipse(100, 200, 30);
    ellipse(400, 400, 30);
    if(mouseIsPressed){
//        for(i = 0; i<lines.length; i++){
//            print(lines[i].position);
//        }
        drawNewEnemy();
    }
}