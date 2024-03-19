// gameButton
// var data = '{"level": "man"}','{"level2": "hang"}'
const textPlace = document.getElementById('displayWord');
const wrongLettersArea = document.getElementById('wrongLetters');

const words = {
    1: ["able", "about", "account", "acid", "across", "act", "addition"],
    2: ["hangman", "hands"],
    3: ["cat", "beautiful"],
    4: ["software", "development"],
    5: ["website", "technology"]
};

let livesLeft = 6;
// let guessedLetter = '';
let guessedLetterArray = [];
let wrongGuesses = 0;
let answer = '';


function getRandomWord() {
    var randomNum = Math.floor(Math.random() * 5) + 1;
    var wordGetter = words[randomNum];
    var randomIndex = Math.floor(Math.random() * wordGetter.length);
    var answer = wordGetter[randomIndex];
    return answer;
}

function getDisplayWord() {
    randWord = getRandomWord();
    randWordUnder = randWord.replace(/[a-z]/g, ' _ ');
    textPlace.innerText = randWordUnder;
}

document.getElementById('startButton').addEventListener('click', getDisplayWord);


function updateHangmanImage(){
    document.getElementById('hangmanImage').src = './images/'+ wrongGuesses + '.png';
}

function getGuessedLetter(){
    var inputLetter = document.getElementById('letterInput').value;
    // var guessedLetter = inputLetter.value;
    return inputLetter;
}

function printGuessedLetter(){
    var guessedLetter = getGuessedLetter();
    guessedLetterArray.push(guessedLetter);
    wrongLettersArea.innerText = guessedLetterArray.join(', ');
    document.getElementById('letterInput').value = "";
    document.getElementById('letterInput').focus();
}


document.getElementById('guessButton').addEventListener("click", printGuessedLetter);
