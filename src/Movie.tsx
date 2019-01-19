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

const styles = ({ spacing }: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: spacing.unit * 2
        }
    });

interface IStateProps {
    title: string;
    description: string;
    duration: string;
}

interface IDispatchProps {
    getMovieByMovieId: (movieId: number) => void;
}

type MovieProps = IStateProps & IDispatchProps;

interface IMovieProps {
    title: string;
    description: string;
    duration: string;
}

class MovieBase extends React.Component<
    WithStyles<typeof styles> & MovieProps
> {
    public static defaultProps = {
        description: '',
        duration: '',
        title: ''
    };
    public async componentDidMount() {
        this.props.getMovieByMovieId(284053);
    }
    public render() {
        const { classes, title, description, duration } = this.props;

        return (
            <div className={classes.root}>
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

const mapStateToProps = ({ movies }: AppState): IStateProps => {
    const keys = Object.keys(movies);
    if (keys.length) {
        const firstKey = keys[0];
        const movie = movies[firstKey];

        return {
            description: movie.description,
            duration: movie.duration,
            title: movie.title
        };
    }

    return {
        description: '',
        duration: '',
        title: ''
    };
};

export const Movie = connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(MovieBase));
