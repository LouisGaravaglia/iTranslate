import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';

const Routes = () => {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route exact path="/"><Home /></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  };

export default Routes;