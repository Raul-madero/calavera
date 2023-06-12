const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');


window.addEventListener('load', startGame);
function startGame() {
    //Como vamos a llenar el rectangulo 
    // game.fillRect(0,0,100,100)
    //Para borrar el rectangulo
    // game.clearRect(0,0,50,50)
    // Agregar Texto
    game.font = '25px Verdana'
    game.fillStyle = 'purple'
    game.textAlign = 'center'
    game.fillText('Rulax', 100, 100)
}