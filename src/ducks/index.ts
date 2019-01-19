import { combineReducers } from 'redux';
import { movies } from './movie';

export const rootReducer = combineReducers({
    movies
});

export type AppState = ReturnType<typeof rootReducer>;
