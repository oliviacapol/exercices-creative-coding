class Circle {
  constructor(x, y, radius, ctx) {
    this.position = { x: x, y: y };
    this.target = {
      x: x,
      y: y,
    };
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };

    this.radius = radius;
    this.ctx = ctx;
    this.speed = 0.01;
    this.t = 0;
  }

  draw() {
    //check si on est arrivé à destination
    if (this.distance(this.position, this.target) > 0.001) this.move();

    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);

    // les bras
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.ellipse(-280, 190, 70, 110, -30, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.ellipse(280, 190, 70, 110, 30, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // l'ellipse de base
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, 350, 200, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // // // les cheveux
    this.ctx.beginPath();
    this.ctx.ellipse(0, -200, 40, 60, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.ellipse(-80, -200, 40, 60, -20, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.ellipse(80, -200, 40, 60, 20, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // le corps
    this.ctx.beginPath();
    this.ctx.ellipse(0, 250, 350, 200, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // les pattes
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.ellipse(-150, 420, 80, 50, 0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.ellipse(150, 420, 80, 50, 0, 0, 2 * Math.PI);
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

  /**
   *
   *  remettre le compteur t à zero
   *  réinitialiser la position du point de départ
   *  assigner la nouvelle position de destination
   */
  resetAndGo(x, y) {
    this.t = 0;
    this.origin = {
      x: this.target.x,
      y: this.target.y,
    };
    this.target = {
      x,
      y,
    };
  }

  /**
   * function de calcul de l'animation
   */
  move() {
    this.t += this.speed;
    const ease = Easing.elasticOut(this.t);

    this.position.x = this.origin.x + (this.target.x - this.origin.x) * ease;
    this.position.y = this.origin.y + (this.target.y - this.origin.y) * ease;
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
