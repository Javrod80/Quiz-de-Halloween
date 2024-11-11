
function makeResults(){

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


 
 

function displayResults(divResults){

let score = JSON.parse(localStorage.getItem("gameHistory"));

let correct = score[score.length -1].correct;
let incorrect = score[score.length -1].incorrect;
let scoreText = `Correct Aswers: ${correct} , Incorrect Aswers :${incorrect}`;

let display = document.createElement("p");
divResults.appendChild(display);
display.textContent = scoreText;

}

function backQuiz(divGeneralContainer) {
    let backButton = document.createElement("button");
    backButton.textContent = "Back Button";
    backButton.onclick = function() {
    location.href = 'home.html';
    
    }
    divGeneralContainer.appendChild(backButton);
}
