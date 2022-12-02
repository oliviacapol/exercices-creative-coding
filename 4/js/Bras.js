class Bras {
  constructor(x, y, radius, rotation, ctx) {
    this.position = { x: x, y: y };
    this.radius = radius;

    // l'angle de rotation en gros
    this.rotation = { rotation: rotation };
    // l'angle de rotation à atteindre quand tu cliques a quelque par sur le canvas
    this.target = { rotation: rotation };
    // l'angle une fois que t'as cliqué mais qui sera du coup l'agle de depart pour la prochaine action
    this.origin = { rotation: this.target.rotation };

    this.ctx = ctx;

    this.speed = 0.001;
    this.t = 0;
  }

  draw() {
    // si la valeur absolue entre la roation de base et la target est pus grande blaba faire l'action et sinon échanger les roles
    if (Math.abs(this.rotation, this.target) > 0.01) this.tourne();
    else this.rotation = this.target;

    // le dessin
    this.ctx.save();
    this.ctx.translate(this.position.x, this.position.y);
    this.ctx.fillStyle = "black";
    this.ctx.beginPath();
    this.ctx.ellipse(
      -280,
      190,
      this.radius * 0.7,
      this.radius * 1.1,
      this.rotation,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.ellipse(
      300,
      190,
      this.radius * 0.7,
      this.radius * 1.1,
      -this.rotation,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  resetAndGo() {
    // le temps de base
    this.t = 0;
    // le radius d'origine est egal à celui de la target
    this.origin = this.rotation;

    // si la rotation de base est de ...
    if (this.rotation >= Math.PI / 4) {
      this.target = Math.PI / 4 + Math.PI / 4;
    } else {
      this.target = Math.PI / 4;
    }
  }

  tourne() {
    // console.log(this.t);
    this.t += this.speed;
    const ease = Easing.elasticOut(this.t);
    console.log(this.rotation);

    this.rotation =
      this.rotation + (this.target - this.origin) * ease * (Math.PI / 180);
  }

  distance(target, goal) {
    return Math.sqrt(
      Math.pow(target.x - goal.x, 2) + Math.pow(target.y - goal.y, 2)
    );
  }
}
