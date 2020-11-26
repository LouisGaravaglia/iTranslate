import React from 'react'
import {render, cleanup} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import {createStore} from "redux";
import Albums from "./Albums";

afterEach(cleanup);

const startingState = {albums: [{albumId: 42}]};

/**
 * reducer function to mimic the reducer used in Redux.
 * @param {object} state - holds an object of data used within the components
 * @param {object} action - object where the values are strings used to fire certain actions
 */
function reducer(state = startingState, action) {
  switch (action.type) {
    case "ADD_ALBUMs":
      return {...state, albums: action.albums};
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
describe('Smoke Test for Albums component', () => {

  it('renders without crashing', () => {
    renderWithRedux(<Albums />);
  });
});

//SNAPSHOT TEST
describe('Snapshot Test for Albums component', () => {

  it('matches snapshot', () => {
    const {asFragment} = renderWithRedux(<Albums />);
    expect(asFragment()).toMatchSnapshot();
  });
});