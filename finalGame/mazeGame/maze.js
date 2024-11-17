let x, y; 
let mainCharacter;
let collectItem;
let currentLevel = 0; // 0 = Welcome, 1 = Level 1, 2 = Level 2, 3 = Final Level
let walls = [];

// Welcome Screen
function setup() {
  createCanvas(700, 500);
  mainCharacter = loadImage('assets/Stickman (Random).png'); // Load the character image
  collectItem = loadImage('assets/Checkpoint image.png'); // Load the collection item
  resetGame(); // Initialize game state
  textSize(24);
  stroke('black');
}

function draw() {
  if (currentLevel === 0) {
    drawWelcomeScreen();
  } else if (currentLevel === 1) {
    drawLevel1();
  } else if (currentLevel === 2) {
    drawLevel2();
  } else if (currentLevel === 3) {
    drawFinalLevel();
  }
}

// Draw the welcome screen
function drawWelcomeScreen() {
  background('lightblue');
  fill(255, 100, 0);
  textAlign(CENTER);
  text('Welcome! Click to start.', width / 2, height / 2);
  
  fill(0, 200, 255); // Light blue for the button
  rect(0, height - 30, 110, 30);  // Button at the bottom-left corner
  fill(0); // Black color for the text
  textSize(16);
  textAlign(LEFT);
  text('Home Screen',5, height - 10);
}

function mousePressed() {
  // Check if the "Main Menu" button is clicked (on levels 1-3)
  if (currentLevel !== 0) {
    if (mouseX >= 0 && mouseX <= 110 && mouseY >= height - 30 && mouseY <= height) {
      currentLevel = 0;  // Go back to home screen
      resetGame();
      return;
    }
  }
  
  // Existing logic for advancing levels
  if (currentLevel === 0) {
    currentLevel = 1; // Move to Level 1
  } else if (currentLevel === 1 && checkLevel1Win()) {
    currentLevel = 2; // Move to Level 2
  } else if (currentLevel === 2 && checkLevel2Win()) {
    currentLevel = 3; // Move to Final Level
  } else if (currentLevel === 3 && checkFinalLevelWin()) {
    currentLevel = 0; // Go back to Welcome screen (or restart)
  }
}

// Level 1
function drawLevel1() {
  background('yellow');
  fill(255, 0, 0, 128);
  text('      Avoid walls, and reach your Checkpoint!', 220, 40);
  
  fill(0, 200, 255); 
  rect(0, height - 30, 110, 30);  
  fill(0); 
  textSize(16);
  textAlign(LEFT);
  text('Main Menu', 10, height - 10);
  
  walls = [
    { x: 100, y: 200, width: 20, height: 300 },
    { x: 100, y: 80, width: 20, height: 300 },
    { x: 150, y: -1, width: 20, height: 80 },
    { x: 150, y: 220, width: 20, height: 150 },
    { x: 290, y: 50, width: 20, height: 300 },
    { x: 550, y: 0, width: 20, height: 50 },
    { x: 230, y: 240, width: 20, height: 50 },
    { x: 230, y: 370, width: 20, height: 50 },
    { x: 500, y: 420, width: 20, height: 100 },
    { x: 340, y: 320, width: 20, height: 100 },
    { x: 410, y: 260, width: 20, height: 40 },
    { x: 340, y: 110, width: 20, height: 130 },
    { x: 600, y: 50, width: 20, height: 130 },
    { x: 450, y: 210, width: 20, height: 130 },
    { x: 650, y: 210, width: 20, height: 130 },
    { x: 600, y: 450, width: 20, height: 130 },
    { x: 700, y: 0, width: 20, height: 700 },
    { x: -20, y: 0, width: 20, height: 700 },
    
    // Horizontal Columns
    { x: 150, y: 150, width: 100, height: 20 }, 
    { x: 150, y: 220, width: 100, height: 20 },
    { x: 150, y: 420, width: 350, height: 20 },
    { x: 620, y: 50, width: 100, height: 20 },
    { x: 200, y: 50, width: 90, height: 20 },
    { x: 310, y: 50, width: 260, height: 20 },
    { x: 340, y: 300, width: 90, height: 20 },
    { x: 340, y: 240, width: 90, height: 20 },
    { x: 360, y: 110, width: 90, height: 20 },
    { x: 500, y: 110, width: 50, height: 20 },
    { x: 620, y: 110, width: 50, height: 20 },
    { x: 470, y: 180, width: 50, height: 20 },
    { x: 500, y: 360, width: 50, height: 20 },
    { x: 600, y: 360, width: 50, height: 20 },
    { x: 600, y: 210, width: 50, height: 20 },
    { x: 670, y: 210, width: 50, height: 20 },
    { x: 0, y: 510, width: 850, height: 20 },
    { x: -100, y: -20, width: 850, height: 20 },
  ];
  
  handleMovement();
  drawCharacterAndCheckpoint();
  drawWalls();
  
  if (checkCollisions()) resetGame();

  // Check win condition continuously
  if (checkLevel1Win()) {
    currentLevel = 2; // Move to Level 2
  }
}

