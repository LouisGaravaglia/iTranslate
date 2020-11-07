import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import RedirectPage from './RedirectPage';
import Dashboard from './Dashboard';
import NotFoundPage from './NotFoundPage';

const Routes = () => {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/redirect" component={RedirectPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };

export default Routes;