# LIRI Bot - Language Interpretation and Recognition Interface

LIRI is a command line node app that takes in user input and processes api calls to get
details accordingly.

# Technical Details

The program uses axios,moment,inquirer,fs,dotenv,node-spotify-api npm's.

# Instructions

When the program is executed, the user is presented with options to choose using the inquirer npm.
1. Check for Concert
2. Spotify a Song
3. Get Movie Details
4. Random

Based on the option chosen, the user is again prompted to enter the name of an artist, a song or a movie name based on his choice. 

The program then makes an api call to BandsInTown, Spotify and OmDB to get the appropriate details
and would log the details in .txt files.

When 'Random' is chosen as an option, the program would read the file 'random.txt' and perform
the command specified in the file.

Pending

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from


 
3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!


Link this to portfolio
