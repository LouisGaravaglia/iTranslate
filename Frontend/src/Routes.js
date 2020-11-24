import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Search from './Search';
import Browse from "./Browse";
import BrowseByArtists from "./BrowseByArtists";
import BrowseByGenre from "./BrowseByGenre";
import BrowseByDanceability from "./BrowseByDanceability";

const Routes = () => {

    return (
      <div className="main">
        <Switch>
          <Route exact path="/"><Search /></Route>
          <Route exact path="/browse"><Browse /></Route>
          <Route exact path="/browse/artists"><BrowseByArtists /></Route>
          <Route exact path="/browse/genres"><BrowseByGenre /></Route>
          <Route exact path="/browse/danceability"><BrowseByDanceability /></Route>
          <Redirect to="/" />
        </Switch>
      </div>
    );
  };

export default Routes;