function startQuiz() {

    location.href = '../Html/question.html';
}

function homeVisual() {

    let title = document.createElement("h1");
    let text = document.createTextNode("Bienvenido al Quiz de Programación");
    title.appendChild(text);

    let subtitle = document.createElement("h2");
    let textsubtitle = document.createTextNode("Descubre qué tanto sabes sobre programación y desafíate a ti mismo.");
    subtitle.appendChild(textsubtitle);



    let divGeneralContainer = document.createElement("div");
    divGeneralContainer.id = "chart-container";
    let divCanvasContainer = document.createElement("div")
    divCanvasContainer.id = "canvas-container";

    divGeneralContainer.appendChild(title);
    divGeneralContainer.appendChild(subtitle);
    divGeneralContainer.appendChild(divCanvasContainer);


    let startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.addEventListener("click", startQuiz);
    startButton.id = "start-quiz";
    divGeneralContainer.appendChild(startButton);





    document.body.appendChild(divGeneralContainer);

   
    makeCanvas(divCanvasContainer);

}
homeVisual();


function makeCanvas(divCanvasContainer) {

    let graphic = document.createElement("canvas");
    graphic.id = "canvas-results";
   
    divCanvasContainer.appendChild(graphic);

    let scoreHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    let labels = scoreHistory.map((item) => item.date);
    let correctData = scoreHistory.map((item) => item.correct);
    let incorrectData = scoreHistory.map((item)=> item.incorrect);
    
    
  
   
    let designCanvas = graphic.getContext("2d");
    new Chart(designCanvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Correctas",
                data: correctData,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderWidth: 1,
            }, {
                label: "Incorrectas",
                data: incorrectData,
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                   borderWidth: 1
                }]
        
            
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'  
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Número de Respuestas'  
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
        }
    }        
    });
}



