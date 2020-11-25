import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import Browse from "./Browse";

afterEach(cleanup);

const startingState = {};

//REDUCER FUNCTION TO MIMIC REDUX REDUCER FOR STORE
function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_ARTISTS":
      return {...state, artists: action.artists};
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
describe('Smoke Test for Browse component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<Browse />)
  });

});

//SNAPSHOT TEST
describe('Snapshot Test for Browse component', () => {

  it('matches snapshot', () => {
    const {asFragment} = renderWithRedux(<Browse />)
    expect(asFragment()).toMatchSnapshot();
  });

});
