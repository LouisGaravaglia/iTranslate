import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import Search from "./Search";

//NEED TO IMPLEMENT A MOC INTERSECTION OBSERVER IN ORDER FOR TESTS TO PASS
const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeEach(() => {
  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(cleanup);

const startingState = {
  selectedTrack: {trackName: "chanel", trackId: 42}, 
  errors: {translationError: false, languageError: false, lyricsError: false, searchError: false, generalError: false}
  };

//REDUCER FUNCTION TO MIMIC REDUX REDUCER FOR STORE
function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_TRACKS":
      return {...state, tracks: action.tracks};
    default:
      return state;
  };
};

//FUNCTION TO ALLOW THE COMPONENT TO BE RENDERED USING OUR MAKESHIF REDUX STORE
function renderWithRedux(
  component,
  {initialState, store = createStore(reducer, initialState)} = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  };
};

//SMOKE TEST
describe('Smoke Test for Search component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<Search />)
  });

});

//SNAPSHOT TEST
describe('Snapshot Test for Search component', () => {

  it('matches snapshot', () => {
    const {asFragment} = renderWithRedux(<Search />)
    expect(asFragment()).toMatchSnapshot();
  });

});

