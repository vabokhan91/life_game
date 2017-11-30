class Predator{
    constructor(image){
        this.image = image;
    }
}


function draw() {
    var c=document.getElementById('game_grid');
    var ctx=c.getContext('2d');
    ctx.lineWidth=1;
    d=30;
    for (i=0; i<=300; i=i+d) {
        ctx.moveTo(i,0);
        ctx.lineTo(i,300);
        ctx.stroke();
    }
    for (j=0; j<=300; j=j+d) {
        ctx.moveTo(0,j);
        ctx.lineTo(300,j);
        ctx.stroke();
    }
    var pred = new Predator(document.getElementById('image'));
    ctx.drawImage(pred.image, 32, 32,25,25);

}