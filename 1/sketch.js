var bigCircles = [];
let x;
let y;
let d;
let c;

let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(RGB);

  let y = height / 2;
  let c;

  let dim = height / 2;
  let radius = dim / 2;
  let h = 0;

  translate(width / 2, height / 2);

  if (height < width) {
    d = height - 130;
  } else {
    d = width - 130;
  }

  for (let i = 0; i < 22; i++) {
    if (i % 2 == 0) {
      c = color(228, 51, 57);
    }
    // else {
    //   for (let r = dim / 2; r > 0; --r) {
    //     fill(h, 0, 255);
    //     ellipse(x, y, r, r);
    //     h = (h + 1) % 360;
    //   }
    // }
    else {
      c = color(21, 83, 158);
      // drawGradient(dim, height / 2);
    }

    if (i == 22) {
      c = color(43, 21, 24);
      x = 0;
      y = 10;
    }

    if (i == 20) {
      c = color(62, 17, 20);
    }

    if (i == 18) {
      c = color(94, 21, 28);
    }

    if (i == 16) {
      c = color(168, 16, 37);
    }

    if (i == 14) {
      c = color(215, 23, 38);
    }

    if (i == 12) {
      x = 0;
      y -= 9;
      d = d - d / 5;
    }

    if (i < 12) {
      x = 0;
      y += 10;
      d = d - d / 18;
    } else if (i > 12) {
      x = 0;
      y -= 5;
      d = d - d / 4.5;
    }

    bigCircles[i] = new DrawCircle(x, y, d, c);
  }
}

function draw() {
  background(0);

  angle += 0.02;
  translate(width / 2, height / 2);
  scale(0.5);
  rotate(angle);

  for (let i = 0; i < bigCircles.length; i++) {
    bigCircles[i].display();
  }
}

function DrawCircle(x, y, d, c) {
  this.xPos = x;
  this.yPos = y;
  this.diameter = d;
  this.color = c;
}

DrawCircle.prototype = {
  constructor: DrawCircle,

  display: function () {
    fill(this.color);
    ellipse(this.xPos, this.yPos, this.diameter);
  },
};

// function drawGradient(x, y) {
//   let radius = dim / 2;
//   let h = 0;
//   for (let r = dim/2; r > 0; --r) {
//     fill(h, 0, 255);
//     ellipse(x, y, r, r);
//     h = (h + 1) % 360;
//   }
// }
