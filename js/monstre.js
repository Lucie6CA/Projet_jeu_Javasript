//Exemple d'objet litteral
let monstre = {
    x: 100,
    y: 100,
    l: 100,
    h: 100,
    angle: 0,
    vitesseX: 0,
    vitesseY: 0 ,
    centerX: 757.2,
    centerY: 310,
    radius:55,
  
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
      ctx.fillStyle = "#ed8981";
      //#8356a7
      // add shadows before drawing the filled circle
     // addShadows();
                
      // Draws the filled circle in light blue
      ctx.fill();
                
      // restore the context to its previous saved state
      //ctx.restore();
  
      // Prepare for the outline
      ctx.lineWidth = 3;
      ctx.strokeStyle = "purple";
      
      // draws AGAIN the path (the circle), this
      // time in wireframe
      ctx.stroke();
  
      //ctx.fillRect (757.2,310,75,75);
      //yeux
  
      ctx.fillStyle="#8356a7";
      ctx.fillRect(725,280,15,15);
      ctx.fillRect(775,280,15,15);
      ctx.fillStyle="black";
      ctx.fillRect(725,285,10,10);
      ctx.fillRect(775,285,10,10);
      ctx.fillStyle="white";
      ctx.fillRect(730,290,5,5);
      ctx.fillRect(780,290,5,5);
      //nez
      ctx.fillStyle="purple";
      ctx.fillRect(755,290,8,20);
      ctx.fillRect(750,308,20,8);
      //bouche
      ctx.fillStyle="black";
      ctx.fillRect(732,325,55,22);
      ctx.strokeStyle="#8356a7"
      ctx.lineWidth=6;
      ctx.strokeRect(732,325,55,22);
  
     // ctx.fillStyle="black";
      //ctx.fillRect(730,335,65,20);
      //dents
      ctx.fillStyle="white";
      ctx.fillRect(732,333,5,5);
      ctx.fillRect(732,328,5,5);
      ctx.fillRect(742,328,5,5);
      ctx.fillRect(752,328,5,5);
      ctx.fillRect(762,328,5,5);
      ctx.fillRect(772,328,5,5);
      ctx.fillRect(782,328,5,5);
      ctx.fillRect(782,333,5,5);
  
      ctx.fillRect(737,335,5,5);
  
      ctx.fillRect(737,339,5,5);
      ctx.fillRect(747,339,5,5);
      ctx.fillRect(757,339,5,5);
      ctx.fillRect(767,339,5,5);
      ctx.fillRect(777,339,5,5);  
      ctx.fillRect(777,339,5,5);
      
      ctx.drawImage(assets.aileG,520,140,200,200);
      ctx.drawImage(assets.aileD,795,140,200,200);
      
      // On restaure le contexte
      ctx.restore();
    },
    move: function () {
      this.x += this.vitesseX;
      this.y += this.vitesseY;
    },
  };
  
  function addShadows() {
    ctx.shadowColor = "Black";    // color
    ctx.shadowBlur = 20;         // blur level
    ctx.shadowOffsetX = 15;      // horizontal offset
    ctx.shadowOffsetY = 15;      // vertical offset
  }