import {
    createStyles,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { MovieMapper } from './core/movie-mapper';

const styles = ({ palette, spacing }: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    });

interface MovieState {
    title: string;
    description: string;
}

class Component extends React.Component<WithStyles<typeof styles>, MovieState> {
    public readonly state: Readonly<MovieState> = {
        description: '',
        title: '',
    };

    public async componentDidMount() {
        const movieMapper = new MovieMapper();
        const movie = await movieMapper.getMovieById(284053);
        this.setState({
            description: movie.description,
            title: movie.title,
        });
    }
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Typography variant='h1' gutterBottom>
                            {this.state.title}
                        </Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Typography variant='body1' gutterBottom>
                            {this.state.description}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export const Movie = withStyles(styles)(Component);
