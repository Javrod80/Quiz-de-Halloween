// Función para la visual de results
function makeResults() {

    let title = document.createElement("h1");
    let text = document.createTextNode("Estos son los resultados.");
    title.appendChild(text);

    let divGeneralContainer = document.createElement("div");
    let divResults = document.createElement("div");
    divResults.classList.add("divResults");

    divGeneralContainer.appendChild(title);
    divGeneralContainer.appendChild(divResults);



    document.body.appendChild(divGeneralContainer);


    displayResults(divResults);
    backQuiz(divGeneralContainer);

}

makeResults();




// Función para mostrar los resultados
function displayResults(divResults) {

    let score = JSON.parse(localStorage.getItem("gameHistory"));
    // Los ultimos resultados
    let correct = score[score.length - 1].correct;
    let incorrect = score[score.length - 1].incorrect;
    let scoreText = `Correct Aswers: <span class="correct">${correct}</span>   ,  Incorrect Aswers :<span class="incorrect">${incorrect}</span>`;

    let display = document.createElement("p");
    divResults.appendChild(display);
    display.innerHTML = scoreText;

}
// Función para el boton de volver al inicio
function backQuiz(divGeneralContainer) {
    let backButton = document.createElement("button");
    backButton.textContent = "Back Button";
    backButton.onclick = function () {
        location.href = '../Html/home.html';

    }
    divGeneralContainer.appendChild(backButton);
}
