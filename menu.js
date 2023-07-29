// Obtener elementos del DOM
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const dataPage = document.getElementById('data-page'); // Agregado: Obtener elemento del DOM para la página de datos


// Función para iniciar el juego
function startGame() {
  // Ocultar la pantalla de inicio
  startScreen.style.display = 'none';

  // Mostrar el contenedor del juego
  gameContainer.style.display = 'block';

  // Lógica para comenzar el juego
  // ...
}

// Función para verificar la respuesta
function checkAnswer(option) {
  // Lógica para verificar la respuesta seleccionada
  // ...
}

// Función para redireccionar a la página de juego
function goToGamePage() {
  window.location.href = 'Juego.html';
}

// Función para abrir la configuración
function openSettings() {
  window.location.href = 'Configuraciones.html';
}

// Función para abrir las instrucciones
function openInstructions() {
  window.location.href = 'Instrucciones.html';
}

// Función para regresar al menú principal
function goBack() {
  window.location.href = 'index.html';
}

// Función para abrir la página de datos
function openData() {
  // Ocultar el menú principal
  window.location.href = 'Datos.html';

  // Mostrar la página de datos
  dataPage.style.display = 'block';
}

// Función para redireccionar a la página de registro
function goToRegisterPage() {
  window.location.href = 'register.html';
}

function buttonHover(button) {
  button.classList.toggle('button-hover');
}

// Agregar eventos a los elementos
document.getElementById('start-game-btn').addEventListener('click', goToGamePage);
document.getElementById('register-btn').addEventListener('click', goToRegisterPage); // Agregar evento onclick al botón de registro
document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', () => checkAnswer(option));
});
document.getElementById('settings-btn').addEventListener('click', openSettings);
document.getElementById('instructions-btn').addEventListener('click', openInstructions);
document.getElementById('data-btn').addEventListener('click', openData);

