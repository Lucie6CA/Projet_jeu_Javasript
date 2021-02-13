//boules de feu à éviter
class BoulesDeFeu{
    x;
    y;
    h;
    l;
    image;
    vitesseX =0;
    vitesseY =0;

    constructor(x,y,l, h, vitesseX, vitesseY, image){
        this.x = x;
        this.y = y;
        this.h = h;
        this.l = l;
        if (vitesseX) this.vitesseX = vitesseX;
        if (vitesseY) this.vitesseY = vitesseY;

        this.image = image;
        
    }
    draw(ctx){
        ctx.save();

        ctx.drawImage(this.image, this.x,this.y,this.h,this.l);
        
        ctx.restore();
    }

    move(){
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        
    }
}