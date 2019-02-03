import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './ducks';
import { getMoviesByListId } from './ducks/movies';

interface IDispatchProps {
    getMoviesByListId: (listId: number) => void;
}

interface IMovieProp {
    title: string;
    id: number;
}

interface IStateProps {
    movies: IMovieProp[];
}

type Props = IDispatchProps & IStateProps;

class MovieListBase extends React.Component<Props> {
    public async componentDidMount() {
        this.props.getMoviesByListId(1);
    }
    public render() {
        return (
            <List>
                {this.props.movies.map(movie => (
                    <ListItem key={movie.id} button>
                        <ListItemText primary={movie.title} />
                    </ListItem>
                ))}
            </List>
        );
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, null, Action<string>>
): IDispatchProps => ({
    getMoviesByListId: (listId: number) => dispatch(getMoviesByListId(listId))
});

const mapStateToProps = (state: AppState): IStateProps => {
    const ids = Object.keys(state.movies).map(id => parseInt(id, 10));
    const movies = ids
        .map(id => state.movies[id])
        .map(movie => ({
            id: movie.id,
            title: movie.title
        }))
        .sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });

    return {
        movies
    };
};

export const MovieList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieListBase);
