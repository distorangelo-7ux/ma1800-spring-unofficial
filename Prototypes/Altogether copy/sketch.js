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

function setup() {
  circleOrigin = createVector(0, 0); mouseVector = createVector(0, 0);

  frameRate(60); createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  initiateThresholds();
  initiateMaps();

  console.log(angleThresholds);
}

function initiateThresholds() {
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
  fill('#0a0214');
  rectMode(CORNER);
  rect(
    gameOriginX,
    gameOriginY,
    4 * gameWindowScale,
    3 * gameWindowScale
  )

  drawCockpit(gameOriginX, gameOriginY, gameWindowScale);
  
  fill(bgColour);
  noStroke()
  rectMode(CORNER);
  rect(gameOriginX, gameOriginY - (gameWindowScale) * 3, 4 * gameWindowScale, 3 * gameWindowScale)
  stroke(0);
}

function drawCockpit(originX, originY, originScale) {
  switchLogic(originX + (originScale) * 0.6, originY + (originScale) * 2.05, originScale / 256)

  if (switchOn) {
    crankLogic(originX + (originScale) * 3.1, originY + (originScale) * 2.25, originScale / 256);
    leverLogic(originX + (originScale) * 1, originY + (originScale) * 2.25, originScale / 256);
    cameraLogic(originX + (originScale) * 2, originY + (originScale) * 0.9, originScale / 256);
    mapLogic(originX + (originScale) * 2, originY + (originScale) * 2.3, originScale / 256);
  }
  
  let aimingScreenY;
  if (aiming) {
    aimingScreenY = originY + (originScale) * 1.5
  } else {
    aimingScreenY = originY - (originScale) * 1.05
  }

  aimingScreenLogic(
      originX + (originScale) * 2,
      aimingScreenY,
      originScale / 256
  )
}

function switchLogic(switchX, switchY, switchSizeMultiplier) {
  switchSize = 6 * switchSizeMultiplier

  //console.log(dist(mouseX, mouseY, switchX, switchY))

  fill ('#4c4f52');
  if(dist(mouseX, mouseY, switchX, switchY) < switchSize * 5) {withinSwitch = true}
  else {withinSwitch = false;}

  if (switchOn) {
    fill ('#ec4300');
  } else {
    fill ('#4c4f52');
  }
  
  rectMode(CENTER);
  rect(switchX, switchY, 9 * switchSize, 16 * switchSize)

}

function cameraLogic(camX, camY, camSizeMultiplier) {
  camSize = 36 * camSizeMultiplier

  fill ('#7aaffa');
  rectMode(CENTER);
  rect(camX, camY, 16 * camSize, 10 * camSize)
}

