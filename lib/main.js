
const Character = require('./character');
const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  var myCanvas = document.getElementById('myCanvas');
  var ctx = myCanvas.getContext("2d");
  window.games = [];
  let character = new Character(ctx);

  let image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 240,50);
  };

  let muteButton = document.getElementsByClassName('mute')[0];

  muteButton.onclick = function(){
    Array.from(document.getElementsByTagName('audio')).map(e => {
      e.muted = e.muted ? false : true
    });
  };




  image.src = 'lib/image/fixproblem.jpg';
  ctx.font = 'bold 35px Arial';
  ctx.textAlign = 'center';
  ctx.fillText("press N to start", 400, 400);

  let game;
  document.addEventListener('keydown', start, false);

  function start(event){
    if(event.keyCode === 78){
      window.games.push(game);
      game = new Game(ctx, myCanvas, character);
      requestAnimationFrame(game.intervalFunction);
      document.removeEventListener('keydown', start, false);
    }
  }

  window.start = start;

});
