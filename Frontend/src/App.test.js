import React from 'react'
import {render, fireEvent, waitFor, screen, cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import { createStore } from "redux";
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

describe('Smoke Test for App components', () => {
  const store = createStore(rootReducer);

  it('renders without crashing', () => {

     render(
    <MemoryRouter>
      <Provider store={store}><App /></Provider>
    </MemoryRouter>
    );
  });
});
