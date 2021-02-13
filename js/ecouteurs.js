let mousePos={}

function traiteMouseDown(event){
    //console.log("Souris clickée dans le canvas" + event.button);

    switch(etatJeu){
        case "menuPrincipal":
            etatJeu="jeuEnCours";
            break;
        case "ecranChangementNiveau":
            etatJeu="jeuEnCours";
            break;
        case "gameOver":
            etatJeu="menuPrincipal";

        break;


    }
}

function traiteMouseUp(event){
    //console.log("Souris relachée dans le canvas" + event.button);

}

function traiteMouseMove(event){
    //console.log("Souris déplacée dans le canvas" + event.button);

    //pour prendre en compte les marges, le css etc..
    //var rect=canvas.getBoundingClientRect();
    //Récupérer position de la souris (dans le canvas)
    //mousePos.x=event.clientX-rect.left;
    //mousePos.x=event.clientY-rect.top;


    //pour que ce soit centré sur la souris
    //monstre.x=mousePos.x -monstre.l/2
    //monstre.y=mousPos.y -monstre.l/2

    //on peut aussi faire une méthode dans monstre : setPos(x,y)

        //this.x =x -this.l/2;
        //this.y=y -this.l/2

    //pour que ce soit plus propre
    //monstre.setPos(mousePos.x, mousePos.y)



}

function traiteKeyDown(event){
    console.log("clavier enfoncé dans le canvas :" +event.key);
    switch(event.key){
        case "ArrowLeft":
            monstre.vitesseX=-5;
            break;
        case "ArrowRight":
            monstre.vitesseX=5;
            break;
        case "ArrowUp":
            monstre.vitesseY=-5
            break;
        case "ArrowDown":
            monstre.vitesseY=5;
            break;
    }

}

function traiteKeyUp(event){
    //console.log("Clavier relaché dans le canvas:" +event.key);
    switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
          monstre.vitesseX = 0;
          break;
        case "ArrowUp":
        case "ArrowDown":
          monstre.vitesseY = 0;
          break;
    }
}