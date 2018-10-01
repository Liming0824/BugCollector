/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/character.js":
/*!**************************!*\
  !*** ./lib/character.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./lib/coin.js":
/*!*********************!*\
  !*** ./lib/coin.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {


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


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Coin = __webpack_require__(/*! ./coin */ "./lib/coin.js");
class Game{

  constructor(ctx, myCanvas, character){
    this.image = new Image();
    this.innerHeight = myCanvas.height;
    this.innerWidth = myCanvas.width;
    this.ctx = ctx;
    this.character = character;
    this.time = 10.0;
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


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


const Character = __webpack_require__(/*! ./character */ "./lib/character.js");
const Game = __webpack_require__(/*! ./game */ "./lib/game.js");

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
      game = new Game(ctx, myCanvas, character);
      window.games.push(game);
      document.removeEventListener('keydown', start, false);
      requestAnimationFrame(game.intervalFunction);
    }
  }

  window.start = start;

});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map