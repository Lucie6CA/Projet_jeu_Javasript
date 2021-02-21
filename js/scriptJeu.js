
//Initialisation
window.onload = main;

let canvas;
let ctx;
let canvas2;
let ctx2;

//ici on va stocker les objets graphiques du jeu (balles, ennemis, fruits ...)
let tableauDesBalles = [];
let tableauFeu=[];
let tableauFeuMenu=[];
let tableauOrMenu=[];


let tableauTresor=[];

let longueurTableau=0;
let balleChercheuse;

let cercleJoueur = {};

let etatJeu = "menuPrincipal";
let nbTresorInit = 3;
let nbTresor=3;
let nbBouleFeuInit = 2;
let nbBouleFeu=2;


let niveauCourantInit =0;
let niveauCourant =0 ;
let scoreCourantInit = 0;
let scoreCourant =0;
let afficherScore=0;
let meilleurScore=0;

//tailles des éléments
//BOULES DE FEU
let minLFeuInit=70;
let minLFeu= 70;
let maxLFeuInit=100;
let maxLFeu=100;

let vXFeuInitmin= -5;
let vXFeumin= -5;
let vXFeuInitmax= 5 ;
let vXFeumax=5 ;

let vYFeuInitmin= -4 ;
let vYFeumin= -4 ;
let vYFeuInitmax= 4 ;
let vYFeumax= 4 ;

//TRESOR
let minLTresorInit=100;
let minLTresor= 100;
let maxLTresorInit=120;
let maxLTresor=120;

let vXTresorInit= -5 + Math.random() * 10;
let vXTresor= -5 + Math.random() * 10;

let vYTresorInit= -5 + Math.random() * 10;
let vYTresor= -5 + Math.random() * 10;

let spanNiveau ;
let spanScore ;
let spanMeilleurScore;
let spanAfficherNiveaux;

//MUSIQUE
let un_mute ;

let musiqueCourante;
let playmusique=0;
let playGameOver=0;
let playNiveau=0;
let muteMusique=0;

// programme principal
function main() {
  
  loadAssets(startGame);
}

function startGame(assetsLoaded){
  console.log(
    "Page chargée ! DOM ready ! Toutes les resources de la page sont utilisables (videos, images, polices etc."
  );
  // On récupère grace à la "selector API" un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");
  spanNiveau = document.querySelector("#Niveau");
  spanScore = document.querySelector("#score");
  spanMeilleurScore = document.querySelector("#meilleurS"); 

  spanAfficherNiveaux = document.querySelector("#Niveaux"); 
  un_mute = document.getElementById("un-mute");
  
  // pour dessiner, on a besoin de son "contexte graphique", un objet qui
  // va permettre de dessiner, ou de changer les propriétés du canvas
  // (largeur du trait, couleur, repère, etc.)

  ctx = canvas.getContext("2d");

  //loader les assets?

  assets = assetsLoaded;
  //on ajooute des écouteurs souris/clavier sur le canvas
  //technique 1 --> la plus simple
  canvas.onmousedown = traiteMouseDown;
  canvas.onmouseup = traiteMouseUp;
  canvas.onmousemove = traiteMouseMove;

  //ou : plus recente mais pour fonctionnalités différentes pas utiles
  //canvas.addEventListener("mousedown", traiteMouseDown);


  //le canvas ne peut détecter les touches que si il a le focus (voir mooc)
  //c'est plus simple de mettre les ecouteur clavier sur le document 
  document.onkeydown = traiteKeyDown;
  document.onkeyup = traiteKeyUp;

  

  if (localStorage.hiscore===undefined){
    localStorage.hiscore = meilleurScore;
  }
  
  console.log(localStorage.hiscore);
  meilleurScore=localStorage.hiscore;
  console.log(meilleurScore);
  spanMeilleurScore.innerHTML = meilleurScore;
  

  //console.log(monstre.donneTonNom());


  //balleChercheuse = new BalleChercheuse(100,100,40,"yellow",0,0);
  creerBoulesDeFeu(nbBouleFeu);
  creerTresor(nbTresor);

  creerBoulesDeFeuMenu(15);
  creerOrMenu(15);

  //assets.musique.play();



  
  un_mute.onclick=muteOrNot;


  requestAnimationFrame(animationLoop);

  //assets.humbug.play();
  //assets.humbug.pause();

  

}
//----------------------------------------//
//RANDOM DANS UN INTERVALLE
//----------------------------------------//

// On renvoie un nombre aléatoire entre une valeur min (incluse)
// et une valeur max (exclue)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

//----------------------------------------//
//CREER DES BALLES
//----------------------------------------//

