let rectx = 200
let recty = 200
let rectSelected = false
let rectColor1 = 250
let rectColor2 = 0

let trianglex = 100
let triangley = 200
let triangleSelected = false
let triangleColor1 = 250
let triangleColor2 = 0

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(50);

  fill(rectColor1, rectColor2, 0)
  rect(rectx, recty, 100, 200);
  if(rectSelected){
    rectx = mouseX - 50
    recty = mouseY - 100
  }

  fill(triangleColor1, triangleColor2, 0)
  triangle(trianglex, triangley - 100, trianglex + 75, triangley + 25, trianglex - 75, triangley + 25)
  if(triangleSelected){
    trianglex = mouseX
    triangley = mouseY
  }

}

function mouseClicked(){
  if(rectSelected){
    rectSelected = false;
  }
  else if(mouseX >= rectx && mouseX <= rectx + 100 && mouseY >= recty && mouseY <= recty + 200){
    rectSelected = true
  }
  else if(triangleSelected){
    triangleSelected = false;
  }
  else if(abs(mouseX - trianglex) < 60 && ((mouseY > triangley && mouseY < triangley + 25) || (mouseY < triangley && mouseY > triangley - 60))){
    triangleSelected = true;
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}