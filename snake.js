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

var snakebody = [];
var score = 0;

var gameOver = false;

window.onload = function() {

    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width  = cols * blocksize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);

    document.getElementById("restartBtn").addEventListener("click", restartGame);

    setInterval( function update () {
        
        if (gameOver){
            return;
        }
        context.fillStyle = "black";
        context.fillRect(0, 0, board.width, board.height);

        context.fillStyle = "red";
        context.fillRect(foodX, foodY, blocksize, blocksize);

        if (foodX === snakeX && foodY === snakeY) {
            snakebody.push([foodX, foodY]);
            score += 10;
            document.getElementById("score").innerText = "Score: " + score;
            placeFood();
        }

        for (let i = snakebody.length-1; i > 0; i--){
            snakebody[i] = snakebody[i-1];
        }

        if(snakebody.length){
            snakebody[0] = [snakeX, snakeY];
        }

        context.fillStyle = "lime";
        snakeX += velocityX * blocksize;
        snakeY += velocityY * blocksize;
        context.fillRect(snakeX, snakeY, blocksize, blocksize);

        for (let i = 0; i < snakebody.length; i++){
            context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize)    
        }

        // How Game will be Over 

        if (snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize ) {
            gameOver = true;
            alert( " GAME---OVER ");
        }

        for (let i = 0; i < snakebody.length; i++) {

            if( snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
                gameOver = true;          
                alert( " GAME---OVER ");
            }
        }

        
    }, 1000/10 );    

}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;   
}

function changeDirection(e) {
    
    if ((e.code == "ArrowUp" || e.code == "KeyW") && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if ((e.code == "ArrowDown" || e.code == "KeyS") && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if ((e.code == "ArrowLeft" || e.code == "KeyA") && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if ((e.code == "ArrowRight" || e.code == "KeyD") && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function restartGame() {
    gameOver = false;
    snakeX = blocksize * 5;
    snakeY = blocksize * 5;
    velocityX = 0;
    velocityY = 0;
    snakebody = [];
    score = 0;
    document.getElementById("score").innerText = "Score: " + score;
    placeFood();
}