//faire en sorte qu'en fonction du niveau, on augmente le nombre de balles
function creerDesBalles(nb) {
  let tabCouleurs = ["red", "green"];
  for (let i = 0; i < nb; i++) {
    

    let x = 30 + Math.random() * canvas.width;
    let y = 30 + Math.random() * canvas.height;

    let distanceAuJoueur= Math.sqrt((x-monstre.x)*(x-monstre.x) + (y-monstre.y)*(y-monstre.y));  
        
    //avoir un rayon compris entre 10 et 40 pixels aléatoirement, 
    //faire en sorte qu'en fonction du niveau, les pixels diminuent (9,35)(8,30)(7,25)(6,20)..
    let rayon = getRandomArbitrary(minRayon,maxRayon);

    let indexCouleur = 0;
    //et que il y ait un minimum de verte à chaque fois
    //dès que i pair --> verte, dès que i impair --> rouge
    //pas de condition sur le pair
    //let nbRouges = Math.trunc(1/3 * nb);
    let nbVertes = Math.trunc(2/3 * nb);
    if(i<=nbVertes ){
      
      indexCouleur = 1;

    }
    else{
      indexCouleur = 0;
    }
    
    let couleur = tabCouleurs[indexCouleur];

    let vx = vXBalle;
    let vy = vYBalle;

    let b = new Balle(x, y, rayon, couleur, vx, vy);
    //let b=new Balle(x,y,30,couleur,1,0);
    //console.log("x=" + x + " y=" + y);

    //vérifier si la distance entre balles et joueur et trop faible,
    //si oui :  on décrémante i et on met pas dans le tableau
    //ou au augmente nb et on ajoute pas 
    if(distanceAuJoueur<400){
      nb++;
     
    }
  
    else{
      //on ajoute la balle au tableau
      tableauDesBalles.push(b);
      console.log(tableauDesBalles.length);

    }

  }

  //balleChercheuse= new BalleChercheuse(100,100,40,"yellow",0,0);
  //tableauDesBalles.push(balleChercheuse);

}


//----------------------------------------//
//CREER DES BOULES DE FEU
//----------------------------------------//
function creerBoulesDeFeu(nb) {

  for (let i = 0; i < nb; i++) {

      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      let distanceAuJoueur= Math.sqrt((x-monstre.x)*(x-monstre.x) + (y-monstre.y)*(y-monstre.y)); 

      let h = getRandomArbitrary(minLFeu,maxLFeu);

      let vX = getRandomArbitrary(vXFeumin,vXFeumax);
      let vY = getRandomArbitrary(vYFeumin,vYFeumax);

      let b = new BoulesDeFeu(x, y, h, h, vX, vY, assets.bouleFeu);
        
      //vérifier si la distance entre balles et joueur et trop faible,
      //si oui :  on décrémante i et on met pas dans le tableau
      //ou au augmente nb et on ajoute pas 
      if(distanceAuJoueur<400){
        nb++;
      
      }
    
      else{
        //on ajoute la balle au tableau
        tableauFeu.push(b);
        //console.log(tableauDesBalles.length);

      }
        
    }
}

//----------------------------------------//
//CREER DES TRESORS
//----------------------------------------//
function creerTresor(nb) {

  for (let i = 0; i < nb; i++) {

      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;

      let distanceAuJoueur= Math.sqrt((x-monstre.x)*(x-monstre.x) + (y-monstre.y)*(y-monstre.y)); 

      let h = getRandomArbitrary(minLTresor,maxLTresor);

      let vX = vXTresor;
      let vY = vYTresor;

      let b = new Tresor(x, y, h, h, vX, vY, assets.pieces);

      
    //vérifier si la distance entre balles et joueur et trop faible,
    //si oui :  on décrémante i et on met pas dans le tableau
    //ou au augmente nb et on ajoute pas 
    if(distanceAuJoueur<400){
      nb++;
     
    }
  
    else{
      //on ajoute la balle au tableau
      tableauTresor.push(b);
      //console.log(tableauDesBalles.length);

    }
      
  }
}
//----------------------------------------//
//DESSINER LES OBJETS
//----------------------------------------//

function dessinerLesObjets() {
  //utilisation d'un itérateur sur le tableau
  tableauFeu.forEach((b) => {
    b.draw(ctx);
    testCollisionsObjetsAvecBords(b);
    b.move();
    traiteCollisionsMonstreAvecBoulesFeu(b);
  });

  tableauTresor.forEach((b) => {
    b.draw(ctx);
    testCollisionsObjetsAvecBords(b);
    b.move();
    traiteCollisionsMonstreAvecTresor(b);
  });

}

//----------------------------------------//
//DESSINER LES BOULES DE FEU- ANIMATION MENU PRINCIPAL
//----------------------------------------//

function dessinerLesElements2() {
  //utilisation d'un itérateur sur le tableau
  tableauFeuMenu.forEach((b) => {
    b.draw(ctx);
    testCollisionsObjetsAvecBords(b);
    b.move();
    
  });
}


