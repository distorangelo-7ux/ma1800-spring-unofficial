let loaderPos;
let loaderRadius = 100;

let ammunitionLoaded = 0;
let withinLoader = false;

function setup() {
  loaderPos = createVector(100,300);

  AmmoObject = new Ammunition(600, 700, 50)
  BlueAmmoObject = new Ammunition(400, 700, 25)

  frameRate(60);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  fill(255);
  textSize(25);
  text( ("AMMO: "+ammunitionLoaded) , 50, 200);

  fill('#312b2b');
  circle(loaderPos.x, loaderPos.y, loaderRadius);

  withinLoader = (dist(mouseX, mouseY, loaderPos.x, loaderPos.y) < loaderRadius / 2);

  AmmoObject.ammoLoop();
  BlueAmmoObject.ammoLoop();

}

function mousePressed() {
  AmmoObject.ammoGrab();
  BlueAmmoObject.ammoGrab();
}

function mouseReleased() {
  if (AmmoObject.releaseAmmo(withinLoader) || BlueAmmoObject.releaseAmmo(withinLoader)) {
    ammunitionLoaded++;
  }
}