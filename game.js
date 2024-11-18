let potionX, potionY;
let gravityForce = 0.2;
let isLandedSafely = false;
let potionVelocity = 0;
let energyThrust = 0.4;
let safeSpeedLimit = 2;
let currentGameState = "start";
let playerScore = 0;
let platformX, platformY, platformWidth, platformHeight;
let explosionRadius = 0;
let potionLight, potionDark;
let allowRestart = true;
let playButtonArea;

function setup() {
  createCanvas(400, 700);
  platformX = width / 2;
  platformY = height - 100;
  platformWidth = 200;
  platformHeight = 40;
  potionLight = color(100, 200, 250);
  potionDark = color(70, 150, 200);
  potionX = width / 2;
  potionY = 100;
  playButtonArea = { x: width / 2 - 80, y: height / 1.5, width: 160, height: 40 };
}

function draw() {
  if (currentGameState === "start") {
    drawStartScreen();
  } else if (currentGameState === "instructions") {
    drawHowToPlayScreen();
  } else if (currentGameState === "game") {
    runGameplay();
  } else if (currentGameState === "end") {
    drawGameOverScreen();
  }
}

function drawStartScreen() {
  background(30, 30, 50);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Potion Landing Game", width / 2, height / 3);
  textSize(20);
  text("Press SPACE to Start", width / 2, height / 2);

  fill(150, 180, 250);
  rect(playButtonArea.x, playButtonArea.y, playButtonArea.width, playButtonArea.height, 10);
  fill(255);
  textSize(16);
  text("How to Play", playButtonArea.x + playButtonArea.width / 2, playButtonArea.y + playButtonArea.height / 2);
}

function drawHowToPlayScreen() {
  background(20, 20, 40);
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(255);
  text("How to Play", width / 2, 100);
  textSize(18);
  text(
    "1. Press SPACE to apply thrust.\n" +
      "2. Land gently on the glowing table.\n" +
      "3. Avoid crashing (watch speed).\n" +
      "4. Restart with SPACE after game over.",
    width / 2,
    height / 2
  );
  textSize(20);
  text("Press BACKSPACE to return", width / 2, height - 100);
}

function runGameplay() {
  background(10 + abs(potionVelocity * 10), 20, 50); // Dynamic background based on speed
  drawLandingPlatform();
  displaySpeed();

  potionVelocity += gravityForce;
  if (keyIsDown(32)) {
    potionVelocity -= energyThrust;
  }
  potionY += potionVelocity;

  if (potionY + 65 >= platformY - platformHeight / 2 && abs(potionX - platformX) <= platformWidth / 2) {
    if (abs(potionVelocity) < safeSpeedLimit) {
      isLandedSafely = true;
      playerScore += 10;
    } else {
      isLandedSafely = false;
      explosionRadius = 100;
    }
    potionY = platformY - platformHeight / 2 - 65;
    potionVelocity = 0;
    currentGameState = "end";
    allowRestart = false;
    setTimeout(() => {
      allowRestart = true;
    }, 2000);
  }

  drawPotion(potionX, potionY, potionLight, potionDark);
}

function drawGameOverScreen() {
  background(30, 30, 50);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(isLandedSafely ? color(100, 250, 100) : color(250, 100, 100));
  text(isLandedSafely ? "Successful Landing!" : "Potion Crashed!", width / 2, height / 3);
  if (!isLandedSafely) {
    drawExplosion();
  }
  fill(255);
  textSize(20);
  text("Score: " + playerScore, width / 2, height / 2);
  text("Press SPACE to Play Again", width / 2, height / 1.5);
}

function drawLandingPlatform() {
  fill(isLandedSafely ? color(100, 250, 100) : color(150, 100, 50));
  rectMode(CENTER);
  noStroke();
  rect(platformX, platformY, platformWidth, platformHeight, 5);
}

function drawPotion(px, py, light, dark) {
  push();
  translate(px, py);
  noStroke();

  fill(245, 245, 255);
  stroke(230, 230, 240);
  strokeWeight(5);
  ellipse(0, 25, 130, 90);

  fill(light);
  ellipse(0, 30, 110, 70);

  fill(255, 255, 255, 150);
  ellipse(30, -20, 40, 25);

  pop();
}

function drawExplosion() {
  noStroke();
  fill(255, 100, 100, 150);
  ellipse(potionX, potionY, explosionRadius, explosionRadius);
  explosionRadius *= 0.9;
  if (explosionRadius < 1) explosionRadius = 0;
}

function displaySpeed() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Speed: " + potionVelocity.toFixed(2), 10, 10);
}

function mousePressed() {
  if (currentGameState === "start") {
    if (
      mouseX > playButtonArea.x &&
      mouseX < playButtonArea.x + playButtonArea.width &&
      mouseY > playButtonArea.y &&
      mouseY < playButtonArea.y + playButtonArea.height
    ) {
      currentGameState = "instructions";
    }
  }
}

function keyPressed() {
  if (allowRestart && (currentGameState === "start" || currentGameState === "end") && key === ' ') {
    currentGameState = "game";
    potionX = width / 2;
    potionY = 100;
    potionVelocity = 0;
    isLandedSafely = false;
    explosionRadius = 0;
  } else if (currentGameState === "instructions" && keyCode === BACKSPACE) {
    currentGameState = "start";
  }
}
