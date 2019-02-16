import { Paper, Typography, withStyles, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './ducks';
import { getMovieByMovieId } from './ducks/movie';

const styles = () => ({
    root: {
        flexGrow: 1
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

class MovieBase extends React.Component<
    WithStyles<typeof styles> & MovieProps
> {
    public static defaultProps = {
        description: '',
        duration: '',
        title: ''
    };
    public async componentDidMount() {
        // this.props.getMovieByMovieId(284053);
    }
    public render() {
        const { title, description, duration, classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} zeroMinWidth>
                    <Grid item xs={12}>
                        <Typography variant='title' gutterBottom>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs>
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

export const Movie = withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MovieBase)
);