//----------------------------------------//
//CREER DES BOULES DE FEU
//----------------------------------------//
function creerBoulesDeFeuMenu(nb) {

  for (let i = 0; i < nb; i++) {

      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;


      let h = 130;

      let vX = 2;
      let vY = 2;

      let b = new BoulesDeFeu(x, y, h, h, vX, vY, assets.bouleFeu);
        
      
      tableauFeuMenu.push(b);

      
        
    }
}
//----------------------------------------//
//DESSINER LES PIECES- ANIMATION CHANGEMENT NIVEAU
//----------------------------------------//

function dessinerLesElements3() {
  //utilisation d'un itérateur sur le tableau
  tableauOrMenu.forEach((b) => {
    b.draw(ctx);
    testCollisionsObjetsAvecBords(b);
    b.move();
    
  });
}

//----------------------------------------//
//CREER DES TRESORS
//----------------------------------------//
function creerOrMenu(nb) {

  for (let i = 0; i < nb; i++) {

      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;


      let h = 70;

      let vX = 1;
      let vY = 2;

      let b = new Tresor(x, y, h, h, vX, vY, assets.pieces);

      tableauOrMenu.push(b);

  }
}
// animation à 60 images/s
function animationLoop() {


  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  switch (etatJeu) {
    case "menuPrincipal":

      afficheMenuPrincipal();
      break;

    case "jeuEnCours":
      updateJeu();
      break;

    case "ecranChangementNiveau":
      afficheEcranChangementNiveau();
      break;

    case "gameOver":
      
      afficherEcranGameOver();
      break;

  }


  // 2 On dessine les objets


  //via updatejeu

  //pour s'aider et visualiser les balles ou le joueur pour voir si les collisions marchent
  //ctx.beginPath();
  //ctx.strokeStyle="yellow";
  //ctx.arc(cercleJoueur.x, cercleJoueur.y, cercleJoueur.rayon, 0, 2*Math.PI);
  //ctx.lineWidth=10;
  //ctx.stroke();

  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}



//MENU PRINCIPAL
function afficheMenuPrincipal() {
  ctx.save();
  //ctx.translate(0, 100);
  pasAfficherNiveau();
  
  un_mute.onclick=muteOrNot;

  //musique
  if (playmusique===0){

    assets.musique.play();

    playmusique=1;
  }
  
  if (playGameOver===1){
    playGameOver=0;
  }

  if(playNiveau===1){
    playNiveau=0;
  }


  ctx.fillStyle = "purple";
  ctx.fillRect(0, 0, canvas.width+5, canvas.height+5);  

  dessinerLesElements2();
  
  ctx.drawImage(assets.monstreImage,900,100);
  ctx.drawImage(assets.tresor,1250,400,250,250);

  //TITRE DU JEU
  ctx.font = "80px Calibri ";
  ctx.strokeStyle = "white";
  ctx.strokeText("Monster", 600, 100);

  //MENU PRINCIPAL
 
  ctx.fillStyle = "black";
  ctx.font = "60px Calibri ";

  // .. set color, lineWidth, shadow etc.
  // 10, 10 is the start of the baseline, bottom of left leg of the "H" in the
  // "Hello World" example.
  ctx.fillText("Menu Principal", 100, 200);

  //REGLE DU JEU
  ctx.font = "40px Calibri ";
  //ctx.fillText("But : ", 100, 150);
  ctx.fillText("Aider le petit monstre à récupérer son", 100, 250);
  ctx.strokeStyle = "black";
  ctx.fillText("trésor", 725, 250);
  ctx.strokeText("trésor", 725, 250);
  ctx.font = "30px Calibri ";
  // Déplacement avec les flèches
  ctx.fillText("Déplacez le à l'aide des flèches du clavier", 100, 300);
  ctx.font = "40px Calibri ";
  ctx.fillText("Mais                        aux boules de feu...", 100, 350);
  ctx.strokeStyle = "white";
  ctx.strokeText("ATTENTION", 190, 350);

  

  //Cliquez pour jouer
  ctx.strokeStyle = "black";
  ctx.strokeText("Cliquez pour jouer", 100, 400);
  

  ctx.restore();

}


//JEU
function updateJeu() {

  if (playmusique===0){
    assets.musique.play(); 
    playmusique=1;
  }

  if(playNiveau===1){
    playNiveau=0;
  }
  //si musiue=1, tu arretes la musique home et tu met =0
  afficherNiveau();
  
  un_mute.onclick=muteOrNot;

  monstre.draw(ctx);

  dessinerLesObjets();


  // 3 on déplace les objets
  monstre.move();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsJoueurAvecBords();

  

}





