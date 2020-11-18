import {combineReducers} from "redux";
import translationReducer from "./translationReducer";
import errorsReducer from "./errorsReducer";
import lyricsReducer from "./lyricsReducer";
import resultsReducer from "./resultsReducer";
import albumsReducer from "./BrowseRoute/albumsReducer";
import tracksReducer from "./BrowseRoute/tracksReducer";
import languagesReducer from "./languagesReducer";
import artistsReducer from "./BrowseRoute/artistsReducer";
import allArtistsReducer from "./BrowseRoute/allArtistsReducer";
import genresReducer from "./BrowseRoute/genresReducer";

const rootReducer = combineReducers({
  results: resultsReducer, 
  translation: translationReducer, 
  lyrics: lyricsReducer, 
  errors: errorsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  languages: languagesReducer,
  artists: artistsReducer,
  allArtists: allArtistsReducer,
  genres: genresReducer
});

export default rootReducer;