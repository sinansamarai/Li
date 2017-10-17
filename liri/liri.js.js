var Twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');
var keys = require('./keys.js')

var command = process.argv[2];


var input = process.argv.slice(3)


switch (command) {
    case "twitter":
        useTwitter()
        break;
    case "spotify":
        useSpotify(input)
        break;
    case "omdb":
        omdb(input)
        break;
    default:
        console.log('Command not found')
}

function useTwitter () {
    var client = new Twitter(keys.twitterKeys);

    client.get('statuses/user_timeline', {screen_name: 'screen name'}, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}


function useSpotify(input) {
    var spotify = new Spotify(keys.spotifyKeys);

    spotify.search({ type: 'track', query: input.join(" ") }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data); 
    });
}



function omdb(input){
    request("http://www.omdbapi.com/?t=" + input.join("+") + "&plot=short&apikey=40e9cece", 
        function(error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body)
            }
    });
}