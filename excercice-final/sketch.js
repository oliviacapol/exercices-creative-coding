// variables globales
let video;
// taille de chaques tiles
let tileSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // loader la video, dire sa taille, la looper
  video = createVideo("assets/hypno.mp4");
  video.size(width / tileSize, height / tileSize);
  video.loop();
  // cacher la video de base
  video.hide();
}

function draw() {
  // condition pour faire varier la couleur de fond
  if (mousePressed === true) {
    background("white");
    noStroke();
    fill("black");
  } else {
    background(0);
    noStroke();
    fill("white");
  }

  // pour que ce soit centré
  translate(tileSize / 2, tileSize / 2);

  // load les data de chaques pixels de la video
  video.loadPixels();

  // double boucle
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      // divise en quelque sorte l'info de chaque pixel comme un tableau dans un tableau
      let index = (j * video.width + i) * 4;

      let posX = tileSize * i;
      let posY = tileSize * j;

      // atan2 calcul l'angle entre la souris et la position de chaques tiles
      let angle = atan2(mouseY - posY, mouseX - posX);
      // let doubleRotation = 0;

      // doubleRotation += 1;

      // data des pixels
      let r = video.pixels[index];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let a = video.pixels[index + 3];
      let brightness = (r + g + b + a) / 4;

      // variable qui va modifier la taille de chaque rectangle en fonction de la luminosité de chaques pixels
      // on map la luminosité pour la "transcrire" en taille par rapport à la tileSize
      let radius = map(brightness, 0, 255, 0, tileSize);

      // le push et le pop sont nécessaire pour que les transformations se fassent sur chaque tile de manière individuelle
      push();

      translate(posX, posY);

      rotate(angle);
      rotate(mouseX * 0.001);
      // rotate(doubleRotation);

      // élément qui sera dessiné à chaque tile
      rect(0, 0, radius * 3, 5);

      pop();

      // doubleRotation++;
    }
  }
}

// function nécessaire car on ne peut pas lancer une video sans une action de l'utilisateur
function mousePressed() {
  video.play();
}
