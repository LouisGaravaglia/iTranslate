import {combineReducers} from "redux";
import translationReducer from "./translationReducer";
import errorsReducer from "./errorsReducer";
import lyricsReducer from "./lyricsReducer";
import resultsReducer from "./resultsReducer";
import albumsReducer from "./BrowseRoute/albumsReducer";
import tracksReducer from "./BrowseRoute/tracksReducer";

const rootReducer = combineReducers({
  results: resultsReducer, 
  translation: translationReducer, 
  lyrics: lyricsReducer, 
  errors: errorsReducer,
  albums: albumsReducer,
  tracks: tracksReducer
});

export default rootReducer;