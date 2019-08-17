// Need to figure out how to keep both the users guess and the guessed letter on the screen

var wordsFallout =                // create an array of words to be guessed 
    [
        "brotherhood",
        "courier",
        "deathclaw",
        "enclave",
        "supermutant",
        "vault",
        "vaulttec",
        "vaultboy",
    ];

var wins = 0;                   // Tracks the wins
var currentWord = "";           // Empty variable to store the word to be guessed
var letterUser = [];            // Users guess
var numOfLetters = 0;           // Variable to hold number of blanks "_" in the currentWord  
var currentWordLetters = [];    // Empty array to hold the actual letters in the currentWord
var letterDisplay = [];         // Empty array to hold the correct letters that display
var guessesRemaining = 0;       // How many guesses are left  
var lettersGuessed = [];        // Stores the letters that are guessed 
var userGuess = "";             // Store user guess
var falloutMusic = new Audio("assets/audio/fallout_3_opening.mp3")


// Function to start a new game
function newGame() {

// Computer selects word at random from the 
    currentWord = wordsFallout[Math.floor(Math.random() * wordsFallout.length)];
        console.log("The current word is: " + currentWord);

    currentWordLetters = currentWord.split("");
        console.log("The current letters are: " + currentWordLetters);

    numOfLetters = currentWordLetters.length;
        console.log("The number of letters in the current word are: " + numOfLetters);

    guessesRemaining = 14;
    lettersGuessed = [];
    letterDisplay = [];
    letterUser = [];


    for(i = 0; i < numOfLetters; i++) {
        letterDisplay.push("_");
        console.log(letterDisplay);
    }

    document.getElementById("word-length").innerHTML = letterDisplay.join(" ");
    document.getElementById("guessesRemaining").innerHTML = " " + guessesRemaining;
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("lettersGuessed").innerHTML = " " + lettersGuessed;

}

function checkLetters(letter) {

    if(event.keyCode >= 65 && event.keyCode <= 90) {
        var correctLetter = false;

        for(var i = 0; i < numOfLetters; i++) {
            if(currentWord[i] == letter) {
                correctLetter = true;
                
            }
        }

    if(correctLetter) {

        for(var i = 0; i < numOfLetters; i++) {
            if(currentWord[i] == letter) {
                letterDisplay[i] = letter;
            }
        }
    }
    //  else {
    //      lettersGuessed.push(lettersGuessed);
    //      guessesRemaining--;
    //  }
     console.log(letterDisplay);


    } else {
        alert("Please choose a letter of the alphabet.");
    }
}

function completeRound() {
    console.log("Win count: " + wins + " | Guesses Left: " + guessesRemaining);

    document.getElementById("word-length").innerHTML = letterDisplay.join(" ");
    document.getElementById("guessesRemaining").innerHTML = " " + guessesRemaining;
    document.getElementById("lettersGuessed").innerHTML = lettersGuessed;

    if(currentWordLetters.toString() == letterDisplay.toString()) {
        wins++
        falloutMusic.play();
        alert("Congratulations! You guessed " + currentWord + " correctly. Try to guess another!")
        console.log("Winner")

        document.getElementById("totalWins").innerHTML = wins;

        newGame();
        document.getElementById("lettersGuessed").innerHTML = " " + " ";

    } else if (guessesRemaining == 0) {
        alert("Uh oh! You have no more guesses and you have perished by radiation. The correct word was " + currentWord);
        console.log("Loser")

        newGame();
        document.getElementById("lettersGuessed").innerHTML = " " + " ";

    }
}

newGame();

document.onkeyup = function(event) {
    guessesRemaining--;

    // lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
        // console.log("The letter guessed was " + lettersGuessed);

        userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        lettersGuessed.push(userGuess);
        

        checkLetters(userGuess);
        completeRound();

}