window.onload = main;

let canvas;
let ctx;

let monstre = {
  x: 100,
  y: 100,
  l: 200,
  h: 200,
  angle: 0,
  vitesseX: 1,
  vitesseY: 2 ,
  centerX: 757.2,
  centerY: 310,
  radius:75,

  //POur une méthode : "() =>" plutot que "function()"
    //ou pas en fait, pk ?

  donneTonNom: function () {
    return "Je m'appelle Polo, je suis en x= " + this.x + " y=" + this.y;
  },

  draw: function (ctx) {
    // bonne pratique : sauver le contexte courant
    // couleur courante, taille du trait, etc. avant
    // de dessiner ou de modifier qq chose dans le contexte
    ctx.save();

    ctx.translate(this.x - this.centerX, this.y - this.centerY);
    //ctx.rotate(0.2);

    
    ctx.beginPath();

    //TETE
    // Add to the path a full circle (from 0 to 2PI)
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2*Math.PI, false);
    
    // With path drawing you can change the context
    // properties until a call to stroke() or fill() is performed
    ctx.fillStyle = "lightBlue";
    // Draws the filled circle in light blue
    ctx.fill();
    
    // Prepare for the outline
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    
    // draws AGAIN the path (the circle), this
    // time in wireframe
    ctx.stroke();


    
    //ctx.fillRect (757.2,310,75,75);
    //yeux

    ctx.fillStyle="red";
    ctx.fillRect(720,270,20,20);
    ctx.fillRect(770,270,20,20);
    ctx.fillStyle="purple";
    ctx.fillRect(725,280,10,10);
    ctx.fillRect(775,280,10,10);
    ctx.fillStyle="white";
    ctx.fillRect(725,285,5,5);
    ctx.fillRect(775,285,5,5);
    //nez
    ctx.fillStyle="purple";
    ctx.fillRect(750,290,10,30);
    ctx.fillRect(745,310,20,10);
    //bouche
    ctx.fillStyle="red";
    ctx.fillRect(725,330,75,30);
    ctx.fillStyle="black";
    ctx.fillRect(730,335,65,20);
    //dents
    ctx.fillStyle="white";
    ctx.fillRect(730,340,5,5);
    ctx.fillRect(730,335,5,5);
    ctx.fillRect(740,335,5,5);
    ctx.fillRect(750,335,5,5);
    ctx.fillRect(760,335,5,5);
    ctx.fillRect(770,335,5,5);
    ctx.fillRect(780,335,5,5);
    ctx.fillRect(790,335,5,5);
    ctx.fillRect(790,340,5,5);

    ctx.fillRect(735,345,5,5);

    ctx.fillRect(735,350,5,5);
    ctx.fillRect(745,350,5,5);
    ctx.fillRect(755,350,5,5);
    ctx.fillRect(765,350,5,5);
    ctx.fillRect(775,350,5,5);
    ctx.fillRect(785,350,5,5);

    ctx.fillRect(785,345,5,5);

    // On restaure le contexte
    ctx.restore();
  },
  move: function () {
    this.x += this.vitesseX;
    this.y += this.vitesseY;

    
  },
};

// programme principal
function main() {
  console.log(
    "Page chargée ! DOM ready ! Toutes les resources de la page sont utilisables (videos, images, polices etc."
  );
  // On récupère grace à la "selector API" un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");

  // pour dessiner, on a besoin de son "contexte graphique", un objet qui
  // va permettre de dessiner, ou de changer les propriétés du canvas
  // (largeur du trait, couleur, repère, etc.)

  ctx = canvas.getContext("2d");
  //test de dessins
    /*
    ctx.fillStyle= "red";
    ctx.fillRect(10,10,100,100);

    ctx.fillStyle="green";
    ctx.fillRect(200,50,50,100);

    ctx.strokeStyle="orange";
    ctx.lineWidth=10;
    ctx.strokeRect(200,300,100,100)
    */

  console.log(monstre.donneTonNom());

  requestAnimationFrame(animationLoop);

  //drawMonstre();

}

/*
function drawMonstre(){
    //bonne pratique : sauver le context courant
    //couleur courante, taille du trait etc..
    //avant de modifier ou dessiner qql chose dans el contexte
    ctx.save();


    //ctx.translate(x-400,y-10);
    //ctx.rotate(0.9);

    var centerX = 1515 / 2;
    var centerY = 620 / 2;
    var radius = 75;
    
    ctx.beginPath();
    
    //TETE
    // Add to the path a full circle (from 0 to 2PI)
    ctx.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
    
    // With path drawing you can change the context
    // properties until a call to stroke() or fill() is performed
    ctx.fillStyle = "lightBlue";
    // Draws the filled circle in light blue
    ctx.fill();
    
    // Prepare for the outline
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    
    // draws AGAIN the path (the circle), this
    // time in wireframe
    ctx.stroke();

    //ctx.fillRect (400,10,200,200);
    //yeux

    ctx.fillStyle="red";
    ctx.fillRect(720,270,20,20);
    ctx.fillRect(770,270,20,20);
    ctx.fillStyle="purple";
    ctx.fillRect(725,280,10,10);
    ctx.fillRect(775,280,10,10);
    ctx.fillStyle="white";
    ctx.fillRect(725,285,5,5);
    ctx.fillRect(775,285,5,5);
    //nez
    ctx.fillStyle="purple";
    ctx.fillRect(750,290,10,30);
    ctx.fillRect(745,310,20,10);
    //bouche
    ctx.fillStyle="red";
    ctx.fillRect(725,330,75,30);
    ctx.fillStyle="black";
    ctx.fillRect(730,335,65,20);
    //dents
    ctx.fillStyle="white";
    ctx.fillRect(730,340,5,5);
    ctx.fillRect(730,335,5,5);
    ctx.fillRect(740,335,5,5);
    ctx.fillRect(750,335,5,5);
    ctx.fillRect(760,335,5,5);
    ctx.fillRect(770,335,5,5);
    ctx.fillRect(780,335,5,5);
    ctx.fillRect(790,335,5,5);
    ctx.fillRect(790,340,5,5);




    ctx.fillRect(735,345,5,5);

    ctx.fillRect(735,350,5,5);
    ctx.fillRect(745,350,5,5);
    ctx.fillRect(755,350,5,5);
    ctx.fillRect(765,350,5,5);
    ctx.fillRect(775,350,5,5);
    ctx.fillRect(785,350,5,5);

    ctx.fillRect(785,345,5,5);



    //On restaure le contexte

    ctx.restore();
}

*/

// animation à 60 images/s
function animationLoop() {
  
  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2 On dessine les objets

  monstre.draw(ctx);

  // 3 on déplace les objets
  monstre.move();
  
  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsAvecBords();

  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}

function traiteCollisionsAvecBords() {
  if (monstre.x > canvas.width - monstre.l) {
    //console.log("COLLISION A DROITE");
    // truc à savoir, pour ne pas que l'objet donne l'impression
    // d'aller plus loin que le bord de l'écran, on le remet au point de
    // contact
    monstre.x = canvas.width - monstre.l;
    monstre.vitesseX = -monstre.vitesseX;
  } else if (monstre.x < 0) {
    //console.log("COLLISION A GAUCHE");
    monstre.x = 0; // point de contact
    monstre.vitesseX = -monstre.vitesseX;
  }
    
    if (monstre.y < 0) {
        monstre.y = 0;
        monstre.vitesseY = -monstre.vitesseY;
    } else if (monstre.y + monstre.h > canvas.height) {
        monstre.y = canvas.height - monstre.h;
        monstre.vitesseY = -monstre.vitesseY;
    }
}
