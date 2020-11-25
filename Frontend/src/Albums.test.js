import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
// import configureStore from 'redux-mock-store'
import Albums from "./Albums";

afterEach(cleanup);

const startingState = {albums: [{albumId: 42}]};

//REDUCER FUNCTION TO MIMIC REDUX REDUCER FOR STORE
function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_ALBUMs":
      return {...state, albums: action.albums};
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
describe('Smoke Test for Albums component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<Albums />)
  });

});

//SNAPSHOT TEST
describe('Snapshot Test for Albums component', () => {

  it('matches snapshot', () => {
    const {asFragment} = renderWithRedux(<Albums />)
    expect(asFragment()).toMatchSnapshot();
  });

});