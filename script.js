/*Declarando as variáveis para serem utilizadas*/
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
/*Criando a tela de fundo*/
function criarBG(){
    context.fillStyle = "black";
    context.fillRect(0, 0, 16*box, 16*box);
}
/*Criando a cobrinha*/
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
/*Criando o alimento da cobrinha*/
function drawFood(){
    context.fillStyle = "yellow";
    context.fillRect(food.x, food.y, box, box);
}
/*interagindo com a cobrinha*/
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}
/*Criando a função para iniciar o jogo*/
function iniciarJogo(){
    /*implementando os limites da cobrinha*/
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    /*criando a função de colisão*/
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }
    /*criando o background da tela, cobrinha e comida*/
    criarBG();
    criarCobrinha();
    drawFood();
    /*local onde a cobrinha vai inicair o jogo*/
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    /*criando as direções da cobrinha*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    /*Definindo os movimentos da cobrinha*/
    /*Criando o crescimento da cobrinha*/
    if(snakeX != food.x || snakeY != food.y){
        /*criando a função para sumir com o último elemento da cobrinha e fazer andar.*/
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    /*fazendo a cabeça da cobrinha*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
