let circleOrigin = createVector(windowWidth / 2, windowHeight / 2);
let mouseVector = createVector(0, 0);
let angle;

function setup() {
  frameRate(5);
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  //background(220);
  circle(circleOrigin.x, circleOrigin.y, 75);

  mouseVector.set(mouseX, mouseY);

  let v0 = p5.Vector.sub(mouseVector, circleOrigin);
  let referenceVector = createVector( circleOrigin.x + 50, circleOrigin.y );
  let v1 = p5.Vector.sub(referenceVector, circleOrigin);

  let stringMouse = (v0.x + ", "+ v0.y);
  let stringRef = (v1.x + ", " + v1.y);
  angle = round(v0.angleBetween(v1), 2 );

  console.log(angle);
}

function mousePressed() {
  fill(200);
  textSize(25);
  text(angle, mouseVector.x, mouseVector.y);
}