// board
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake 
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;     

// food
var foodX;
var foodY;

var velocityX = 0;
var velocityY = 0;


window.onload = function() {

    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width  = cols * blocksize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);

    setInterval( function update () {
    
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);

        context.fillStyle = "red";
        context.fillRect(foodX, foodY, blocksize, blocksize);

        if (foodX === snakeX && foodY === snakeY) {
            placeFood();

        }

        context.fillStyle = "lime";
        snakeX += velocityX;
        snakeY += velocityY;
        context.fillRect(snakeX, snakeY, blocksize, blocksize);
    
    
    }, 1000/10 );    

}



function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
    
}

function changeDirection(e) {

    if (e.code === "ArrowUp") {
        velocityX = 0;
        velocityY = -1 * blocksize;
    }
    else if (e.code === "ArrowDown") {
        velocityX = 0;
        velocityY = 1 * blocksize;
    }
    else if (e.code === "ArrowLeft") {
        velocityX = -1 * blocksize;
        velocityY =  0;
    }
    else if (e.code === "ArrowRight") {
        velocityX = 1 * blocksize;
        velocityY = 0;
    }

}