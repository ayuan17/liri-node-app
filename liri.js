//my-tweets - shows last 20 tweets when they are created at in your terminal/bash
//spotify-this-song '<song name here>' - shows artist, song name, preview link, album. if no song provided, default will be "The Sign by Ace of Base"
//movie-this '<movie name here>' - outputs title of movie, year of movie, IMDB rating, Country of production, Language of movie, plot, actors, Rotten Tomatoes rating, if no movie input, default movie is "Mr. Nobody"
//do-what-it-says runs the random.txt file
//bonus: create file call log.txt, append each command you run in to log.txt

var inputCommand = process.argv[2];
var title = process.argv[3];
// console.log(inputCommand);
// console.log(title);

var keys = require("./keys.js");
var request = require('request');
var spotify = require('spotify');
var twitter = require('twitter');

if (inputCommand === "my-tweets"){

    var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

var params = {screen_name: 'alexgtbootcamp'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
        for (var i = 0; i < 20; i++){
            console.log(tweets[i].text + "||" + tweets[i].created_at)
        }
    // console.log(tweets);
  }
});

} else if(inputCommand === "movie-this") {

    request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    console.log("Title: " +JSON.parse(body).Title);
    console.log("Year: " +JSON.parse(body).Year);
    console.log("Rating: " +JSON.parse(body).imdbRating);
    console.log("Country: " +JSON.parse(body).Country);
    console.log("Language: " +JSON.parse(body).Language);
    console.log("Plot: " +JSON.parse(body).Plot);
    console.log("Actors: " +JSON.parse(body).Actors);
    console.log("Rotten Tomatoes Rating: " +JSON.parse(body).Ratings[1].Value)
  }
});

} else if (inputCommand === "spotify-this-song") {
    spotify.search({ type: 'track', query: title}, function(err, data) {
        if (!title) {
                   title = "ace of base - the sign";
                   console.log(title);
               }

        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
           }
           else {
               var songData = data.tracks.items;
               for (var i = 0; i < 1; i++){
                   var artist = songData[i].artists[0].name;
                   var songTitle = songData[i].name;
                   var album = songData[i].album.name;
                   var previewLink = songData[i].preview_url;
                   console.log(artist + ": " + songTitle + " - " + "From: " + album + "\r\n" + "===================================" + "\r\n" + "Preview link: " + previewLink);
               }
           }
       });

}



