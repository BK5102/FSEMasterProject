let gameStarted = false;

let hitCheckpoint1 = false;
let hitCheckpoint2 = false;
let hitCheckpoint3 = false;
let hitCheckpoint4 = false;
let hitCheckpointInitial = false;

let selectedShape;

let initialCheckpointX = 0;
let initialCheckpointY = 0;

let score = 0;
let successSound;
let failSound;
let timer;
let seconds = 0;
let minutes = 0;
let gameName="Trace";
let gameInitialized=false;

function preload() {
  successSound = loadSound('/finalGame/sounds/success-1-6297.mp3'); 
  failSound = loadSound('/finalGame/sounds/game-fail-90322.mp3'); 
}
//Sets up initial canvas, including the background and central shape
function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("gameCanvas"); // Place the canvas inside the #gameCanvas div
  background(230);

  let yellowPreset = color(255, 255, 180);
  let magentaPreset = color(255, 180, 255);
  let cyanPreset = color(180, 255, 255);

  let selectedColor = random([yellowPreset, magentaPreset, cyanPreset]);
  /* selectedShape = random([0, 1, 2]);

  if (selectedShape == 0) {
  setupSquare(selectedColor);
  }
  if (selectedShape == 1) {
  setupSquare(selectedColor);
  }
  if (selectedShape == 2) {
  setupSquare(selectedColor);
  } */
  setupSquare(selectedColor);
  initializeToast();
  let userName=getLoggedInUserName();
  document.getElementById('usernameLabel').innerHTML=userName;

  let topScoreUser=getTopScoreUserByGame(gameName);
  let topScoreValue=getFormattedTopScoreValueByGame(gameName);
  document.getElementById('topScoreUser').innerHTML=topScoreUser;
  document.getElementById('topScoreValue').innerHTML=topScoreValue;

}

/* function setupCircle(selectedPreset) {
stroke(selectedPreset);
strokeWeight(25);
circle(300, 300, 300);
}

function setupTriangle(selectedPreset) {
stroke(selectedPreset);
strokeWeight(25);
triangle(150, 450, 300, 150, 450, 450);
} */

function setupSquare(selectedPreset) {
  stroke(selectedPreset);
  strokeWeight(26);
  square(150, 150, 300);

  /* stroke(255, 0, 0);
  strokeWeight(1);
  square(137, 137, 26);
  square(137, 437, 26);
  square(437, 437, 26);
  square(437, 137, 26); */

  draw(square);
}

function draw(selectedShape) {
  let b = color(0, 0, 0);
  stroke(b);
  fill(255, 255, 255);
  strokeWeight(6);

  if (gameStarted == true) {
    if (mouseX < 137 || 463 < mouseX || mouseY < 137 || 463 < mouseY) {
      endGameLoss();
      failSound.play();
      showAlert()
    }
    if (163 < mouseY && mouseY < 437) {
      if (163 < mouseX && mouseX < 437) {
        endGameLoss();
        failSound.play();
        showAlert()
      }
    }
  }

  if (gameStarted == true) {
    line(pmouseX, pmouseY, mouseX, mouseY);

    strokeWeight(0);
    stroke(0, 255, 0);
    fill(0, 255, 0);

    if (137 < mouseX && mouseX < 163 && 137 < mouseY && mouseY < 163) {
      //square(137, 137, 26);
      hitCheckpoint1 = true;
    }
    if (437 < mouseX && mouseX < 463 && 137 < mouseY && mouseY < 163) {
      //square(437, 137, 26);
      hitCheckpoint2 = true;
    }
    if (437 < mouseX && mouseX < 463 && 437 < mouseY && mouseY < 463) {
      //square(437, 437, 26);
      hitCheckpoint3 = true;
    }
    if (137 < mouseX && mouseX < 163 && 437 < mouseY && mouseY < 463) {
      //square(137, 437, 26);
      hitCheckpoint4 = true;
    }
    if (
      initialCheckpointX < mouseX &&
      initialCheckpointX + 26 > mouseX &&
      initialCheckpointY < mouseY &&
      initialCheckpointY + 26 > mouseY &&
      hitCheckpoint1 == true &&
      hitCheckpoint2 == true &&
      hitCheckpoint3 == true &&
      hitCheckpoint4 == true
    ) {
      //square(initialCheckpointX, initialCheckpointY, 26);
      hitCheckpointInitial = true;
      stroke(100, 255, 100);
      noFill();
      strokeWeight(26);
      square(150, 150, 300);
      incrementScore();
      successSound.play();
      endGame();
    }
  }
}


function initializeToast(){
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl)
  })
}

function showAlert() {
  /*const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "block"; // Make the alert visible*/
  var liveToast = document.getElementById('liveToast')
  var myToast = bootstrap.Toast.getInstance(liveToast) // Returns a Bootstrap toast instance
  myToast.show();

}

function closeAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none"; // Hide the alert
}





function incrementScore() {
  score++; // Increase score by 1
  document.getElementById("score").innerText = `Score: ${score}`;
  console.log("Score: " + score); // Display the score in the console
}

function endGameLoss() {
  stroke(255, 100, 100);
  noFill();
  strokeWeight(26);
  square(150, 150, 300);

  endGame();
}

function endGame() {
  gameStarted = false;

  hitCheckpoint1 = false;
  hitCheckpoint2 = false;
  hitCheckpoint3 = false;
  hitCheckpoint4 = false;
  hitCheckpointInitial = false;

  /* initialCheckpointX = 0;
  initialCheckpointY = 0; */

  setTimeout(setup, 1500);
}

function mousePressed() {
  if(gameInitialized){ //start button pressed
    if (gameStarted != true) {
      createInitialCheckpoint();
    }
    gameStarted = true;
  }
}

function createInitialCheckpoint() {
  initialCheckpointX = mouseX - 13;
  initialCheckpointY = mouseY - 13;

  /* strokeWeight(1);
  stroke(255, 0, 0);
  square(initialCheckpointX, initialCheckpointY, 26); */
}

// Start the timer when the game starts
function startGame() {
  document.getElementById("startButton").disabled = true; // Disable Start button
  resetTimer();
  timer = setInterval(updateTimer, 1000); // Start timer
  gameInitialized=true;
}


function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  document.getElementById("time").textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

/*function updateTimerDisplay() {
  let minutesDisplay = Math.floor(countdown / 60);
  let secondsDisplay = countdown % 60;
  document.getElementById("time").textContent = `${formatTime(minutesDisplay)}:${formatTime(secondsDisplay)}`;
}*/

function resetTimer() {
  clearInterval(timer); // Stop any existing timer
  seconds = 0;
  minutes = 0;
  document.getElementById("time").textContent = "00:00"; // Reset display
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function stopGame(){
  //save score
  saveOrUpdateTopScore(gameName, score, ((minutes * 60) + seconds));    
}