function afficheEcranChangementNiveau(){

  //Musique
  if (playNiveau===0){
    assets.niveau.play();
    playNiveau=1;
  }
  
  if(playmusique===1){
    assets.musique.stop();
    playmusique=0;
  }




  ctx.save();
  pasAfficherNiveau();
  
  un_mute.onclick=muteOrNot;

  ctx.fillStyle = "purple";
  ctx.fillRect(0, 0, canvas.width, canvas.height);  

  dessinerLesElements3();

  ctx.fillStyle = "black";
  ctx.font = "80px Calibri ";

  // .. set color, lineWidth, shadow etc.
  // 10, 10 is the start of the baseline, bottom of left leg of the "H" in the
  // "Hello World" example.
  ctx.fillText("Niveau suivant", 100, 200);
  // Or
  ctx.strokeText("Niveau Suivant", 100, 400);



  ctx.restore();

}

function afficherEcranGameOver(){

  //Musique
  if (playGameOver===0){
    assets.fire.play();
    playGameOver=1;
  }
  
  if(playmusique===1){
    assets.musique.stop();
    playmusique=0;
  }


  ctx.save();
  pasAfficherNiveau();
  
  un_mute.onclick=muteOrNot;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width+5, canvas.height+5);  

  //ctx.drawImage(assets.explosion, 300,300);
  ctx.fillStyle = "white";
  ctx.font = "100px Calibri";

  // .. set color, lineWidth, shadow etc.
  // 10, 10 is the start of the baseline, bottom of left leg of the "H" in the
  // "Hello World" example.
  ctx.fillText("GAME OVER", 100, 300);
   // Or
   
  ctx.font = "40px Calibri";

  ctx.fillText("Mon score : " + afficherScore, 100, 400);
 


  


  ctx.restore();

  
  niveauAzero();

}


function drawGIF(){
  ctx.save();
  
}



//----------------------------------------//
//NIVEAUX
//----------------------------------------//
function niveauAzero(){

  scoreCourant=0;
  niveauCourant=0;
  spanScore.innerHTML=scoreCourant;
  spanNiveau.innerHTML=niveauCourant;

  nbBouleFeu=nbBouleFeuInit;
  nbTresor=nbTresorInit

  minLFeu=minLFeuInit;
  maxLFeu=maxLFeuInit;

  minLTresor= minLTresorInit;
  maxLTresor=maxLTresorInit;

  vXFeumin=vXFeuInitmin;
  vXFeumax=vXFeuInitmax;
  vYFeumin=vYFeuInitmin;
  vYFeumax=vYFeuInitmax;

  vXTresor=vXTresorInit;
  vYTresor=vYTresorInit;

  tableauFeu=[];
  tableauTresor=[];

  creerBoulesDeFeu(nbBouleFeu);
  creerTresor(nbTresor);

}



function augmenteNiveau(){

  niveauCourant++;
  nbBouleFeu=nbBouleFeu + 1;
  nbTresor=nbTresor+1;

  minLFeu=minLFeu +10;
  maxLFeu=maxLFeu +10;

  minLTresor= minLTresor -5;
  maxLTresor=maxLTresor -5;

  vXFeumin=vXFeumin*1.15;
  vXFeumax=vXFeumax*1.15;

  vYFeumin=vYFeumin*1.15;
  vYFeumax=vYFeumax*1.15;


  vXTresor=vXTresor*1.1;
  vYTresor=vYTresor*1.1;
  
  spanNiveau.innerHTML=niveauCourant;
   
  

  tableauFeu=[];
  tableauTresor=[];

  creerBoulesDeFeu(nbBouleFeu);
  creerTresor(nbTresor);
}






function NiveauFini() {

  
  if (tableauTresor.length !== 0) {
    return false;
  }

  augmenteNiveau();
  return true;

}


function afficherNiveau(){
  spanAfficherNiveaux.style.visibility='visible';
}

function pasAfficherNiveau(){
  spanAfficherNiveaux.style.visibility='hidden';
}



function muteOrNot(){

  if(muteMusique===0){
    assets.musique.stop();
    muteMusique=1;
  }
  
  else{
    assets.musique.play();
  }
  
  
};


//MEILLEUR SCORE
//TIMER
//enregristrer le score, le comparer à l'actuel et afficher le meilleur score en bas à droite
//base de données ? 
//quand j'augmente de niveau, je veux que le nb de balles augmentent, que le rayon diminuent, et que la vitesse augmente OK
// attention demander aux balles de pas se créer proches car des fois une rouge et verte se collent trop

//ajouter du son
//ajouter du son quand on bat le meilleur score
//ajouter des explosions 
//et une animation pour le game over, niveau suivant et menu principal
//tous les 5 nibveaux, ajouter 1 balle jaune qui permet d'augmenter le score de 5 points






