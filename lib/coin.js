
class Coin{
  constructor(ctx){
    this.x = Math.random()*800;
    this.y = 0.1;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = 'lib/image/coin.png';
  }

  draw(){
    this.ctx.drawImage(this.image, this.x, this.y, 30, 30);
  }


}

module.exports = Coin;
