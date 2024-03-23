
//     https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// event handler to handle the enter button being clicked from the keyboard instead of mouse action
document.getElementById('guessButton').addEventListener("click", printGuessedLetter);
document.getElementById('startButton').addEventListener('click', initializeGame);

// an event handler to check the key being entered is alphabetical using a regex and event.key
document.getElementById('letterInput').addEventListener('keypress', function(event){
    if (!/^[a-zA-Z]$/.test(event.key) && event.key !== 'Backspace'){
        event.preventDefault();
    }});

const textPlace = document.getElementById('displayWord');
const wrongLettersArea = document.getElementById('wrongLetters');
const hangmanImage = document.getElementById('hangmanImage');

const words = {
    1: ["able", "about", "account", "acid", "across", "act", "addition"],
    2: ["hangman", "hands"],
    3: ["cat", "beautiful"],
    4: ["software", "development"],
    5: ["website", "technology"]
};

// let livesLeft = 6;
// // let guessedLetter = '';
// let guessedLetterArray = [];
// let wrongGuesses = 0;
// let answer = '';


function getRandomWord() {
    var randomNum = Math.floor(Math.random() * 5) + 1;
    var wordGetter = words[randomNum];
    var randomIndex = Math.floor(Math.random() * wordGetter.length);
    var answer = wordGetter[randomIndex];
    return answer;
}

function initializeGame(){
    answer = '';
    guessedLetterArray = []
    wrongGuesses =0;
    livesLeft =6;
    level = 1;
    wrongLettersArea.innerText= '';
    document.getElementById('startButton').disabled = true;
    document.getElementById('letterInput').disabled = false;
    document.getElementById('letterInput').value = '';
    document.getElementById('levels_selector').value = level;
    answer = getRandomWord();
    getDisplayWord();
    updateHangmanImage();

    // printGuessedLetter();

}

function getDisplayWord() {
    var displayWord = '';
    for (var i = 0; i < answer.length; i++) {
        var currentChar = answer[i];
        if (guessedLetterArray.includes(currentChar)) {
            displayWord += currentChar + ' ';
        } else {
            displayWord += '_ ';
        }
    }
    textPlace.innerText = displayWord.trim();
    document.getElementById('letterInput').value = '';
    document.getElementById('letterInput').focus();
}

function stillAlive(){
    if (livesLeft > 0){
        
        document.getElementById('letterInput').disabled = false;
    }
    else{
        document.getElementById('hangmanImage').src = './images/6.png';
        alert("The Word Is " + answer.toUpperCase())
        document.getElementById('letterInput').disabled = true;
        document.getElementById('startButton').disabled = false;
        wrongLettersArea.innerText= '';
        textPlace.innerText = '';
}
}


function updateHangmanImage(){
    document.getElementById('hangmanImage').src = './images/'+ wrongGuesses + '.png';
}

function isValid(letter){
    return guessedLetterArray.indexOf(letter) === -1;
}

function isWrong(guessedLetter){
    return !answer.includes(guessedLetter);
}

function getGuessedLetter(){
    var inputLetter = document.getElementById('letterInput').value;
    // var guessedLetter = inputLetter.value;
    return inputLetter;
}

function printGuessedLetter(){
    var guessedLetter = getGuessedLetter().toLowerCase();
    if(isValid(guessedLetter)){
        guessedLetterArray.push(guessedLetter);
        wrongLettersArea.innerText = guessedLetterArray.join(', ');
        getDisplayWord();
        if(isWrong(guessedLetter))
        {
            wrongGuesses++;
            livesLeft--;
        }
        if(stillAlive()){
            document.getElementById('letterInput').disabled = true;
        }

    }
    else{
        document.getElementById('letterInput').value = '';
        alert("Letter " + guessedLetter.toUpperCase() + " has already been guessed");
    }
    updateHangmanImage();
    document.getElementById('letterInput').value = '';
    document.getElementById('letterInput').focus();
}


// set up variable to handle the action of the enter key being pressed
var guessButtonEnter = document.getElementById('letterInput').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        event.preventDefault();
        document.getElementById('guessButton').click()
    }
});

