##LYRCS


**LINK**

https://lyrcs.herokuapp.com/

**About**

LYRCS is a web app that displays lyrics for a song in it's original language as well as a translated language of the user's choice. 

**Start Up Instructions**

* git clone https://github.com/LouisGaravaglia/iTranslate.git
* Sign up for Spotify API in order to get API Key: https://developer.spotify.com/documentation/web-api/quick-start/
* Sign up for IBM Watson Translator API as well: https://www.ibm.com/watson/services/language-translator/
* in the Backend folder, enter the psql environment and create a database to updload starter data in the dump.sql file: CREATE DATABASE new_itranslatedb;
* run: psql new_itranslatedb < dump.sql
* create .env file in Backend and enter the following variables:
* IBM_URL=(GET THIS BY CLICKING ON FULL DETAILS OF THE LANGUAGE TRANSLATOR SERVICE IN YOUR IBM DASHBOARD)
* CLIENT_ID=(GET THIS FROM YOUR SPOTIFY DEVELOPER DASHBOARD - https://developer.spotify.com/dashboard/applications)
* CLIENT_SECRET=(GET THIS FROM YOUR SPOTIFY DEVELOPER DASHBOARD - https://developer.spotify.com/dashboard/applications)
* ACCESS_TOKEN_URL=https://accounts.spotify.com/api/token
* IBM_API_KEY=(GET THIS BY CLICKING ON FULL DETAILS OF THE LANGUAGE TRANSLATOR SERVICE IN YOUR IBM DASHBOARD)
* IBM_VERSION=2018-05-01
* install dependencies in both Backend and Frontend folders
* npm start in both Backend and Frontend in order to spin up server and react.

**Testing**

* Backend: jest --runInBand
* Frontend: npm test

**Features**

LYRCS is designed with the UX in mind and to align with the expressive and fluid quality of music in general. 

The most obvious feature you will notice is the animating background color. This was to give a visual clue that the section the user moved to contains different content then the previous and following ones. Also, it aligns with the changing of tempo an artist may direct, or the changing styles of music in genral.

A large search bar was implemented front and center on the landing page. This is to benefit what the majority of users want to acheive when they come to a lyrics webiste: Find the song they want to pull down lyrics for.

All sections when displaying results only display one result (artist, album, track, or genre) at a time. This is to not create a cluttered or overwhelming amount of information. When the user would like to see more results there is a slider in place of traditional pagination buttons. This allows for quick scrolling from beginning to end, and can also be used with arrow keys for a more indiviualized experience.

Track preview: When a user hovers over a track, a 30 second song preview plays which is supplied by the SpotifyAPI (if one is provided).

**User Flow**

On first load to the main url, users will see a search bar with the prompt "Find your song!". A user can type anything from just an artist name, to just a song or album name, and it utilizes Spotify's search endpoint to query their datbase for the top 20 best results.

The viewport will automatically scroll down to the next container and will then be displayed those results. 

Once the user finds the song they would like lyrics for and click it, a call is made to the Lyrics API to get the lyrics and the viewport will scroll down to the next section to pick which language they would like those lyrics translated to. 

After entering a language that they would like a translation (up to 65 languages are supported) to, a backend call to the IBM Watson Language Translator API will then get the translation.

The viewport then scrolls down one more time to display that translation next to the original lyrics received from a call to the Lyrics API.

**Data Flow**

Get song objects from Spotify based on the value the user searched for. Take that artist name and song name from the Spotify object and make a call to the backend to see if it's already in the database. If so, retrieve from db. Otherwise, use that Spotify artist name, song, and album to make an API call to get song lyrics. Patch those lyrics in the Tracks table in database with the matching song. When we receive which language the user wants the song translated to, check databse to see if we have that language/translation in database. If so, retrieve from db. Otherwise, make a call to Translation API to get translated lyrics and store in a Translations table in DB. 

This way, everything goes through the database first and keeps a consitent approach to how all aspects of the app function.

**Tech Stack**

* Javascript
* React
* Redux
* Node
* Express
* PostgreSQL
* JWT
* Spring-React
* Material-UI

**User Demographic**

Teen to twenty somethings. Users who are looking for a more UX centric approach to finding song lyrics with translations.

**APIs**

* Spotify API: https://developer.spotify.com/documentation
* Lyrics API: https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search?console=1
* IBM Watson Translation API: https://www.ibm.com/watson/services/language-translator/

Spotify's API is used to get search results based on the user's search request. This will then get the intial song info needed as well to get future song data utilized spotify's unique ids for each song, album, and artist.

Lyrics API is used to get the lyrics for the song. It require the artist name and song name.

IBM Watson Translation API is used to translate the lyrics. They provide over 60 languges to translate to and lucikly have a pretty effective source text read feature where you don't need to explicitly say what language the source text is in ordet to translate to the desired target text.

**Schema**

![](Schema/schema.png)

**Stretch Goals**

* Having user profiles where a user can update a translation to be 
* Imbed music videos of the songs using YouTube’s API. (ACHEIVED - Though after feedback received, a song preview feature seemed more practical for figuring out which track to pick, rather than listening to the whole song on YouTube. So, using Spotify's preview_url a user can now preview a song when hovering over it).
* Implement a typeahead searchbar.

**Initial Project Roadmap**

Starting-Date: November 5th, 2020 

Deadline: November 28th, 2020

* Phase 1 (11/16): Working minimalistic single page app for searching for songs and displaying lyrics/translation.
* Phase 2 (11/18): Extend functionality to have two additional routes for browsing what is in the database and guaranteed to have lyrics.
* Phase 3 (11/20): Create browse by Danceability route with a bare bones slider to retrieve all songs based on the spotify danceability score.
* Phase 4 (11/24): Update styling to have production ready typefaces and colors and finalize formatting.

Things outside Project Roadmap accomplished after submitting the MVP on Deadline: 

* Created bounce animations on hover for actionable items. 
* Added color gradients for fonts.
* Track preview: When a user hovers over a track, a 30 second song preview plays which is supplied by the SpotifyAPI, if one is provided (this was kind of a strecth goal).
