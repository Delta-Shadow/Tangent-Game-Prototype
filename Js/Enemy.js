var EnemySystem = function() {
    this.enemies = [];
    this.enemyCap = 10;
};

EnemySystem.prototype.spawn = function() {
    if (this.enemies.length <= this.enemyCap) {
        var x = Math.floor(Math.random() * 500);
        var y = Math.floor(Math.random() * 500);
        var vX = Math.floor(Math.random() * 5);
        var vY = Math.floor(Math.random() * 5);
        var o = new Enemy(x, y, vX, vY);
        this.enemies.push(o);
    };
};

EnemySystem.prototype.run = function() {
    for (var i in this.enemies) {
        if (this.enemies[i].checkCollisionWithPlayer()) {
            gameOver();
        } else {
            this.enemies[i].handleCollisionWithEdges();
            this.enemies[i].update();
            this.enemies[i].draw();
        };
    };
};

var Enemy = function(x, y, vX, vY) {
    this.x = x;
    this.y = y;
    this.velocity = {x: vX, y: vY};
    this.radius = 30;
    this.color = "Red";
};

Enemy.prototype.handleCollisionWithEdges = function() {
    if (this.x <= 0 || this.x >= width || this.y <= 0|| this.y >= height) {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = -this.velocity.y;
    };
};

Enemy.prototype.checkCollisionWithPlayer = function() {
    var distanceX = player.x - this.x;
    var distanceY = player.y - this.y;
    var magnitude = Math.sqrt((distanceX*distanceX)+(distanceY*distanceY));
    if (magnitude < (this.radius + player.radius)) {
        return true;
    } else {
        return false;
    };
};

Enemy.prototype.update = function() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Enemy.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
};
