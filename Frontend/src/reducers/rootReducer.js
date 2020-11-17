import {combineReducers} from "redux";
import translationReducer from "./translationReducer";
import errorsReducer from "./errorsReducer";

const rootReducer = combineReducers({translation: translationReducer, errors: errorsReducer});

export default rootReducer;