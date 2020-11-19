import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Search from './Search';
import Browse from "./Browse";

const Routes = () => {

    return (
        <div className="main">
          <Switch>
            <Route exact path="/"><Search /></Route>
            <Route exact path="/browse"><Browse /></Route>
            <Redirect to="/" />
          </Switch>
        </div>
    );
  };

export default Routes;