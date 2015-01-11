/* Define Necessary Global variables and Constants
 */
	var rowHeight = 83;
	var colWidth = 101;
	var numEnemies = 5;
	var buffer = 20; //Since the player is not as wide as the tile, we come in from both sides
 
 //Define the Rows and Columns
    var row = [];
    var col = [];
    for (i = 1; i <= 6; i++) {
	    row[i] = -20 + (rowHeight * (i-1));
    }
    for (i = 0; i <= 6; i++) {
	    col[i] = colWidth * (i-1);
    }

//Return a random number between two values
//Source: http://stackoverflow.com/questions/4959975/generate-random-value-between-two-numbers-in-javascript
function randomIntFromInterval(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init(true);
    
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < col[6]) {
    	this.x += this.speed * dt;
	}
	else {
		this.init();
	}
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Initialize the Enemy
Enemy.prototype.init = function(x) {
	if (x === undefined) {
		x = false;
	}
	if (x) {
		this.x = randomIntFromInterval(col[0],col[5]);
	}
	else {
		this.x = col[0];
	}
    this.y = row[randomIntFromInterval(2,4)];
    this.speed = randomIntFromInterval(40,85);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// The Player character
var Player = function () {
	this.sprite = 'images/char-boy.png';
	this.init();
}

// Update the players's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = randomIntFromInterval(40,85) * dt;
}

// Draw the player on the screen, required method for game
// Same as the Enemy prototype above
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
	if (direction === 'up' && this.y > row[1]) {
		this.y -= rowHeight;
		if (this.y === row[1]){
			//Player is in the water
			this.init();
		}
	}
	else if (direction === 'down' && this.y < row[6]) {
		this.y += rowHeight;
	}
	else if (direction === 'left' && this.x > col[1]) {
		this.x -= colWidth;
	}
	else if (direction === 'right' && this.x < col[5]) {
		this.x += colWidth;
	}
}

// Initialize the Player
Player.prototype.init = function() {
	//this.x = 404;
	//this.y = -20;
	this.x = col[randomIntFromInterval(1,5)];
    this.y = row[6];
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (i = 0; i < numEnemies; i++) {
	allEnemies.push(new Enemy());
}
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
