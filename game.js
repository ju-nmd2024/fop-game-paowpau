/* First game Potion falling
Fundaments of Programing
*/

let x, y;
let gravity = 0.1;
let velocity = 1;
let thrustPower = 0.4;
let safeLandingSpeed = 2;
let gameState = "start";  
let score = 0;
let tableX, tableY, tableWidth, tableHeight;
let explosionSize = 0;
let lightColor, darkColor;
let howToPlayArea;
let restartAllowed = false;
let landedSafely = false;
let bubblesize = 0;
let coolDown = false;
let cooldownTime = 3000;
let lastSpacePress = 0;


function setup() {
  createCanvas(400, 700);
  tableX = width / 2;
  tableY = height - 100;
  tableWidth = 200;
  tableHeight = 40;
  //defult potion color
  lightColor = color(68, 165, 71);
  darkColor = color(50, 120, 65);
  x = 200;
  y = 100;
  howToPlayArea = { x: width / 2 - 80, y: height / 1.5, width: 160, height: 40 };

}

function draw() {
  if (gameState === "start") {
    startScreen();
  } else if (gameState === "howToPlay") {
    howToPlayScreen();
  } else if (gameState === "game") {
    gamePlay(); 
  } else if (gameState === "gameOver") {
    gameOverScreen();
  }
}

function startScreen() {
  background(30, 30, 30);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Potion Drop Game", width / 2, height / 3);

  textSize(20);
  text("Press SPACE to Start", width / 2, height / 2);

  //how to play button
  fill(100, 150, 250);
  rect(howToPlayArea.x, howToPlayArea.y + 80, howToPlayArea.width, howToPlayArea.height, 10);  // Move down by 80 pixels
  fill(255);
  textSize(16);
  text("How to Play", howToPlayArea.x + howToPlayArea.width / 2, howToPlayArea.y + 80 + howToPlayArea.height / 2); // Adjusted text position
}
//how to play screen when you clikc the button
function howToPlayScreen() {
  background(20, 20, 50);
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(255);
  text("How to Play", width / 2, 100);

  textSize(18);
  text("1. Press SPACE to apply thrust.\n2. Land the potion gently on the table.\n3. Avoid crashing by monitoring velocity.\n4. Use SPACE to restart after a round.", width / 2, height / 2);

  textSize(20);
  text("Press BACKSPACE to return", width / 2, height - 100);
}
//main game loop
function gamePlay() {
  background(10, 15, 30);
  drawTable();
  displayVelocity();

  velocity += gravity;
  if (keyIsDown(32)) {
    velocity -= thrustPower;
  }

  y += velocity;

  //change color on potion depending on velocity
  if (velocity > safeLandingSpeed) {
    lightColor = color(200, 50, 50);
    darkColor = color(150, 30, 30);
  } else if (velocity < -safeLandingSpeed) {
    lightColor = color(200, 50, 50);
    darkColor = color(150, 30, 30);
  } else {
    lightColor = color(68, 165, 71);
    darkColor = color(50, 120, 65);
  }

  //checking if potion landed correctly
  if (y + 65 >= tableY - tableHeight / 2 && (x - tableX) <= tableWidth / 2) {
    if ((velocity) < safeLandingSpeed && velocity > -safeLandingSpeed) {
      landedSafely = true;
      lightColor = color(68, 165, 71);
      darkColor = color(50, 120, 65);
      score += 10;
      bubbleSize = 100;
    } else {
      landedSafely = false;
      explosionSize = 100;
      gameOverMessage = "YOU DESTROYED IT!, try again";
    }
    y = tableY - tableHeight / 2 - 65;
    velocity = 0;
    gameState = "gameOver";
    restartAllowed = true;
  }

  drawPotion(x, y, lightColor, darkColor);
}

//after the potion land
function gameOverScreen() {
  background(30, 30, 30);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  if (landedSafely) {
    fill(68, 165, 71);
    text("You Landed Safely!", width / 2, height / 3);
  } else {
    fill(223, 86, 86);
    text("Crash! Try Again.", width / 2, height / 3);
    drawExplosion();
  }

  textSize(20);
  text("Score: " + score, width / 2, height / 1.8);

  //cooldown timer, last time user pressed space - 3 sec (dosent work?)
  if (millis() - lastSpacePress >= cooldownTime) {
    textSize(16);
    text("Press SPACE to Restart", width / 2, height / 1.5);
  }
}

function drawTable() {
  fill(150, 100, 50);
  rectMode(CENTER);
  noStroke();
  rect(tableX, tableY, tableWidth, tableHeight);
}


function drawPotion(x, y, lightColor, darkColor) {
  push();
  translate(x, y);

  // potion bottle
  fill(245, 240, 240);
  stroke(230, 220, 220);
  strokeWeight(6);
  ellipse(0, 20, 150, 120);

  // neck 
  fill(245, 240, 240);
  stroke(230, 220, 220);
  strokeWeight(6);
  rect(0, -40, 30, 50, 5); 

  // the cork
  fill(110, 73, 71);
  strokeWeight(5);
  stroke(150, 100, 95);
  rect(0, -65, 40, 15, 3); // Cork (aligned with neck)

  // potion liquid (inside the bottle)
  fill(lightColor);
  noStroke();
  ellipse(0, 25, 140, 100); 
 
  fill(darkColor);
  noStroke();
  ellipse(0, 30, 110, 70); // Darker part 

  // Potion splash effect 
  fill(245, 240, 240, 200);
  noStroke();
  ellipse(30, -10, 40, 25); 

  pop();
}

//crashed potion
function drawExplosion() {
  noStroke();
  fill(255, 50, 50, 150);
  ellipse(x, y, explosionSize, explosionSize);
  //decresed explosion size
  explosionSize *= 0.9;
  if (explosionSize < 0) {
    //minimum size
    explosionSize = 0;
  }
}

function drawBubbles(x, y, size) {
  fill(255, 250, 240, 210);
  noStroke();
  ellipse(x, y, size, size);
}

//velocity at the top left
function displayVelocity() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Velocity: " + velocity.toFixed(2), 10, 10);
}
//every mouse press
function mousePressed() {
  if (gameState === "start") {
    if (
      //checking if mouse if within the boundries
      mouseX > howToPlayArea.x &&
      mouseX < howToPlayArea.x + howToPlayArea.width &&
      mouseY > howToPlayArea.y + 80 &&
      mouseY < howToPlayArea.y + howToPlayArea.height + 80 
    ) {
      gameState = "howToPlay";
    }
  }
}

//restarting and returing to game presses
function keyPressed() {
  if (gameState === "start" && key == ' ') {
    gameState = "game";
    x = width /2;
    y = 100;
    velocity = 0;
    landedSafely = false;
    explosionSize = 0;
    restartAllowed = false;
  } else if (gameState === "gameOver" && key === ' ') {
    gameState = "game";
    x = width / 2;
    y = 100;
    velocity = 0;
    score = 0;
    landedSafely = false;
    explosionSize = 0;
    restartAllowed = false;
  } else if (gameState === "howToPlay" && keyCode === BACKSPACE){
    gameState = "start";
  }
}


