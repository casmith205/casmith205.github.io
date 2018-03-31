require("dotenv").config();

var fs = require('fs');
var request = require('request');
var keys = require("./keys.js");

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var userCommand = process.argv[2];
var randomSearch;

switch (userCommand) {
    case "my-tweets":
        twitterCommand();
        break;
    case "spotify-this-song":
        spotifyCommand();
        break;
    case "movie-this":
        movieCommand();
        break;
    case "do-what-it-says":
        randomText();
        break;
    default:
        console.log('Sorry, I cannot read that commnd. Please try a different one!');
};

// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function twitterCommand() {
    var params = { screen_name: 'projectproject4' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        log("my-tweets was run and returned the following informtion: ")
        if (!error) {
            for (i = 0; i < 20 && i < tweets.length; i++) {
                console.log("-----------------------------------------------");
                console.log("Tweet #" + (i + 1));
                console.log("Tweeted at: " + tweets[i].created_at);
                console.log(tweets[i].text);
                log( 
                    "\nTweet #" + (i + 1) +
                    "\nTweeted at: " + tweets[i].created_at+
                    "\n Tweet Conent:" + tweets[i].text+
                    "\n------------------------------------------------------------"

                );
            };
        }
    });

};

// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
function spotifyCommand() {
    var trackName;
    // If the user does not type a search value, default to ace of base - the sign.
    if (process.argv[3] === undefined && randomSearch === undefined) {
        trackName = "ace the sign"
    } else if (randomSearch !== undefined) {
        trackName = randomSearch
    } else {
        trackName = process.argv[3];
    };

    var params = { type: 'track', query: trackName }
    spotify.search(params, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        console.log("Your search is complete! Let's take a look...")
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].href);
        console.log("Album: " + data.tracks.items[0].album.name);
        log("spotify-this-song was run and returned the following informtion: "+
            "\nArtist: " + data.tracks.items[0].artists[0].name +
            "\nSong Name: " + data.tracks.items[0].name +
            "\nPreview Link: " + data.tracks.items[0].href +
            "\nAlbum: " + data.tracks.items[0].album.name +
            "\n------------------------------------------------------------"
        )
    });
};

// This will output the following information to your terminal/bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
function movieCommand() {
    if (process.argv[3] === undefined && randomSearch === undefined) {
        title = "Mr. Nobody"
    } else if (randomSearch !== undefined) {
        title = randomSearch
    } else {
        title = process.argv[3];
    };
    // Request info from omdb api
    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Your search is complete! Let's take a look...")
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Released);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Production Location(s): " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            log("movie-this was run and returned the following informtion: "+
                "\nTitle: " + JSON.parse(body).Title +
                "\nYear Released: " + JSON.parse(body).Released +
                "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                "\nProduction Location(s): " + JSON.parse(body).Country +
                "\nLanguage: " + JSON.parse(body).Language +
                "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors+
                "\n------------------------------------------------------------"
            );
        };
    });
};

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
function randomText() {
    fs.readFile('random.txt', 'utf-8', function read(err, data) {
        var dataArr = data.split(",");
        randomSearch = dataArr[1];

        switch (dataArr[0]) {
            case "my-tweets":
                twitterCommand();
                break;
            case "spotify-this-song":
                spotifyCommand();
                break;
            case "movie-this":
                movieCommand();
                break;
            case "do-what-it-says":
                log();
                break;
        };
        log("do-what-it-says was run and returned the following informtion: ");
    });
};


//Function to log parameter into log.txt file
function log(toAppend) {
    fs.appendFile('log.txt', toAppend + "\n", function (err) {
        if (err) throw err;
    });
};