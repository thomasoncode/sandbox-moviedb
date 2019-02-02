import {
    createStyles,
    Theme,
    Typography,
    withStyles,
    WithStyles
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './ducks';
import { getMovieByMovieId } from './ducks/movie';

interface IStateProps {
    title: string;
    description: string;
    duration: string;
}

interface IDispatchProps {
    getMovieByMovieId: (movieId: number) => void;
}

type MovieProps = IStateProps & IDispatchProps;

class MovieBase extends React.Component<MovieProps> {
    public static defaultProps = {
        description: '',
        duration: '',
        title: ''
    };
    public async componentDidMount() {
        // this.props.getMovieByMovieId(284053);
    }
    public render() {
        const { title, description, duration } = this.props;

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Typography variant='h1' gutterBottom>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Typography variant='body1' gutterBottom>
                            {description}
                        </Typography>
                        <Typography variant='body1' gutterBottom>
                            {duration}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<AppState, null, Action<string>>
): IDispatchProps => ({
    getMovieByMovieId: (movieId: number) => dispatch(getMovieByMovieId(movieId))
});

const mapStateToProps = ({ movie }: AppState): IStateProps => {
    return {
        description: movie.description,
        duration: movie.duration,
        title: movie.title
    };
};

export const Movie = connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieBase);
