import { RESET_TRANSLATION, RESET_LYRICS, RESET_TRACKS, RESET_ALBUMS, RESET_ARTISTS, RESET_SEARCH_RESULTS, RESET_SELECTED_TRACK } from "../actionTypes";

////////////////////////////////// RESET PIECES OF STATE IN STORE BACK TO INTIAL VALUE //////////////////////////////////
export function resetStore(...specificState) {

  return async function(dispatch) {

    for (let i = 0; i < specificState.length; i++) {
      if (specificState[i] === "artists") dispatch(resetArtists());
      if (specificState[i] === "albums") dispatch(resetAlbums());
      if (specificState[i] === "tracks") dispatch(resetTracks());
      if (specificState[i] === "lyrics") dispatch(resetLyrics());
      if (specificState[i] === "translation") dispatch(resetTranslation());
      if (specificState[i] === "searchResults") dispatch(resetSearchResults());
      if (specificState[i] === "selectedTrack") dispatch(resetSelectedTrack());
    }

    console.log("Finished reseting store in resetStoreCreator:");
  };
}

function resetArtists() {
  return {type:RESET_ARTISTS};
}

function resetAlbums() {
  return {type:RESET_ALBUMS};
}

function resetTracks() {
  return {type:RESET_TRACKS};
}

function resetLyrics() {
  return {type:RESET_LYRICS};
}

function resetTranslation() {
  return {type:RESET_TRANSLATION};
}

function resetSearchResults() {
  return {type:RESET_SEARCH_RESULTS};
}

function resetSelectedTrack() {
  return {type:RESET_SELECTED_TRACK};
}
