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
document.addEventListener("touchstart", touchStart, false);
document.addEventListener("touchend", touchEnd, false);

var player = new Player();
var enemySystem = new EnemySystem();
var berrySystem = new BerrySystem();
var powerPelletSystem = new PowerPelletSystem();

function main() {
    roller = requestAnimFrame(main);
    ctx.clearRect(0, 0, width, height);
    ticker++;
    
    drawBackground();
    if (ticker % 100 == 0) {enemySystem.spawn()};
    if (ticker % 400 == 0) {powerPelletSystem.spawn()};

    player.run();
    enemySystem.run();
    berrySystem.run();
    powerPelletSystem.run();
};

function drawBackground() {
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, width, height);
};

function mouseMoved(e) {
    e.preventDefault();
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

function touchMoved(e) {
    e.preventDefault();
    mousePos.x = e.changedTouches[0].clientX;
    mousePos.y = e.changedTouches[0].clientY;
};

function touchStart(e) {
    e.preventDefault();
    if (player.checkCollisionWithPoint(mousePos)) {
        // Set Current Player Position as Center Of Rotation
        player.snapTheCenterOfRotation();
        // Make Player Follow Mouse
        player.followMouse = true;
    };
};

function touchEnd(e) {
    e.preventDefault();
    player.followMouse = false;
};

function gameOver() {
    alert("You lost !");
    cancelAnimationFrame(roller);
};

berrySystem.spawn();
main();
