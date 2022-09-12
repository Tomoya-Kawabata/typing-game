const RandomTextApi = "https://api.quotable.io/random";
const exampleArea = document.getElementById('example-area');
const textArea = document.getElementById('textarea');
const timer = document.getElementById('timer');



textArea.addEventListener('input', () => {
    const spanArray = exampleArea.querySelectorAll('span');
    const typeArray = textArea.value.split("");

    let correct = true;

    spanArray.forEach((charactorSpan, index) => {

        if( typeArray[index] == null){
            charactorSpan.classList.remove('correct');
            charactorSpan.classList.remove('incorrect');
            correct = false;
        } else if(charactorSpan.innerText == typeArray[index]){
            charactorSpan.classList.add('correct');
            charactorSpan.classList.remove('incorrect')
        } else {
            charactorSpan.classList.add('incorrect')
            charactorSpan.classList.remove('correct');
            correct = false;
        }
    });

    if(correct == true){
        RandomTextDispley();
    }

})


function GetRandomText() {
    return fetch(RandomTextApi)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function RandomTextDispley() {
    const randomText = await GetRandomText();
    exampleArea.innerText = "";

    let oneText = randomText.split("");

    oneText.forEach((charactor) => {
        const charactorSpan = document.createElement('span');
        charactorSpan.innerText = charactor;
        exampleArea.appendChild(charactorSpan);
    });
    textArea.value = "";

    StartTimer();
}

let startTime = "";
let setTime = 30;
function StartTimer(){
    timer.innerText = setTime ;
    startTime = new Date();

    setInterval(() => {
        timer.innerText = setTime - getTime();
        if(timer.innerText <= 0) TimeUp();
    }, 1000)

}

function getTime(){
    return Math.floor((new Date() - startTime) / 1000);
}

function TimeUp(){
    RandomTextDispley();
}

RandomTextDispley();



