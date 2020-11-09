const SEED_ARTISTS = [{name: "J Balvin", id:"1vyhD5VmyZ7KMfW5gqLgo5"}, {name: "Bad Bunny", id:"4q3ewBCX7sLwd24euuV69X"}, {name: "Maluma", id:"1r4hJ1h58CWwUQe3MxPuau"}, {name: "Rosalía", id:"7ltDVBr6mKbRvohxheJ9h1"}];
const INITIAL_STATE = {songs:[], artists: SEED_ARTISTS, albums:[]};

function rootReducer(state=INITIAL_STATE, action) {
    switch(action.type) {
        default:
            return state;
    }
}

export default rootReducer;