function aimingScreenLogic(screenX, screenY, screenSizeMultiplier) {
  translateMultiplier = (screenSizeMultiplier * 256)
  screenSize = 52 * screenSizeMultiplier

  // Pulley
  // https://editor.p5js.org/rjgilmour/sketches/F8RUWBXIW

  if (isPulling) {
    screenY = mouseY - translateMultiplier * 1.2;
    if (screenY > gameOriginY + (gameWindowScale) * 1.5) {
      isPulling = false;
      aiming = true;
    }
  }

  pulleyPos = createVector(screenX, screenY + translateMultiplier * 1.2)
  pulleyWidth = 4 * screenSize
  pulleyHeight = screenSize

  fill ('#483939');
  rectMode(CENTER);
  rect(
    screenX,
    screenY + translateMultiplier * 0.9,
    0.2 * screenSize, 2 * screenSize)

  if (mouseX < pulleyPos.x + pulleyWidth / 2 && mouseX > pulleyPos.x - pulleyWidth / 2 &&
      mouseY < pulleyPos.y + pulleyHeight / 2 && mouseY > pulleyPos.y - pulleyHeight / 2
    ) {withinAiming = true;} else { withinAiming = false; }

  fill ('#ffffff');
  rectMode(CENTER);
  rect(
    pulleyPos.x,
    pulleyPos.y,
    pulleyWidth, pulleyHeight)
  

  // Main

  fill ('#6e7071');
  rectMode(CENTER);
  rect(screenX, screenY, 16 * screenSize, 9 * screenSize)

  // Aiming screen
  
  aimingScreenSize = screenSize * 2
  aimingScreenWidth = 4 * aimingScreenSize
  aimingScreenHeight = 3 * aimingScreenSize
  
  fill ('#7aaffa');
  rectMode(CENTER);
  rect(
    screenX - translateMultiplier * 0.6,
    screenY,
    aimingScreenWidth, aimingScreenHeight)

  // Colour indicator

  colourScreenSize = screenSize * 0.5
  
  fill ('#393c40');
  rectMode(CENTER);
  rect(
    screenX + translateMultiplier * 0.9,
    screenY - translateMultiplier * 0.5,
    8 * colourScreenSize, 2 * colourScreenSize)

  // Arrow keys
  keySize = 2 * colourScreenSize
  upKeys = createVector(screenX + translateMultiplier * 0.9, screenY - translateMultiplier * 0);
  firingKeys = createVector(screenX + translateMultiplier * 0.9, screenY + translateMultiplier * 0.25);
  downKeys = createVector(screenX + translateMultiplier * 0.9, screenY + translateMultiplier * 0.5);
  leftKeys = createVector(screenX + translateMultiplier * 0.65, screenY + translateMultiplier * 0.25);
  rightKeys = createVector(screenX + translateMultiplier * 1.15, screenY + translateMultiplier * 0.25);

  fill ('#393c40'); rectMode(CENTER);

  square(upKeys.x, upKeys.y, keySize);
  square(firingKeys.x, firingKeys.y, keySize);
  square(downKeys.x, downKeys.y, keySize);
  square(leftKeys.x, leftKeys.y, keySize);
  square(rightKeys.x, rightKeys.y, keySize);

  // Screen Pointer

  pointerSize = screenSize * 1
  
  noFill();
  strokeWeight(pointerSize / 16);
  stroke(255);
  rectMode(CENTER);
  square(
    (screenX - translateMultiplier * 0.6) + pointerOffsetX,
    screenY + pointerOffsetY,
    pointerSize);
  
  strokeWeight(1);
  stroke(0);

}

function mapLogic(mapX, mapY, sizeMultiplier) {
  mapSize = 256 * sizeMultiplier

  fill ('#353835');
  rectMode(CENTER);
  rect(mapX, mapY, mapSize, mapSize)

  fill ('#f3f3f3')
  rectMode(CENTER);
  square(mapX,mapY,mapSize / 1.3);

  rectMode(CORNER);
  let incrementX = 0;
  let incrementY = 0;
  for (let i = 1; i < 65; i++) {
    let squareSize = (mapSize / 1.3) / 8;

    fill ('#1e1d1d');
    if (areaOneMap.includes(i - 1)) {fill ('#ffffff');}
    square(
      mapX - (sizeMultiplier * 256) * 0.385 + incrementX,
      mapY - (sizeMultiplier * 256) * 0.385 + incrementY,
      squareSize);
    
    incrementX += squareSize;

    if (i % 8 === 0) {
      incrementX = 0;
      incrementY += squareSize;
    }
  }

}

function mousePressed() {

  if (aiming) {
    keyDetection();
  }

  if (withinAiming) {
    if (aiming) {
      pointerOffsetX = 0;
      pointerOffsetY = 0;
      pointerIncrementX = 0;
      pointerIncrementY = 0;
      aiming = false; return}

    if (isPulling) {isPulling = false}
    else {isPulling = true}
  }

  if (!aiming) {
      if (withinSwitch) {
      if (switchOn) {switchOn = false}
      else {switchOn = true}
    }

    if (withinCircle) {mouseHold = (angle < 190 & angle > 170);}
    if (circleCollide) {mouseInitialPos = mouseY;}
  }
}

function mouseReleased() {
  rotationCancelled();
  if (circlePressed) {circlePressed = false;}
}

function keyDetection() {
  if(dist(mouseX, mouseY, upKeys.x, upKeys.y) < keySize / 2) {screenPointerChange("up")}
  if(dist(mouseX, mouseY, firingKeys.x, firingKeys.y) < keySize / 2) {screenPointerChange("fire")}
  if(dist(mouseX, mouseY, downKeys.x, downKeys.y) < keySize / 2) {screenPointerChange("down")}
  if(dist(mouseX, mouseY, leftKeys.x, leftKeys.y) < keySize / 2) {screenPointerChange("left")}
  if(dist(mouseX, mouseY, rightKeys.x, rightKeys.y) < keySize / 2) {screenPointerChange("right")}
}

