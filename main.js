const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvaSize;
let elementSize


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
    console.log(map, mapRows, mapCols);
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)
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
