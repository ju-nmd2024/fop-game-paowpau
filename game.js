let gameState = 0;
let potionY;
let velocity;
let thrustPower = -0.5;
let gravity = 0.1;
let landedSafety = false;

function setup() {
  createCanvas(375, 667);
  resetGame;
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
  background(220, 220, 220);

  if (gameState === 0) {
    drawStartScreen();
  } else if (gameState === 1) {
    playGame();
  } else if (gameState === 2) {
    drawResultScreen();
  }

  function drawStartScreen() {
    textAlign (CENTER, CENTER);
    textSize(24);
    fill(1);
    text("Press SPACE to Start", width / 2, height / 2);

    //Potion animation
    drawPotion(width / 2, height / 2 - 50, color(150, 0, 255));
  }

  function keyPressed() {
    if (key === '') {
      if (gameState === 0) {
        gameState = 1;
      } else if (gameState === 2) {
        resetGame();
      }
    }
  }
  function playGame() {
    velocity += gravity;
    potionY += velocity;

    if (keyIsDown(32)) {
      velocity += thrustPower;
    }

    let potionColor = color(150 + velocit * 10, 0, 255 - velociyu * 10);

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


}


