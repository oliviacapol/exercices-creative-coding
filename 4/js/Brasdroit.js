// class Brasdroit {
//   constructor(x, y, radius, ctx) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.ctx = ctx;
//   }

//   draw(x, y, r) {
//     // calculate the angle between the eye and the mouse
//     const angle = Math.atan2(y - this.y, x - this.x);

//     // calculate the position of the pupil
//     const pupilX = this.x + Math.cos(angle) * this.radius * 0.5;
//     const pupilY = this.y + Math.sin(angle) * this.radius * 0.5;

//     this.ctx.save();
//     this.ctx.translate(pupilX, pupilY);
//     this.ctx.fillStyle = "black";

//     this.ctx.rotate(r);
//     this.ctx.beginPath();
//     this.ctx.ellipse(
//       280,
//       190,
//       this.radius * 0.7,
//       this.radius * 1.1,
//       30,
//       0,
//       2 * Math.PI
//     );
//     this.ctx.fill();
//     this.ctx.closePath();

//     this.ctx.closePath();
//     this.ctx.restore();
//   }
// }
