var PowerPelletSystem = function() {
    this.berries = [];
};

PowerPelletSystem.prototype.spawn = function() {
    var x = Math.floor(Math.random() * 500);
    var y = Math.floor(Math.random() * 500);
    var o = new PowerPellet(x, y);
    this.berries.push(o);
};

PowerPelletSystem.prototype.run = function() {
    for (var i in this.berries) {
        if (this.berries[i].checkCollisionWithPlayer()) {
            player.killTimer = 300;
            console.log("Can Kill");
            delete this.berries[i];
        } else {
            this.berries[i].update();
            this.berries[i].draw();
        };
    };
};

var PowerPellet = function(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.color = "Yellow";
};

PowerPellet.prototype.checkCollisionWithPlayer = function() {
    var distanceX = player.x - this.x;
    var distanceY = player.y - this.y;
    var magnitude = Math.sqrt((distanceX*distanceX)+(distanceY*distanceY));
    if (magnitude < (this.radius + player.radius)) {
        return true;
    } else {
        return false;
    };
};

PowerPellet.prototype.update = function() {
};

PowerPellet.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
};
