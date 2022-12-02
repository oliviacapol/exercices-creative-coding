class Circle {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    this.radius = radius;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);

    // // les bras
    // this.ctx.fillStyle = "black";
    // this.ctx.beginPath();
    // this.ctx.ellipse(-280, 190, 70, 110, -30, 0, 2 * Math.PI);
    // this.ctx.fill();
    // this.ctx.closePath();

    // this.ctx.beginPath();
    // this.ctx.ellipse(280, 190, 70, 110, 30, 0, 2 * Math.PI);
    // this.ctx.fill();
    // this.ctx.closePath();

    // l'ellipse de base
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, 350, 200, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // le corps
    this.ctx.beginPath();
    this.ctx.ellipse(0, 250, 350, 200, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // la tige de la fleur
    this.ctx.strokeStyle = "green";
    this.ctx.lineWidth = 10;
    this.ctx.beginPath();
    // void ctx.arc(x, y, rayon, angleDépart, angleFin, sensAntiHoraire);
    this.ctx.arc(-280 + 500, 0, 600, Math.PI * 0.9, Math.PI * 1.4);
    this.ctx.stroke();
    this.ctx.closePath();

    // la bouche de base
    this.ctx.fillStyle = "red";
    this.ctx.beginPath();
    this.ctx.ellipse(0, 20, 10, 6, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }
}
