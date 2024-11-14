// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

//https://opentdb.com/api.php?amount=10&type=multiple

let response = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let myQuestionsIndex = 0;



async function questions() {
  currentQuestionIndex = 0;
  let res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  let data = await res.json();
  response = data.results;
  console.log(response);
  showQuestion();
}

function makeVisual() {
  let title = document.createElement("h1");
  let text = document.createTextNode("Quiz Halloween: Choose Quiz ");
  title.appendChild(text);


  let divGeneralContainer = document.createElement("div");
  let divQuestions = document.createElement("div");
  let divAnswers = document.createElement("div");
  divAnswers.id = "answers";
  divAnswers.style.display = "none";

  // Button para mostrar las preguntas
  let showQuestionButton = document.createElement("button");
  showQuestionButton.textContent = "Begin Api Quiz";
  showQuestionButton.addEventListener("click", () => {
    document.getElementById("answers").innerHTML = "";
    questions();
  });

  // Para mis propias preguntas
  let divMyQuestions = document.createElement("div");
  divMyQuestions.id = "my-questions";

  // Button para mis propias preguntas
  let startMyQuestions = document.createElement("button");
  startMyQuestions.textContent = " Mi Quiz";
  startMyQuestions.addEventListener("click",() => {
    document.getElementById("answers").innerHTML = "";
    myQuestionsIndex = 0;
    goToQuiz();
  } );
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

// función para las preguntas api
function showQuestion() {

  let divAnswers = document.getElementById("answers");
  divAnswers.style.display = "block";

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

    // Mensaje en el div, despúes de las respuetas
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
// Creo un array de preguntas
function myquestions() {

  let myquestions = [
    {
      "question": "1.¿Quién pintó Las meninas?",
      "correct_answer": "Diego Velázquez",
      "incorrect_answer": ["Francisco de Goya", "Salvador Dalí", "Pablo Picasso"]
    },
    {
      "question": "2.¿Cuál es la capital de Hungría?",
      "correct_answer": "Budapest",
      "incorrect_answer": ["Praga", "Viena", "Estambul"]


    },
    {
      "question": "3.Aproximadamente, ¿cuántos huesos tiene el cuerpo humano?",
      "correct_answer": "206 ",
      "incorrect_answer": ["40", "208","405"]
    },
    {
      "question": "4.¿El río más largo de España?",
      "correct_answer": "El río Tajo",
      "incorrect_answer": ["Río Guadiana", "Río Duero", "Río Guadalquivir"]


    },
    {
      "question": "5.¿Cuál es el océano más grande?",
      "correct_answer": "Océano Pacífico ",
      "incorrect_answer": ["Océano Atlántico", "Océano Índico", "Océano Antártico", "Océno Ártico"]
    },
    {
      "question": "6.¿De dónde son originarios juegos olímpicos?",
      "correct_answer": "Grecia",
      "incorrect_answer": ["Roma", "Creta", "Londres"]


    },
    {
      "question": "7.¿Cuál fue la primera película de Walt Disney?",
      "correct_answer": "Blancanieves y los siete enanitos ",
      "incorrect_answer": ["Mickey Mouse", "La sirenita", "La cenicienta"]
    },
    {
      "question": "8.¿Cuántos satélites tenemos orbitando alrededor de la tierra?",
      "correct_answer": "7.000 satélites",
      "incorrect_answer": ["1.419 satélites", "150 satélites", "8.500 satélites"]


    },
    {
      "question": "9.¿Cuántas veces parpadea por semana una persona?",
      "correct_answer": "25.000 veces",
      "incorrect_answer": ["1.500 veces", "55.000 veces", "7.200"]
    },
    {
      "question": "10.¿Ciudad más poblada mundo?",
      "correct_answer": "Tokio",
      "incorrect_answer": ["Praga", "Buenos Aires", "Estambul"]


    }

  ];


  localStorage.setItem("myQuestions", JSON.stringify(myquestions));




}


// Función para mis propias preguntas
function goToQuiz() {

  let divAnswers = document.getElementById("answers");
  divAnswers.style.display = "block";
  divAnswers.innerHTML = "";

  // Recupero las preguntas. Función similar a la de las preguntas Api.
  let getQuestions = JSON.parse(localStorage.getItem("myQuestions"));
  console.log("hola" , getQuestions);

      if(getQuestions.length > 0 && myQuestionsIndex < getQuestions.length) {

        let question = getQuestions[myQuestionsIndex];

        let questionP = document.createElement("p");
        questionP.innerHTML = question.question;
        divAnswers.appendChild(questionP);

        let correctAnswer = question.correct_answer;
        let incorrectAnswers = question.incorrect_answer;

        let allAnswers = [correctAnswer, ...incorrectAnswers];
        allAnswers = allAnswers.sort(() => Math.random() - 0.5);

        allAnswers.forEach((answer) => {
          let answerCard = document.createElement("div");
          answerCard.classList.add("answer-card");
          answerCard.textContent = answer;

          answerCard.addEventListener("click", () => {
            handleMyAnswers(answer, correctAnswer, answerCard);
          });

          divAnswers.appendChild(answerCard);
        });

        let subtitle = document.createElement("h2");
        let textsubtitle = document.createTextNode("Elige una respuesta para pasar a la siguiente pregunta.");
        subtitle.appendChild(textsubtitle);
        divAnswers.appendChild(subtitle)

        //myQuestionsIndex++;
       
      }
      else {
        alert(`Has completado el quiz! Respuestas correctas: ${correctCount}, Respuestas incorrectas: ${incorrectCount}`);
        // Guardar los resultados de la partida
        saveGameResult(correctCount, incorrectCount);
        myQuestionsIndex = 0;
        correctCount = 0; 
        incorrectCount = 0;

      }

}   

// Función para manejar mis preguntas
function handleMyAnswers (selectedAnswer, correctAnswer, answerCard) {

  if (selectedAnswer === correctAnswer) {
    correctCount++;
    answerCard.classList.add("correct");  
    setTimeout(() => {
      // alert("¡Correcto!");
      goToQuiz();
    },300);
    
  } else {
    incorrectCount++;
    answerCard.classList.add("incorrect");
    setTimeout(() => {
      // alert("Incorrecto.");
      goToQuiz();
    },300);
    
  }
   
    myQuestionsIndex++;
    

  }


