const RUN_IMAGE = ['lib/image/run1.png', 'lib/image/run2.png', 'lib/image/run3.png', 'lib/image/run4.png',
              'lib/image/run5.png', 'lib/image/run6.png', 'lib/image/run7.png'];
const BACK_IMAGE = ['lib/image/back1.png', 'lib/image/back2.png', 'lib/image/back3.png', 'lib/image/back4.png',
              'lib/image/back5.png', 'lib/image/back6.png', 'lib/image/back7.png'];
class Character{
  constructor(ctx){
    this.username = '';
    this.score = 0;
    this.x = 680;
    this.y = 400;
    this.width = 120;
    this.height = 100;
    this.image = new Image();
    this.ctx = ctx;
    this.idx = 0;
    this.image.src = RUN_IMAGE[this.idx];
    this.IMAGE = RUN_IMAGE;
  }

  draw(){
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.image.src = this.IMAGE[Math.floor(this.idx)];
    this.idx += 0.1;
    if(Math.floor(this.idx) === 7){this.idx = 0;}
  }

  handleRight(){
    this.IMAGE = BACK_IMAGE;
    if(this.x < 800 - this.width){
      this.x += 30;
    }
  }

  handleLeft(){
    this.IMAGE = RUN_IMAGE;
    if(this.x > 0){
      this.x -= 30;
    }
  }

}



module.exports = Character;
