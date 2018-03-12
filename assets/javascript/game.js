$(document).ready(function() {

    // DEFINING VARIABLES
var playerChoseChar = false;
var characterChosen;
var defenderExists = false;
var defenderChosen;
var swordSound = new Audio ("assets/sounds/sword.mp3");
var dragonSound = new Audio ("assets/sounds/dragon_roar.mp3");
var ominousSound = new Audio ("assets/sounds/ominous.mp3");
var successSound = new Audio ("assets/sounds/success.mp3");
var winSound = new Audio ("assets/sounds/win.mp3");

var jonSnow = { 
    name: "Jon Snow",
    healthPoints: 100,
    attackPower: 35,
    counterAttackPower: 20,
    imgUrl: "assets/images/jonSnow.jpg",
    healthId : "#jonHealth",
    buttonId : "#jonSnow-button"

};

var nightKing = {
    name: "The Night King",
    healthPoints: 110,
    attackPower: 50,
    counterAttackPower:30,
    imgUrl: "assets/images/nightKing.jpg",
    healthId : "#nightKingHealth",
    buttonId : "#nightKing-button",
};

var hound = {
    name: "The Hound",
    healthPoints: 90,
    attackPower: 20,
    counterAttackPower: 5,
    imgUrl: "assets/images/hound.jpg",
    healthId : "#houndHealth",
    buttonId : "#hound-button"

};

var cersei = {
    name: "Cersei Lannister",
    healthPoints: 80,
    attackPower: 15,
    counterAttackPower: 15,
    imgUrl: "assets/images/cersei.jpg",
    healthId : "#cerseiHealth",
    buttonId : "#cersei-button"

};

var characters = [jonSnow, nightKing, hound, cersei];

var enemyCount = (characters.length - 1); 

ominousSound.play();

// Choosing a character
    // If a button is clicked in the characters div....
    $(".characters").on("click", ".buttons", function(x){
        // If the player has already chosen a character, return
        if(playerChoseChar){return;};
        // Setting a variable to detect the ID of the clicked character
        var clickedCharacter = "#" + x.currentTarget.id;
        for(i=0; i<characters.length; i++) {
            // If the clicked character does not equal the current ID, append the current ID to "enemies"
            if(clickedCharacter !== characters[i].buttonId){
            $(characters[i].buttonId).appendTo(".enemies");
            $(characters[i].buttonId).css("background-color", "#B22222");
            // If the clicked character does equal the current ID, set that var equal to characterChosen
            } else {
                characterChosen = characters[i];
                playerChoseChar = true;
            };
        };
    });

// Choosing a defender
    // If a button is clicked in the enemies div...
    $(".enemies").on("click", ".buttons", function(x){
        // If a defender already exists, return
        if(defenderExists){return;};
        // Setting a variable to detect the ID of the clicked character
        var clickedDefender = "#" + x.currentTarget.id;
        for(i=0; i<characters.length; i++) {
            // If the clicked character equals the current ID, appedn to defender, define defenderChosen, and change defenderExists to true
            if(clickedDefender == characters[i].buttonId){
                $(".defender").html(" ");
                $(characters[i].buttonId).appendTo(".defender");
                $(characters[i].buttonId).css("background-color", "black");
                defenderChosen = characters[i];
                defenderExists = true;
            };
        };
    });

// What to do when the attack button is clicked
$("#attack-btn").on("click", function(){
    if(!defenderExists){return;};
    attack(characterChosen, defenderChosen);
        // If the character's health is 0, fade out the picture and relay defeat message
        if(characterChosen.healthPoints <= 0) {
            dragonSound.play();
            $(characterChosen.buttonId).fadeOut();
            $(".attackMessages").html("You were defeated by " + defenderChosen.name + ". Reset the game to play again");
        }

       else if (defenderChosen.healthPoints <= 0) {
            successSound.play();
            defenderExists = false;
            enemyCount --;
            $(defenderChosen.buttonId).fadeOut();
             
            if(enemyCount>0){
            $(".attackMessages").html("You defeated " + defenderChosen.name + ". Please choose another defender!");
            } else {
                $(".attackMessages").text("You defeated all of your enemies! Reset the game to play again");
                winSound.play();
            }
        };
});

// What to do when the reset button is clicked 
$("#reset-btn").on("click", function(){
    gameReset();
});

// DEFINING FUNCTIONS
// When the player presses "attack," the following will occur:
function attack (characterChosen, defenderChosen) {
    swordSound.play();
    defenderChosen.healthPoints -= characterChosen.attackPower;
    characterChosen.healthPoints -= defenderChosen.counterAttackPower;
    $(characterChosen.healthId).html(characterChosen.healthPoints);
    $(defenderChosen.healthId).html(defenderChosen.healthPoints);
    $(".attackMessages").html("You caused " + characterChosen.attackPower + " points of damage. <br>" +
    " But, you were hit with a counter attack! You lost " + defenderChosen.counterAttackPower + " health points.");
    
};

// Resetting the entire game
function gameReset () {
    defenderChosen = null;
    characterChosen = null;
    defenderExists = false;
    playerChoseChar = false;
    enemyCount = (characters.length - 1);
    jonSnow.healthPoints = 100;
    nightKing.healthPoints = 110;
    hound.healthPoints = 90;
    cersei.healthPoints = 80;
    for(i=0; i<characters.length; i++){
        $(characters[i].buttonId).fadeIn();
        $(characters[i].healthId).html(characters[i].healthPoints);
        $(characters[i].buttonId).css("background-color", "#F5F5F5");
    };
    $(".buttons").appendTo(".characters");
    $(".defender").html(" ");
};

});




