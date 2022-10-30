class Tile {
  constructor(x, y, size, color, ctx) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotation = false;
    this.angle = Math.round(Math.random()) * (Math.PI / 2);
    this.ctx = ctx;
    this.bgColor = color;
    this.color = this.bgColor === "white" ? "black" : "white";
  }

  updateAngle() {
    this.angle += Math.PI / 2;
  }

  draw() {
    let radius = this.size / 4;
    let gap = this.size / 8;

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.angle);

    // le carré de base
    this.ctx.fillStyle = this.bgColor;
    this.ctx.beginPath();
    this.ctx.rect(0 - this.size / 2, 0 - this.size / 2, this.size, this.size);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // les formes en arrière plan
    // 1 (à droite)
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.rect(
      0 + this.size / 2 - radius - gap / 2,
      0 - this.size / 2,
      gap,
      this.size / 2
    );
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // 2 (en bas)
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.rect(
      0 - this.size / 2,
      0 + this.size / 2 - radius - gap / 2,
      this.size / 2,
      gap
    );
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // les arcs dans les coins
    // en haut à gauche
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = gap;
    this.ctx.beginPath();
    this.ctx.arc(0 - this.size / 2, 0 - this.size / 2, radius, 0, Math.PI / 2);
    this.ctx.stroke();
    this.ctx.closePath();

    // en haut à droite
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = gap;
    this.ctx.beginPath();
    this.ctx.arc(
      0 + this.size / 2,
      0 - this.size / 2,
      radius,
      Math.PI / 2,
      Math.PI
    );
    this.ctx.stroke();
    this.ctx.closePath();

    // en bas à gauche
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = gap;
    this.ctx.beginPath();
    this.ctx.arc(
      0 - this.size / 2,
      0 + this.size / 2,
      radius,
      Math.PI * 1.5,
      0
    );
    this.ctx.stroke();
    this.ctx.closePath();

    // les arcs sur les côtés
    // à droite
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = gap;
    this.ctx.beginPath();
    this.ctx.arc(0 + this.size / 2, 0, radius, Math.PI / 2, Math.PI * 1.5);
    this.ctx.stroke();
    this.ctx.closePath();

    // en bas
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = gap;
    this.ctx.beginPath();
    this.ctx.arc(0, 0 + this.size / 2, radius, Math.PI, 0);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.restore();
  }
}
