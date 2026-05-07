function cameraLogic(camX, camY, camSizeMultiplier) {
  camSize = 36 * camSizeMultiplier

  fill ('#7aaffa');
  rectMode(CENTER);
  rect(camX, camY, 16 * camSize, 10 * camSize)
}