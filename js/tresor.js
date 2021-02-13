
//Classe trésor
class Tresor{
    x;
    y;
    l;
    h;
    vitesseX=0;
    vitesseY=0;
    image;
  
    constructor(x,y,l, h, vitesseX, vitesseY, image){
      this.x=x;
      this.y=y;
      this.l=l;
      this.h=h;
      if(vitesseX) this.vitesseX=vitesseX;
      if(vitesseY) this.vitesseY=vitesseY;

      this.image=image
  
    }
  
    draw(ctx){
      ctx.save();
  
      ctx.drawImage(this.image, this.x, this.y, this.l, this.h)
      ctx.restore();
  
    }
  
    move(){
      this.x+=this.vitesseX;
      this.y +=this.vitesseY;
    }
  }