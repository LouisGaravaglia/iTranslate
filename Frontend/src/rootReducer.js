const INITIAL_STATE = {songs:[], artists:[], albums:[]};

function rootReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
    }
}

export default rootReducer;
