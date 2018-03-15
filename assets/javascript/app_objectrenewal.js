$(document).ready(function() {

    // DEFINING VARIABLES
    var questions = 
    [
        {
            question: "What is the name of the OSU student section?",
            choices: ["Buckeye City", "Block-O", "The Brutus House", "The Angry Tree Nuts"],
            answer: 2
        },
        {
            question: "What is the state tree of Ohio?",
            choices: ["Buckeye", "Boxelder Maple", "Alder", "Blackhaw"],
            answer: 1
        },
        {
            question: "What is the OSU mascot's name?",
            choices: ["Betty Buckeye", "Bruce Buckeye", "Bill Buckeye", "Brutus Buckeye"],
            answer: 4
        },
        {
            question: "Who was the OSU football coach who punched a Clemson player in the Gator Bowl in 1978?",
            choices: ["Urban Meyer","Woody Hayes","Jim Tressel", "Earle Bruce"],
            answer: 2
        },
        {
            question: "Who was the only two-time Heisman Trophy winner from Ohio State?",
            choices: ["Archie Griffin", "Eddie George", "Troy Smith", "Braxton Miller"],
            answer: 1
        },
        {
            question: "What does TBDBITL stand for in regards to the OSU Marching Band?",
            choices: ["The Baddest Damn Band in the Land","The Best Darn Bassists in the Land", "The Ballin-est Drummers Band in this Land","The Best Damn Band in the Land"],
            answer: 4
        },
        {
            question: "What famous comedian from Cleveland, Ohio dotted the 'I'?",
            choices: ["Dave Chappelle","Bob Hope", "Josh Radnor","Drew Carey"],
            answer: 2
        },
        {
            question: "How do you respond to an OSU fan who yells 'O-H!'?",
            choices: ["Shut up!", "Go Bucks!", "I-O!", "Ohio! Ohio! The land that I love"],
            answer: 3
        },
        {
            question: "What 1960s song by the McCoys became an Ohio State staple?",
            choices: ["Hang on Sloopy", "Come on Let's Go", "Beat the Clock", "I Got to Go Back"],
            answer: 1
        }
    ];

    
    var correctAnswerMessages=["That is correct!", "Woo! You got it!", "Nice guess ;)", "Woah, look out, we have a real buckeye on our hands!","Hey, are you googling these?","Yep! Nailed it.","Yaaaas, you got it!","How's it feel to be so smart?", "Good job! You got it right!"];
    var correctAnswerMessage;
    var incorrectAnswerMessages=["Nope :(", "Yikes, so close", "It's okay, you'll get the next one!", "Are you from M!ch!g@n...?", "What, do you hate football or something?","C'mon! That one was easy.","Almost! but not quite...", "You need some coffe? water? Focus kid!", "Hey don't sweat it, this was a tough one!"];
    var incorrectAnswerMessage;
    var correctReactionImgs = ["assets/images/dance.gif","assets/images/thankyourfans.gif"];
    var incorrectReactionImgs = ["assets/images/sadpizza.gif"];
    
    var question= " ";
    var answer=" ";
    var questionsAsked = [];
    var indexChosen;
    var timeRemaining = 15;
    var correct;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unanswered = 9;
    var timeInt;
    
    // DEFINING FUNCTIONS
    // Funtion resets the game
    function reset (){
        $(".results").fadeOut(0);
        $("#startBtn").fadeIn();
        $("#resetBtn").css("display", "none");
        correctAnswers = 0;
        incorrectAnswers = 0;
        unanswered = 9;
        questionsAsked =[];
    };
    
    // Function starts the game
    function start (){
        $("#startBtn").fadeOut();
        $(".choices").fadeIn();
        $(".time").fadeIn();
        // Every second, run the time function
        timeInt = setInterval(time, 1000);
    };
    
    // Function reduces time remaining and prints the seconds remaining to HTML
    function time(){
        if(questionsAsked.length< questions.length){
            if(timeRemaining>0){
                timeRemaining--;
            } else {
                show();
            }
            $(".time").html("<b>"+timeRemaining + " seconds remaining! </b>"); 
        }
    };
    
    // Function shows the question and related choices
    function show (){
        $(".time").html("<b>"+timeRemaining + " seconds remaining! </b>"); 
        $(".gameplay").fadeIn();
        $(".results").fadeOut(0);
            // Set time remaining to 15 and push to time div
            timeRemaining = 15;
            // Generate a random number between 0 and 8; Pull the question at the random number position and related choice array. Push to html
            indexChosen = Math.floor(Math.random()*questions.length);
            question = questions[indexChosen].question;
            console.log(question);
            answer = questions[indexChosen].;
            choiceIndex = ("q"+ indexChosen);
            // If the question has not already been asked, then put it into the asked array and push to HTML
            if(questionsAsked.indexOf(question) == -1){
                questionsAsked.push(question);
                $(".question").html("<b>"+question+"</b>");
                $("#option0").html(choices[choiceIndex][0]);
                $("#option1").html(choices[choiceIndex][1]);
                $("#option2").html(choices[choiceIndex][2]);
                $("#option3").html(choices[choiceIndex][3]);
    
            } else {
                show();
            }
        };
    
    
    function answerShow (){
        $(".gameplay").fadeOut(0);
        $(".results").fadeIn();
        correctAnswerMessage = correctAnswerMessages[Math.floor(Math.random()*correctAnswerMessages.length)];
        incorrectAnswerMessage = incorrectAnswerMessages[Math.floor(Math.random()*incorrectAnswerMessages.length)];
        if(correct == true){
            $(".results").html(correctAnswerMessage + "<br>");   
        } else {
            $(".results").html(incorrectAnswerMessage + "<br>");
        };
        $("#nextBtn").fadeIn()
    };
    
    function showResults(){
        // Push results text to the HTML
        $(".results").html("Congrats! You're all done. <br> Here are your stats... <br> Correct answers: " + correctAnswers 
        + "<br> Incorrect Answers: "+ incorrectAnswers + "<br> Unanswered Questions: " + unanswered + "<br> Not too shabby!");
        // Fade out the gameplay and time divs, as well as the next button
        $(".gameplay").fadeOut(0);
        $(".time").fadeOut();
        $("#nextBtn").fadeOut(0);
        // Fade in the results to show result text as well as reset button
        $(".results").fadeIn();
        $("#resetBtn").fadeIn();
        $("#gameover").fadeIn();
        $(".time").html(" ");
        clearInterval(timeInt);
    };
    
    // ON-PAGE ACTIONS
    // reset the page to start
    
    // When the start button is clicked...
    $("#startBtn").on("click", function(){
        start();
        show();
    });
    
    // Adding hover colors to pick an answer
    $(".choices").hover(function(){
        $(this).css("background-color", "#666666");
        },function(){
        $(this).css("background-color", "#F5F5F5");
        }
    );
    
    // When the choices are clicked...
    $(".allChoices").on("click", ".choices", function(x){
            if(x.target.innerHTML === answer){
                correctAnswers++;
                unanswered--;
                correct = true;
                answerShow();
            } else {
                incorrectAnswers++;
                unanswered--;
                correct = false;
                answerShow();
            };
            
    });
    
    // When the "next question" button is clicked
    $("#nextBtn").on("click", function(){
        if(questionsAsked.length < questions.length) {
            show();
        } else {
            showResults();
        };
        $("#nextBtn").fadeOut();
    });
    
    // When the reset button is clicked...
    $("#resetBtn").on("click", function(){
        reset();
    });
    
    
    });