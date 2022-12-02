class App {
  constructor() {
    this.pixelRatio = window.devicePixelRatio || 1;
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth * this.pixelRatio;
    this.canvas.height = window.innerHeight * this.pixelRatio;
    this.canvas.style.width = window.innerWidth;
    this.canvas.style.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.setup();
  }

  setup() {
    this.mouse = { x: 0, y: 0 };
    const center = {
      x: (window.innerWidth / 2) * this.pixelRatio,
      y: (window.innerHeight / 2) * this.pixelRatio,
    };

    this.pieds = new Pieds(center.x, center.y - 0, 80, this.ctx);
    this.cheveux = new Cheveux(center.x, center.y - 0, 70, this.ctx);
    this.circle = new Circle(center.x, center.y, 0, this.ctx);
    // this.brasdroit = new Brasdroit(center.x + 50, center.y + 50, 100, this.ctx);
    this.brasgauche = new Bras(center.x, center.y, 100, Math.PI / 4, this.ctx);

    this.eyeone = new Eye(center.x - 200, center.y, 100, this.ctx);
    this.eyetwo = new Eye(center.x + 200, center.y, 100, this.ctx);
    this.bouche = new Bouche(center.x, center.y, 20, this.ctx);
    this.fleur = new Fleur(center.x, center.y, 40, this.ctx);

    document.addEventListener("mousemove", this.move.bind(this));
    document.addEventListener("click", this.click.bind(this));

    this.draw();
  }

  click(e) {
    this.pieds.resetAndGo();
    this.cheveux.resetAndGo();
    this.bouche.resetAndGo();
    this.fleur.resetAndGo();
    this.brasgauche.resetAndGo();
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.pieds.draw();
    this.cheveux.draw();
    this.circle.draw();
    // this.brasdroit.draw(0, 0, -this.mouse.x / 2000);
    this.brasgauche.draw();
    // this.brasdroite.draw();
    this.eyeone.draw(this.mouse.x, this.mouse.y);
    this.eyetwo.draw(this.mouse.x, this.mouse.y);
    this.bouche.draw();
    this.fleur.draw();

    requestAnimationFrame(this.draw.bind(this));
  }

  move(e) {
    this.mouse = {
      x: e.clientX * this.pixelRatio,
      y: e.clientY * this.pixelRatio,
    };
  }

  dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
}

window.onload = function () {
  new App();
};
