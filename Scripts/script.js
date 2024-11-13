// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

//https://opentdb.com/api.php?amount=10&type=multiple

let response = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let questionsaved = [];




async function questions() {
  let res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  let data = await res.json();
  response = data.results;
  console.log(response);
  showQuestion();
}

function makeVisual() {
  let title = document.createElement("h1");
  let text = document.createTextNode("Quiz Halloween: multiple Categories");
  title.appendChild(text);


  let divGeneralContainer = document.createElement("div");
  let divQuestions = document.createElement("div");
  let divAnswers = document.createElement("div");
  divAnswers.id = "answers";

  // Botón para mostrar las preguntas
  let showQuestionButton = document.createElement("button");
  showQuestionButton.textContent = "Reload Quiz";
  showQuestionButton.addEventListener("click", showQuestion);

  // Para mis propias preguntas
  let divMyQuestions = document.createElement("div");
  divMyQuestions.id = "my-questions";


  let startMyQuestions = document.createElement("button");
  startMyQuestions.textContent = "Start My Quiz";
  startMyQuestions.addEventListener("click", goToQuiz)
  startMyQuestions.id = "myQuestions-quiz";


  divMyQuestions.appendChild(startMyQuestions);
  divQuestions.appendChild(showQuestionButton);

  divGeneralContainer.appendChild(title);
  divGeneralContainer.appendChild(divQuestions);
  divGeneralContainer.appendChild(divMyQuestions)
  divGeneralContainer.appendChild(divAnswers);





  document.body.appendChild(divGeneralContainer);

  myquestions();
}
makeVisual();

function showQuestion() {

  let divAnswers = document.getElementById("answers");



  // Verificar si se han mostrado todas las preguntas
  if (currentQuestionIndex < response.length) {
    divAnswers.innerHTML = "";


    // Obtener las preguntas y las respuestas
    let question = decodeHtmlCode(response[currentQuestionIndex].question);
    let correctAnswer = decodeHtmlCode(response[currentQuestionIndex].correct_answer);
    let incorrectAnswers = response[currentQuestionIndex].incorrect_answers.map(decodeHtmlCode);


    // mezcla las respuestas
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers = allAnswers.sort(() => Math.random() - 0.5);

    // mostrar la pregunta
    let questionP = document.createElement("p");
    questionP.innerHTML = question;
    divAnswers.appendChild(questionP);

    // mostrar las respuestas
    allAnswers.forEach((answer) => {
      let answerCard = document.createElement("div");
      answerCard.classList.add("answer-card");
      answerCard.textContent = answer;

      // Cuando se elige una respuesta, se verifica si es correcta o incorrecta
      answerCard.addEventListener("click", () => handleAnswer(answer, correctAnswer, answerCard));

      divAnswers.appendChild(answerCard);
    });

    // Subtítulo
    let subtitle = document.createElement("h2");
    let textsubtitle = document.createTextNode("Elige una respuesta para pasar a la siguiente pregunta.");
    subtitle.appendChild(textsubtitle);
    divAnswers.appendChild(subtitle)

    currentQuestionIndex++;

  } else {

    alert(`Has completado el quiz! Respuestas correctas: ${correctCount}, Respuestas incorrectas: ${incorrectCount}`);

    // Guardar los resultados de la partida
    saveGameResult(correctCount, incorrectCount);

    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    questions();
  }

}
// Función para verificar la respuesta
function handleAnswer(selectedAnswer, correctAnswer, answerCard) {
  if (selectedAnswer === correctAnswer) {
    correctCount++;
    answerCard.classList.add("correct");;
    setTimeout(() => {
      // alert("¡Correcto!");
      showQuestion();
    }, 300);
  } else {
    incorrectCount++;
    answerCard.classList.add("incorrect");
    setTimeout(() => {
      // alert("Incorrecto.");
      showQuestion();
    }, 300);

  }

}
// Función para decodificar el texto HTML  
// Función con la que me ayudado Jaime
function decodeHtmlCode(encodeText) {
  let textArea = document.createElement('textarea');
  textArea.innerHTML = encodeText;
  return textArea.value;
}

