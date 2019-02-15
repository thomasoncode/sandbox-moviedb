import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '.';
import { MoviesService } from '../core/movies';

// STATE
interface IMovie {
    readonly id: number;
    readonly title: string;
}

interface IMoviesState {
    [key: string]: IMovie;
}

const initialState: IMoviesState = {};

// ACTIONS
export const GET_MOVIES_REQUEST = 'moviedb/movie/GET_MOVIES_REQUEST';
export const GET_MOVIES_SUCCESS = 'moviedb/movie/GET_MOVIES_SUCCESS';
export const GET_MOVIES_FAILURE = 'moviedb/movie/GET_MOVIES_FAILURE';

interface IGetMoviesSuccess {
    type: typeof GET_MOVIES_SUCCESS;
    payload: {};
}

interface IGetMoviesRequest {
    type: typeof GET_MOVIES_REQUEST;
    payload: IMoviesState;
}

interface IGetMoviesFailure {
    type: typeof GET_MOVIES_FAILURE;
    payload: Error;
    error: true;
}

type MovieOverviewType =
    | IGetMoviesSuccess
    | IGetMoviesRequest
    | IGetMoviesFailure;

// ACTION CREATORS
const getMoviesRequest = (): IGetMoviesSuccess => ({
    payload: {},
    type: GET_MOVIES_SUCCESS
});

const getMoviesSuccess = (movies: IMoviesState): IGetMoviesSuccess => ({
    payload: movies,
    type: GET_MOVIES_SUCCESS
});

const getMoviesFailure = (error: Error): IGetMoviesFailure => ({
    error: true,
    payload: error,
    type: GET_MOVIES_FAILURE
});

// REDUCER
export const moviesReducer = (
    state = initialState,
    action: MovieOverviewType
): IMoviesState => {
    switch (action.type) {
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case GET_MOVIES_REQUEST:
        default:
            return state;
    }
};

// THUNKS
export const getMoviesByListId = (
    movieId: number
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getMoviesRequest());

        const movieService = new MoviesService();
        const movies = await movieService.getMoviesByListId(movieId);

        dispatch(getMoviesSuccess(movies));
    } catch (error) {
        dispatch(getMoviesFailure(error));
    }
};
