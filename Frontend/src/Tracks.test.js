import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import {createStore} from "redux";
import Tracks from "./Tracks";

afterEach(cleanup);

const startingState = {
  selectedTrack: {trackName: "chanel", trackId: 42}, 
  errors: {translationError: false, languageError: false, lyricsError: false, searchError: false, generalError: false}
};

/**
 * reducer function to mimic the reducer used in Redux.
 * @param {object} state - holds an object of data used within the components
 * @param {object} action - object where the values are strings used to fire certain actions
 */
function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_TRACKS":
      return {...state, tracks: action.tracks};
    default:
      return state;
  };
};

/**
 * Function that renders the component within a redux environment since most 
 * components rely on redux for data in order to mount.
 * @param {ReactComponent} component - private spotify client id
 * @param {function} store - creates the react store using the createStore method imported from redux
 */
function renderWithRedux(
  component,
  {initialState, store = createStore(reducer, initialState)} = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  };
};

//SMOKE TEST
describe('Smoke Test for Tracks component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<Tracks results={[{trackId: 1}, {trackId: 2} ]} itemsPerPage={2}/>);
  });
});

//SNAPSHOT TEST
describe('Snapshot Test for Tracks component', () => {

  it('matches snapshot', () => {
    const {asFragment} = renderWithRedux(<Tracks results={[{trackId: 1}, {trackId: 2} ]} itemsPerPage={2}/>);
    expect(asFragment()).toMatchSnapshot();
  });
});