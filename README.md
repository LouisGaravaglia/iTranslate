##iTranslate Proposal

**Project Roadmap**

Core Functionality: Need to be able to gather song/artist details (Genre, Popularity, Tempo, Release Year, etc) in order to be able to sort songs in database. Need to be able to take that artist name and song name in order to make an API call to get song lyrics. Store those lyrics with artist/song details in database. Make a call to Translation API to get translated lyrics and store with artist/song details in DB. Display all of the above on a single page to the user.

Phase 1: Create a backend using Express to create Models and routes to make API requests and queries using pg to then insert into DB.

Phase 2: Create a database using PostgreSQL to store artist and song entries.

Phase 3: Be able to make successful API calls to Spotify API in order to get artist and song info. Then be able to store that info in DB, and use it to make successful call to Lyrics API. Use that result to be able to make successful call to IBM Translation API. Store all to DB.

Phase 4: Make a React Front End. Simplify it to have one component with a search bar asking for query, a confimration component display results to confirm the artist and song (whether that was found already in our DB, or pulled down from Spotify API). Then a display component to show the results.

Phase 5: Refine React components/structure and implement sorting ability to search by genre/tempo/etc for entries already in DB.

Extenstions: Youtube Music Video to be embeded on lyrics page. More complex searching ability. Linking either lyrics or artist/song details to listen on your spotify account. Possibly embed spotify player instead of Youtube Music Video.

**What Tech Stack will you be implementing?**

I will be using React / Node / Javascript / Express / PostgreSQL.

**Will you be focusing on front-end UI or back-end?**

I will be focusing on the both. At the moment, both are equally interesting and import to me.

**Website or mobile app? Something else?**

This will be a web app.

**What goal will your project be designed to achieve?**

My goal is to have a user friendly and efficient app that allows users to find lyrics of songs sung in Spanish translated to English and vice versa.

**What is the demographic of the users?**

I know that I have a bias towards Reggaeton and Pop music coming from Hispanic artists. I’ll most likely be designing my app with the teen and twenty-something English speaking music fans who either enjoy Latin or Spanish music and would like to better understand it, or those who really enjoy using the music as a way to better learn Spanish.

**What kind of data will your site be using?**
The site will be using pretty simple database entries consisting of a song artist, tile, spanish lyrics, english lyrics, and possibly some category types like “Reggaeton, pop, etc”.

**How are you planning on collecting data?**

I’ll be collecting song lyric data from Lyrics API (https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search?console=1) and then collecting the translated lyrics by utilzing IBM Watson translation API (https://www.ibm.com/watson/services/language-translator/).

**Outline your approach to designing this app?**

I plan on creating a backend using Express that will handle retrieving data from the API’s and then storing that info into the Databasse. React will then be responsible for making async calls to the DB to pull artist/song information and displaying it.

**What does your database schema look like?**

![](Schema/schema.png)

**What kinds of issues might you run into with your API?**

Definitely a lot of potential issues. One big one is going to be accuracy of translation from one language to another. Especially, when you consider a lot of lyrics contain slang and metaphors. Another is the general availability of lyrics. There will definitely not be lyrics out there for all the songs I want to include. Speaking of including, since I will only be able to host this on the free account of Heroku. I will only be able to have 10k db entries. And since I plan on creating a DB first approach where all songs that are queried for a lyric translation on the site will first be stored into DB then retrieved and shown to the user, this will limit the number of songs I'll have available for translation.

**Is there any sensitive information you need to secure?**

Besides API keys, I may have to store user information if I end up implementing a stretch goal of allowing user profiles to be created where they can update lyrics to be more accurate.

**What functionality will your app include?**

The app will allow users to search for songs stored in our DB and if not included in the DB we will inform them we are retrieving lyrics and then add to DOM once we have the translated lyrics. Potentially be able to sort songs by genre or artists.

**What will the user flow look like?**

A User will first interact with a landing page with a large search bar prompting them to enter a name of a song or artist to find translated lyrics for. If a song can’t be found in the Lyrics API and there is not one already stored in the DB, a prompt will let the user know that unfortunately we can not translate that song, and to pick another. If the user found a song that is already in the DB a page will be loaded dynamically using React-Router. If that song is found on the Lyrics API, but not in DB. We will display a loading icon while we fetch the data and then shortly display the translated song lyric page after inserting into the DB.

**What features make your site more than a CRUD app?**

I don’t know if this site will really be a true CRUD application. If I am able to implement user profiles where a user can update and potentially delete song translations, as well as updating and deleting their profiles, then it definitely should fit into that model. Otherwise, it’s more focused on creating and reading aspects.

**What are your stretch goals?**

I have a couple stretch goals. One is having user profiles where a user can update a translation to be more accurate. And I may need to assign certain users, obviously probably myself to start out with, be admins to approve any changes made so that they are valid translations. Another, would be to imbed music videos of the songs using YouTube’s API. Implementing a typeahead searchbar would be great as well.