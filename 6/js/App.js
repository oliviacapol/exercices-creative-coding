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
    this.img_file = "./asset/division.jpeg";
    this.ctx.strokeStyle = "white";
    this.setup();
  }

  setup() {
    this.grid = [];

    this.totalLines = 50;
    this.subdivisions = 50;
    const grid_width = 20 * 50;

    const top_left = {
      x: (window.innerWidth / 2) * this.pixelRatio - grid_width / 2,
      y: (window.innerHeight / 2) * this.pixelRatio - grid_width / 2,
    };
    for (let j = 0; j < this.totalLines; j++) {
      for (let i = 0; i < this.subdivisions; i++) {
        this.grid.push(
          new Circle(top_left.x + i * 20, top_left.y + j * 20, 0, this.ctx)
        );
      }
    }

    this.img = new Image();
    this.img.onload = () => {
      this.detectPixels();
    };
    this.img.src = this.img_file;
  }

  detectPixels() {
    this.ctx.drawImage(this.img, 0, 0);
    this.imgData = this.ctx.getImageData(0, 0, this.img.width, this.img.height);
    this.pixels = this.imgData.data;
    this.step = Math.floor(this.img.width / 50);
    this.rgb = [];
    for (let i = 0; i < this.img.height; i += this.step) {
      for (let j = 0; j < this.img.width; j += this.step) {
        let index = (i * this.img.width + j) * 4;
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          b: this.pixels[index + 2],
          a: this.pixels[index + 3],
        });
      }
    }

    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.grid.forEach((circle, index) => {
      const color = this.rgb[index];
      circle.color = `rgb(${color.r}, ${color.g}, ${color.b})`;
      circle.draw();
    });

    for (let i = 0; i < this.totalLines; i++) {
      this.ctx.beginPath();
      for (let j = 0; j < this.subdivisions - 1; j++) {
        const index = i * this.subdivisions + j;
        if (j == 0) {
          this.ctx.moveTo(this.grid[index].x, this.grid[index].y);
        }

        this.ctx.lineTo(this.grid[index + 1].x, this.grid[index + 1].y);
      }

      this.ctx.stroke();
      this.ctx.closePath();
    }

    this.run++;

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
