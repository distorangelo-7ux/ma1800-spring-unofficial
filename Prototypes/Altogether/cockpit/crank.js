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