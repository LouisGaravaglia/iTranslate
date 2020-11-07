import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import albumsReducer from '../Reducers/albums';
import artistsReducer from '../Reducers/artists';
import playlistReducer from '../Reducers/playlist';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;const store = createStore(
  combineReducers({
    albums: albumsReducer,
    artists: artistsReducer,
    playlist: playlistReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

export default store;