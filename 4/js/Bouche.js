class Bouche {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    this.originRadius = radius;
    this.targetRadius = radius;
    this.hue = Math.round(Math.random() * 360);
    this.originHue = this.hue;
    this.targetHue = this.hue;
    this.radius = radius;
    this.ctx = ctx;
    this.speed = 0.01;
    this.t = 0;
  }

  draw(x, y) {
    if (Math.abs(this.targetRadius - this.radius) > 0.01) this.scale();
    else this.radius = this.targetRadius;

    this.ctx.fillStyle = "red";

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);

    this.ctx.beginPath();
    this.ctx.ellipse(0, 20, this.radius, this.radius * 0.6, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }

  resetAndGo() {
    this.t = 0;
    this.originRadius = this.radius;
    if (this.radius == 20) {
      this.targetRadius = 30 + 70;
    } else {
      this.targetRadius = 20;
    }
    this.originHue = this.hue;
    this.targetHue = this.hue + 50;
  }

  scale() {
    this.t += this.speed;
    const ease = Easing.bounceOut(this.t);

    this.radius = Math.abs(
      this.originRadius + (this.targetRadius - this.originRadius) * ease
    );
    this.hue = this.originHue + (this.targetHue - this.originHue) * ease;
  }

  /**
   * calcul de la distance entre deux points
   */
  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
