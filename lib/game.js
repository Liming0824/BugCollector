const Coin = require('./coin');
class Game{

  constructor(ctx, myCanvas, character){
    this.image = new Image();
    this.innerHeight = myCanvas.height;
    this.innerWidth = myCanvas.width;
    this.ctx = ctx;
    this.character = character;
    this.time = 30.0;
    this.coins = [new Coin(this.ctx)];
    this.status = true;
    this.intervalFunction = this.intervalFunction.bind(this);
    this.move = this.move.bind(this);
    document.addEventListener('keydown', this.move );
  }

  move(event){
    console.log('move');
    if(event.keyCode === 39){
      this.character.handleRight();
    }else if(event.keyCode === 37){
      this.character.handleLeft();
    }
  this.prelude = document.getElementById('prelude');
  this.bgm = document.getElementById('bgm');
  this.bgm.play();
  }

  collisionController(coin){
  return (coin.x > this.character.x) && (coin.x < this.character.x + this.character.width) &&
         (coin.y >= this.character.y) && (coin.y < this.character.y + this.character.height/2);

  }



  updateCoins(){
    for(let i = 0; i < this.coins.length; i++){
      this.coins[i].y += 1;
    }

    if(this.coins.length > 0 && this.coins[0].y >= this.innerHeight - 10){
      this.coins.shift();
    }
    let newCoins;
    for(let i = 0; i < this.coins.length; i++){
      if(this.collisionController(this.coins[i])){
        newCoins = this.coins.slice(0,i).concat(this.coins.slice(i+1));
        this.character.score += 1;
      }
    }
    this.coins = newCoins ? newCoins : this.coins;
    this.ctx.clearRect(0,0,800,500);
  }


  intervalFunction(){
    let myReq = requestAnimationFrame(this.intervalFunction);

    this.updateCoins();
    this.ctx.font = 'bold 20px Arial';
    this.ctx.fillText('Time: ' + ('0'+this.time.toFixed(2)).slice(-5), 70, 23);
    this.ctx.fillText('Score: '+ this.character.score, 750, 23);
    let length = this.coins.length;
    if(length > 0 && this.coins[length-1].y > 50 ){
      this.coins.push(new Coin(this.ctx));
    }
    this.time -= 0.016;
    console.log(this.time);
    this.character.draw();
    for(let i = 0; i < length ; i++){
      this.coins[i].draw();
    }
    if(this.time <= 0 ){
      document.removeEventListener('keydown', this.move);
      cancelAnimationFrame(myReq);
      this.resetGamePage();
      this.status = false;
    }
  }


  resetGamePage(){
    this.bgm.pause();
    this.prelude.play();
    this.ctx.clearRect(0,0,800,500);
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 250, 120,250,200);
    };
    this.image.src = 'lib/image/run1.png';

    this.ctx.font = 'bold 20px Arial';
    this.ctx.fillText('Your score is '+ this.character.score, 400, 370);

    this.ctx.font = 'bold 20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText("press N to restart the game", 400, 400);
    document.addEventListener('keydown', window.start, false);
  }


}

module.exports = Game;
