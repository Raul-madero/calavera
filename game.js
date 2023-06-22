const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanMinutes = document.querySelector('#minutes')
const spanRecord = document.querySelector('#record')
const record = localStorage.getItem('newRecord')
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timeStart
let timePlayer
let timeInterval
let minutes = 0
let totalTime
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
let enemyPositions = [];

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}
function startGame() {

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if(!timeStart) {
        timeCount()
    }
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    enemyPositions = [];
    game.clearRect(0,0,canvasSize, canvasSize);

    mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);

        if (col == 'O') {
            if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
            }
        } else if (col == 'I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
        } else if (col == 'X') {
            enemyPositions.push({
            x: posX,
            y: posY,
            });
        }

        game.fillText(emoji, posX, posY);
        });
        });
        spanRecord.innerHTML = record
    showTime()
    fillLives()
    movePlayer();
}
function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    const enemyCollision = enemyPositions.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}
function levelWin() {
    level++;
    startGame();
}
function levelFail() {
    console.log('Chocaste contra un enemigo');
    playerPosition.x = undefined
    playerPosition.y = undefined
    lives--
    if(lives == 0) {
        timeStart = undefined
        lives = 3
        level = 0
        startGame()
    }else {
        startGame()
    }
}
function fillLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives)
}
function timeCount() {
    timeStart = Date.now()
    timeInterval = setInterval(showTime, 100)
}
function showTime() {
    let seconds = Math.floor((Date.now() - timeStart) / 1000)
    if(seconds <= 59) {
        spanTime.innerHTML = seconds
    }else {
        clearInterval(timeInterval)
        timeCount()
        seconds = Math.floor((Date.now() - timeStart) / 1000)
        minutes++
        spanMinutes.innerHTML = minutes + ':'
        spanTime.innerHTML = seconds
    }
    totalTime = (minutes * 60) + seconds
}
function saveRecord() {
    if(localStorage.getItem('newRecord') == undefined) {
        localStorage.setItem('newRecord', totalTime + ' segundos')
    }else if(localStorage.getItem('newRecord') > totalTime) {
        localStorage.setItem('newRecord', totalTime + ' segundos')
    }
    
}
function gameWin() {
    saveRecord()
    clearInterval(timeInterval)
}
function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp() {

    if (Math.floor((playerPosition.y - elementsSize)) < Math.floor(elementsSize)) {
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}
function moveLeft() {

    if (Math.floor((playerPosition.x - elementsSize)) < Math.floor(elementsSize)) {
        console.log('OUT');
} else {
    playerPosition.x -= elementsSize;
    startGame();
}
}
function moveRight() {

    if (Math.floor((playerPosition.x + elementsSize)) > Math.floor(canvasSize)) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {

    if (Math.floor((playerPosition.y + elementsSize)) > Math.floor(canvasSize)) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}