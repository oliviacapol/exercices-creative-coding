class Letter {
  constructor(x, y, fontSize, ctx) {
    this.x = x;
    this.y = y;
    this.radius = fontSize;
    this.ctx = ctx;
    this.color = "green";
    this.replacement_color = "green";
    this.letter = "01";
  }

  draw() {
    const luminosity_percentage = this.detectLuminance();

    if (luminosity_percentage > 0.19) {
      this.ctx.fillStyle = this.replacement_color;
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      this.ctx.font = `${
        this.radius * luminosity_percentage * 2.5
      }px sans-serif`;
      this.ctx.fillText(this.letter, 0, 0);

      this.ctx.restore();
    }

    if (luminosity_percentage > 0.7) {
      this.action();
    }

    if (luminosity_percentage > 0.3 && luminosity_percentage < 0.5) {
      this.actionmedium();
    }

    if (luminosity_percentage < 0.3 && luminosity_percentage > 0.1) {
      this.actionsombre();
    }
  }

  detectLuminance() {
    const rgb = this.color.replace(/[^\d,]/g, "").split(",");
    const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    return luminance / 255;
  }

  action() {
    const luminosity_percentage = this.detectLuminance();

    const gradient = this.ctx.createLinearGradient(20, 0, 220, 0);

    gradient.addColorStop(0, "blue");
    gradient.addColorStop(0.3, "red");
    gradient.addColorStop(1, "blue");

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(
      0,
      0,
      luminosity_percentage * 100,
      luminosity_percentage * 100
    );
    this.ctx.restore();
  }

  actionmedium() {
    const luminosity_percentage = this.detectLuminance();

    this.ctx.fillStyle = "#00E120";
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.font = `${this.radius * luminosity_percentage * 4}px sans-serif`;
    this.ctx.fillText(this.letter, 0, 0);
    this.ctx.restore();
  }

  actionsombre() {
    const luminosity_percentage = this.detectLuminance();

    this.ctx.fillStyle = "black";
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.font = `${this.radius * luminosity_percentage * 2.5}px sans-serif`;
    this.ctx.fillText(this.letter, 0, 0);
    this.ctx.closePath();

    this.ctx.restore();
  }
}