function screenPointerChange(direction) {
  if ( match(direction, 'up') ) {
    if (pointerIncrementY < 18) {
      pointerIncrementY += 1
      pointerOffsetY -= pointerSize / 8
    }
  }

  if ( match(direction, 'fire') ) {
    console.log("fire!")
  }

  if ( match(direction, 'down') ) {
    if (pointerIncrementY > -18) {
      pointerIncrementY -= 1
      pointerOffsetY += pointerSize / 8
    }
  }

  if ( match(direction, 'left') ) {
    if (pointerIncrementX > - 26) {
      pointerIncrementX -= 1
      pointerOffsetX -= pointerSize / 8
    }
  }

  if ( match(direction, 'right') ) {
    if (pointerIncrementX < 26) {
      pointerIncrementX += 1
      pointerOffsetX += pointerSize / 8
    }
  }

}

function crankLogic(crankX, crankY, crankSize) {
  circleOrigin.x = crankX; circleOrigin.y = crankY; circleSize = 25 * crankSize;

  if (!crankRendered) {
    circleThreshold = circleSize * 8; circleCancel = circleSize * 1.5; crankRendered = true;
  }

  // DEBUGGING
  fill(240); circle(circleOrigin.x, circleOrigin.y, circleThreshold);
  fill(200); circle(circleOrigin.x, circleOrigin.y, circleCancel);

  //fill('#00ff51'); textSize(25); text(userLocation, 50, 50); text(angleThresholds[userLocation + 1], 50, 100); text(angle, 50, 150); text( ("number of rotations: "+successfulRotations) , 50, 200);

  // Draw
    fill(configurableColor); circle(circleOrigin.x, circleOrigin.y, circleSize);

  // Check if within the circle
  if (
    dist(mouseX, mouseY, circleOrigin.x, circleOrigin.y) < circleThreshold / 2
    &
    dist(mouseX, mouseY, circleOrigin.x, circleOrigin.y) > circleCancel / 2
  ) {
    withinCircle = true;
  } else {
    withinCircle = false; rotationCancelled(); configurableColor = '#fcfeff';
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
    circleThreshold = circleSize * 16;
    configurableColor = '#4db0ee';
    //text("Holding...", 50, 600);

    //Angle Checking
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
}

function rotationCancelled() {
  circleThreshold = circleSize * 8;
  successfulRotations = 0;
  mouseHold = false;
  userLocation = -1;
}

function leverLogic(x, y, scale) {
  leverScale = scale

  fill('rgb(131, 129, 122)');
  rectMode(CENTER);
  rect(x, y, 100 * scale, 200 * scale);

  fill('rgb(48, 45, 48)');
  rect(x, y, 30 * scale, 150 * scale);

  let r = (100 / 1.25) * scale
  // Initialising Variables
  circlePressed = false;
  circleCollide = false;
  circleX = x;
  circleY = y - (leverOffset);

  // Detecting collision with mouse
  if(dist(mouseX, mouseY, circleX, circleY) < r / 2) {
    circleCollide = true;
    fill('rgb(224, 72, 52)');

    // Holding function
    if (mouseIsPressed) {
      let leverBoundaryDown = 100 * leverScale
      let leverBoundaryUp = -100 * leverScale

      fill('rgb(255, 0, 0)');

      //console.log(leverOffset);
      leverOffset += mouseInitialPos - mouseY;
      if (leverOffset >= leverBoundaryDown) leverOffset = leverBoundaryDown;
      if (leverOffset <= leverBoundaryUp) leverOffset = leverBoundaryUp;
      mouseInitialPos = mouseY;

      circlePressed = true;
    }
    
  } else {
    let driftAmount = 2 * leverScale

    circleCollide = false;
    if (leverOffset < 0) {leverOffset += driftAmount;}
    if (leverOffset > 0) {leverOffset -= driftAmount;}
    fill('rgb(255, 206, 60)');
  }

  // Drawing the circle
  circle(circleX, circleY, r);

}