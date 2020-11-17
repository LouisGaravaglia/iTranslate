// const SEED_ARTISTS = [{name: "J Balvin", id:"1vyhD5VmyZ7KMfW5gqLgo5"}, {name: "Bad Bunny", id:"4q3ewBCX7sLwd24euuV69X"}, {name: "Maluma", id:"1r4hJ1h58CWwUQe3MxPuau"}, {name: "Rosalía", id:"7ltDVBr6mKbRvohxheJ9h1"}];
// const INITIAL_STATE = {songs:[], artists: SEED_ARTISTS, albums:[]};
import {GET_TRANSLATION} from "./actionTypes";
const ERRORS = {searchError: false, lyricsError: false, translationError: false}
const INITIAL_STATE = {translation: "", errors: ERRORS }

function rootReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        case GET_TRANSLATION:
        
            // const updatedStateWithErrors = {...state, state.errors.lyricsError = action.errors.lyricsError}
        return {...state, translation: action.translation}

        default:
            return state;
    }
}

export default rootReducer;
