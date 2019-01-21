import { combineReducers } from 'redux';
import { movies } from './movie';
import { movieOverviews } from './movie-overview';

export const rootReducer = combineReducers({
    movieOverviews,
    movies
});

export type AppState = ReturnType<typeof rootReducer>;
