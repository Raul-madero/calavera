const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const playerPosition = {
    x: undefined,
    y: undefined
}
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
    const map = maps[0]
    const mapRows = map.trim().split('\n')
    const mapCols = mapRows.map(row => row.trim().split(''))
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)
            if(col == 'O') {
                playerPosition.x = posX
                playerPosition.y = posY
            }
            game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
            game.fillText(emoji, posX, posY)
        })
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
function moveUp(event) {
    playerPosition.y - 5px
}
function moveLeft() {
    console.log('Me quiero mover hacia izquierda')
}
function moveRight() {
    console.log('Me quiero mover hacia derecha')
}
function moveDown() {
    console.log('Me quiero mover hacia abajo')
}
function moveKeys(event){
    if(event.key == "ArrowUp") moveUp()
    else if(event.key == "ArrowLeft")  moveLeft()
    else if(event.key == "ArrowRight")  moveRight()
    else if(event.key == "ArrowDown") moveDown()
}