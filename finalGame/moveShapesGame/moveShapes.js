let rectX = 150
let rectY = 420
let rectSelected = false
let rectColor1 = 250
let rectColor2 = 0
let rectPlaced = false

let triangleX = 100
let triangleY = 200
let triangleSelected = false
let triangleColor1 = 250
let triangleColor2 = 0
let trianglePlaced = false

let circleX = 250
let circleY = 100
let circleSelected = false
let circleColor1 = 250
let circleColor2 = 0
let circlePlaced = false

let ellipseX = 80
let ellipseY = 380
let ellipseSelected = false
let ellipseColor1 = 250
let ellipseColor2 = 0
let ellipsePlaced = false

let squareX = 200
let squareY = 250
let squareSelected = false
let squareColor1 = 250
let squareColor2 = 0
let squarePlaced = false

let gameFinished = false
let score = 0
let scoreIncremented = false

let successSound;
let failSound;
// let enableAlert = false;

//timer
/* let timerInterval;
let timerSeconds = 0;  */




function preload() {
  successSound = loadSound('/finalGame/sounds/success-1-6297.mp3'); 
  failSound = loadSound('/finalGame/sounds/game-fail-90322.mp3'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // background(50);
  background(213,192,142);
  
  fill(100, 100, 200)
  rect(700, 0, 50, 2000)
  rect(675, 325, 100, 50)
  triangle(760, 300, 760, 400, 850, 350)

  fill(60, 60, 120)
  square(1000, 200, 80)
  ellipse(1100, 500, 100, 200)
  triangle(1300, 500, 1375, 625, 1225, 625)
  rect(1350, 200, 100, 200)
  circle(1200, 120, 100)

  fill(rectColor1, rectColor2, 0)
  rect(rectX, rectY, 100, 200);
  if(rectSelected){
    rectX = mouseX - 50
    rectY = mouseY - 100
  }

  fill(triangleColor1, triangleColor2, 0)
  triangle(triangleX, triangleY - 100, triangleX + 75, triangleY + 25, triangleX - 75, triangleY + 25)
  if(triangleSelected){
    triangleX = mouseX
    triangleY = mouseY
  }

  fill(circleColor1, circleColor2, 0)
  circle(circleX, circleY, 100)
  if(circleSelected){
    circleX = mouseX
    circleY = mouseY
  }

  fill(ellipseColor1, ellipseColor2, 0)
  ellipse(ellipseX, ellipseY, 100, 200)
  if(ellipseSelected){
    ellipseX = mouseX
    ellipseY = mouseY
  }

  fill(squareColor1, squareColor2, 0)
  square(squareX, squareY, 80)
  if(squareSelected){
    squareX = mouseX - 40
    squareY = mouseY - 40
  }

  function incrementScore() {
    if(!scoreIncremented){
      score++; // Increase score by 1
      scoreIncremented = true;
      document.getElementById("score").innerText = `Score: ${score}`;
      console.log("Score: " + score); // Display the score in the console
    }
    
  }

  if(gameFinished){
    textSize(50)
    fill(0, 250, 0)
    text("Game Complete", 100, 200)
    rect(150, 250, 250, 50)

    incrementScore();
    successSound.play();

    textSize(25)
    fill(250)
    text("Play Again", 215, 285)
  }
}

function mouseClicked(){
  // Handle for the rectangle shape
  if(rectSelected){
    rectSelected = false;
    if(abs(rectX - 1350) < 5 && abs(rectY - 200) < 5){
      // Correct placement
      rectColor1 = 0;
      rectColor2 = 250;
      rectPlaced = true;
      successSound.play();  // Play success sound
    } else {
      // Incorrect placement
      failSound.play();  // Play fail sound
      
      showAlert();
      resetGame();  // Reset the game
    }
  }
  else if(mouseX >= rectX && mouseX <= rectX + 100 && mouseY >= rectY && mouseY <= rectY + 200 && !triangleSelected && !circleSelected && !ellipseSelected && !squareSelected && !rectPlaced){
    rectSelected = true;
  }

  // Handle for the triangle shape
  else if(triangleSelected){
    triangleSelected = false;
    if(abs(triangleX - 1300) < 5 && abs(triangleY - 600) < 5){
      // Correct placement
      triangleColor1 = 0;
      triangleColor2 = 250;
      trianglePlaced = true;
      successSound.play();  // Play success sound
    } else {
      // Incorrect placement
      failSound.play();  // Play fail sound
      showAlert();
      resetGame();  // Reset the game
    }
  }
  else if(abs(mouseX - triangleX) < 60 && ((mouseY > triangleY && mouseY < triangleY + 25) || (mouseY < triangleY && mouseY > triangleY - 60)) && !circleSelected && !ellipseSelected && !squareSelected && !trianglePlaced){
    triangleSelected = true;
  }

  // Handle for the circle shape
  else if(circleSelected){
    circleSelected = false;
    if(abs(circleX - 1200) < 5 && abs(circleY - 120) < 5){
      // Correct placement
      circleColor1 = 0;
      circleColor2 = 250;
      circlePlaced = true;
      successSound.play();  // Play success sound
    } else {
      // Incorrect placement
      failSound.play();  // Play fail sound
      showAlert();
      resetGame();  // Reset the game
    }
  }
  else if(Math.sqrt(Math.pow(circleX - mouseX, 2) + Math.pow(circleY - mouseY, 2)) < 50 && !ellipseSelected && !squareSelected && !circlePlaced){
    circleSelected = true;
  }

  // Handle for the ellipse shape
  else if(ellipseSelected){
    ellipseSelected = false;
    if(abs(ellipseX - 1100) < 5 && abs(ellipseY - 500) < 5){
      // Correct placement
      ellipseColor1 = 0;
      ellipseColor2 = 250;
      ellipsePlaced = true;
      successSound.play();  // Play success sound
    } else {
      // Incorrect placement
      failSound.play();  // Play fail sound
      showAlert();
      resetGame();  // Reset the game
    }
  }
  else if(abs(ellipseX - mouseX) < 45 && abs(ellipseY - mouseY) < 100 && !squareSelected && !ellipsePlaced){
    ellipseSelected = true;
  }

  // Handle for the square shape
  else if(squareSelected){
    squareSelected = false;
    if(abs(squareX - 1000) < 5 && abs(squareY - 200) < 5){
      // Correct placement
      squareColor1 = 0;
      squareColor2 = 250;
      squarePlaced = true;
      successSound.play();  // Play success sound
    } else {
      // Incorrect placement
      failSound.play();  // Play fail sound
      showAlert();
      resetGame();  // Reset the game
    }
  }
  else if(abs((mouseX - 40) - squareX) < 40 && abs((mouseY - 40) - squareY) < 40 && !squarePlaced){
    squareSelected = true;
  }

  // Check if the game is finished and all shapes are placed correctly
  if(rectPlaced && trianglePlaced && circlePlaced && ellipsePlaced && squarePlaced && !gameFinished){
    gameFinished = true;
  }

  // If game is finished and "Play Again" is clicked, reset the game
  else if(gameFinished && mouseX > 150 && mouseX < 400 && mouseY > 250 && mouseY < 300){
    resetGame();  // Reset the game
  }
}

// Function to reset the game
function resetGame() {
  gameFinished = false;
  scoreIncremented = false;

  rectPlaced = false;
  trianglePlaced = false;
  circlePlaced = false;
  ellipsePlaced = false;
  squarePlaced = false;

  // Reset colors
  rectColor1 = 250;
  rectColor2 = 0;
  triangleColor1 = 250;
  triangleColor2 = 0;
  circleColor1 = 250;
  circleColor2 = 0;
  ellipseColor1 = 250;
  ellipseColor2 = 0;
  squareColor1 = 250;
  squareColor2 = 0;

  // Reset positions
  rectX = 150;
  rectY = 420;
  triangleX = 100;
  triangleY = 200;
  circleX = 250;
  circleY = 100;
  ellipseX = 80;
  ellipseY = 380;
  squareX = 200;
  squareY = 250;

  // Reset the score
  document.getElementById("score").innerText = "Score: 0";
}

function showAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "block"; // Make the alert visible
}

function closeAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none"; // Hide the alert
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}






/* function startGame() {
  // Enable gameplay and reset variables
  resetGame(); // Resets the shapes and other states
  document.getElementById("startButton").disabled = true; // Disable the Start button
  document.getElementById("resetButton").classList.remove("d-none"); // Show Reset button
  startTimer(); // Start the timer
}

function startTimer() {
  // Ensure the timer starts from zero
  resetTimer();

  // Start the timer and update every second
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  // Calculate minutes and seconds
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;

  // Update the timer element in the HTML
  document.getElementById("timer").textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
  // Ensure time is always displayed as two digits
  return time < 10 ? `0${time}` : time;
}

function stopTimer() {
  // Stop the timer interval
  clearInterval(timerInterval);
}

function resetTimer() {
  // Reset the timer to 0
  stopTimer(); // Stop the current timer if running
  timerSeconds = 0; // Reset seconds
  updateTimerDisplay(); // Update the display to "00:00"



} */
