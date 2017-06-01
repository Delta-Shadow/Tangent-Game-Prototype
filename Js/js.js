// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var width = 500;
var height = 500;
var mousePos = {x: 0, y: 0};
var ticker = 0;
var roller;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

document.addEventListener("mousemove", mouseMoved, false);
document.addEventListener("mousedown", clickStart, false);
document.addEventListener("mouseup", clickEnd, false);

var player = new Player();
var enemySystem = new EnemySystem();
var berrySystem = new BerrySystem();

function main() {
    roller = requestAnimFrame(main);
    ctx.clearRect(0, 0, width, height);
    ticker++;
    
    drawBackground();
    if (ticker % 100 == 0) {enemySystem.spawn()};

    player.run();
    enemySystem.run();
    berrySystem.run();
};

function drawBackground() {
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, width, height);
};

function mouseMoved(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
};

function clickStart(e) {
    e.preventDefault();
    if (player.checkCollisionWithPoint(mousePos)) {
        // Set Current Player Position as Center Of Rotation
        player.snapTheCenterOfRotation();
        // Make Player Follow Mouse
        player.followMouse = true;
    };
};

function clickEnd(e) {
    e.preventDefault();
    player.followMouse = false;
};

function gameOver() {
    alert("You lost !");
    cancelAnimationFrame(roller);
};

berrySystem.spawn();
main();
