let score = 0;
let canScore = true;
let successSound;
let failSound;

function preload() {
  successSound = loadSound('/finalGame/sounds/success-1-6297.mp3'); 
  failSound = loadSound('/finalGame/sounds/game-fail-90322.mp3'); 
}
function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("gameCanvas"); // Place the canvas inside the #gameCanvas div
  background(233,217,179);
  textSize(25);
  stroke(0, 0, 0);
  fill(0, 0, 0);
  text("Streak: " + score, 5, 25);

  frameRate(0.32);
}

let circleX;
let circleY;

function draw() {
  circleX = random(75, 525);
  circleY = random(75, 525);

  background(233,217,179);
  circleLoop(circleX, circleY);
  stroke(0, 0, 0);
  fill(0, 0, 0);
  text("Streak: " + score, 5, 25);

}

function circleLoop(circleX, circleY) {
  canScore = true;
  stroke(255, 180, 180);
  fill(255, 180, 180);

  circle(circleX, circleY, 100);
}

function mouseClicked() {
  if (
    mouseX >= circleX - 50 &&
    mouseX <= circleX + 50 &&
    mouseY >= circleY - 50 &&
    mouseY <= circleY + 50
  ) {
    if (canScore == true) {
      stroke(180, 255, 180);
      fill(180, 255, 180);

      background(233,217,179);
      circle(circleX, circleY, 100);
      
      score++;
      canScore = false;
      text("Streak: " + score, 5, 25);
      successSound.play();
    }
  } else {
    background(233,217,179);
    stroke(255, 180, 180);
    fill(255, 180, 180);

    circle(circleX, circleY, 100);

    stroke(0, 0, 0);
    fill(0, 0, 0);

    score = 0;
    text("Streak: " + score, 5, 25);
    failSound.play();
    
  }
}
