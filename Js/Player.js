var Player = function() {
    this.centerOfRotation = {x: 250, y: 250};
    this.x = 250;
    this.y = 200;
    this.radius = 20;
    this.color = "Green";
    this.velocity = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0};
    this.speed = 0.2;
    this.followMouse = false;
    this.score = 0;
    this.killTimer = 0;
};

Player.prototype.drawScore = function() {
    ctx.fillStyle = "DarkGray";
    ctx.font = "100px Arial";
    ctx.fillText("" + this.score, 220, 250);
};

Player.prototype.snapTheCenterOfRotation = function() {
    this.velocity.x = 0;
    this.velocity.y = 0;
    this.centerOfRotation.x = this.x;
    this.centerOfRotation.y = this.y;
};

Player.prototype.run = function() {
    this.drawScore();
    this.update();
    this.draw();
};

Player.prototype.checkCollisionWithPoint = function(point) {
    var distanceX = point.x - this.x;
    var distanceY = point.y - this.y;
    var magnitude = Math.sqrt((distanceX*distanceX)+(distanceY*distanceY));
    if (magnitude <= this.radius) {
        return true;
    };
};

Player.prototype.update = function() {
    if (this.killTimer > 0) {
        this.killTimer--;
    };
    if (this.followMouse == true) {
        this.x = mousePos.x;
        this.y = mousePos.y;
    } else {
        var v = this.getDistanceFromCenterOfRotation();
        this.createProperAcceleration(v);
        this.generateMovement();
    };
};

Player.prototype.draw = function() {
    if (this.followMouse) {
        this.drawCircle("center", this.centerOfRotation.x, this.centerOfRotation.y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "LightGreen";
        ctx.moveTo(this.centerOfRotation.x, this.centerOfRotation.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    };
    this.drawCircle("actual", this.x, this.y);
};

Player.prototype.drawCircle = function(type, x, y) {
    if (type == "center") {
        ctx.fillStyle = "LightGreen";
    } else {
        ctx.fillStyle = "Green";
    };
    ctx.strokeStyle = "Yellow";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2*Math.PI);
    ctx.closePath();
    if (this.killTimer > 0) {ctx.stroke()};
    ctx.fill();
};

Player.prototype.generateMovement = function() {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
};

Player.prototype.getDistanceFromCenterOfRotation = function() {
    var distanceX = this.centerOfRotation.x - this.x;
    var distanceY = this.centerOfRotation.y - this.y;
    var mag = Math.sqrt((distanceX*distanceX)+(distanceY*distanceY));
    return {x: distanceX, y: distanceY, magnitude: mag};
};

Player.prototype.createProperAcceleration = function(vector) {
    this.acceleration.x = (vector.x / vector.magnitude) * this.speed;
    this.acceleration.y = (vector.y / vector.magnitude) * this.speed;
};
