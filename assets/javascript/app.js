// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7tD9jRt1ucX-SW7kOMD9RSylIyUkeBBQ",
    authDomain: "trainscheduler-b3bd1.firebaseapp.com",
    databaseURL: "https://trainscheduler-b3bd1.firebaseio.com",
    projectId: "trainscheduler-b3bd1",
    storageBucket: "",
    messagingSenderId: "985949453186"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  

//Button for adding new trains - then update the html + update the database
$("#addTrain").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#trainInput").val().trim();
    var trainDest = $("#destInput").val().trim();
    var trainFirstTime = $("#firstTimeInput").val().trim()
    var trainFreq = $("#freqInput").val().trim();
  
    // Creates local object for holding employee data
    // This is a temporary object that will be overridden every time it is clicked
    var newTrain = {
      name: trainName,
      dest: trainDest,
      firstTime: trainFirstTime,
      frequency: trainFreq
    };

    // Push temporary object to database
    database.ref().push(newTrain);

    // Empty input boxes
    $("#trainInput").val("");
    $("#destInput").val("");
    $("#firstTimeInput").val("");
    $("#freqInput").val("");

});

// 3. Create a way to retrieve employees from the employee database 
// Calculate 

database.ref().on("child_added", function(snapshot, prevChildKey){
    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var trainDest = snapshot.val().dest;
    var trainFirstTime = snapshot.val().firstTime;
    var trainFreq = snapshot.val().frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");

    // Difference between the current time, moment(), and the firstTimeConversted in minutes.
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    // Takes the difference in current and start time, divides it by the frequency & sets remainder to a variable
    var tRemainder = diffTime % trainFreq;

    // Minute Until Train
    // Takes the frequency and subtracts the remainder to give the minutes away
    var minAway = trainFreq - tRemainder;

    // Next Train -- adds the minAway to the current time
    var nextArrival = moment().add(minAway, "minutes").format("hh:mm");


    $("#trainTable").append("<tr><td>"+trainName+"</td><td>"+trainDest+"</td><td>"
    +trainFreq+"</td><td>"+nextArrival+"</td><td>"+minAway+"</td>");
});