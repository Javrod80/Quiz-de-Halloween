// https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple


function questions(){
    fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
    .then(res => res.json())
    .then((json) =>  {
        let response = json.results;
        console.log(response);
      
    });


}

function makeVisual() {

    let title = document.createElement("h1");
    let titulo = document.createTextNode('Quiz Halloween: Categoy "COMPUTER"');
    let divGeneralContainer = document.createElement("div");
	let divQuestions = document.createElement("div");
	let divAnswers = document.createElement("div");
    let answer = document.createElement("p");


    titulo.appendChild(title);
    divQuestions.appendChild(divGeneralContainer);
    divAnswers.appendChild(divGeneralContainer);
    answer.appendChild(divAnswers);
	
    





    document.body.appendChild(divGeneralContainer); 

}