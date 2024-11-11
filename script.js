// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

let response = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;



async function questions() {
  let res = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple");
  let data = await res.json();
  response = data.results;  
  console.log(response);
  showQuestion();  
}

function makeVisual() {
  let title = document.createElement("h1");
  let text = document.createTextNode("Quiz Halloween: Category 'COMPUTERS'");
  title.appendChild(text);

  
  let divGeneralContainer = document.createElement("div");
  let divQuestions = document.createElement("div");
  let divAnswers = document.createElement("div");
  divAnswers.id = "answers";

  // Botón para mostrar las preguntas
  let showQuestionButton = document.createElement("button");
  showQuestionButton.textContent = "Reload Quiz";
  showQuestionButton.addEventListener("click", showQuestion);

  divQuestions.appendChild(showQuestionButton);
  divGeneralContainer.appendChild(title);
  divGeneralContainer.appendChild(divQuestions);
  divGeneralContainer.appendChild(divAnswers);


  document.body.appendChild(divGeneralContainer);
  questions();
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
   
  }else {
    
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
  location.href = 'result.html';
}