// Crear un array para el historial de partidas
let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
// Función para guardar el resultado de la partida
function saveGameResult(correctCount, incorrectCount) {
  let gameResult = {
    correct: correctCount,
    incorrect: incorrectCount,
    date: new Date().toLocaleString()
  };

  gameHistory.push(gameResult);
  localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  location.href = '../Html/results.html';
}







// Utilizar mis propias preguntas para el quiz

function myquestions() {

  let myquestions = [
    {
      "question1": "¿Quién pintó Las meninas?",
      "correct_answer": "Diego Velázquez",
      "incorrect_answer": ["Francisco de Goya", "Salvador Dalí"]
    },
    {
      "question2": "¿Cuál es la capital de Hungría?",
      "correct_answer": "Budapest",
      "incorrect_answer": ["Praga", "Viena", "Estambul"]


    },
    {
      "question3": "Aproximadamente, ¿cuántos huesos tiene el cuerpo humano?",
      "correct_answer": "206 ",
      "incorrect_answer": ["40", "208"]
    },
    {
      "question4": "¿El río más largo de España?",
      "correct_answer": "El río Tajo",
      "incorrect_answer": ["Río Guadiana", "Río Duero", "Río Guadalquivir"]


    },
    {
      "question5": "¿Cuál es el océano más grande?",
      "correct_answer": "Océano Pacífico ",
      "incorrect_answer": ["Océano Atlántico", "Océano Índico", "Océano Antártico", "Océno Ártico"]
    },
    {
      "question6": "¿De dónde son originarios juegos olímpicos?",
      "correct_answer": "Grecia",
      "incorrect_answer": ["Roma", "Creta", "Londres"]


    },
    {
      "question7": "¿Cuál fue la primera película de Walt Disney?",
      "correct_answer": "Blancanieves y los siete enanitos ",
      "incorrect_answer": ["Mickey Mouse", "La sirenita"]
    },
    {
      "question8": ". ¿Cuántos satélites tenemos orbitando alrededor de la tierra?",
      "correct_answer": "4.256 satélites",
      "incorrect_answer": ["1419 satélites", "150 satélites", "8500 satélites"]


    },
    {
      "question9": "¿Cuántas veces parpadea por semana una persona?",
      "correct_answer": "25.000 veces",
      "incorrect_answer": ["1.500 veces", "55.000 veces"]
    },
    {
      "question10": " ¿Ciudad más poblada mundo?",
      "correct_answer": "Tokio",
      "incorrect_answer": ["Praga", "Buenos Aires", "Estambul"]


    }

  ]


  localStorage.setItem("myQuestions", JSON.stringify(myquestions));




}



function goToQuiz() {

  let divAnswers = document.getElementById("answers");



  let getQuestions = JSON.parse(localStorage.getItem("myQuestions"));

  if (currentQuestionIndex < getQuestions.length) {
    let question = getQuestions[currentQuestionIndex].question;
    let correctAnsw = getQuestions[currentQuestionIndex].correct_answer;
    let incorrectAnsw = getQuestions[currentQuestionIndex].incorrect_answer;

    // mezcla las respuestas
    let allAnswers = [correctAnsw, ...incorrectAnsw];
    allAnswers = allAnswers.sort(() => Math.random() - 0.5);

    // mostrar la pregunta
    let questionP = document.createElement("p");
    questionP.innerHTML = question;
    divAnswers.appendChild(questionP);
  

  allAnswers.forEach((answer) => {
    let answerCard = document.createElement("div");
    answerCard.classList.add("answer-card");
    answerCard.textContent = answer;

    // Cuando se elige una respuesta, se verifica si es correcta o incorrecta
    answerCard.addEventListener("click", () => handleAnswer(answer, correctAnsw, answerCard));

    divAnswers.appendChild(answerCard);
  });


  // Subtítulo
  let subtitle = document.createElement("h2");
  let textsubtitle = document.createTextNode("Elige una respuesta para pasar a la siguiente pregunta.");
  subtitle.appendChild(textsubtitle);
  divAnswers.appendChild(subtitle)

  currentQuestionIndex++;

}else {

  alert(`Has completado el quiz! Respuestas correctas: ${correctCount}, Respuestas incorrectas: ${incorrectCount}`);

  // Guardar los resultados de la partida
  saveGameResult(correctCount, incorrectCount);

  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;

}
    


}