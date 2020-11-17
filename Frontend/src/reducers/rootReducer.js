import {combineReducers} from "redux";
import translationReducer from "./translationReducer";
import errorsReducer from "./errorsReducer";
import lyricsReducer from "./lyricsReducer";

const rootReducer = combineReducers({translation: translationReducer, lyrics: lyricsReducer, errors: errorsReducer});

export default rootReducer;