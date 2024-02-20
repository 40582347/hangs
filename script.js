// script.js
const startButton = document.getElementById('startButton');
const guessButton = document.getElementById('guessButton');
const letterInput = document.getElementById('letterInput');
const hangmanImage = document.getElementById('hangmanImage');
const wordContainer = document.getElementById('wordContainer');
const livesElement = document.getElementById('lives').querySelector('span');
const guessedLettersElement = document.getElementById('guessedLetters').querySelector('span');

const words = [
    "HANGMAN", "SLEDGEHAMMER", "GAME", "PARALLELOGRAMMATICAL", "CONSOLE",
    "SOFTWARE", "SYNTHESISING", "LANGUAGE", "PROGRAMMING", "SQUIRREL",
    "COMPUTER", "SIZZLED", "UNBOISTEROUSNESS", "FREEDOM", "HIPPOPOTAMUS",
    "XYLOPHONIST", "MOTIVATION", "ETHNOGEOGRAPHICALLY", "ETYMOLOGIZATION",
    "UNDAZZLING", "WIGWAGGING", "WOODENHEADEDNESS", "FREEWHEELING"
];
let selectedWord = '';
let livesLeft = 6;
let guessedLetters = [];

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    livesLeft = 6;
    updateLivesDisplay();
    guessedLettersElement.textContent = '';
    createWordDisplay();
    hangmanImage.src = 'images/1.png';
}

function createWordDisplay() {
    wordContainer.innerHTML = '';
    selectedWord.split('').forEach((letter) => {
        const letterElement = document.createElement('span');
        letterElement.textContent = guessedLetters.includes(letter) ? letter : '_';
        wordContainer.appendChild(letterElement);
    });
}

function updateLivesDisplay() {
    livesElement.textContent = livesLeft.toString();
}

function guessLetter() {
    const guessedLetter = letterInput.value.toUpperCase();
    if (guessedLetter && /^[A-Z]$/.test(guessedLetter)) {
        if (!guessedLetters.includes(guessedLetter)) {
            guessedLetters.push(guessedLetter);
            if (!selectedWord.includes(guessedLetter)) {
                livesLeft--;
                hangmanImage.src = `images/${7 - livesLeft}.png`;
                updateLivesDisplay();
                if (livesLeft <= 0) {
                    alert(`Game Over! The word was: ${selectedWord}`);
                    initializeGame();
                }
            }
            guessedLettersElement.textContent = guessedLetters.join(', ');
        } else {
            alert('You have already guessed that letter.');
        }
        createWordDisplay();
        letterInput.value = '';
        if (!wordContainer.textContent.includes('_')) {
            alert('Congratulations! You won!');
            initializeGame();
        }
    } else {
        alert('Please enter a valid letter.');
    }
}

startButton.addEventListener('click', initializeGame);
guessButton.addEventListener('click', guessLetter);

initializeGame(); // Start the game when the page loads
