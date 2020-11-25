import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import FlashMessage from "./FlashMessage";



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
describe('Smoke Test for FlashMessage component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<FlashMessage />)
  });

});

//SNAPSHOT TEST
describe('Snapshot Test for FlashMessage component', () => {

  it('matches snapshot', () => {
    const {asFragment} = renderWithRedux(<FlashMessage />)
    expect(asFragment()).toMatchSnapshot();
  });

});


