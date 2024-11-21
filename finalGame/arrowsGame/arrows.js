let centerX;
let centerY;
let centerRadius = 34;

let numCircles = 8;
let radius = 100;
let circleRadius = 34;
let selectedArrow = -1;
let previousArrow = -1;
let arrowSize = 7;
let arrowHighlighted = false;
let countdown = 3;
let countdownInterval;
let countdownActive = false;
let reverseDirection = false; 

//sound vars
let ding;
let greenArrowSound;
let successSound;
let failSound;
let score = 0;

//timer vars
let timer;
let seconds = 0;
let minutes = 0;

function preload() {
  ding = loadSound('/finalGame/sounds/ding-101492.mp3');
  greenArrowSound = loadSound('/finalGame/sounds/tinkle4-93228.mp3'); 
  successSound = loadSound('/finalGame/sounds/success-1-6297.mp3'); 
  failSound = loadSound('/finalGame/sounds/game-fail-90322.mp3'); 
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("gameCanvas"); // Place the canvas inside the #gameCanvas div
  //updateScoreDisplay();
}

function draw() {
  background(229,205,148);

  // Center circle
  centerX = width / 2;
  centerY = height / 2;
  
  fill(5, 27, 137);
  ellipse(centerX, centerY, centerRadius * 2); 

  // Draw surrounding circles and arrows
  for (let i = 0; i < numCircles; i++) {
    let angle = map(i, 0, numCircles, 0, TWO_PI);
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    
    // Highlight the selected or reversed arrow in green
    if (i === selectedArrow && arrowHighlighted) {
      fill(0, 255, 0); // selected circle is green
    } else {
      fill(200, 100, 100);
    }
    
    ellipse(x, y, circleRadius * 2); // Draw surrounding circle
    drawArrow(centerX, centerY, x, y, i === selectedArrow); // Draw arrow
  }
}

function drawArrow(x1, y1, x2, y2, isSelected) {
  // Set arrow color to green if selected or in reverse direction
  stroke(isSelected && arrowHighlighted ? color(0, 255, 0) : color(0)); 
  line(x1, y1, x2, y2);

  // Calculate angle
  let angle = atan2(y2 - y1, x2 - x1);

  // Draw arrowhead
  push();
  translate(x2, y2);
  rotate(angle);
  fill(isSelected && arrowHighlighted ? color(0, 255, 0) : color(0)); 
  noStroke();
  triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
  pop();
}

function mouseClicked() {
  // Check if center circle is clicked
  if (dist(mouseX, mouseY, centerX, centerY) < centerRadius && !countdownActive) {
    startCountdown();
  }
}

function startCountdown() {
  countdown = 3;
  arrowHighlighted = false;
  selectedArrow = -1;
  countdownActive = true;
  reverseDirection = false;

  countdownInterval = setInterval(() => {
    ding.play();
    countdown--;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      selectArrow();
      countdownActive = false;
      arrowHighlighted = true; // Highlight the selected arrow and circle after the final ding
    }
  }, 1000);
}

function selectArrow() {
  selectedArrow = floor(random(numCircles));
  previousArrow = selectedArrow;
  greenArrowSound.play();
  reverseDirection = false; // Start in the forward direction
}

function checkPlayerMovement() {
  if (arrowHighlighted) {
    let angle = map(selectedArrow, 0, numCircles, 0, TWO_PI);
    let targetX = centerX + cos(angle) * radius;
    let targetY = centerY + sin(angle) * radius;

    if (!reverseDirection && dist(mouseX, mouseY, targetX, targetY) < circleRadius) {
      // Player reached outer circle; start returning to center
      reverseDirection = true;
      previousArrow = selectedArrow;
      selectedArrow = (selectedArrow - 1 + numCircles) % numCircles; // Select the previous circle
      greenArrowSound.play();
    } else if (reverseDirection && dist(mouseX, mouseY, targetX, targetY) < circleRadius) {
      // Player reached the previous circle in reverse direction
      previousArrow = selectedArrow;
      if (selectedArrow === 0) {
        // Player has reached the center
        successSound.play();
        updateScoreDisplay();
        arrowHighlighted = false;
        selectArrow(); // Restart game with a new arrow
      } else {
        selectedArrow = (selectedArrow - 1 + numCircles) % numCircles;
        greenArrowSound.play();
      }
    } else if (dist(mouseX, mouseY, centerX, centerY) > centerRadius + radius) {
      // Player moved too far from the center path; play fail sound and reset
      failSound.play();
      showAlert(); // try again message
      arrowHighlighted = false;
      selectedArrow = -1;
    }
  }
}

function showAlert(){
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "block"; // Make alert visible
}

function closeAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none"; // Hide alert
}


function startTimer() {
  document.getElementById("startButton").disabled = true; // Disable Start button
  document.getElementById("timerButton").disabled = false; // Enable Timer button
  timer = setInterval(updateTimer, 1000); // Start the timer
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  // Update the timer display
  document.getElementById("timerDisplay").textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  minutes = 0;
  seconds = 0;
  document.getElementById("timerDisplay").textContent = "00:00";
}

function updateScoreDisplay() {
  score++;
  document.getElementById("score").innerText = `Score: ${score}`;
  console.log("Score: " + score);
  stopTimer();
  resetTimer();
  startTimer();
}



function mouseDragged() {
  checkPlayerMovement();
}

