let mouseOffsetY = 0;
let mouseInitialPos = 0;
let circleOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawLever(
    windowWidth / 2,
    windowHeight / 2
  );
}

function drawLever(x, y) {
  fill('rgb(131, 129, 122)');
  rectMode(CENTER);
  rect(x, y, 100, 200);

  drawCircle(x, y, 100 / 1.25);
}

function drawCircle(x, y, r) {
  // Initialising Variables
  circlePressed = false;
  circleCollide = false;
  circleX = x;
  circleY = y - (100) - (circleOffset);

  if(dist(mouseX, mouseY, circleX, circleY) < r / 2) {
    circleCollide = true;
    fill('rgb(224, 72, 52)');

    if (mouseIsPressed) {
      fill('rgb(255, 0, 0)');

      console.log(circleOffset);
      circleOffset += mouseInitialPos - mouseY;
      if (circleOffset >= 0) circleOffset = 0;
      if (circleOffset <= -200) circleOffset = -200;
      mouseInitialPos = mouseY;

      circlePressed = true;

    }
    
  } else {
    circleCollide = false;
    fill('rgb(255, 206, 60)');
    
  }

  circle(circleX, circleY, r);

}

function mousePressed() {
  if (circleCollide) {
    console.log("held");
    mouseInitialPos = mouseY;
  }
}

function mouseReleased() {
  if (circlePressed) {
    console.log("released");
    circlePressed = false;
  }
}