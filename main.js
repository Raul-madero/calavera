const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition = {
    x: undefined,
    y: undefined,
}
let map = maps[0]
let enemyPositions = []
let canvaSize;
let elementSize

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)
window.addEventListener('keydown', moveKeys)
window.addEventListener('load', setCanvaSize);
window.addEventListener('resize', setCanvaSize)
// function startGame() {
//     setCanvaSize();
       
// }
function setCanvaSize() {
    if(window.innerHeight > window.innerWidth) {
        canvaSize = window.innerWidth * 0.9;
    }else {
        canvaSize = window.innerHeight * 0.9;
    }
    canvas.setAttribute('width', canvaSize)
    canvas.setAttribute('height', canvaSize)
    elementSize = canvaSize / 10
    fillMap()
}
function fillMap() {
    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'
    const mapRows = map.trim().split('\n')
    const mapCols = mapRows.map(row => row.trim().split(''))
    game.clearRect(0,0,canvaSize,canvaSize)
    enemyPositions = []
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)
            if(col == 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                }
            }else if(col == 'I') {
                giftPosition.x = posX
                giftPosition.y = posY
            }else if(col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }
            game.fillText(emoji, posX, posY)
        })
        movePlayer()
    });
    // for (let x = 1; x <= 10; x++) {
    //     for (let y = 1; y <= 10; y++) {
    //         game.fillText(emojis[mapCols[x - 1][y - 1]], elementSize * y, elementSize * x)        
    //     }
    // } 
}
    //Como vamos a llenar el rectangulo 
    // game.fillRect(0,0,100,100)
    //Para borrar el rectangulo
    // game.clearRect(0,0,50,50)
    // Agregar Texto
    // game.font = '25px Verdana'
    // game.fillStyle = 'purple'
    // game.textAlign = 'center'
    // game.fillText('Rulax', 100, 100)
function moveUp() {
    if(Math.floor(playerPosition.y - elementSize) < Math.floor(elementSize)) {
        console.log('Out');
    }else {
        playerPosition.y -= elementSize
        fillMap()
    }
}
function moveLeft() {
    if(Math.floor(playerPosition.x - elementSize) < Math.floor(elementSize)) {
        console.log('Out');
    }else {
        playerPosition.x -= elementSize
        fillMap()
    }
}
function moveRight() {
    if(Math.floor(playerPosition.x + elementSize) > canvaSize) {
        console.log('Out');
    }else {
        playerPosition.x += elementSize
        fillMap()
    }
}
function moveDown() {
    if(Math.floor(playerPosition.y + elementSize) > canvaSize) {
        console.log('Out');
    }else {
        playerPosition.y += elementSize
        fillMap()
    }
}
function moveKeys(event){
    if(event.key == "ArrowUp") moveUp()
    else if(event.key == "ArrowLeft")  moveLeft()
    else if(event.key == "ArrowRight")  moveRight()
    else if(event.key == "ArrowDown") moveDown()
}
function movePlayer(){
    const giftColisionX = Math.floor(playerPosition.x) == Math.floor(giftPosition.x)
    const giftColisionY = Math.floor(playerPosition.y) == Math.floor(giftPosition.y)
    const giftCollision = giftColisionX && giftColisionY
    if(giftCollision) {
        map = map + 1
    }
    const enemyCollision = enemyPositions.find(enemy => {
        const enemyColissionX = Math.floor(enemy.x) == Math.floor(playerPosition.x)
        const enemyColisionY = Math.floor(enemy.y) == Math.floor(playerPosition.y)
        return enemyColissionX && enemyColisionY
    })
    if(enemyCollision) {
        console.log('Chocaste con una bomba');
    }
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}