// const SEED_ARTISTS = [{name: "J Balvin", id:"1vyhD5VmyZ7KMfW5gqLgo5"}, {name: "Bad Bunny", id:"4q3ewBCX7sLwd24euuV69X"}, {name: "Maluma", id:"1r4hJ1h58CWwUQe3MxPuau"}, {name: "Rosalía", id:"7ltDVBr6mKbRvohxheJ9h1"}];
// const INITIAL_STATE = {songs:[], artists: SEED_ARTISTS, albums:[]};
import {GET_TRANSLATION} from "./actionTypes";
const ERRORS = {searchError: false, languageError: false, translationError: false}
const INITIAL_STATE = {translation: "", errors: ERRORS }

function rootReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case GET_TRANSLATION:
            const newState = {
                ...state,
                translation: action.translation,
                errors: {searchError: false, languageError: action.errors.languageError, translationError: action.errors.translationError}
            }
        
            // const updatedStateWithErrors = {...state, state.errors.lyricsError = action.errors.lyricsError}
        return newState;

        default:
            return state;
    }
}

export default rootReducer;
