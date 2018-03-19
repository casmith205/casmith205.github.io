// Instructions
// (x) Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// (x) Your app should take the topics in this array and create buttons in your HTML.
// (x) Try using a loop that appends a button for each string in the array.

// (x) When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// (x)When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// (x) Under every gif, display its rating (PG, G, so on).

// Only once you get images displaying with button presses should you move on to the next step.

// (x) Add a form to your page takes the value from a user input box and adds it into your topics array. 
// (x) Then make a function call that takes each topic in the array remakes the buttons on the page.


$(document).ready(function() {

    //SETTING GLOBAL VARIABLES
        var topics = ["zebra", "monkey", "giraffe", "bear"];
        var apiKey = "gBMwoy1kuUu2WyiV4tlNZ0Lr9zXGz6Hz"
        
    
    // ON-PAGE EVENTS
      // On the click of the search animal button...
        $("#add-animal").on("click", function(){
          event.preventDefault();
          // This line will grab the text from the input box
          var animal = $("#search-input").val().trim();
          topics.push(animal);
          console.log(topics);
          renderButtons();
        });
    
    // On-click of the gifs 
        $("body").on("click", ".gif", function() {
          // Getting the data state of the gif on click
          var state = $(this).attr("data-state");
          console.log(state);
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            console.log(this);
            $(this).attr("data-state", "animate");
            $(this).attr("src", $(this).attr("gif"))
          } else {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("still"))
          }
        });
    
    // On-click of the favorite button
    $("body").on("click", ".fav", function() {
        console.log(this);
        // How do I move the whole image to favorites
        $(this)
          .closest("div")
          .appendTo($(".favorites"));
        $(this).fadeOut();
    });
    
        
    // DEFINING FUNCTIONS
      // Function for displaying animal buttons
      function renderButtons() {
      // Deletes the animals prior to adding new animals
      $(".buttons").empty();
      // loops through the array and adds the button and appends to the button section
        for (var i = 0; i < topics.length; i++) {
          var btn = $("<button>");
          btn.addClass("animal");
          btn.attr("data-name", topics[i]);
          btn.text(topics[i]);
          $(".buttons").append(btn);
        }
      };
    
      // Function for displaying gifs
      function displayGif (){
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+animal+"&limit=10&api_key=" + apiKey;
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        console.log(response);
        // Creating a for loop to run through the images in the array
          for(i=0; i<response.data.length; i++) {
            // Creating and storing a div tag
            var animalDiv = $("<div class='animalDiv'>");
            // Creating a paragraph tag with the gif rating
            var rating = $("<p>").text("Rating: " + response.data[i].rating);
            // Creating an "add to favorites" button
            var favBtn = $("<button class='fav'>");
            favBtn.text("Add to Favorites");
            // Creating and storing an image tag
            var animalImage = $('<img class="gif">');
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", response.data[i].images.fixed_height_still.url);
            animalImage.attr("still", response.data[i].images.fixed_height_still.url);
            animalImage.attr("gif", response.data[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            // Push to HTML
            $(animalDiv).append(animalImage);
            $(animalDiv).append(rating);
            $(animalDiv).append(favBtn);
            $(".gifs").prepend(animalDiv);
          };
        });
      };
    
      // Adding click event listeners to all elements with a class of "animal"
      $(document).on("click", ".animal", displayGif);
    
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
    });