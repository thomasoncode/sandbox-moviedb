import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '.';
import { MoviesService } from '../core/movies';

// STATE
interface IMovie {
    readonly id: number;
    readonly title: string;
    readonly posterUrl: string;
}

interface IMoviesState {
    [key: string]: IMovie;
}

const initialState: IMoviesState = {};

// ACTIONS
export const GET_MOVIE_OVERVIEW_REQUEST =
    'moviedb/movie/GET_MOVIE_OVERVIEW_REQUEST';
export const GET_MOVIE_OVERVIEW_SUCCESS =
    'moviedb/movie/GET_MOVIE_OVERVIEW_SUCCESS';
export const GET_MOVIE_OVERVIEW_FAILURE =
    'moviedb/movie/GET_MOVIE_OVERVIEW_FAILURE';

interface IGetMovieOverviewRequest {
    type: typeof GET_MOVIE_OVERVIEW_REQUEST;
    payload: {};
}

interface IGetMovieOverviewSuccess {
    type: typeof GET_MOVIE_OVERVIEW_SUCCESS;
    payload: IMoviesState;
}

interface IGetMovieOverviewFailure {
    type: typeof GET_MOVIE_OVERVIEW_FAILURE;
    payload: Error;
    error: true;
}

type MovieOverviewType =
    | IGetMovieOverviewRequest
    | IGetMovieOverviewSuccess
    | IGetMovieOverviewFailure;

// ACTION CREATORS
const getMovieOverviewRequest = (): IGetMovieOverviewRequest => ({
    payload: {},
    type: GET_MOVIE_OVERVIEW_REQUEST
});

const getMovieOverviewSuccess = (
    movies: IMoviesState
): IGetMovieOverviewSuccess => ({
    payload: movies,
    type: GET_MOVIE_OVERVIEW_SUCCESS
});

const getMovieOverviewFailure = (error: Error): IGetMovieOverviewFailure => ({
    error: true,
    payload: error,
    type: GET_MOVIE_OVERVIEW_FAILURE
});

// REDUCER
export const moviesReducer = (
    state = initialState,
    action: MovieOverviewType
): IMoviesState => {
    switch (action.type) {
        case GET_MOVIE_OVERVIEW_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case GET_MOVIE_OVERVIEW_REQUEST:
        default:
            return state;
    }
};

// THUNKS
export const getMoviesByListId = (
    movieId: number
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getMovieOverviewRequest());

        const movieService = new MoviesService();
        const movies = await movieService.getMoviesByListId(movieId);

        dispatch(getMovieOverviewSuccess(movies));
    } catch (error) {
        dispatch(getMovieOverviewFailure(error));
    }
};
