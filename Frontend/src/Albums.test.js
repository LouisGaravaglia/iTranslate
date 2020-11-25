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

function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_ALBUMs":
      return {...state, albums: action.albums};
    default:
      return state;
  };
};

function renderWithRedux(
  component,
  {initialState, store = createStore(reducer, initialState)} = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
  };
};

describe('Smoke Test for Albums component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<Albums />)
  });

});
