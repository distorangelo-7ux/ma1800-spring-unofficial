function drawCannon(originX, originY, originScale) {
  rightPanel(originX + (originScale) * 3.8, originY + (originScale) * 1.5, originScale / 256);
  loadingChamber(originX + (originScale) * 1.25, originY + (originScale) * 1, originScale / 256);

  if (ammoEjected) {
    loadingDoor(originX + (originScale) * 1.5, originY + (originScale) * 1, originScale / 256);
    loadingFrame(originX + (originScale) * 1.3, originY + (originScale) * 1, originScale / 256);
    ejectButton(originX + (originScale) * 1.72, originY + (originScale) * 0.9, originScale / 256);
  }

  shelves(originX + (originScale) * 3, originY + (originScale) * 1.6, originScale / 256);

  if (!ammoEjected) {
    loadingDoor(originX + (originScale) * 1.5, originY + (originScale) * 1, originScale / 256);
    loadingFrame(originX + (originScale) * 1.3, originY + (originScale) * 1, originScale / 256);
    ejectButton(originX + (originScale) * 1.72, originY + (originScale) * 0.9, originScale / 256);
  }
}

function shelves(shelfX, shelfY, shelfSizeMultiplier) {
  translateMultiplier = (shelfSizeMultiplier * 256);
  shelfSize = 12 * shelfSizeMultiplier;
  shelfWidth = 12 * shelfSize;
  shelfHeight = 4 * shelfSize;

  greenY = shelfY + (translateMultiplier) * 0.5
  blueY = shelfY + (translateMultiplier) * 1

  redAmmo.reinitialise(shelfX, shelfY, (shelfSize) * 8);
  greenAmmo.reinitialise(shelfX, greenY, (shelfSize) * 8);
  blueAmmo.reinitialise(shelfX, blueY, (shelfSize) * 8);

  redAmmo.ammoLoop();
  greenAmmo.ammoLoop();
  blueAmmo.ammoLoop();
  
  redAmmo.withinAmmo = (dist(mouseX, mouseY, redAmmo.ammoPos.x, redAmmo.ammoPos.y) < redAmmo.ammoRadius / 2);
  greenAmmo.withinAmmo = (dist(mouseX, mouseY, greenAmmo.ammoPos.x, greenAmmo.ammoPos.y) < greenAmmo.ammoRadius / 2);
  blueAmmo.withinAmmo = (dist(mouseX, mouseY, blueAmmo.ammoPos.x, blueAmmo.ammoPos.y) < blueAmmo.ammoRadius / 2);

  //console.log(redAmmo.ammoInitial.x)

  fill('#595959');
  rect(shelfX, shelfY, shelfWidth, shelfHeight);
  rect(shelfX, greenY, shelfWidth, shelfHeight);
  rect(shelfX, blueY, shelfWidth, shelfHeight);
}

function loadingChamber(chamberX, chamberY, chamberSizeMultiplier) {
  chamberSize = 128 * chamberSizeMultiplier;

  withinLoader = (dist(mouseX, mouseY, chamberX, chamberY) < chamberSize / 2);
  //console.log(withinLoader)

  fill ('#1c1b1f');
  circle(chamberX, chamberY, chamberSize);
}

function loadingDoor(doorX, doorY, doorSizeMultiplier) {
  translateMultiplier = (doorSizeMultiplier * 256);
  doorSize = 16 * doorSizeMultiplier;
  doorWidth = 16 * doorSize;
  doorHeight = 10 * doorSize;

  fill('#d2d0d0'); rectMode(CENTER);
  if (ammoEjected) {
    rect(doorX + (translateMultiplier) * 0.5, doorY, doorWidth, doorHeight);
  } else {
    rect(doorX, doorY, doorWidth, doorHeight);
  }
}

function loadingFrame(frameX, frameY, frameSizeMultiplier) {
  translateMultiplier = (frameSizeMultiplier * 256);

  frameSize = 24 * frameSizeMultiplier;
  frameWidth = 12 * frameSize;
  frameHeight = 6.7 * frameSize;

  fill('#7e7e7b'); rectMode(CENTER);
  rect(frameX + (translateMultiplier) * 0.42, frameY, frameWidth / 4, frameHeight);

  fill('#52504c');
  rect(frameX, frameY - (translateMultiplier) * 0.44, frameWidth, frameHeight / 2.5);
  rect(frameX, frameY + (translateMultiplier) * 0.44, frameWidth, frameHeight / 2.5);
}

function ejectButton(ejectX, ejectY, ejectSize) {
  ejectSize = 48 * ejectSize;
  ejectButtonChecker = new RectangularPanel(ejectX, ejectY, ejectSize, ejectSize);
  withinEject = (ejectButtonChecker.collisionCheck(mouseX, mouseY))

  fill('#f42525'); rectMode(CENTER);
  square(ejectX, ejectY, ejectSize);
}


function rightPanel(panelX, panelY, panelSizeMultiplier) {
  panelSize = 6 * panelSizeMultiplier;
  panelWidth = 9 * panelSize;
  panelHeight = 96 * panelSize;

  //console.log(dist(mouseX, mouseY, switchX, switchY))
  rightPanelChecker = new RectangularPanel(panelX, panelY, panelWidth, panelHeight);
  withinCockpit = (rightPanelChecker.collisionCheck(mouseX, mouseY))

  fill ('#ffffff59');
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight)

}
