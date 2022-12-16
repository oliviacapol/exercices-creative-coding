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

  initWebcam() {
    this.video = document.createElement("video");

    navigator.getMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      {
        video: { width: 640, height: 480 },
        audio: false,
      },
      (stream) => {
        this.video.srcObject = stream;
        this.video.play();
      },
      (err) => {
        console.log("An error occured! " + err);
      }
    );
  }

  setup() {
    this.initWebcam();

    this.grid = [];
    this.scale = 4;
    let numberCircle = 80;

    //quel espace entre chaque cercle si on en veut 50 sur la largeur et la hauteur
    this.stepX = Math.floor(640 / numberCircle);
    this.stepY = Math.floor(480 / numberCircle);

    // pour que la grille soit centrée
    this.offsetX =
      (window.innerWidth / 2) * this.pixelRatio -
      (this.stepX * numberCircle * this.scale) / 2;
    this.offsetY =
      (window.innerHeight / 2) * this.pixelRatio -
      (this.stepY * numberCircle * this.scale) / 2;

    //creation de la grille
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        this.grid.push(
          new Letter(
            this.offsetX + i * this.scale,
            this.offsetY + j * this.scale,
            20,
            this.ctx
          )
        );

        // this.sequence = "0,1".split("");
        this.sequence = "01";
      }
    }

    this.draw();
  }

  // fonction pour détecter les pixels - super important
  detectPixels() {
    console.log("detectPixels");

    // si ya la webcam, tu affiche la webcam
    if (this.video) {
      this.ctx.drawImage(this.video, 0, 0, 640, 480);
    }
    // get image data from canvas
    this.imgData = this.ctx.getImageData(0, 0, 640, 480);
    // get pixel data
    this.pixels = this.imgData.data;

    // get rgb data for each step pixel in 100 x 100
    this.rgb = [];
    for (let j = 0; j < 480; j += this.stepY) {
      for (let i = 0; i < 640; i += this.stepX) {
        // le truc mega important pour passer d'une liste 1d à un tableau en 2d divisé en 4 parties
        let index = (j * 640 + i) * 4;
        this.rgb.push({
          r: this.pixels[index],
          g: this.pixels[index + 1],
          b: this.pixels[index + 2],
          a: this.pixels[index + 3],
        });
      }
    }
  }

  draw() {
    this.detectPixels();
    // pour que la webcam ne soit pas affichée en haut
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //draw all letter of the grid
    this.grid.forEach((letter, index) => {
      const color = this.rgb[index];
      letter.color = `rgba(0,${color.g},0,0.5)`;
      const unique_letter = this.sequence[Math.floor(Math.random() * 2)];
      // const unique_letter = this.sequence.shift();
      letter.letter = unique_letter;
      letter.draw();
    });

    requestAnimationFrame(this.draw.bind(this));
  }
}

window.onload = function () {
  new App();
};
