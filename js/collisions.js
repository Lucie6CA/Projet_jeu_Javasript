
//TRAITER LES COLLISIONS

function traiteCollisionsJoueurAvecBords() {
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
  
  function testCollisionsBallesAvecBords(b) {
    if ((b.x+b.rayon) > canvas.width) {
  
      //console.log("COLLISION A DROITE");
      // truc à savoir, pour ne pas que l'objet donne l'impression
      // d'aller plus loin que le bord de l'écran, on le remet au point de
      // contact
      b.x = canvas.width - b.rayon;
      b.vitesseX = -b.vitesseX;
    } else if ((b.x -b.rayon)< 0) {
      //console.log("COLLISION A GAUCHE");
      b.x = b.rayon; // point de contact
      b.vitesseX = -b.vitesseX;
    }
      
      if ((b.y -b.rayon )< 0) {
          b.y = b.rayon;
          b.vitesseY = -b.vitesseY;
      } else if ((b.y + b.rayon) > canvas.height) {
          b.y = canvas.height - b.rayon;
          b.vitesseY = -b.vitesseY;
      }
}


//COLLISIONS


function traiteCollisionBalleAvecJoueur(b) {
  //pour vérifier collisions avec le joueur
  //cercleJoueur.x=monstre.x;
  //cercleJoueur.y=monstre.y;
  //cercleJoueur.rayon=monstre.radius;

 

  if (

    circleCollide(
      monstre.x,
      monstre.y,
      monstre.radius,
      b.x,
      b.y,
      b.rayon
    )
  ) {
    //console.log("COLLISION....");
    // on cherche l'index de la balle dans le tableau des balles
    let index = tableauDesBalles.indexOf(b);
    
    // pour supprimer un élément : on utilise la méthode splice(index, nbElementsASupprimer) sur le tableau
    tableauDesBalles.splice(index, 1);

    //b.couleur = "pink";

    if (b.couleur == "green") {

      //exemple d'affiche du down pour modifier le contenu html
      scoreCourant++;
      spanScore.innerHTML = scoreCourant;
      //faire une fonction qui détecte si c'est la dernière verte ou pas

      //gérer le meilleur score
      //meilleur score
      if (meilleurScore<scoreCourant){
        meilleurScore = scoreCourant;
        localStorage.hiscore = meilleurScore;
        spanMeilleurScore.innerHTML = meilleurScore;
      }
      
      if (NiveauFini()) {
        console.log("niveau fini")
        etatJeu = "ecranChangementNiveau";
      }

    }

    else if (b.couleur=="red"){

      gameOver = true;
      console.log(gameOver);
      

      //assets.humbug.play();
      etatJeu="gameOver";

    }

  }
  //console.log("PAS COLLISION....");
}

//Collision objets bords
function testCollisionsObjetsAvecBords(b) {
  if (b.x > canvas.width - b.l) {
      //console.log("Collision à Droite");
      b.x = canvas.width - b.l;
      b.vitesseX = -b.vitesseX;
  }
  else if (b.x < 0) {
      //console.log("Collision à Gauche");
      b.x =0;
      b.vitesseX = -b.vitesseX;
  }

  if (b.y < 0) {
      //console.log("Collision en Haut");
      b.y = 0;
      b.vitesseY = - b.vitesseY;
  }
  else if (b.y + b.h > canvas.height) {
      //console.log("Collision en Bas");
      b.y = canvas.height - b.h;
      b.vitesseY = - b.vitesseY;

  }
}


//traiter collision monstre élements, chacun de son coté
function traiteCollisionsMonstreAvecBoulesFeu(b){
  if (circRectsOverlap(b.x, b.y, b.l, b.h, monstre.x, monstre.y, monstre.radius)) {
      let index = tableauFeu.indexOf(b);
      tableauFeu.splice(index, 1);
      
      gameOver = true;
      console.log(gameOver);
    
      //assets.humbug.play();
      etatJeu="gameOver";

  }
}
function traiteCollisionsMonstreAvecTresor(b){
  if (circRectsOverlap(b.x, b.y, b.l, b.h, monstre.x, monstre.y, monstre.radius)) {
      let index = tableauTresor.indexOf(b);
      tableauTresor.splice(index, 1);
      
      scoreCourant++;
      spanScore.innerHTML = scoreCourant;
      //faire une fonction qui détecte si c'est la dernière verte ou pas

      //gérer le meilleur score
      //meilleur score
      if (meilleurScore<scoreCourant){
        meilleurScore = scoreCourant;
        localStorage.hiscore = meilleurScore;
        spanMeilleurScore.innerHTML = meilleurScore;
      }
      
      if (NiveauFini()) {
        console.log("niveau fini")
        etatJeu = "ecranChangementNiveau";
      }
  }

      
}

  
// Fonctions génériques de collision cercle-cercle, rectangle-rectangle et cercle-rectangle
// pour les curieux, polygone-polygone convexes existe aussi voir algorithme SAT
// (Separation Axis Theorem)
// Collisions between rectangle and circle
// Collisions between aligned rectangles

function circleCollide(x1, y1, r1, x2, y2, r2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return dx * dx + dy * dy < (r1 + r2) * (r1 + r2);
}

function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
 
  if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
     return false; // No horizontal axis projection overlap
  if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
     return false; // No vertical axis projection overlap
  return true; // If previous tests failed, then both axis projections
               // overlap and the rectangles intersect
}

function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
   var testX=cx;
   var testY=cy;
   if (testX < x0) testX=x0;
   if (testX > (x0+w0)) testX=(x0+w0);
   if (testY < y0) testY=y0;
   if (testY > (y0+h0)) testY=(y0+h0);
   return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}

