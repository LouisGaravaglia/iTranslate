import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup, getByTestId} from '@testing-library/react'
import {Router, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from "redux";
import { createMemoryHistory } from 'history'
import rootReducer from "./reducers/rootReducer";
import App from "./App";

afterEach(cleanup);

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
describe('Smoke Test for App component', () => {

  it('renders without crashing', () => {
    const history = createMemoryHistory();

    const {getByText} = renderWithRedux(
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