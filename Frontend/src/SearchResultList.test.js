import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import SearchResultList from "./SearchResultList";



afterEach(cleanup);

const startingState = {};

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
describe('Smoke Test for SearchResultList component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<SearchResultList itemsPerPage={1} resultsArray={[{trackId: 1}, {trackId: 2}]}/>)
  });

});

//SNAPSHOT TEST
describe('Snapshot Test for SearchResultList component', () => {

  it('matches snapshot', () => {
    const {asFragment} = renderWithRedux(<SearchResultList resultsArray={[{trackId: 1}, {trackId: 2} ]} itemsPerPage={2}/>)
    expect(asFragment()).toMatchSnapshot();
  });

});


