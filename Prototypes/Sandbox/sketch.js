let mouseOffsetY = 0;
let mouseInitialPos = 0;
let circleOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawLever(
    windowWidth / 2 + 200,
    windowHeight / 2 + 200
  );
}

function drawLever(x, y) {
  fill('rgb(131, 129, 122)');
  rectMode(CENTER);
  rect(x, y, 100, 200);

  fill('rgb(48, 45, 48)');
  rect(x, y, 30, 150);

  drawCircle(x, y, 100 / 1.25);
}

function drawCircle(x, y, r) {
  // Initialising Variables
  circlePressed = false;
  circleCollide = false;
  circleX = x;
  circleY = y - (circleOffset);

  // Detecting collision with mouse
  if(dist(mouseX, mouseY, circleX, circleY) < r / 2) {
    circleCollide = true;
    fill('rgb(224, 72, 52)');

    // Holding function
    if (mouseIsPressed) {
      fill('rgb(255, 0, 0)');

      //console.log(circleOffset);
      circleOffset += mouseInitialPos - mouseY;
      if (circleOffset >= 100) circleOffset = 100;
      if (circleOffset <= -100) circleOffset = -100;
      mouseInitialPos = mouseY;

      circlePressed = true;

    }
    
  } else {
    circleCollide = false;
    if (circleOffset < 0) {
      circleOffset+=2;
    }

    if (circleOffset > 0) {
      circleOffset-=2;
    }

    fill('rgb(255, 206, 60)');
    
  }

  // Drawing the circle
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