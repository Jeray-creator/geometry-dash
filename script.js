// Elementos del DOM
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");

let playerX = 50; // Posición horizontal inicial
let playerY = 50; // Posición vertical inicial (sobre el suelo)
let playerVelocityY = 0; // Velocidad de salto
let isJumping = false; // Estado de salto
let gravity = 1; // Gravedad
let jumpStrength = 20; // Fuerza del salto
let moveSpeed = 5; // Velocidad de movimiento lateral
let score = 0; // Puntuación

// Obstáculos
let obstacles = [];
let obstacleSpeed = 5;
let obstacleFrequency = 2000; // Tiempo entre generación de obstáculos

// Función para mover el jugador
function movePlayer() {
    // Movimiento de izquierda a derecha
    if (isJumping) {
        playerVelocityY = jumpStrength; // Fuerza inicial del salto
        isJumping = false;
    }

    // Aplicar gravedad al jugador
    if (playerY > 50) {
        playerVelocityY -= gravity; // La gravedad tira del jugador hacia abajo
    }

    // Actualizar la posición Y del jugador
    playerY += playerVelocityY;

    // Si el jugador toca el suelo
    if (playerY <= 50) {
        playerY = 50;
        playerVelocityY = 0;
    }

    // Actualizamos la posición del jugador
    player.style.bottom = `${playerY}px`;
}

// Función para generar obstáculos
function generateObstacle() {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    let obstacleX = window.innerWidth; // Aparece en el borde derecho de la pantalla
    obstacle.style.left = `${obstacleX}px`;
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Función para mover los obstáculos
function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        let obstacleX = parseInt(obstacle.style.left);
        obstacleX -= obstacleSpeed; // Los obstáculos se mueven hacia el jugador

        // Si el obstáculo se sale de la pantalla, lo eliminamos
        if (obstacleX < -50) {
            obstacle.remove();
            obstacles.splice(index, 1);
        } else {
            obstacle.style.left = `${obstacleX}px`;
        }

        // Verificar si el jugador colisiona con un obstáculo
        if (obstacleX < playerX + 50 && obstacleX + 50 > playerX && playerY <= 50) {
            gameOver();
        }
    });
}

// Función de salto
function jump() {
    if (playerY <= 50) { // Solo saltar si el jugador está en el suelo
        isJumping = true;
    }
}

// Detectar las teclas presionadas
document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowRight") {
        playerX += moveSpeed; // Mover a la derecha
    } else if (event.code === "ArrowLeft") {
        playerX -= moveSpeed; // Mover a la izquierda
    } else if (event.code === "Space") {
        jump(); // Salto
    }

    // Actualizamos la posición horizontal
    player.style.left = `${playerX}px`;
});

// Función para aumentar la puntuación
function updateScore() {
    score += 1;
    scoreDisplay.innerText = score;
}

// Función de game over - reinicio inmediato
function gameOver() {
    // Aquí recargamos la página inmediatamente después de la colisión.
    location.reload(); // Recargar la página para reiniciar el juego
}

// Intervalo para generar obstáculos
setInterval(generateObstacle, obstacleFrequency);

// Intervalo para actualizar la puntuación
setInterval(updateScore, 1000);

// Bucle de animación
function gameLoop() {
    movePlayer();
    moveObstacles();
    requestAnimationFrame(gameLoop); // Continuar con el siguiente frame
}

gameLoop(); // Iniciar el bucle del juego
