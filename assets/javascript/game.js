// create an array of words

var words = [
    "courier",
    "vault",
    "brotherhood",
    "fallout",
    "supermutant",
    "deathclaw",
    "enclave",
    "vaulttec",
    ];

const maxGuesses = 10;     // Max number of guesses

var lettersGuessed = [];   // Stores the letters that are guessed
var currentWordIndex;      // Index of the current word in the array
var guessingWord = [];     // The word that is built to match the current word
var guessesRemaining = 0;  // How many guesses are left
var startGame = false;     // Starts game
var gameFinished = false;  // Ends game
var wins = 0;              // Tracks the wins

// This will reset game variables
function resetGame() {
    guessesRemaining = maxGuesses;
    startGame = false;
// Use Math.floor to round the random number down
    currentWordIndex = Math.floor(Math.random() * (words.length));

// This will clear the arrays
    lettersGuessed = [];
    chosenWord = [];


    // Create the chosen word and clear it
    for (var i = 0; i < words.length[currentWordIndex].length; i++) {
        guessingWord.push("_");

}

document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
document.getElementById("gameoverImage").style.cssText= "display: none";
document.getElementById("youwinImage").style.cssText= "display: none";

updateDisplay();
};

function updateDisplay() {

document.getElementById("totalWins").innerText = wins;
document.getElementById("currentWord").innerText = "";
for (var i = 0; i < guessingWord.innerText; i++) {
    document.getElementById("currentWord").innerText += guessingWord[i];
}

document.getElementById("guessesRemaining").innerText = guessesRemaining;
document.getElementById("lettersGuessed").innerText = lettersGuessed;
if(guessesRemaining <= 0) {
    document.getElementById("gameoverImage").style.cssText = "display: block";
    document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
    gameFinished = true;

}

};


document.onkeydown = function(event) {
    if(gameFinished) {
        resetGame();
        gameFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
}

function makeGuess(letter) {
    if(guessesRemaining > 0) {
        if(!startGame) {
            startGame = true;
        }

        // Check that a letter wasn't already used
        if(lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            checkGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

// This function takes the letter and finds them 
// in the string and reaplace them in the guessed word

function verifyGuess(letter) {
    // Array that will store the positions of letters
    var sequence = [];

    // Loop through the word and find letters of the guessed letter
    //and store in the the array
    for(var i = 0; i < words[currentWordIndex].length; i++) {
        if(words[currentWordIndex][i]  === letter) {
            sequence.push(i);
        }
    }

    // check for letter and remove a guess
    if(sequence.length <= 0) {
        guessesRemaining--;
    } else {
        // Loop through letters and repalce "_" with a letter
        for(var i = 0; i < sequence.length; i++) {
            guessingWord[sequence[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwinImage").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        gameFinished = true;
    }
};

