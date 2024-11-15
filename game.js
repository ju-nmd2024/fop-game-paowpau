let gameState = 0;
let potionY;
let velocity;
let thurstPower = 0.5;
let gravity = 0.1;
let landedSafely = false;
let bubbles = [];

function setup() {
  createCanvas(375, 667);
  resetGame();
}

function resetGame() {
  //start point
  potionY = 50;
  //starting speed
  velocity = 0;
  //start screen
  gameState = 0;
  landedSafely = false;
}

function draw() {
  background(220);

  if (gameState === 0) {
    drawStartScreen();
  } else if (gameState === 1) {
    playGame();
  } else if (gameState === 2) {
    drawScreenResults();
  }
  drawWindow();
  drawBackTable();
  drawShelf();
  drawLandingTable();
  drawBrewer(260, 470, 'pruple');
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(1);
  text("Press SPACE to Start", width / 2, height / 2);

  //Potion animation
  drawPotion(width / 2, height / 2 - 50, color(150, 0, 255));
}

function keyPressed() {
  if (key === '' & gameState === 0) {
    gameState = 1;
  } else if (gameState === 2) {
    resetGame();
  }
}
function playGame() {
  velocity += gravity;
  potionY += velocity;

  if (keyIsDown(32)) {
    velocity += thrustPower;
  }

  let potionColor = color(150 + velocity * 10, 0, 255 - velocity * 10);

  drawPotion(width / 2, potionY, potionColor);

  if (potionY >= height - 50) {
    gameState = 2;
    landedSafely = abs(velocity) < 2;
  }
}

function drawScreenResults () {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(landedSafely ? 'green' : 'red');
  text(landedSafely ? "Landed Safely!" : "Crash!", width / 2, height / 2 - 20);
  fill(1);
  text("Press SPACE to Restart", width / 2, height / 2 + 20);

}

function drawShelf() {
  fill(85, 55, 20);
  noStroke();
  rect(10, 100, 150, 20);
  rect(10, 200, 150, 20);
  rect(10, 300, 150, 20);

  fill(255, 255, 255, 255);
  drawPotion(50, 80, 'purple', 20, 40);
  drawPotion(130, 80, 'blue', 40, 40);
  drawPotion(130, 180, 'green', 20, 40);
  drawPotion(140, 280, 'red', 30, 40);

  drawBooksOnShelf();
}

function drawBooksOnShelf() {

  //top
  drawBook(20, 70, 'burlywood', 30, true);
  drawBook(60, 60, 'gold', 40, true);
  drawBook(80, 35, 'brown', 65, true);
  //middle why does the label appear when i put estar digets?
  drawBook(60, 140, 'blue', 60, 5, true);
  drawBook(40, 160, 'darkolivegreen', 40, true);
  drawBook(100, 170, 'saddlebrown', 30, true);
  //buttom
  drawBook(20, 270, 'khaki', 30, true);
  drawBook(40, 230, 'cornflowerblue', 70, true);
  drawBook(110, 250, 'choclate', 50, true);
  drawBook(80, 240, 'peru', 60, true);
}

function drawBook(x, y, color, height = 40, hasLabel = false){
  fill(color);
  rect(x, y, 20, height);

  //depth
  fill(0, 50);
  rect(x + 20, y + 10, 5, height - 10);

  if (hasLabel) {
    fill(255, 215, 0);
    rect(x + 5, y + height - 15, 10, 5);
  }
}

function drawWindow(){
//frame
fill(0, 0, 0, 150);
rect(230, 50, 120, 250);
//sky
stroke(2);
fill(0, 0, 255, 50);
rect(230, 50, 120, 250);
//moon
noStroke();
fill(255, 255, 255);
ellipse(270, 130, 30, 30);
fill(200, 200, 200);
ellipse(268, 128, 14, 14);

//window lines
stroke(2);
line(230, 120, 350, 120);
line(230, 220, 350, 220);
line(290, 50, 290, 300);
}

function drawLandingTable() {
  fill(150, 100, 100);
  rect(100, height - 70, 200, 90);
  fill(100, 0, 0);
  ellipse(200, height - 100, 500, 100);
  }

function drawPotion(x, y, color, w, h) {
  //potion
  fill(color);
  ellipse(x, y, w, h);
  fill(color);
  rect(x - w / 8, y - h / 2, w / 4, 10);
  fill(40, 68, 20);
  rect(x - w / 10, y - h / 2 - 5, w / 4, 5);

}

function drawBackTable() {
  fill(100, 0, 0);
  rect(180, height - 205, 150, 15);
  fill(80, 0, 0);
  rect(230, height - 190, 40, 100);

  //drawBoilingPotion(250, height - 230, 'green');
}

function drawBrewer(x, y, color) {
  noStroke();

  fill(0);
  ellipse(x + 20, y - 15, 100, 70);

  fill(244, 42, 45);
  ellipse(x + 20, y - 30, 60, 30);

  if (bubbles.length === 0) {
    for( let i = 0; i < 5; i++) {
      let bubble =  {
        x: x + random(-100, 15),
        y: y + random(-20, -20),
        size: random(5, 10),
        speed: random(1,2)
      };
      bubbles.push(bubble);
    }
  }
  for (let i = 0; i < bubbles.length; i++) {
    fill(color);
    ellipse(bubbles[i].x, bubbles[i].y, bubbles[i].size, bubbles[i].size);

    // Update the bubble's position
    bubbles[i].y -= bubbles[i].speed;  

    // Reset bubble 
    if (bubbles[i].y < y - 60) {
      bubbles[i].y = y + random(-10, 60);  
      bubbles[i].x = x + random(30, 35);  
    }
  }
}




