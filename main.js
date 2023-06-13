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
    game.textAlign = 'right'
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize)        
    } 
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
