let bgColour = 220;

let areaOneMap;

let mouseVector; let mouseOffsetY = 0; let mouseInitialPos = 0; let leverOffset = 0;

let leverScale; let crankRendered; let circleOrigin; let circleSize;
let circleThreshold; let circleCancel; let successfulRotations = 0;

let angleThresholds = []; let angleIterations = 8;
let starting = 180; let multiplier = 0; let angle;

let gameOriginX; let gameOriginY; let gameWindowScale;

let circlePressed = false; let circleCollide = false;
let withinCircle = false; let mouseHold = false; let userLocation = -1;
let configurableColor ='#fcfeff';

let withinSwitch = false; let withinAiming = false;
let switchOn = false;
let aiming = false;

let pulleyPos; let pulleyWidth; let pulleyHeight; let isPulling
let upKeys; let firingKeys; let downKeys; let leftKeys; let rightKeys; let keySize;

let aimingScreenWidth; let aimingScreenHeight; let aimingScreenSize;
let pointerOffsetX = 0; let pointerOffsetY = 0;

let pointerIncrementX = 0; let pointerIncrementY = 0;

let mechViewpoint;
let withinCannon = false; let withinCockpit = false;
let ammoEjected = true; let withinLoader;

function setup() {
  redAmmo = new Ammunition(0, 0, 0);
  greenAmmo = new Ammunition(0, 0, 0);
  blueAmmo = new Ammunition(0, 0, 0);

  circleOrigin = createVector(0, 0); mouseVector = createVector(0, 0);

  frameRate(60); createCanvas(windowWidth, windowHeight); angleMode(DEGREES);
  initiateThresholds();
  initiateMaps();

  mechViewpoint = 1;
}

function initiateMaps() {
  areaOneMap = [3 ,11, 19, 24, 25, 26, 27, 32, 40, 41, 42, 43, 44, 45, 46, 54, 56 ,57, 58, 59, 60, 61, 62]
}

function draw() {
  background(bgColour);

  gameOriginX = (windowWidth / 2) - (2 * gameWindowScale)
  gameOriginY = (windowHeight / 2) - (1.5 * gameWindowScale)
  gameWindowScale = 256

  // Game Window
  fill('#0a0214'); rectMode(CORNER);
  rect(gameOriginX, gameOriginY, 4 * gameWindowScale, 3 * gameWindowScale)

  if (mechViewpoint == 0) drawCockpit(gameOriginX, gameOriginY, gameWindowScale);
  if (mechViewpoint == 1) drawCannon(gameOriginX, gameOriginY, gameWindowScale);
  
  fill(bgColour); noStroke(); rectMode(CORNER);
  rect(gameOriginX, gameOriginY - (gameWindowScale) * 3, 4 * gameWindowScale, 3 * gameWindowScale);
  stroke(0);
}

function mousePressed() {
  if (ammoEjected) {
    redAmmo.ammoGrab();
    greenAmmo.ammoGrab();
    blueAmmo.ammoGrab();
  }

  if (withinCockpit) {mechViewpoint = 0; withinCockpit = false;}
  if (withinCannon) {mechViewpoint = 1; withinCannon = false;}
  
  if (withinEject && !ammoEjected) {
    redAmmo.ejectAmmo();
    greenAmmo.ejectAmmo();
    blueAmmo.ejectAmmo();
    ammoEjected = true;
  }

  if (aiming) {keyDetection();}

  if (withinAiming) {
    if (aiming) {screenReset(); return}

    if (isPulling) {isPulling = false} else {isPulling = true}
  }

  if (!aiming) {
      if (withinSwitch) {
        if (switchOn) {switchOn = false} else {switchOn = true}
    }

    if (withinCircle) {mouseHold = (angle < 190 & angle > 170);};
    if (circleCollide) {mouseInitialPos = mouseY;};
  }
}

function mouseReleased() {
  if (redAmmo.releaseAmmo(withinLoader) || greenAmmo.releaseAmmo(withinLoader) || blueAmmo.releaseAmmo(withinLoader)) {
    ammoEjected = false;
  }

  rotationCancelled();
  if (circlePressed) {circlePressed = false;}
}