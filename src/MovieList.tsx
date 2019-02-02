import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
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
    posterUrl: string;
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
            <GridList cols={1} cellHeight={138}>
                {this.props.movies.map(movie => (
                    <GridListTile key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${
                                movie.posterUrl
                            }`}
                            height='auto'
                            width='200px'
                            alt={movie.title}
                        />
                        <GridListTileBar
                            title={movie.title}
                            actionIcon={
                                <IconButton>
                                    <InfoOutlined />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
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
    const movieOverviews = ids.map(id => state.movies[id]);

    return {
        movies: movieOverviews.map(movieOverview => ({
            id: movieOverview.id,
            posterUrl: movieOverview.posterUrl,
            title: movieOverview.title
        }))
    };
};

export const MovieList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieListBase);
