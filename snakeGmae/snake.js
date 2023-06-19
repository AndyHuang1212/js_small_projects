let BLOCK_SIZE = 10;// 每格:20px*20px
let BLOCK_COUNT = 40;// 20格*20格

let gameInterval;
let snake;
let apple;
let score;
let level;

function gameStart() {
    snake = {
        body: [
            { x: BLOCK_COUNT / 2, y: BLOCK_COUNT / 2 }
        ],
        size: 3,
        direction: { x: 1, y: 0 }
    };
    putApple();
    updateScore(0);
    //updateGameLevel(1);
    gameInterval = setInterval(gameRoutine, 100);
}

function updateGameLevel(newLevel) {
    level = newLevel

    if (gameInterval) {
        clearInterval(gameInterval)
    }
    gameInterval = setInterval(gameRoutine, 1000 / (10 + level))
}

function updateScore(newScore) {
    score = newScore;
    document.getElementById("score_id").innerHTML = score;
}

function putApple() {
    apple = {
        x: Math.floor(Math.random() * BLOCK_COUNT),
        y: Math.floor(Math.random() * BLOCK_COUNT)
    }
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.body[i].x === apple.x &&
            snake.body[i].y === apple.y) {
            putApple();
            break;
        }
    }
}

function gameRoutine() {
    moveSnake();
    if (snakeIsDead()) {
        gg();
        return;
    }
    if (snake.body[0].x === apple.x &&
        snake.body[0].y === apple.y) {
        eatApple();
    }
    updateCanvas();
}

function eatApple() {
    snake.size += 1;
    putApple();
    updateScore(score + 1);
}

function snakeIsDead() {
    // hit walls
    if (snake.body[0].x < 0 || snake.body[0].x >= BLOCK_COUNT) {
        return true;
    }
    else if (snake.body[0].y < 0 || snake.body[0].y >= BLOCK_COUNT) {
        return true;
    }
    // hit body
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.body[0].x === snake.body[i].x &&
            snake.body[0].y === snake.body[i].y) {
            return true;
        }
    }
    return false;
}
function gg() {
    clearInterval(gameInterval);
}

function moveSnake() {
    let newBlock = {
        x: snake.body[0].x + snake.direction.x,
        y: snake.body[0].y + snake.direction.y
    };
    snake.body.unshift(newBlock);
    while (snake.body.length > snake.size) {
        snake.body.pop();
    }
}

function updateCanvas() {
    let canvas = document.getElementById("canvas_id");
    let context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "lime";
    for (let i = 0; i < snake.body.length; i++) {
        context.fillRect(
            snake.body[i].x * BLOCK_SIZE + 1,
            snake.body[i].y * BLOCK_SIZE + 1,
            BLOCK_SIZE - 1,
            BLOCK_SIZE - 1
        );
    }

    context.fillStyle = "red";
    context.fillRect(
        apple.x * BLOCK_SIZE + 1,
        apple.y * BLOCK_SIZE + 1,
        BLOCK_SIZE - 1,
        BLOCK_SIZE - 1
    )
}

window.onload = onPageLoaded;

function onPageLoaded() {
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
    if (event.keyCode === 37) {// left arrow
        if (snake.direction.y != 0) {
            snake.direction.y = 0;
            snake.direction.x = -1;
        }
    }
    else if (event.keyCode === 38) {// up arrow
        if (snake.direction.x != 0) {
            snake.direction.y = -1;
            snake.direction.x = 0;
        }
    }
    else if (event.keyCode === 39) {// right arrow
        if (snake.direction.y != 0) {
            snake.direction.y = 0;
            snake.direction.x = 1;
        }
    }
    else if (event.keyCode === 40) {// down arrow 
        if (snake.direction.x != 0) {
            snake.direction.y = 1;
            snake.direction.x = 0;
        }
    }
}