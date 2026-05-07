let circleOrigin;
let circleSize = 25;

let circleThreshold = circleSize * 7;
let circleCancel = circleSize * 1.5;
let successfulRotations = 0;

let mouseVector;
let angleThresholds = [];
let angleIterations = 8;

let starting = 180;
let multiplier = 0;
let angle;

let withinCircle = false;
let mouseHold = false;
let userLocation = -1;

let configurableColor ='#fcfeff';

function setup() {
  circleOrigin = createVector(windowWidth / 2, windowHeight / 2);
  mouseVector = createVector(0, 0);

  frameRate(60);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for (let i = 0; i < angleIterations; i++) {
    let difference = 360 / angleIterations;

    if (angleThresholds[i-1] >= 360) {
      angleThresholds[i-1] = 360 - angleIterations;
      starting = 0;
      multiplier = 1;
    }

    append(angleThresholds, starting + (difference * multiplier) );
    multiplier++;
  }

  console.log(angleThresholds);
}

function draw() {
  background(220);

  debugging()
  crankLogic()

}

function debugging() {
  // DEBUGGING
  fill(240);
  circle(circleOrigin.x, circleOrigin.y, circleThreshold);

  fill(200);
  circle(circleOrigin.x, circleOrigin.y, circleCancel);

  fill(0);
  textSize(25);
  text(userLocation, 50, 50);
  text(angleThresholds[userLocation + 1], 50, 100);
  text(angle, 50, 150);
  text( ("number of rotations: "+successfulRotations) , 50, 200);
}

function crankLogic() {
  // Draw
    fill(configurableColor);
    circle(circleOrigin.x, circleOrigin.y, circleSize);

  // Check if within the circle
  if (
    dist(mouseX, mouseY, circleOrigin.x, circleOrigin.y) < circleThreshold / 2
    &
    dist(mouseX, mouseY, circleOrigin.x, circleOrigin.y) > circleCancel / 2
  ) {
    withinCircle = true;
  } else {
    withinCircle = false;
    rotationCancelled();
    configurableColor = '#fcfeff';
  }

  if (angle < 190 & angle > 170 & withinCircle) {
      configurableColor = '#ff200b';
  } else {
      configurableColor = '#fcfeff';
  }

  mouseVector.set(mouseX, mouseY);

  let v0 = p5.Vector.sub(mouseVector, circleOrigin);
  let referenceVector = createVector( circleOrigin.x + 50, circleOrigin.y );
  let v1 = p5.Vector.sub(referenceVector, circleOrigin);

  angle = 180 - round(v0.angleBetween(v1), 2 );

  //console.log(angle);
  if (mouseHold) {
    fill(0);
    configurableColor = '#4db0ee';
    //text("Holding...", 50, 600);

    angleCheck();
  }
}

function angleCheck() {
  if (userLocation < (angleIterations / 2) ) {
    if (angle > angleThresholds[ userLocation + 1 ]) {
      userLocation++;
      console.log("Passed");
    }
  } if (userLocation >= (angleIterations / 2) && userLocation < 16) {
    if (angle > angleThresholds[ userLocation + 1 ] && angle < 300) {
      userLocation++;
      console.log("Passed");
    }
  }

  if (userLocation == angleIterations - 1) {
    userLocation = 0;
    successfulRotations++;
    console.log("Rotated!");
  }
}

function mousePressed() {
  if (withinCircle) 
  {
    mouseHold = (angle < 190 & angle > 170);
    console.log("held");
  }
}

function mouseReleased() {
  console.log("released");
  rotationCancelled();
}

function rotationCancelled() {
  successfulRotations = 0;
  mouseHold = false;
  userLocation = -1;
}