// Level 2
function drawLevel2() {
  background('green');
  fill(255, 100, 180, 200);
  text('Level 2', 400, 40);
  
  fill(0, 200, 255); 
  rect(0, height - 30, 110, 30);  
  fill(0); 
  textSize(16);
  textAlign(LEFT);
  text('Main Menu', 10, height - 10);
  
  walls = [
    { x: 550, y: 70, width: 20, height: 340 }, 
    { x: 100, y: 40, width: 20, height: 500 },
    { x: 150, y: -30, width: 20, height: 180 },
    { x: 150, y: 240, width: 20, height: 180 },
    { x: 290, y: 50, width: 20, height: 300 },
    { x: 550, y: 0, width: 20, height: 50 },
    { x: 230, y: 240, width: 20, height: 50 },
    { x: 230, y: 370, width: 20, height: 50 },
    { x: 500, y: 420, width: 20, height: 100 },
    { x: 340, y: 320, width: 20, height: 100 },
    { x: 410, y: 260, width: 20, height: 40 },
    { x: 340, y: 110, width: 20, height: 130 },
    { x: 600, y: 50, width: 20, height: 130 },
    { x: 450, y: 210, width: 20, height: 130 },
    { x: 650, y: 210, width: 20, height: 130 },
    { x: 600, y: 450, width: 20, height: 130 },
    { x: 700, y: 0, width: 20, height: 700 },
    { x: -20, y: 0, width: 20, height: 700 },
        
    // Horizontal Columns
    { x: 150, y: 150, width: 100, height: 20 }, 
    { x: 150, y: 220, width: 100, height: 20 },
    { x: 150, y: 420, width: 350, height: 20 },
    { x: 620, y: 50, width: 100, height: 20 },
    { x: 200, y: 50, width: 90, height: 20 },
    { x: 310, y: 50, width: 260, height: 20 },
    { x: 340, y: 300, width: 90, height: 20 },
    { x: 340, y: 240, width: 90, height: 20 },
    { x: 360, y: 110, width: 90, height: 20 },
    { x: 500, y: 110, width: 50, height: 20 },
    { x: 620, y: 110, width: 50, height: 20 },
    { x: 470, y: 180, width: 50, height: 20 },
    { x: 500, y: 345, width: 50, height: 20 },
    { x: 600, y: 360, width: 50, height: 20 },
    { x: 600, y: 210, width: 50, height: 20 },
    { x: 620, y: 420, width: 90, height: 20 },
    { x: 0, y: 510, width: 850, height: 20 },
    { x: -100, y: -20, width: 850, height: 20 },
  ];
  
  handleMovement();
  drawCharacterAndCheckpoint();
  drawWalls();
  
  if (checkCollisions()) resetGame();

  // Check win condition continuously
  if (checkLevel2Win()) {
    currentLevel = 3; // Move to Final Level
  }
}

