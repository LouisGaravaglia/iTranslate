import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {Router, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import {Provider} from 'react-redux'
import {createStore} from "redux";
import {createMemoryHistory} from 'history'
import App from "./App";

afterEach(cleanup);

//CREATE A MOCK INTERSECTION OBSERVER CLASS FOR TESTING AND APPEND IT TO THE WINDOW OBJECT
const mockIntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeEach(() => {
  window.IntersectionObserver = mockIntersectionObserver;
});

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
describe('Smoke Test for App component', () => {

  it('renders without crashing', () => {
    const history = createMemoryHistory();

    renderWithRedux(
      <Router history={history}>
        <App />
      </Router>
    );
  });
});

//SNAPSHOT TEST
describe('Snapshot Test for App component', () => {

  it('matches snapshot', () => {
    const history = createMemoryHistory();

    const {asFragment} = renderWithRedux(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Make sure appropriate text is appearing in certain routes', () => {

  it('displays the "find your song!" search bar', () => {

    const {getByText} = renderWithRedux(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText("Find your song!")).toBeInTheDocument();
  });

  it('displays the "Artists Genre Danceability" in the Browse route', () => {

    const {getByText} = renderWithRedux(
      <MemoryRouter initialEntries={["/browse"]}>
        <App />
      </MemoryRouter>
    );
    expect(getByText("Artists")).toBeInTheDocument();
  });
});