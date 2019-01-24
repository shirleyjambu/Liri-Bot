//Imports
require("dotenv").config();
const axios = require("axios");
const inquirer = require("inquirer");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const fs = require("fs");
const moment = require("moment");

var isProcessComplete = false;

//Get user input using inquirer
function getUserInput(){
  inquirer.prompt([
    {
      type:"list",
      message:"Choose what would you like to do?",
      choices:["Check for Concert","Spotify a Song","Get Movie Details","Random"],
      default: "Random",
      name:"choice"
    },
    {
      type:"input",
      message:"Enter the name of an artist : ",
      name:"searchValue",
      default:"Maroon 5",
      when:function(answers){
        if(answers.choice == "Check for Concert"){
          return true;
        }else{
          return false;
        } 
      }
    },
    {
      type:"input",
      message:"Enter a song : ",
      name:"searchValue",
      default:"The Sign",
      when:function(answers){
        if(answers.choice == "Spotify a Song"){
          return true;
        }else{
          return false;
        } 
      }
    },
    {
      type:"input",
      message:"Enter a movie name : ",
      name:"searchValue",
      default:"Shawshank Redemption",
      when:function(answers){
        if(answers.choice == "Get Movie Details"){
          return true;
        }else{
          return false;
        } 
      }
    }
  ]).then(function(response){
      isProcessComplete = false;
      processCommand(response.choice,response.searchValue);
  })
  .catch(function(err){
    console.log("Error Occurred.");
  });
}

// Processes the search based on user choice and value
function processCommand(choice,searchValue){
  switch(choice){
    case('Check for Concert'):
      checkForConcert(searchValue);
      break;
    case('Spotify a Song'):
      SpotifySong(searchValue);
      break;
    case('Get Movie Details'):
      getMovieDetails(searchValue);
      break;
    case('Random'):
      doRandom();
      break;  
  }
}

// Function to check for artist concert using BandsInTown API
const checkForConcert = artist =>{
  let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(queryUrl).then(function(response){
    recordConcert(response.data, artist);
    console.log("Details recorded in concert.txt file.");
    isProcessComplete = true;
  });
};

// Function to get movie details from omdb
const getMovieDetails = movieName =>{
  let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  axios
    .get(queryUrl)
    .then(({data}) => {
      recordMovie(data,movieName);
      console.log("Movie Details are recorded in movie.txt file");
      isProcessComplete = true;
    })
    .catch(err => {
      console.log("Error Occured");
    });
};

//Function to get details from spotify
const SpotifySong = song =>{
  let spotify = new Spotify(keys.spotify);
    
  spotify
    .search({ type: 'track', query: song })
    .then(function(response) {
      recordSong(response,song);
      console.log("Song details for '"+ song +"' recorded in song.txt file.")
      isProcessComplete = true;
    })
    .catch(function(err) {
      console.log(err);
    });
};

//Function to write to a file
function writeToFile(fileName,content){
  fs.appendFile(fileName, content, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

//Function that writes movie Details to file
function recordMovie(data,movieName){
 // console.log(JSON.stringify(data,null,2));

  writeToFile('movie.txt',`
  Movie Title : ${data.Title}
  Year Released : ${data.Year}
  IMDB Rating : ${data.imdbRating}
  Rotten Tomatoes Rating :${data.Ratings[1].Value}
  Country Produced : ${data.Country}
  Language : ${data.Language}
  Plot : ${data.Plot}
  Actors : ${data.Actors}
  `);
}

// Function that writes song details to file
function recordSong(data,song){
  //console.log(JSON.stringify(data,null,2));
  let tracks = data.tracks.items;
  
  writeToFile('song.txt',`
    We found ${tracks.length} tracks for '${song}'.
    ---------------------------------------`);
    
    for(let i=0; i<tracks.length;i++){
      writeToFile('song.txt',`
        Artist: ${tracks[i].album.artists[0].name}
        Song Name : ${tracks[i].name}
        Spotify Preview Link : ${tracks[i].preview_url}
        Album Name : ${tracks[i].album.name}
        Release Date : ${tracks[i].album.release_date}
        
        ---------------------------------------------------------
      `)
    }
}

// Function that writes concert details to file
function recordConcert(data,artist){
  writeToFile('concert.txt',`
    We found ${data.length} concert details for ${artist}.
    ---------------------------------------`);
  
   //When : ${moment(data[i].datetime,'DD/MM/YYYY HH:mm a')} 
  for(let i=0; i<data.length;i++){
    writeToFile('concert.txt',`
      Venue : ${data[i].venue.name}, ${data[i].venue.city}, ${data[i].venue.country}
      When : ${data[i].datetime}
      Status : ${data[i].offers[0].type}, ${data[i].offers[0].status}
      ---------------------------------------------------------
    `)
  }
}

//Function to get command from text file
function doRandom(){
  let fileName = "random.txt";
  fs.readFile(fileName, "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    
    var dataArr = data.split(",");
    processCommand(dataArr[0],dataArr[1]);
  
  });
};

//Function to prompt user to play again
function promptPlayAgain(){
  inquirer.prompt([
    {
      type:'confirm',
      message:'Do you want to get some other details? y/N',
      default:'N',
      name:'repeat'
    }
  ]).then(function(response){
    if(response.repeat){
      getUserInput();
    }else{
      console.log('Enjoy! Have a nice day!')
    }
  });
}
getUserInput();
if(isProcessComplete){
  promptPlayAgain();
}