function drawCockpit(originX, originY, originScale) {
  switchLogic(originX + (originScale) * 0.6, originY + (originScale) * 2.05, originScale / 256);
  leftPanel(originX + (originScale) * 0.2, originY + (originScale) * 1.5, originScale / 256)

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

function leftPanel(panelX, panelY, panelSizeMultiplier) {
  panelSize = 6 * panelSizeMultiplier;
  panelWidth = 9 * panelSize;
  panelHeight = 96 * panelSize;

  //console.log(dist(mouseX, mouseY, switchX, switchY))
  leftPanelChecker = new RectangularPanel(panelX, panelY, panelWidth, panelHeight);
  withinCannon = (leftPanelChecker.collisionCheck(mouseX, mouseY))

  fill ('#ffffff59');
  rectMode(CENTER);
  rect(panelX, panelY, panelWidth, panelHeight)

}
