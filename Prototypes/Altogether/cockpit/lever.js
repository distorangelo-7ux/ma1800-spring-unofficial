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