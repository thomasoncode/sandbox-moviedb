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
import { getMovieOverviewByListId } from './ducks/movie-overview';

interface IDispatchProps {
    getMovieOverviewByListId: (listId: number) => void;
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
        this.props.getMovieOverviewByListId(1);
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
    getMovieOverviewByListId: (listId: number) =>
        dispatch(getMovieOverviewByListId(listId))
});

const mapStateToProps = (state: AppState): IStateProps => {
    const ids = Object.keys(state.movieOverviews).map(id => parseInt(id, 10));
    const movieOverviews = ids.map(id => state.movieOverviews[id]);

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
