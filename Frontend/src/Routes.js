import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Browse from "./Browse";

const Routes = () => {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/browse"><Browse /></Route>

          </Switch>
        </div>
      </BrowserRouter>
    );
  };

export default Routes;