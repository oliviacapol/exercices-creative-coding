let angle = 0;
let angle1 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  bigCircle();
  littleCircle();
  lines();
}

function bigCircle() {
  let radius = width / 2;
  let pointCount = 20;

  for (let i = angle; i < TWO_PI; i += TWO_PI / pointCount) {
    let x = (radius / 2) * cos(i);
    let y = (radius / 2) * sin(i);

    stroke(255);
    point(x, y);
  }
}

function littleCircle() {
  let radius1 = width / 3;
  let pointCount1 = 5;

  for (let j = angle1; j < TWO_PI; j += TWO_PI / pointCount1) {
    let x1 = (radius1 / 2) * cos(j);
    let y1 = (radius1 / 2) * sin(j);

    stroke(255);
    point(x1, y1);

    angle1 += 0.003;
  }
}

function lines() {
  let radius1 = width / 3;
  let pointCount1 = 5;

  let radius = width / 2;
  let pointCount = 20;

  for (let i = angle; i < TWO_PI + angle; i += TWO_PI / pointCount) {
    for (let j = angle1; j < TWO_PI + angle1; j += TWO_PI / pointCount1) {
      let x = (radius / 2) * cos(i);
      let y = (radius / 2) * sin(i);

      let x1 = (radius1 / 2) * cos(j);
      let y1 = (radius1 / 2) * sin(j);

      strokeWeight(1);
      stroke(255);
      line(x, y, x1, y1);
    }
  }
}
