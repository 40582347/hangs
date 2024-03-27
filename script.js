
//     https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// event handler to handle the enter button being clicked from the keyboard instead of mouse action
document.getElementById('guessButton').addEventListener("click", printGuessedLetter);
document.getElementById('startButton').addEventListener('click', initializeGame);

// an event handler to check the key being entered is alphabetical using a regex and event.key
document.getElementById('letterInput').addEventListener('keypress', function(event){
    if (!/^[a-zA-Z]$/.test(event.key) && event.key !== 'Backspace'){
        event.preventDefault();
    }});

function levelListSelection(){
    var e = document.getElementById('levels_selector');
    if(e.selectedIndex > 0){
        level = parseInt(e.options[e.selectedIndex].value);
        initializeGame();
    }
}
document.getElementById('levels_selector').addEventListener('change', levelListSelection);

const textPlace = document.getElementById('displayWord');
const wrongLettersArea = document.getElementById('wrongLetters');
const hangmanImage = document.getElementById('hangmanImage');
const livesLeftNumb = document.getElementById('numLives');


const words = {
    1: ["able", "about", "account", "acid", "across", "act", "addition"],
    2: ["hangman", "hands"],
    3: ["cat", "beautiful"],
    4: ["software", "development"],
    5: ["website", "technology"]
};

function getRandomWord() {
    // var randomNum = Math.floor(Math.random() * 5) + 1;
    var wordGetter = words[level];
    var randomIndex = Math.floor(Math.random() * wordGetter.length);
    var answer = wordGetter[randomIndex];
    return answer;
}

function initializeGame(){
    answer = '';
    guessedLetterArray = []
    wrongGuesses =0;
    livesLeft =6;
    getLevel();
    // level = parseInt(document.getElementById('levels_selector').value); // Update the level variable
    wrongLettersArea.innerText= '';
    document.getElementById('startButton').disabled = true;
    document.getElementById('letterInput').disabled = false;
    document.getElementById('letterInput').value = '';
    // document.getElementById('levels_selector').value = level;
    livesLeftNumb.innerText = livesLeft;
    answer = getRandomWord();
    getDisplayWord();
    updateHangmanImage();
    
}

function getLevel(){
    level = parseInt(document.getElementById('levels_selector').value);
    document.getElementById('levels_selector').value = level;
    return level;
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
        document.getElementById('letterInput').disabled = true;
        document.getElementById('startButton').disabled = false;
        wrongLettersArea.innerText= '';
        textPlace.innerText = '';
        
}
}


function updateHangmanImage(){
    if(wrongGuesses === 6){
        document.getElementById('hangmanImage').src = './images/6.png';
        setTimeout(sendAlert, 100); // Call the sendAlert function to show the alert
    } else {
        document.getElementById('hangmanImage').src = './images/'+ wrongGuesses + '.png';
    }
}

function isValid(letter){
    return guessedLetterArray.indexOf(letter) === -1;
}

function isWrong(guessedLetter){
    return !answer.includes(guessedLetter);
}

function isCorrectWord(){
    var displayedCorrectWord = textPlace.innerText.replace(/\s/g, '');
    if(displayedCorrectWord === answer)
    {
        document.getElementById('startButton').disabled = false;
        document.getElementById('letterInput').disabled = true;
        
        setTimeout(sendAlert, 100);
        
    }
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
            livesLeftNumb.innerText = livesLeft
        }
        
        if(stillAlive()){
            document.getElementById('letterInput').disabled = true;
        }
        isCorrectWord();

    }
    else{
        document.getElementById('letterInput').value = '';
        alert("Letter " + guessedLetter.toUpperCase() + " has already been guessed");
    }
    updateHangmanImage();
    // sendAlert();
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

function sendAlert(){
    if(livesLeft === 0){
        alert("The Word Is " + answer.toUpperCase())
    }
    
    else if(textPlace.innerText.replace(/\s/g, '') === answer){
        alert('You Win, The Correct Word Was ' + answer.toUpperCase() + '!!!');
        level++;
        document.getElementById('levels_selector').value = level;
        initializeGame();

    }
}