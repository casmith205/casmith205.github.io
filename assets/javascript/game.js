// DECLARING FUNCTIONS
    // Start the game by entering in the blank letter spaces
    function start (arrFrom, arrTo){
        blank = arrFrom.length
        for(i=0; i<blank; i++){
            arrTo[i] = "_";
        }
    }
    // Determine if an input (user) is in an array (arr)
    function inArray(user, arr){
        var count=arr.length;
        for(var i=0;i<count;i++){
            if(arr[i]===user){return true;}
        }
        return false;
    };

    // Reset the game after a win/loss
    function reset (){
        guessesLeft=10;
        guessedLetters=[];
        correctLetters=[];
        computerWord = computerChoices[Math.floor(Math.random() * computerChoices.length)];
        computerChar = computerWord.split("");
    };

    // Count the number of times a character is in an array
    function countInArray(arr){
        var count=arr.length;
        for (i=0, j=0; count>i; i++, j++){
            if(arr[i]==arr[j]){
                return "repeat"
            };
         };
    };

    // Replacing the "_" with the correctly guessed letters
    function correctArrayReplacement(arrKey, arrCorrect, guess){
        for(i=0; i<=arrKey.length; i++){
            if(arrKey[i]==guess){
            arrCorrect.splice(i, 1, guess)
            };
        }
        document.getElementById("current").innerHTML = arrCorrect;
    };
    
    // Adding a comparison array
    function comparison(arr1, arr2, newArr) {
        for(i=0; i<arr1.length; i++){
            newArr.splice(i, 1, (arr1[i]==arr2[i]));
        }
    
    };

// DEFINING VARIABLES 
    // Connect variables to HTML & starting position
    var wins = document.getElementById("wins");
    var losses = document.getElementById("losses");
    var guessesLeft = 9; 
    var guessedLetters = [];
    var correctLetters = [];
    var comparisonArray = [];

// ARRAYS
    // Creates an array for the computer choices - array of different words
    computerChoices = ["brockhampton", "drake", "lilxan","lilyachty","amine", "migos","dram","russ","future","kendrick","kanye"];

    // Cretes an array for the user vailable options (entire alphabet - lowercase)
    userChoices = [];
    for (i=97;i<=122;i++){
        userChoices[userChoices.length] = String.fromCharCode(i);
    };

    // Get computer's word
    var computerWord = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    // Turn computer's word into characters
    var computerChar = computerWord.split("");
    console.log(computerChar);

start(computerChar, correctLetters);

// USER PRESSES A KEY...
document.onkeyup = function (event) {
    // Checking what the computer generated for testing purposes
    console.log(computerWord);
    
    // Determines which key was pressed.
    var userGuess = event.key;
    console.log(userGuess);
    
    // Checks if input is accpetable (a letter)
    var validLetter = inArray(userGuess, userChoices); 
    console.log(validLetter);

    // Creates a variable for if the quessed letter is in the current string
    var correctLetterCheck = inArray(userGuess,computerChar);
    console.log(correctLetterCheck);

    // Checking for repeat letters
    var repeatLetters = countInArray(computerChar);
    console.log(repeatLetters);

    // Creating an "If" stmt to first check if valids input (abc element)
    if(validLetter == true){
        // Creating an "If" stmt to check if the letter is in the computer word string
        if( correctLetterCheck==true){
            //Calls function to add in the correct location
            correctArrayReplacement(computerChar, correctLetters, userGuess);
            
        } else {
            // reduce the guesses left 
            guessesLeft--;
            // record the guesses so far
            guessedLetters.push(userGuess);
        };
        
        if(guessesLeft==0) {
            // add a loss into the log
            losses++;
            reset ();
            start(computerChar, correctLetters);
        };
        
        comparison(computerChar, correctLetters, comparisonArray);
        console.log(comparisonArray);

        if(comparisonArray.includes(false)){

        }else{
            wins++;
            reset ();
            start(computerChar, correctLetters); 
        };

        
        
    } else {
        alert("Invalid input! Please use the alphabet :)")

    };  



    // Changing HTML text
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("remainingGuesses").innerHTML = guessesLeft;
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    document.getElementById("current").innerHTML = correctLetters;


console.log(wins);
console.log(losses);
console.log(guessesLeft);
console.log(guessedLetters);

};