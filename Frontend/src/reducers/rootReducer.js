import {combineReducers} from "redux";
import translationReducer from "./translationReducer";
import errorsReducer from "./errorsReducer";
import lyricsReducer from "./lyricsReducer";
import resultsReducer from "./resultsReducer";

const rootReducer = combineReducers({results: resultsReducer, translation: translationReducer, lyrics: lyricsReducer, errors: errorsReducer});

export default rootReducer;