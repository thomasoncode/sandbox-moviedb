import {
    AppBar,
    createStyles,
    Grid,
    Theme,
    Toolbar,
    Typography,
    WithStyles,
    withStyles
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './ducks';
import { Movie } from './Movie';
import { MovieList } from './MovieList';

const composeEnhancers = composeWithDevTools({
    name: 'sandbox-moviedb'
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const styles = ({ spacing }: Theme) =>
    createStyles({
        root: {
            margin: spacing.unit * 2
        }
    });

class AppBase extends React.Component<WithStyles<typeof styles>> {
    public render() {
        return (
            <Provider store={store}>
                <CssBaseline />
                <AppBar>
                    <Toolbar>
                        <Typography color='inherit' variant='h6'>
                            The Marvel Universe
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Grid
                    container
                    className={this.props.classes.root}
                    spacing={16}
                >
                    <Grid item xs={3}>
                        <MovieList />
                    </Grid>
                    <Grid item xs>
                        <Movie />
                    </Grid>
                </Grid>
            </Provider>
        );
    }
}

export const App = withStyles(styles)(AppBase);
