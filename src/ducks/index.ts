import { combineReducers } from 'redux';
import { movieReducer } from './movie';
import { moviesReducer } from './movies';

export const rootReducer = combineReducers({
    movie: movieReducer,
    movies: moviesReducer
});

export type AppState = ReturnType<typeof rootReducer>;
