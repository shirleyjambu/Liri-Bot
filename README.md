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

    

Link this to portfolio
