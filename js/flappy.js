// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var width = 790;
var height = 400;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
var player;
var labelScore;
var pipes=[];

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg","../assets/nollyPlayer.png");
  game.load.audio("score","../assets/point.ogg");
  game.load.audio("olibop","../assets/egyptianReggae.mp3");
  game.load.image("books", "../assets/books.png")
  game.load.image("bg", "../assets/deanClose.jpg")
  game.load.image("bluePipe","../assets/pipe_blue.png")
  game.load.image("pinkPipe","../assets/pipe_pink.png")
}
var x=190;

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.stage.setBackgroundColor("#e06e22");
    var background = game.add.image(0,0,"bg");
    background.width = width;
    background.height = height;
    // game.add.text(310,x,"my drilla", {font: "30px Arial", fill: "#ffffff"});
    player = game.add.sprite(50,160  ,"playerImg");
    game.physics.arcade.enable(player);
    player.body.gravity.y =180  

    game.input.onDown.add(playerJump);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);
    labelScore = game.add.text(50,50,score.toString() );
    game.sound.play("olibop");
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    generatePipe();
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(
      pipeInterval,
      generatePipe
    );
    // createPipe3(100);
}

function createPipe(x) {
  for(var count = 0; count < 7;count++){
    game.add.sprite(x+(count*50), 25, "bluePipe");
  }
  /*
  game.add.sprite(10+(0*50), 25, "bluePipe");
  game.add.sprite(10+(1*50), 25, "bluePipe");
  game.add.sprite(10+(2*50), 25, "bluePipe");
  */
}
function createPipe3(y) {
  for(var count=0; count <5;count++){
    game.add.sprite(100,y+(count*50),"pinkPipe");
  }
}



function playerJump() {
   player.body.velocity.y = -100  ;
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
   player,
   pipes,
   gameOver);
}

function gameOver (){
  location.reload();
}

function clickHandler(event) {
  // alert("CLICK!");
  game.add.sprite(event.x, event.y,"playerImg");
  moveUp();
}

function moveDown(){
  player.y = player.y + 20

}


function moveUp (){
  player.y = player.y - 20;


}
function moveRight () {
  player.x = player.x + 20;

}

function moveLeft () {
  player.x =player.x - 20;
}
function changeScore (changeAmount){
  score = score+changeAmount;

 labelScore.setText(score.toString());

}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1,5);
  for (var count=0; count<8; count++) {
    if (count != gapStart && count != gapStart+1){
      addPipeBlock(width, 50 * count);
    }
  }
  changeScore(1);
}

function addPipeBlock (x,y) {
  var block = game.add.sprite(x,y, "books");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;


}
var oli = "blach fdsfds";
var number = 7;
var egypt = 3.14;

function increaseNumber(n){
  return n + 1;
}


multiplyyyyy(5,7,9);
multiplyyyyy(6,0,8);

function multiplyyyyy(x,y,j){
  return x*y/j*9/6+4;
}

function createPipe2(x,y) {
  game.add.sprite(y+90, y,"bluePipe");
  game.add.sprite(x, x*2,"bluePipe");
  game.add.sprite(x, y,"bluePipe");
}
