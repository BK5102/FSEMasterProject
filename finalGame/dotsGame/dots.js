let score = 0;
let canScore = true;
let successSound;
let failSound;
let timer;
let seconds = 0;
let minutes = 0;
let gameName="Dots";

function preload() {
  successSound = loadSound('/finalGame/sounds/success-1-6297.mp3');
  failSound = loadSound('/finalGame/sounds/game-fail-90322.mp3');
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("gameCanvas"); // Place the canvas inside the #gameCanvas div
  background(233, 217, 179);
  textSize(25);
  stroke(0, 0, 0);
  fill(0, 0, 0);
  text("Streak: " + score, 5, 25);

  frameRate(0.32);
  initializeToast();
  let userName=getLoggedInUserName();
  document.getElementById('usernameLabel').innerHTML=userName;

  let topScoreUser=getTopScoreUserByGame(gameName);
  let topScoreValue=getFormattedTopScoreValueByGame(gameName);
  document.getElementById('topScoreUser').innerHTML=topScoreUser;
  document.getElementById('topScoreValue').innerHTML=topScoreValue;

}

let circleX;
let circleY;
let gamestart=false;

function draw() {
  if(gamestart==true)
  {
    circleX = random(75, 525);
    circleY = random(75, 525);

    background(233, 217, 179);
    circleLoop(circleX, circleY);
    stroke(0, 0, 0);
    fill(0, 0, 0);
    text("Streak: " + score, 5, 25);
  }
}

function circleLoop(circleX, circleY) {
  canScore = true;
  stroke(255, 180, 180);
  fill(255, 180, 180);
  circle(circleX, circleY, 100);
}

function mouseClicked() {
  // Check if the mouse is within the canvas bounds. 
  // canvas width x height 400x400
  if (gamestart == true && mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 400) {    
    console.log("Mouse pressed on canvas!");     
    if (
      mouseX >= circleX - 50 &&
      mouseX <= circleX + 50 &&
      mouseY >= circleY - 50 &&
      mouseY <= circleY + 50
    ) {
      if (canScore == true) {
        stroke(180, 255, 180);
        fill(180, 255, 180);

        background(233, 217, 179);
        circle(circleX, circleY, 100);
        
        score++;
        canScore = false;
        text("Streak: " + score, 5, 25);
        successSound.play();
      }
    } else {
      background(233, 217, 179);
      stroke(255, 180, 180);
      fill(255, 180, 180);

      circle(circleX, circleY, 100);

      stroke(0, 0, 0);
      fill(0, 0, 0);

      score = 0;
      text("Streak: " + score, 5, 25);
      failSound.play();
      showAlert();
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

/*function closeAlert() {
  const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none"; // Hide alert
}*/


// Start the timer when the game starts
function startGame() {
  document.getElementById("startButton").disabled = true; // Disable Start button
  resetTimer();
  timer = setInterval(updateTimer, 1000); // Start timer
  gamestart = true;

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
  resetTimer();
  saveOrUpdateTopScore(gameName, score, ((minutes * 60) + seconds));
  document.getElementById("startButton").disabled = false; // Enable Start button 
  gamestart=false;
  score=0;
  clear(); //clear canvas. p5js function
  background(233, 217, 179); // set background colour  
  textSize(25);
  stroke(0, 0, 0);
  fill(0, 0, 0);
  text("Streak: " + score, 5, 25);
}