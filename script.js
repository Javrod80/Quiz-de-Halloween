// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple

let response = [];
let currentQuestionIndex;

function questions() {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
  )
    .then((res) => res.json())
    .then((json) => {
      response = json.results;
      console.log(response);
    });
}

function makeVisual() {
  let title = document.createElement("h1");
  let text = document.createTextNode("Quiz Halloween: Category 'COMPUTERS'");
  title.appendChild(text);

  let divGeneralContainer = document.createElement("div");
  let divQuestions = document.createElement("div");
  let divAnswers = document.createElement("div");

  let showQuestionButton = document.createElement("button");
  showQuestionButton.textContent = "Mostrar pregunta";

  showQuestionButton.addEventListener("click", questions);
  divQuestions.appendChild(showQuestionButton);

  divGeneralContainer.appendChild(title);
  divGeneralContainer.appendChild(divQuestions);
  divGeneralContainer.appendChild(divAnswers);

  let optionParagraph = document.createElement("p");
  //let optionInput = document.createElement("input");

  divAnswers.appendChild(optionParagraph);
  //divAnswers.appendChild(optionInput);

  document.body.appendChild(divGeneralContainer);
}
makeVisual();

