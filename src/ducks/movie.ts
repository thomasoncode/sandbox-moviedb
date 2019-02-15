import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '.';
import { Movie, MovieService } from '../core/movie';

// STATE
interface IMovieState {
    description: string;
    duration: string;
    title: string;
}

const initialState: IMovieState = {
    description: '',
    duration: '',
    title: ''
};

// ACTIONS
export const GET_MOVIE_REQUEST = 'moviedb/movie/GET_MOVIE_REQUEST';
export const GET_MOVIE_SUCCESS = 'moviedb/movie/GET_MOVIE_SUCCESS';
export const GET_MOVIE_FAILURE = 'moviedb/movie/GET_MOVIE_FAILURE';

interface IGetMovieRequest {
    type: typeof GET_MOVIE_REQUEST;
    payload: {};
}

interface IGetMovieSuccess {
    type: typeof GET_MOVIE_SUCCESS;
    payload: Movie;
}

interface IGetMovieFailure {
    type: typeof GET_MOVIE_FAILURE;
    payload: Error;
    error: true;
}

type MovieTypes = IGetMovieRequest | IGetMovieSuccess | IGetMovieFailure;

// ACTION CREATORS
const getMovieRequest = (): IGetMovieRequest => ({
    payload: {},
    type: GET_MOVIE_REQUEST
});

const getMovieSuccess = (movie: Movie): IGetMovieSuccess => ({
    payload: movie,
    type: GET_MOVIE_SUCCESS
});

const getMovieFailure = (error: Error): IGetMovieFailure => ({
    error: true,
    payload: error,
    type: GET_MOVIE_FAILURE
});

// REDUCER
export const movieReducer = (
    state = initialState,
    action: MovieTypes
): IMovieState => {
    switch (action.type) {
        case GET_MOVIE_SUCCESS:
            const { payload } = action;
            return {
                description: payload.description,
                duration: payload.duration,
                title: payload.title
            };
        case GET_MOVIE_REQUEST:
        default:
            return state;
    }
};

// THUNKS
export const getMovieByMovieId = (
    movieId: number
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
    try {
        dispatch(getMovieRequest());

        const movieService = new MovieService();
        const movie = await movieService.getMovieById(movieId);

        dispatch(getMovieSuccess(movie));
    } catch (error) {
        dispatch(getMovieFailure(error));
    }
};
