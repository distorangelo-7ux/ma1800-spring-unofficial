let ammoInitial;
let ammoOffset;
let ammoPos;
let ammoRadius = 50;

let loaderPos;
let loaderRadius = 100;

let aestheticAccelerator = 0;

let ammunitionLoaded = 0;
let objectFall = false;
let withinCircle = false;
let withinLoader = false;
let holdingItem = false;

function setup() {
  ammoInitial = createVector(600, 700);
  ammoOffset = createVector(0, 0);
  ammoPos = createVector(0, 0);
  
  loaderPos = createVector(100,300);

  FallTimer = new Timer(250);

  frameRate(60);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill(255);
  textSize(25);
  text( ("AMMO: "+ammunitionLoaded) , 50, 200);
  
  ammoPos.x = (ammoInitial.x - ammoOffset.x);
  ammoPos.y = (ammoInitial.y - ammoOffset.y);

  fill('#312b2b');
  circle(loaderPos.x, loaderPos.y, loaderRadius);

  fill('#de3434');
  circle(ammoPos.x, ammoPos.y, ammoRadius);

  withinLoader = (dist(mouseX, mouseY, loaderPos.x, loaderPos.y) < loaderRadius / 2);
  withinCircle = (dist(mouseX, mouseY, ammoPos.x, ammoPos.y) < ammoRadius / 2);

  if (holdingItem) {
    ammoOffset.x = ammoInitial.x - mouseX;
    ammoOffset.y = ammoInitial.y - mouseY;
  }

  if (objectFall) {
    FallTimer.timerLoop();
    aestheticAccelerator+=0.98;
    ammoOffset.y -= aestheticAccelerator;

    if (FallTimer.timerAction(1)) {
      console.log("dropped");
      aestheticAccelerator = 0;
      circleReset();
      FallTimer.timerReset();
      objectFall = false;
  }
  }
}

function mousePressed() {
  if (withinCircle && !objectFall) {
    holdingItem = true;
  }
}

function mouseReleased() {
  if (holdingItem && !withinLoader) {
    objectFall = true;
    holdingItem = false;
    withinCircle = false;
  } else if (holdingItem && withinLoader) {
    ammunitionLoaded++;
    circleReset();
    holdingItem = false;
    withinCircle = false;
  }
}

function circleReset() {
    ammoOffset.x = 0;
    ammoOffset.y = 0;
}