// Variables globales del temporizador
var timerInterval;
var timerActive = false;
var customTimerValue = 60;
var selectedContinent = "";
var score = 0;
var bestScore = 0;
var currentQuestion = 0; // Agrega esta línea para inicializar currentQuestion


var questions = [
  {
    continent: "Asia",
    country: "Afganistán",
    capital: "Kabul",
    population: "37.17 millones",
    language: "Dari, Pashto",
    currency: "Afghani",
    attractions: ["Herat", "Mazar-i-Sharif", "Kandahar"],
    flagImage: "Imagenes/Afganistán.png"
  },
  {
    continent: "Europa",
    country: "Albania",
    capital: "Tirana",
    population: "2.86 millones",
    language: "Albanés",
    currency: "Lek",
    attractions: ["Durrës", "Vlorë", "Shkodër"],
    flagImage: "Imagenes/Albania.png"
  }
];

function loadQuestion() {
  hideIncorrectMessage();
  
  var question = getFilteredQuestions()[currentQuestion];

  var flagImage = document.getElementById("flag-image");
  flagImage.src = question.flagImage;

  var questionElement = document.getElementById("question");
  questionElement.textContent = "¿Cuál es la capital de " + question.country + "?";

  var optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  var allOptions = question.attractions.concat(question.capital);
  allOptions = shuffleArray(allOptions);

  for (var i = 0; i < allOptions.length; i++) {
    var isCorrect = allOptions[i] === question.capital;
    var option = createOption(allOptions[i], isCorrect);
    optionsContainer.appendChild(option);
  }

  var infoContainer = document.createElement("div");
  infoContainer.className = "additional-info";

  var continent = document.createElement("p");
  continent.textContent = "Continente: " + question.continent;
  infoContainer.appendChild(continent);

  var attractions = document.createElement("p");
  attractions.textContent = "Atracciones: " + question.attractions.join(", ");
  infoContainer.appendChild(attractions);

  var population = document.createElement("p");
  population.textContent = "Población: " + question.population;
  infoContainer.appendChild(population);

  var language = document.createElement("p");
  language.textContent = "Idioma: " + question.language;
  infoContainer.appendChild(language);

  var currency = document.createElement("p");
  currency.textContent = "Moneda: " + question.currency;
  infoContainer.appendChild(currency);

  optionsContainer.appendChild(infoContainer);
}

function createOption(text, isCorrect) {
  var optionDiv = document.createElement("div");
  optionDiv.className = "option";

  var span = document.createElement("span");
  span.textContent = text;

  if (isCorrect) {
    span.classList.add("correct-option");
  }

  span.addEventListener("click", function (event) {
    checkAnswer(event, isCorrect);
  });

  optionDiv.appendChild(span);
  return optionDiv;
}

function shuffleArray(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function checkAnswer(event, isCorrect) {
  if (timerActive) {
    clearInterval(timerInterval);
    timerActive = false;
  }

  var selectedOption = event.target.textContent;
  var question = getFilteredQuestions()[currentQuestion];
  var answeredCorrectly = false;

  if (isCorrect && selectedOption === question.capital) {
    answeredCorrectly = true;
    score += 10;
    document.getElementById("audio-correct").play();
  } else if (!isCorrect && selectedOption !== question.capital) {
    answeredCorrectly = false;
    score -= Math.floor(score * 0.5);
    document.getElementById("audio-incorrect").play();
    showIncorrectMessage();
  }

  updateScore();

  if (answeredCorrectly) {
    if (currentQuestion < getFilteredQuestions().length) {
      currentQuestion++;
      loadQuestion();
      if (timerActive) {
        startTimer();
      }
    } else {
      endGame();
    }
  }
}

function generateIncorrectOptions(attractions, correctOption, numOptions) {
  var options = [];
  var shuffledAttractions = shuffleArray(attractions);
  for (var i = 0; i < numOptions; i++) {
    if (shuffledAttractions[i] !== correctOption) {
      options.push(shuffledAttractions[i]);
    }
  }
  return options;
}

function updateScore() {
  var scoreElement = document.getElementById("score");
  scoreElement.textContent = score.toString();
}

function showIncorrectMessage() {
  var incorrectTitle = document.getElementById("incorrect-title");
  incorrectTitle.classList.remove("hidden");
}

function resetGame() {
  score = 0;
  currentQuestion = 0;
  updateScore();
  loadQuestion();
  hideIncorrectMessage();
}

function endGame() {
  if (score > bestScore) {
    bestScore = score;
  }

  var messageContainer = document.getElementById("message-container");
  messageContainer.innerHTML = "";

  var message = document.createElement("h3");
  message.textContent = "¡Fin del juego!";
  messageContainer.appendChild(message);

  var finalScore = document.createElement("p");
  finalScore.textContent = "Puntuación final: " + score;
  messageContainer.appendChild(finalScore);

  var bestScoreElement = document.createElement("p");
  bestScoreElement.textContent = "Mejor puntuación: " + bestScore;
  messageContainer.appendChild(bestScoreElement);

  var nextBtn = document.getElementById("next-btn");
  nextBtn.style.display = "block";

  var redirectBtn = document.getElementById("redirect-btn");
  redirectBtn.style.display = "block";

  var optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  var timerContainer = document.querySelector(".timer-container");
  timerContainer.classList.add("hidden");
}

function toggleTimer() {
  var timerToggle = document.getElementById("timer-toggle");
  var timerInput = document.getElementById("timer-input");

  if (timerToggle.checked) {
    timerActive = true;
    timerSeconds = parseInt(timerInput.value); // Obtenemos el valor del input y lo establecemos como el tiempo del temporizador
    startTimer();
  } else {
    timerActive = false;
    clearInterval(timerInterval);
  }
}

// ... (tu código JavaScript) ...
function updateCustomTimer() {
  var customTimerInput = document.getElementById("custom-timer-input");
  customTimerValue = parseInt(customTimerInput.value);
}

function startTimer() {
  var timerSpan = document.getElementById("timer-input");
  var timerValue = customTimerValue;

  timerActive = true;

  timerInterval = setInterval(function () {
    timerValue--;
    timerSpan.value = timerValue.toString();

    if (timerValue === 0) {
      clearInterval(timerInterval);
      timerActive = false;
      endGame();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerActive = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerActive = false;
  var timerSpan = document.getElementById("timer-input");
  timerSpan.value = customTimerValue.toString(); // Reiniciar el temporizador al valor personalizado
}

function setCustomTimer() {
  var customTimerInput = document.getElementById("custom-timer-input");
  customTimerValue = parseInt(customTimerInput.value);
}

function hideIncorrectMessage() {
  var incorrectTitle = document.getElementById("incorrect-title");
  incorrectTitle.classList.add("hidden");
}

function getFilteredQuestions() {
  if (selectedContinent === "") {
    return questions;
  } else {
    return questions.filter(function (question) {
      return question.continent === selectedContinent;
    });
  }
}

function filterByContinent() {
  var continentSelect = document.getElementById("continent-select");
  selectedContinent = continentSelect.value;
  resetGame();
}

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
});