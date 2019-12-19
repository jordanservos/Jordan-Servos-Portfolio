var wordList = [
    "able",
    "coding",
    "imagination",
    "acid",
    "hiking",
    "aladin",
    "headphones",
    "book",
    "mandalorian",
    "bootcamp",
    "zebra"

];

console.log(wordList)

// Variables defined

var selectedWord = "";
var lettersInWord = [];

var totalBlanks = 0;
var clueBlank = [];
var wrongGuess = [];

var wins = 0;
var losses = 0;
var totalGuesses = 7;


//define how the game kicks off

function gameStart() {
    totalGuesses = 7;

    // randomize word selection 

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

    console.log("the selected word is " + selectedWord);

    // .split breaks word into individual letters - array value is added to the total numbers of blanks on screen

    lettersInWord = selectedWord.split("");

    console.log("the seperated letters in " + selectedWord + " are " + lettersInWord);

    totalBlanks = lettersInWord.length;

    //need to reset the blank clue spots and the wrong guesses

    clueBlank = [];
    wrongGuess = [];


    // create loop to push the correct number of blacks to the blank clue spot

    for (var i = 0; i < totalBlanks; i++) {
        clueBlank.push("_");
    }





    // resets the guesses left to default 

    document.getElementById("guesses-left").innerHTML = totalGuesses;

    // prints the correct number of blanks on screen

    document.getElementById("word-blanks").innerHTML = clueBlank.join(" ");

    console.log("The blank spaces in " + " " + selectedWord + " are " + clueBlank);


    // reset wrong guesses to nothing

    document.getElementById("wrong-guesses").innerHTML = wrongGuess.join(" ");

}

//write function to check for letter matches 

function matchLetter(letter) {

    // did the user select a letter found in a word? 

    var letterGuessRight = false;

    // Check to see if selected letter matcges any letter in the array

    for (var i = 0; i < totalBlanks; i++) {
        if (selectedWord[i] === letter) {

            // if it DOES match then change boolean to true and create new "if/else"

            letterGuessRight = true;
            console.log(letterGuessRight);

        }
    }

    // now that we confirmed a match, figure out where exactly the letter lives 

    if (letterGuessRight) {
        for (i = 0; i < totalBlanks; i++) {

            //find a way to push correct letters to the blank clues
            if (selectedWord[i] === letter) {
                clueBlank[i] = letter;
            }

        }
        console.log(clueBlank)

        // create else if the letter isn't in the selected word then push to wrong guess and subtract a guess

    } else {
        wrongGuess.push(letter);
        totalGuesses--;
    }

}

// create function that changes all on-screen elements after each letter selection based on round success

function roundComplete() {




    document.getElementById("guesses-left").innerHTML = totalGuesses;

    document.getElementById("word-blanks").innerHTML = clueBlank.join(" ");

    document.getElementById("wrong-guesses").innerHTML = wrongGuess.join(" ");


    // check to see if the letters based on each round now match the selected word and update win counter w/ alert

    if (lettersInWord.toString() === clueBlank.toString()) {

        wins++;
        alert("I'm totally shocked....you guessed the word!");

        document.getElementById("win-counter").innerHTML = wins;
        gameStart();

        // if the total guesses reach zero, add to losses and alert

    } else if (totalGuesses === 0) {

        losses++;

        alert("This game is reallllly hard, no surprise that you lost");


        document.getElementById("loss-counter").innerHTML = losses;

        gameStart();
    }

}


// initiate the start of that game

gameStart();

// create a button click event 




document.onkeyup = function(event) {

    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

    //execute the match letter function to check against te guessed letter 

    matchLetter(letterGuessed);
    console.log(letterGuessed);

    //execute the round reset

    roundComplete();

}