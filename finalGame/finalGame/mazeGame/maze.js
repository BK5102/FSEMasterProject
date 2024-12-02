let x, y; 
let mainCharacter;
let collectItem;

// Array to hold wall properties
let walls = [
  { x: 100, y: 200, width: 20, height: 300 }, // Vertical wall 1
  { x: 100, y: 80, width: 20, height: 300 },  // Vertical wall 2
  { x: 150, y: -1, width: 20, height: 80 },   // Vertical wall above Horizontal wall, no cheating
  { x: 150, y: 100, width: 20, height: 150 }, // Vertical wall 3
  { x: 200, y: 170, width: 20, height: 200 }, // Vertical wall 4
  { x: 320, y: 420, width: 20, height: 220 }, // Vertical wall 5
  { x: 550, y: 210, width: 20, height: 320 }, // Vertical wall 6
  { x: 400, y: 100, width: 20, height: 350 }, // Vertical wall 7
  { x: 600, y: 100, width: 20, height: 350 }, // Vertical wall 8 near checkpoint
  { x: 30,  y: 370, width: 300, height: 20 }, // Horizontal wall 1
  { x: 150, y: 80, width: 200, height: 20 },  // Horizontal wall 2
  { x: 300, y: 200, width: 100, height: 20 },  // Horizontal wall 3
  { x: 450, y: 210, width: 100, height: 20 },  // Horizontal wall 4
  { x: 420, y: 300, width: 100, height: 20 },  // Horizontal wall 5
  { x: 620, y: 300, width: 50, height: 20 },   // Horizontal wall 6
  { x: 670, y: 200, width: 50, height: 20 },   // Horizontal wall 7
  { x: 400, y: 100, width: 200, height: 20 },  // Horizontal wall 8
  { x: 620, y: 420, width: 100, height: 20 },  // Horizontal wall 9 near checkpoint
];


let score = 0
let scoreIncremented = false
let successSound;
let failSound;
let timer;
let seconds = 0;
let minutes = 0;
let gamestart=false;
let gameName="Maze";

function preload() {
  successSound = loadSound('/finalGame/sounds/success-1-6297.mp3'); 
  failSound = loadSound('/finalGame/sounds/game-fail-90322.mp3'); 
}

function setup() {
  createCanvas(700, 500);
  mainCharacter = loadImage('assets/Stickman (Random).png'); // Load the character image
  resetGame(); // Initialize game state
  textSize(24);
  stroke('red');
  
  collectItem = loadImage('assets/Checkpoint image.png'); // Load the collection item
  let userName=getLoggedInUserName();
  document.getElementById('usernameLabel').innerHTML=userName;
  
  let topScoreUser=getTopScoreUserByGame(gameName);
  let topScoreValue=getFormattedTopScoreValueByGame(gameName);
  document.getElementById('topScoreUser').innerHTML=topScoreUser;
  document.getElementById('topScoreValue').innerHTML=topScoreValue;
}

function draw() {

  background(233,217,179);

  // Set text color to transparent
  fill(255, 0, 0, 128); // Red with 50% opacity
  text('Avoid the walls, and reach your Checkpoint!', 200, 40);

  // Draw the stickman
  image(mainCharacter, x, y, 20, 40); // Send stickman to the screen
  image(collectItem, 650, 450, 50, 50); // Send the collection item to screen
  
  // Move the stickman
  handleMovement();

  // Draw walls
  for (let wall of walls) {
    rect(wall.x, wall.y, wall.width, wall.height);
  }
  
  // Check for collisions with walls
  if (checkCollisions()) {
    resetGame(); // Restart game on collision
  }
  
  // Check if the stickman collected the checkpoint
  let d = int(dist(x, y, 650, 450));
  if (d < 40) {
    fill(255); // White text for winning message
    text('You win!', 200, 300);
    incrementScore()
    successSound.play();
    //save score
    saveOrUpdateTopScore(gameName, score, ((minutes * 60) + seconds));
    
    // add logic for next levels here later

  }
}

// Function to handle movement
function handleMovement() {
  if(!gamestart)
    return;
  if (keyIsDown(RIGHT_ARROW)) {
    x += 5; // Move right
  }
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5; // Move left
  }
  if (keyIsDown(UP_ARROW)) {
    y -= 5; // Move up
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5; // Move down
  }
}

// Function to reset game state
function resetGame() {
  x = 50; // Reset stickman's x position
  y = 400; // Reset stickman's y position
}

// Function to check for collisions
function checkCollisions() {
  for (let wall of walls) {
    if (x > wall.x && x < wall.x + wall.width && y > wall.y && y < wall.y + wall.height) {
      failSound.play();
      return true; // Collision detected
    }
  }
  return false; // No collision
}

function incrementScore() {
  if(!scoreIncremented){
    score++; // Increase score by 1
    scoreIncremented = true;
    document.getElementById("score").innerText = `Score: ${score}`;
    console.log("Score: " + score); // Display the score in the console
  }
  
}

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

function initializeToast(){
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, option)
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
  /*const alertBox = document.getElementById("alertBox");
  alertBox.style.display = "none"; // Hide the alert*/
}