// Final Level
function drawFinalLevel() {
  background('lightblue');
  fill(255, 100, 0);
  text('Final Level', 400, 40);
  fill(255, 100, 0, 200); // Low Pink, better for the eye.
  text('Thanks ', 40, 40);
  text('for', 40, 60);
  text('playing!', 40, 80);

  fill(0, 200, 255); 
  rect(0, height - 30, 110, 30);  
  fill(0); 
  textSize(16);
  textAlign(LEFT);
  text('Main Menu', 10, height - 10);
  
  walls = [
    { x: 550, y: 70, width: 20, height: 340 }, 
    { x: 100, y: 40, width: 20, height: 500 },
    { x: 150, y: -30, width: 20, height: 180 },
    { x: 150, y: 240, width: 20, height: 180 },
    { x: 290, y: 50, width: 20, height: 300 },
    { x: 600, y: 0, width: 20, height: 50 },
    { x: 230, y: 240, width: 20, height: 50 },
    { x: 230, y: 370, width: 20, height: 50 },
    { x: 500, y: 420, width: 20, height: 100 },
    { x: 340, y: 320, width: 20, height: 100 },
    { x: 410, y: 260, width: 20, height: 40 },
    { x: 340, y: 110, width: 20, height: 130 },
    { x: 600, y: 50, width: 20, height: 130 },
    { x: 450, y: 210, width: 20, height: 130 },
    { x: 650, y: 210, width: 20, height: 130 },
    { x: 600, y: 450, width: 20, height: 130 },
    { x: 500, y: 250, width: 20, height: 70 },
    { x: 700, y: 0, width: 20, height: 700 },
    { x: -20, y: 0, width: 20, height: 700 },
    
    // Horizontal Columns
    { x: 150, y: 150, width: 100, height: 20 }, 
    { x: 150, y: 220, width: 100, height: 20 },
    { x: 150, y: 420, width: 350, height: 20 },
    { x: 620, y: 50, width: 100, height: 20 },
    { x: 200, y: 50, width: 90, height: 20 },
    { x: 310, y: 50, width: 260, height: 20 },
    { x: 340, y: 300, width: 90, height: 20 },
    { x: 340, y: 240, width: 90, height: 20 },
    { x: 360, y: 110, width: 90, height: 20 },
    { x: 500, y: 110, width: 50, height: 20 },
    { x: 620, y: 110, width: 50, height: 20 },
    { x: 470, y: 180, width: 50, height: 20 },
    { x: 500, y: 360, width: 50, height: 20 },
    { x: 600, y: 360, width: 50, height: 20 },
    { x: 600, y: 210, width: 50, height: 20 },
    { x: 0, y: 510, width: 850, height: 20 },
    { x: -100, y: -20, width: 850, height: 20 },
  ];
  
  handleMovement();
  drawCharacterAndCheckpoint();
  drawWalls();
  
  if (checkCollisions()) resetGame();

  // Check win condition continuously
  if (checkFinalLevelWin()) {
    currentLevel = 0; // Go back to Welcome screen
  }
}

// Function to handle character movement
function handleMovement() {
  if (keyIsDown(RIGHT_ARROW)) x += 5;
  if (keyIsDown(LEFT_ARROW)) x -= 5;
  if (keyIsDown(UP_ARROW)) y -= 5;
  if (keyIsDown(DOWN_ARROW)) y += 5;
}

// Function to reset game state
function resetGame() {
  x = 0; 
  y = 0; 
}

// Function to draw character and checkpoint
function drawCharacterAndCheckpoint() {
  image(mainCharacter, x, y, 20, 40); // Draw stickman
  if (currentLevel === 1)  {
    image(collectItem, 650, 450, 50, 50 ); // Checkpoint for Level 1
  } else if (currentLevel === 2) {
    image(collectItem, 650, 0, 50, 50); // Checkpoint for Level 2
  } else if (currentLevel === 3) {
    image(collectItem, 650, 150, 50, 50); // Checkpoint for Final Level
  }
}

// Function to draw walls
function drawWalls() {
  fill('brown');
  for (let wall of walls) {
    rect(wall.x, wall.y, wall.width, wall.height);
  }
}

// Check winning conditions
function checkLevel1Win() {
  let d = int(dist(x, y, 650, 450));
  return d < 25; // Check if reached Level 1 checkpoint
}

function checkLevel2Win() {
  let d = int(dist(x, y, 650, 0));
  return d < 25; // Check if reached Level 2 checkpoint
}

function checkFinalLevelWin() {
  let d = int(dist(x, y, 650, 150));
  return d < 25; // Check if reached Final Level checkpoint
}

// Check for wall collisions
function checkCollisions() {
  for (let wall of walls) {
    if (
      x < wall.x + wall.width &&
      x + 20 > wall.x &&
      y < wall.y + wall.height &&
      y + 40 > wall.y
    ) {
      return true; // Collision detected
    }
  }
  return false; // No collision
  
 }
